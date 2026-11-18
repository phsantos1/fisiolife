/// <reference types="google.maps" />
import React, {useCallback, useEffect, useState} from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {ExternalLink, MapPin} from 'lucide-react';
import {CLINIC_INFO} from '../config/clinic';

interface ClinicLocationMapProps {
  quotaExceeded: boolean;
}

interface ResolvedPlace {
  position: {lat: number; lng: number};
  formattedAddress?: string;
}

const MAPS_API_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) ?? '';

const ClinicMapInner: React.FC<{onQuotaError: () => void}> = ({
  onQuotaError,
}) => {
  const placesLib = useMapsLibrary('places');
  const [resolvedPlace, setResolvedPlace] = useState<ResolvedPlace | null>(
    null
  );
  const [lookupStatus, setLookupStatus] = useState<
    'loading' | 'ready' | 'error'
  >('loading');
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const handleCloseInfoWindow = useCallback(() => {
    setInfoWindowOpen(false);
  }, []);

  useEffect(() => {
    if (!placesLib) return;

    let cancelled = false;

    async function locateClinicAddress() {
      try {
        const {places} = await placesLib!.Place.searchByText({
          textQuery: CLINIC_INFO.mapsSearchQuery,
          fields: ['displayName', 'formattedAddress', 'location'],
          language: 'pt-BR',
          region: 'BR',
          maxResultCount: 1,
        });

        if (cancelled) return;

        const firstPlace = places?.[0];
        if (firstPlace?.location) {
          const loc = firstPlace.location;
          const lat = typeof loc.lat === 'function' ? loc.lat() : Number(loc.lat);
          const lng = typeof loc.lng === 'function' ? loc.lng() : Number(loc.lng);

          setResolvedPlace({
            position: {lat, lng},
            formattedAddress:
              firstPlace.formattedAddress ?? CLINIC_INFO.fullAddress,
          });
          setLookupStatus('ready');
        } else {
          setLookupStatus('error');
        }
      } catch (err) {
        if (cancelled) return;
        const msg = err instanceof Error ? err.message : String(err);
        if (
          msg.includes('RESOURCE_EXHAUSTED') ||
          msg.includes('OVER_QUERY_LIMIT') ||
          msg.includes('QuotaExceeded')
        ) {
          onQuotaError();
        }
        setLookupStatus('error');
      }
    }

    locateClinicAddress();

    return () => {
      cancelled = true;
    };
  }, [placesLib, onQuotaError]);

  if (lookupStatus === 'loading') {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#F7FBFC] p-6 text-center">
        <MapPin className="h-7 w-7 text-[#127682] mb-2" aria-hidden="true" />
        <p className="text-sm font-medium text-[#16323B]">
          Carregando localização em Formiga – MG...
        </p>
      </div>
    );
  }

  if (lookupStatus === 'error' || !resolvedPlace) {
    return <MapFallbackCard />;
  }

  return (
    <GoogleMap
      defaultCenter={resolvedPlace.position}
      defaultZoom={16}
      mapId="DEMO_MAP_ID"
      gestureHandling="cooperative"
      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
      className="h-full w-full"
    >
      <AdvancedMarker
        ref={markerRef}
        position={resolvedPlace.position}
        title={CLINIC_INFO.fullName}
        onClick={() => setInfoWindowOpen(true)}
      >
        <Pin
          background="#168C99"
          borderColor="#0F616B"
          glyphColor="#FFFFFF"
          scale={1.15}
        />
      </AdvancedMarker>

      {infoWindowOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={260}
          onCloseClick={handleCloseInfoWindow}
        >
          <div className="p-1 text-left">
            <p className="font-sans text-sm font-semibold text-[#16323B]">
              {CLINIC_INFO.fullName}
            </p>
            <p className="mt-1 font-sans text-xs leading-snug text-[#4A6570]">
              {CLINIC_INFO.fullAddress}
            </p>
            <a
              href={CLINIC_INFO.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 font-sans text-xs font-semibold text-[#127682] hover:underline"
            >
              <span>Como chegar</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

const MapFallbackCard: React.FC = () => (
  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#FBE9EF]/55 via-white to-[#D8EEF3]/65 p-8 text-center">
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xs border border-[#D8EEF3] text-[#127682]">
      <MapPin className="h-6 w-6" aria-hidden="true" />
    </span>
    <h3 className="mt-4 font-display text-2xl font-semibold text-[#16323B]">
      {CLINIC_INFO.fullName}
    </h3>
    <p className="mt-2 max-w-sm text-sm text-[#4A6570]">
      {CLINIC_INFO.fullAddress}
    </p>
    <a
      href={CLINIC_INFO.directionsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#127682] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0F616B] transition-colors whitespace-nowrap"
    >
      <span>Abrir rotas no Google Maps</span>
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
    </a>
  </div>
);

export const ClinicLocationMap: React.FC<ClinicLocationMapProps> = ({
  quotaExceeded,
}) => {
  const [apiError, setApiError] = useState(false);

  const handleQuotaError = useCallback(() => {
    window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
    setApiError(true);
  }, []);

  if (!MAPS_API_KEY || quotaExceeded || apiError) {
    return (
      <div className="h-[360px] sm:h-[420px] w-full overflow-hidden rounded-2xl border border-[#D8EEF3]">
        <MapFallbackCard />
      </div>
    );
  }

  return (
    <div className="h-[360px] sm:h-[420px] w-full overflow-hidden rounded-2xl border border-[#D8EEF3] bg-[#F7FBFC]">
      <APIProvider
        apiKey={MAPS_API_KEY}
        language="pt-BR"
        region="BR"
        onError={() => setApiError(true)}
      >
        <ClinicMapInner onQuotaError={handleQuotaError} />
      </APIProvider>
    </div>
  );
};
