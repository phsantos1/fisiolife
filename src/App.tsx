/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, {useEffect, useState} from 'react';
import {motion} from 'motion/react';
import {
  ArrowRight,
  CalendarCheck,
  ExternalLink,
  Instagram,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from 'lucide-react';
import {
  CLINIC_IMAGES,
  CLINIC_INFO,
  DIFFERENTIALS,
  SPECIALTIES,
  SpecialtyId,
} from './config/clinic';
import {ButterflyMark, WingSilhouetteAccent} from './components/ButterflyMark';
import {ClinicImage} from './components/ClinicImage';
import {ClinicLocationMap} from './components/ClinicLocationMap';
import {Header} from './components/Header';
import {PreSchedulingModal} from './components/PreSchedulingModal';
import {PrivacyPolicyModal} from './components/PrivacyPolicyModal';

const REVEAL_TRANSITION = {
  duration: 0.45,
  ease: [0.16, 1, 0.3, 1] as const,
};

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<SpecialtyId>('pilates-clinico');
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  const openBookingWithSpecialty = (specialtyId: SpecialtyId = 'pilates-clinico') => {
    setSelectedSpecialty(specialtyId);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#16323B] flex flex-col">
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Header onOpenBooking={() => openBookingWithSpecialty('pilates-clinico')} />

      <main className="flex-1">
        {/* Seção 2 — Apresentação principal */}
        <section
          id="inicio"
          className="relative overflow-hidden bg-gradient-to-b from-[#FBE9EF]/45 via-white to-white pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24"
        >
          <WingSilhouetteAccent className="pointer-events-none absolute -top-20 -right-24 h-[380px] w-[420px] opacity-60" />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="flex flex-col justify-center lg:col-span-6">
                <p className="text-xs sm:text-sm font-medium text-[#127682] tracking-wide">
                  Fisio Life <span aria-hidden="true">·</span> Pilates e
                  Fisioterapia <span aria-hidden="true">·</span> Formiga – MG
                </p>

                <h1
                  className="mt-4 font-display font-semibold tracking-tight text-[#16323B] leading-[1.08]"
                  style={{
                    fontSize: 'clamp(2.25rem, 4.2vw, 3.65rem)',
                    textWrap: 'balance',
                  }}
                >
                  Movimento, cuidado e qualidade de vida em cada etapa.
                </h1>

                <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[#4A6570]">
                  Há 9 anos, a Fisio Life oferece sessões individuais de Pilates
                  e Fisioterapia, valorizando um atendimento acolhedor e
                  personalizado.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => openBookingWithSpecialty('pilates-clinico')}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#127682] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0F616B] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#127682]"
                  >
                    <CalendarCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Agendar atendimento</span>
                  </button>

                  <a
                    href="#especialidades"
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-[#D8EEF3] bg-white px-6 py-3 text-sm font-semibold text-[#16323B] hover:border-[#E8A4BE] hover:bg-[#FBE9EF]/50 transition-colors whitespace-nowrap"
                  >
                    <span>Conhecer especialidades</span>
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="relative lg:col-span-6">
                <div className="relative h-full min-h-[300px] sm:min-h-[380px] overflow-hidden rounded-3xl border border-[#D8EEF3] bg-[#FBE9EF]/30 shadow-sm">
                  <ClinicImage
                    src={CLINIC_IMAGES.hero}
                    alt="Ambiente iluminado de estúdio de Pilates Clínico e Fisioterapia com equipamentos de madeira e luz natural"
                    className="lg:h-full"
                    caption="Imagem conceitual ilustrativa de espaço voltado ao Pilates Clínico e à Fisioterapia."
                  />
                </div>
                <div
                  className="pointer-events-none -bottom-4 -left-4 hidden sm:flex absolute h-16 w-16 items-center justify-center rounded-2xl border border-[#E8A4BE]/50 bg-white/95 shadow-sm"
                  aria-hidden="true"
                >
                  <ButterflyMark size={34} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 3 — Diferenciais */}
        <section
          aria-label="Diferenciais da Fisio Life"
          className="border-y border-[#D8EEF3] bg-[#F7FBFC]/70 py-12 sm:py-16"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 divide-y divide-[#D8EEF3] md:grid-cols-3 md:divide-x md:divide-y-0">
              {DIFFERENTIALS.map((item, idx) => (
                <motion.div
                  key={item.index}
                  initial={{opacity: 0, y: 12}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, amount: 0.25}}
                  transition={{...REVEAL_TRANSITION, delay: idx * 0.08}}
                  className={`py-6 md:py-2 ${
                    idx === 0
                      ? 'md:pr-8'
                      : idx === 1
                        ? 'md:px-8'
                        : 'md:pl-8'
                  }`}
                >
                  <span className="text-xs font-semibold tracking-wider text-[#127682] tabular-nums">
                    {item.index}
                  </span>
                  <h2 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-[#16323B]">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#4A6570]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção 4 — Sobre a Fisio Life */}
        <section id="sobre" className="py-16 sm:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, amount: 0.2}}
              transition={REVEAL_TRANSITION}
              className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-14"
            >
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="h-full min-h-[300px] sm:min-h-[380px] overflow-hidden rounded-3xl border border-[#D8EEF3] bg-[#FBE9EF]/25">
                  <ClinicImage
                    src={CLINIC_IMAGES.about}
                    alt="Atendimento individualizado com acompanhamento profissional em Pilates Clínico"
                    className="lg:h-full"
                    caption="Imagem ilustrativa do atendimento individualizado em Pilates Clínico e Fisioterapia."
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center lg:col-span-6 order-1 lg:order-2">
                <p className="text-xs sm:text-sm font-medium text-[#127682]">
                  Sobre a Fisio Life
                </p>
                <h2
                  className="mt-3 font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#16323B] leading-[1.12]"
                  style={{textWrap: 'balance'}}
                >
                  Atenção humana e cuidado individualizado em cada sessão.
                </h2>

                <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#4A6570]">
                  Na Fisio Life, acreditamos que cada pessoa merece um cuidado
                  individualizado. Há 9 anos, nosso trabalho é dedicado à
                  fisioterapia e ao Pilates Clínico, buscando oferecer uma
                  experiência de atendimento atenciosa, profissional e alinhada
                  às necessidades de cada paciente.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 border-t border-[#D8EEF3] pt-6 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-[#16323B]">
                      Atendimento em Formiga – MG
                    </p>
                    <p className="mt-1 text-sm text-[#4A6570]">
                      Localizada no Bairro Rosário, em ambiente pensado para o
                      acolhimento e a tranquilidade durante cada sessão.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#16323B]">
                      Foco em sessões individuais
                    </p>
                    <p className="mt-1 text-sm text-[#4A6570]">
                      Acompanhamento dedicado para respeitar o ritmo, os
                      objetivos e as particularidades de cada paciente.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Seção 5 — Nossas especialidades */}
        <section
          id="especialidades"
          className="bg-gradient-to-b from-[#FBE9EF]/35 via-[#F7FBFC]/60 to-white py-16 sm:py-24 border-t border-[#D8EEF3]"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-medium text-[#127682]">
                Nossas especialidades
              </p>
              <h2
                className="mt-3 font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#16323B] leading-[1.12]"
                style={{textWrap: 'balance'}}
              >
                Cuidado especializado para cada etapa do seu movimento.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4A6570]">
                Selecione a especialidade desejada para iniciar sua solicitação
                de pré-agendamento com atendimento individual.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {SPECIALTIES.map((specialty, idx) => (
                <motion.article
                  key={specialty.id}
                  initial={{opacity: 0, y: 16}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true, amount: 0.15}}
                  transition={{...REVEAL_TRANSITION, delay: idx * 0.08}}
                  className="flex flex-col overflow-hidden rounded-2xl border border-[#D8EEF3] bg-white shadow-xs transition-shadow hover:shadow-md"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#FBE9EF]/30">
                    <ClinicImage
                      src={specialty.imageSrc}
                      alt={specialty.imageAlt}
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-medium text-[#127682]">
                      {specialty.kicker}
                    </p>
                    <h3 className="mt-2 font-display text-2xl sm:text-[28px] font-semibold text-[#16323B] leading-snug">
                      {specialty.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm sm:text-base leading-relaxed text-[#4A6570]">
                      {specialty.description}
                    </p>

                    <button
                      type="button"
                      onClick={() => openBookingWithSpecialty(specialty.id)}
                      className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#127682] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0F616B] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#127682]"
                    >
                      <span className="truncate">{specialty.ctaLabel}</span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Seção 6 — Galeria & Instagram oficial */}
        <section
          id="galeria"
          className="py-16 sm:py-24 bg-white border-t border-[#D8EEF3]"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs sm:text-sm font-medium text-[#127682]">
                  Ambiente e referências visuais
                </p>
                <h2
                  className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#16323B] leading-[1.12]"
                  style={{textWrap: 'balance'}}
                >
                  Acompanhe a rotina da clínica no Instagram oficial.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#4A6570]">
                  Os quadros abaixo apresentam referências visuais ilustrativas
                  de Pilates e Fisioterapia. Para conhecer registros reais do
                  espaço físico, equipamentos e atendimentos autorizados da
                  Fisio Life, acesse diretamente nosso perfil oficial.
                </p>
              </div>

              <a
                href={CLINIC_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl border border-[#E8A4BE] bg-[#FBE9EF]/60 px-5 py-2.5 text-sm font-semibold text-[#16323B] hover:bg-[#FBE9EF] transition-colors whitespace-nowrap"
              >
                <Instagram className="h-4 w-4 text-[#9E3B63]" aria-hidden="true" />
                <span>Ver fotos reais em {CLINIC_INFO.instagramHandle}</span>
                <ExternalLink className="h-3.5 w-3.5 text-[#4A6570]" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
              <div className="overflow-hidden rounded-2xl border border-[#D8EEF3] md:col-span-5 aspect-[4/3] md:aspect-auto md:min-h-[320px]">
                <ClinicImage
                  src={CLINIC_IMAGES.detail}
                  alt="Imagem ilustrativa de molas, madeira e detalhes de equipamentos de Pilates"
                  caption="Referência ilustrativa · Equipamentos de Pilates"
                />
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#D8EEF3] md:col-span-4 aspect-[4/3] md:aspect-auto md:min-h-[320px]">
                <ClinicImage
                  src={CLINIC_IMAGES.pilates}
                  alt="Imagem ilustrativa de sala iluminada com Reformer e Barrel"
                  caption="Referência ilustrativa · Espaço de movimento"
                />
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-[#E8A4BE]/60 bg-gradient-to-br from-[#FBE9EF] via-white to-[#D8EEF3]/55 p-6 md:col-span-3">
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-[#E8A4BE]/50 text-[#9E3B63]">
                    <Instagram className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-[#16323B]">
                    Instagram Oficial
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4A6570]">
                    Confira fotografias reais da clínica, novidades e
                    publicações em{' '}
                    <strong className="font-semibold text-[#16323B]">
                      {CLINIC_INFO.instagramHandle}
                    </strong>
                    .
                  </p>
                </div>

                <a
                  href={CLINIC_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#127682] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0F616B] transition-colors whitespace-nowrap"
                >
                  <span>Abrir perfil</span>
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 7 — Localização e Contato */}
        <section
          id="localizacao"
          className="border-t border-[#D8EEF3] bg-[#F7FBFC]/60 py-16 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
              <div id="contato" className="flex flex-col justify-between lg:col-span-5">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-[#127682]">
                    Localização e contato
                  </p>
                  <h2
                    className="mt-3 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#16323B] leading-[1.12]"
                    style={{textWrap: 'balance'}}
                  >
                    Visite a Fisio Life em Formiga – MG.
                  </h2>

                  <div className="mt-7 space-y-5">
                    <div className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-[#D8EEF3] text-[#127682]">
                        <MapPin className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#16323B]">
                          Endereço
                        </p>
                        <p className="mt-0.5 text-sm leading-relaxed text-[#4A6570]">
                          {CLINIC_INFO.fullAddress}
                        </p>
                        <p className="mt-1 text-xs text-[#7DA6B5]">
                          Nota editorial: confirmar a grafia do logradouro antes
                          da publicação definitiva.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-[#D8EEF3] text-[#127682]">
                        <Phone className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#16323B]">
                          WhatsApp informado
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-[#16323B] tabular-nums">
                          {CLINIC_INFO.referenceWhatsAppDisplay}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#4A6570]">
                          Link automático habilitado após confirmação do número
                          ativo no WhatsApp. Utilize o formulário de
                          pré-agendamento para gerar e copiar sua mensagem.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-[#D8EEF3] text-[#9E3B63]">
                        <Instagram className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#16323B]">
                          Instagram
                        </p>
                        <a
                          href={CLINIC_INFO.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-medium text-[#127682] hover:underline"
                        >
                          <span>{CLINIC_INFO.instagramHandle}</span>
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href={CLINIC_INFO.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#127682] bg-white px-5 py-2.5 text-sm font-semibold text-[#127682] hover:bg-[#D8EEF3]/40 transition-colors whitespace-nowrap"
                  >
                    <Navigation className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Como chegar</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => openBookingWithSpecialty('pilates-clinico')}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#127682] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0F616B] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Contato pelo WhatsApp</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <ClinicLocationMap quotaExceeded={quotaExceeded} />
              </div>
            </div>
          </div>
        </section>

        {/* Seção 8 — Chamada final */}
        <section className="relative overflow-hidden bg-[#FBE9EF] py-16 sm:py-20 border-t border-[#E8A4BE]/40">
          <WingSilhouetteAccent className="pointer-events-none absolute -bottom-24 -left-16 h-[320px] w-[360px] opacity-70" />

          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/85 border border-[#E8A4BE]/50">
              <ButterflyMark size={30} />
            </div>

            <h2
              className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-[#16323B] leading-[1.12]"
              style={{textWrap: 'balance'}}
            >
              Seu cuidado merece atenção individualizada.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-[#4A6570]">
              Conheça os atendimentos da Fisio Life e solicite seu agendamento
              de forma simples e rápida.
            </p>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => openBookingWithSpecialty('pilates-clinico')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#127682] px-7 py-3.5 text-sm sm:text-base font-semibold text-white hover:bg-[#0F616B] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#127682]"
              >
                <CalendarCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Agendar meu atendimento</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Seção 9 — Rodapé */}
      <footer className="border-t border-[#D8EEF3] bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5">
                <ButterflyMark size={32} />
                <div>
                  <p className="font-display text-2xl font-semibold text-[#16323B] leading-none">
                    {CLINIC_INFO.name}
                  </p>
                  <p className="mt-1 text-xs font-medium text-[#4A6570]">
                    {CLINIC_INFO.segment}
                  </p>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#4A6570]">
                Há 9 anos em Formiga – MG oferecendo sessões individuais de
                Pilates Clínico, Fisioterapia Ortopédica e Cardiopulmonar.
              </p>
            </div>

            <div className="md:col-span-3">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#16323B]">
                Navegação
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[#4A6570]">
                <li>
                  <a href="#inicio" className="hover:text-[#127682] transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="#sobre" className="hover:text-[#127682] transition-colors">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a
                    href="#especialidades"
                    className="hover:text-[#127682] transition-colors"
                  >
                    Especialidades
                  </a>
                </li>
                <li>
                  <a href="#galeria" className="hover:text-[#127682] transition-colors">
                    Galeria
                  </a>
                </li>
                <li>
                  <a
                    href="#localizacao"
                    className="hover:text-[#127682] transition-colors"
                  >
                    Localização
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#16323B]">
                Contato e endereço
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm text-[#4A6570]">
                <li>{CLINIC_INFO.fullAddress}</li>
                <li>
                  WhatsApp de referência:{' '}
                  <span className="font-medium text-[#16323B] tabular-nums">
                    {CLINIC_INFO.referenceWhatsAppDisplay}
                  </span>
                </li>
                <li>
                  <a
                    href={CLINIC_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-[#127682] hover:underline"
                  >
                    <Instagram className="h-4 w-4" aria-hidden="true" />
                    <span>{CLINIC_INFO.instagramHandle}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[#D8EEF3] pt-6 text-xs text-[#4A6570] sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} {CLINIC_INFO.fullName} · Formiga – MG.
            </p>
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              className="font-medium text-[#127682] hover:underline cursor-pointer"
            >
              Política de privacidade
            </button>
          </div>
        </div>
      </footer>

      <PreSchedulingModal
        isOpen={bookingOpen}
        initialSpecialtyId={selectedSpecialty}
        onClose={() => setBookingOpen(false)}
      />

      <PrivacyPolicyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />
    </div>
  );
}
