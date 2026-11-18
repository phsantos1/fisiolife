export type SpecialtyId =
  | 'pilates-clinico'
  | 'fisioterapia-ortopedica'
  | 'fisioterapia-cardiopulmonar';

export interface SpecialtyItem {
  id: SpecialtyId;
  title: string;
  kicker: string;
  description: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
}

export const CLINIC_INFO = {
  name: 'Fisio Life',
  fullName: 'Fisio Life — Pilates e Fisioterapia',
  segment: 'Pilates e Fisioterapia',
  yearsExperience: 9,
  addressLine: 'Rua Beijamin Constant, 287',
  neighborhood: 'Rosário',
  cityState: 'Formiga – MG',
  fullAddress: 'Rua Beijamin Constant, 287 — Rosário, Formiga – MG',
  mapsSearchQuery: 'Rua Benjamin Constant, 287, Rosário, Formiga - MG, Brasil',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Rua+Benjamin+Constant,+287,+Rosario,+Formiga+-+MG',
  instagramUrl: 'https://www.instagram.com/fisiolifeclinicaa_/',
  instagramHandle: '@fisiolifeclinicaa_',
  // Número exatamente como informado para referência; não adicionar dígitos por conta própria.
  referenceWhatsAppDisplay: '(37) 9994-1568',
  // Preencher apenas após confirmação de que o número está ativo no WhatsApp (ex: '55379XXXXXXXX').
  confirmedWhatsAppNumber: '',
} as const;

export const CLINIC_IMAGES = {
  hero: '/src/assets/images/hero_fisio_life_1795018943551.jpg',
  about: '/src/assets/images/about_fisio_care_1795018944206.jpg',
  pilates: '/src/assets/images/specialty_pilates_1795018944126.jpg',
  ortopedica: '/src/assets/images/specialty_ortopedica_1795018944360.jpg',
  cardiopulmonar: '/src/assets/images/specialty_cardiopulmonar_1795018945343.jpg',
  detail: '/src/assets/images/gallery_studio_detail_1795018945238.jpg',
} as const;

export const SPECIALTIES: SpecialtyItem[] = [
  {
    id: 'pilates-clinico',
    title: 'Pilates Clínico',
    kicker: '01 · Movimento e controle corporal',
    description:
      'Prática orientada e individualizada, voltada ao movimento consciente, controle corporal e condicionamento físico, respeitando o ritmo e as necessidades de cada pessoa.',
    ctaLabel: 'Agendar Pilates Clínico',
    imageSrc: CLINIC_IMAGES.pilates,
    imageAlt:
      'Imagem conceitual de equipamentos de Pilates Clínico em ambiente claro e acolhedor',
  },
  {
    id: 'fisioterapia-ortopedica',
    title: 'Fisioterapia Ortopédica',
    kicker: '02 · Mobilidade e recuperação funcional',
    description:
      'Atendimento fisioterapêutico dedicado às condições musculoesqueléticas, mobilidade articular e recuperação funcional, com atenção próxima em sessões individuais.',
    ctaLabel: 'Agendar Fisioterapia Ortopédica',
    imageSrc: CLINIC_IMAGES.ortopedica,
    imageAlt:
      'Imagem conceitual de atendimento individual de Fisioterapia Ortopédica',
  },
  {
    id: 'fisioterapia-cardiopulmonar',
    title: 'Fisioterapia Cardiopulmonar',
    kicker: '03 · Função respiratória e bem-estar',
    description:
      'Cuidados fisioterapêuticos voltados à função respiratória e cardiopulmonar, conduzidos de forma individualizada conforme avaliação e indicação profissional.',
    ctaLabel: 'Agendar Fisioterapia Cardiopulmonar',
    imageSrc: CLINIC_IMAGES.cardiopulmonar,
    imageAlt:
      'Imagem conceitual de sessão assistida de Fisioterapia Cardiopulmonar',
  },
];

export const DIFFERENTIALS = [
  {
    index: '01',
    title: '9 anos de atuação',
    description: 'Uma trajetória dedicada ao cuidado e ao movimento.',
  },
  {
    index: '02',
    title: 'Sessões individuais',
    description: 'Atenção personalizada às necessidades de cada paciente.',
  },
  {
    index: '03',
    title: 'Cuidado e excelência',
    description: 'Compromisso com a qualidade do atendimento fisioterapêutico.',
  },
] as const;

export const PREFERRED_TIME_OPTIONS = [
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
] as const;

export function formatDateToBrazilian(isoDate: string): string {
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
}

export function getTodayIsoLocal(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function buildWhatsAppSchedulingMessage(params: {
  patientName: string;
  serviceName: string;
  dateIso: string;
  time24h: string;
}): string {
  const formattedDate = formatDateToBrazilian(params.dateIso);
  const cleanName = params.patientName.trim();

  return [
    'Olá, Fisio Life! 🦋✨',
    '',
    `Gostaria de solicitar um agendamento para ${params.serviceName}.`,
    '',
    `👤 Nome: ${cleanName}`,
    '',
    `🩺 Serviço: ${params.serviceName}`,
    '',
    `📅 Data desejada: ${formattedDate}`,
    '',
    `🕒 Horário desejado: ${params.time24h}`,
    '',
    'Poderiam confirmar se há disponibilidade para essa data e horário?',
    '',
    'Agradeço desde já!',
  ].join('\n');
}

export function buildWhatsAppUrl(
  confirmedDigits: string,
  message: string
): string | null {
  const normalized = confirmedDigits.replace(/\D/g, '');
  if (normalized.length < 10) return null;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
