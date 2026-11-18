import React, {useEffect, useMemo, useState} from 'react';
import {
  Calendar,
  Check,
  Clock,
  Copy,
  MessageCircle,
  Settings2,
  User,
  X,
} from 'lucide-react';
import {
  CLINIC_INFO,
  PREFERRED_TIME_OPTIONS,
  SPECIALTIES,
  SpecialtyId,
  buildWhatsAppSchedulingMessage,
  buildWhatsAppUrl,
  getTodayIsoLocal,
} from '../config/clinic';
import {ButterflyMark} from './ButterflyMark';

interface PreSchedulingModalProps {
  isOpen: boolean;
  initialSpecialtyId?: SpecialtyId;
  onClose: () => void;
}

interface FormErrors {
  patientName?: string;
  serviceId?: string;
  dateIso?: string;
  time24h?: string;
}

export const PreSchedulingModal: React.FC<PreSchedulingModalProps> = ({
  isOpen,
  initialSpecialtyId = 'pilates-clinico',
  onClose,
}) => {
  const [patientName, setPatientName] = useState('');
  const [serviceId, setServiceId] = useState<SpecialtyId>(initialSpecialtyId);
  const [dateIso, setDateIso] = useState('');
  const [time24h, setTime24h] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Configurable destination number (kept empty by default until clinic confirms WhatsApp digits)
  const [showDemoNumberConfig, setShowDemoNumberConfig] = useState(false);
  const [customConfirmedDigits, setCustomConfirmedDigits] = useState<string>(
    CLINIC_INFO.confirmedWhatsAppNumber
  );

  const todayIso = useMemo(() => getTodayIsoLocal(), []);

  useEffect(() => {
    setServiceId(initialSpecialtyId);
  }, [initialSpecialtyId]);

  useEffect(() => {
    if (!isOpen) return;
    setSubmittedMessage(null);
    setErrors({});
    setCopied(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const selectedSpecialty = useMemo(
    () =>
      SPECIALTIES.find((item) => item.id === serviceId) ?? SPECIALTIES[0],
    [serviceId]
  );

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};
    const trimmedName = patientName.trim();

    if (trimmedName.length < 3) {
      nextErrors.patientName =
        'Por favor, informe seu nome completo (mínimo 3 caracteres).';
    }

    if (!serviceId) {
      nextErrors.serviceId = 'Selecione o serviço desejado.';
    }

    if (!dateIso) {
      nextErrors.dateIso = 'Selecione uma data desejada no calendário.';
    } else if (dateIso < todayIso) {
      nextErrors.dateIso =
        'Não é possível selecionar uma data anterior ao dia de hoje.';
    }

    if (!time24h) {
      nextErrors.time24h = 'Selecione um horário desejado.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const generated = buildWhatsAppSchedulingMessage({
      patientName,
      serviceName: selectedSpecialty.title,
      dateIso,
      time24h,
    });

    setSubmittedMessage(generated);
    setCopied(false);
  };

  const handleCopyMessage = async () => {
    if (!submittedMessage) return;
    try {
      await navigator.clipboard.writeText(submittedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  };

  const whatsappUrl = useMemo(() => {
    if (!submittedMessage) return null;
    return buildWhatsAppUrl(customConfirmedDigits, submittedMessage);
  }, [customConfirmedDigits, submittedMessage]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#16323B]/45 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-[#D8EEF3] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#D8EEF3] pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FBE9EF]">
              <ButterflyMark size={28} />
            </span>
            <div>
              <h2
                id="booking-modal-title"
                className="font-display text-2xl sm:text-3xl font-semibold text-[#16323B] leading-tight"
              >
                Pré-agendamento
              </h2>
              <p className="text-xs sm:text-sm text-[#4A6570]">
                Solicitação personalizada para confirmação de disponibilidade
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar formulário de pré-agendamento"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#4A6570] hover:bg-[#FBE9EF] hover:text-[#16323B] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
          {/* 1. Nome completo */}
          <div>
            <label
              htmlFor="patient-name"
              className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#16323B]"
            >
              <User className="h-4 w-4 text-[#127682]" aria-hidden="true" />
              Nome completo do paciente <span className="text-[#9E3B63]">*</span>
            </label>
            <input
              id="patient-name"
              type="text"
              autoComplete="name"
              placeholder="Digite seu nome completo"
              value={patientName}
              onChange={(e) => {
                setPatientName(e.target.value);
                if (errors.patientName) {
                  setErrors((prev) => ({...prev, patientName: undefined}));
                }
              }}
              aria-invalid={Boolean(errors.patientName)}
              aria-describedby={
                errors.patientName ? 'error-patient-name' : undefined
              }
              className={`min-h-[44px] w-full rounded-xl border px-3.5 py-2.5 text-sm text-[#16323B] placeholder:text-[#7DA6B5] bg-white focus:outline-2 focus:outline-offset-0 focus:outline-[#127682] ${
                errors.patientName ? 'border-[#B8325B]' : 'border-[#D8EEF3]'
              }`}
            />
            {errors.patientName && (
              <p
                id="error-patient-name"
                role="alert"
                className="mt-1.5 text-xs font-medium text-[#B8325B]"
              >
                {errors.patientName}
              </p>
            )}
          </div>

          {/* 2. Serviço desejado */}
          <div>
            <label
              htmlFor="service-select"
              className="mb-1.5 block text-sm font-medium text-[#16323B]"
            >
              Serviço desejado <span className="text-[#9E3B63]">*</span>
            </label>
            <select
              id="service-select"
              value={serviceId}
              onChange={(e) => {
                setServiceId(e.target.value as SpecialtyId);
                setSubmittedMessage(null);
              }}
              className="min-h-[44px] w-full rounded-xl border border-[#D8EEF3] bg-white px-3.5 py-2.5 text-sm text-[#16323B] focus:outline-2 focus:outline-offset-0 focus:outline-[#127682]"
            >
              {SPECIALTIES.map((specialty) => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.title}
                </option>
              ))}
            </select>
          </div>

          {/* 3 & 4. Data e Horário */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="desired-date"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#16323B]"
              >
                <Calendar
                  className="h-4 w-4 text-[#127682]"
                  aria-hidden="true"
                />
                Data desejada <span className="text-[#9E3B63]">*</span>
              </label>
              <input
                id="desired-date"
                type="date"
                min={todayIso}
                value={dateIso}
                onChange={(e) => {
                  setDateIso(e.target.value);
                  if (errors.dateIso) {
                    setErrors((prev) => ({...prev, dateIso: undefined}));
                  }
                }}
                aria-invalid={Boolean(errors.dateIso)}
                aria-describedby={
                  errors.dateIso ? 'error-desired-date' : undefined
                }
                className={`min-h-[44px] w-full rounded-xl border px-3.5 py-2.5 text-sm text-[#16323B] bg-white tabular-nums focus:outline-2 focus:outline-offset-0 focus:outline-[#127682] ${
                  errors.dateIso ? 'border-[#B8325B]' : 'border-[#D8EEF3]'
                }`}
              />
              {errors.dateIso && (
                <p
                  id="error-desired-date"
                  role="alert"
                  className="mt-1.5 text-xs font-medium text-[#B8325B]"
                >
                  {errors.dateIso}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="desired-time"
                className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#16323B]"
              >
                <Clock className="h-4 w-4 text-[#127682]" aria-hidden="true" />
                Horário desejado <span className="text-[#9E3B63]">*</span>
              </label>
              <select
                id="desired-time"
                value={time24h}
                onChange={(e) => {
                  setTime24h(e.target.value);
                  if (errors.time24h) {
                    setErrors((prev) => ({...prev, time24h: undefined}));
                  }
                }}
                aria-invalid={Boolean(errors.time24h)}
                aria-describedby={
                  errors.time24h ? 'error-desired-time' : undefined
                }
                className={`min-h-[44px] w-full rounded-xl border px-3.5 py-2.5 text-sm text-[#16323B] bg-white tabular-nums focus:outline-2 focus:outline-offset-0 focus:outline-[#127682] ${
                  errors.time24h ? 'border-[#B8325B]' : 'border-[#D8EEF3]'
                }`}
              >
                <option value="">Selecione um horário</option>
                {PREFERRED_TIME_OPTIONS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              {errors.time24h && (
                <p
                  id="error-desired-time"
                  role="alert"
                  className="mt-1.5 text-xs font-medium text-[#B8325B]"
                >
                  {errors.time24h}
                </p>
              )}
            </div>
          </div>

          <p className="rounded-xl bg-[#FBE9EF]/65 px-3.5 py-2.5 text-xs leading-relaxed text-[#4A6570]">
            Esta solicitação funciona como pré-agendamento. A confirmação de
            disponibilidade para a data e o horário escolhidos é realizada pela
            equipe da clínica após o envio da mensagem.
          </p>

          <button
            type="submit"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#127682] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0F616B] transition-colors cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Solicitar agendamento pelo WhatsApp</span>
          </button>
        </form>

        {/* Generated Message Preview & Demo / Confirmed WhatsApp Flow */}
        {submittedMessage && (
          <div className="mt-6 rounded-2xl border border-[#D8EEF3] bg-[#F7FBFC] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-sans text-sm font-semibold text-[#16323B]">
                Mensagem personalizada gerada
              </h3>
              <span className="text-xs text-[#4A6570]">
                Pronta para envio · Sem armazenamento local
              </span>
            </div>

            <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-[#D8EEF3] bg-white p-3.5 font-sans text-xs sm:text-sm leading-relaxed text-[#16323B]">
              {submittedMessage}
            </pre>

            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={handleCopyMessage}
                className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl border border-[#127682] bg-white px-4 py-2.5 text-sm font-semibold text-[#127682] hover:bg-[#D8EEF3]/40 transition-colors cursor-pointer whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" />
                    <span>Mensagem copiada</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    <span>Copiar mensagem</span>
                  </>
                )}
              </button>

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#127682] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0F616B] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Abrir no WhatsApp</span>
                </a>
              )}
            </div>

            {/* Honest explanation regarding reference number (37) 9994-1568 */}
            <div className="mt-4 border-t border-[#D8EEF3] pt-3">
              <p className="text-xs leading-relaxed text-[#4A6570]">
                Número de referência informado:{' '}
                <strong className="font-semibold text-[#16323B]">
                  {CLINIC_INFO.referenceWhatsAppDisplay}
                </strong>
                . Como esse número possui oito dígitos após o DDD, o
                redirecionamento automático via{' '}
                <code className="text-[11px]">wa.me</code> permanece pausado
                até a confirmação do formato completo pela clínica, evitando
                direcionar pacientes a um contato incorreto.
              </p>

              <button
                type="button"
                onClick={() => setShowDemoNumberConfig((prev) => !prev)}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#127682] hover:underline cursor-pointer"
              >
                <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>
                  {showDemoNumberConfig
                    ? 'Ocultar configuração do número confirmado'
                    : 'Configurar número confirmado (demonstração comercial)'}
                </span>
              </button>

              {showDemoNumberConfig && (
                <div className="mt-3 rounded-xl border border-[#D8EEF3] bg-white p-3">
                  <label
                    htmlFor="confirmed-wa-input"
                    className="block text-xs font-medium text-[#16323B]"
                  >
                    Número completo confirmado para teste (DDI + DDD + número)
                  </label>
                  <input
                    id="confirmed-wa-input"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Ex: 5537999999999"
                    value={customConfirmedDigits}
                    onChange={(e) => setCustomConfirmedDigits(e.target.value)}
                    className="mt-1.5 min-h-[40px] w-full rounded-lg border border-[#D8EEF3] px-3 py-2 text-xs text-[#16323B] tabular-nums focus:outline-2 focus:outline-[#127682]"
                  />
                  <p className="mt-1 text-[11px] text-[#4A6570]">
                    Ao informar um número válido com código do país e DDD, o
                    botão &ldquo;Abrir no WhatsApp&rdquo; é habilitado acima com{' '}
                    <code>encodeURIComponent()</code>.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
