import React, {useEffect} from 'react';
import {X, ShieldCheck} from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#16323B]/45 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-[#D8EEF3] max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#D8EEF3] pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FBE9EF] text-[#127682]">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2
                id="privacy-modal-title"
                className="font-display text-2xl font-semibold text-[#16323B]"
              >
                Política de Privacidade
              </h2>
              <p className="text-xs text-[#4A6570]">
                Fisio Life — Pilates e Fisioterapia · Formiga – MG
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar política de privacidade"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#4A6570] hover:bg-[#FBE9EF] hover:text-[#16323B] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#4A6570]">
          <section>
            <h3 className="font-sans text-sm font-semibold text-[#16323B]">
              1. Finalidade dos dados no pré-agendamento
            </h3>
            <p className="mt-1">
              O formulário de pré-agendamento solicita apenas informações básicas
              necessárias para o contato inicial: seu nome completo, serviço de
              interesse, data desejada e preferência de horário. Não solicitamos
              dados médicos sensíveis, diagnósticos ou documentos pelo site.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-sm font-semibold text-[#16323B]">
              2. Tratamento e não armazenamento desnecessário
            </h3>
            <p className="mt-1">
              As informações preenchidas são processadas exclusivamente no seu
              navegador para gerar a mensagem personalizada de solicitação de
              agendamento. Este site não armazena seus dados pessoais em banco de
              dados nem os compartilha com terceiros para fins comerciais.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-sm font-semibold text-[#16323B]">
              3. Comunicação via WhatsApp e redes sociais
            </h3>
            <p className="mt-1">
              Ao optar por enviar a solicitação pelo WhatsApp ou acessar nosso
              perfil oficial no Instagram, a comunicação passa a ocorrer nessas
              plataformas, sujeitas às respectivas políticas de privacidade e
              termos de uso. A confirmação efetiva de dia e horário depende do
              retorno direto da equipe da clínica.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-sm font-semibold text-[#16323B]">
              4. Mapa interativo (Google Maps Platform)
            </h3>
            <p className="mt-1">
              A seção de localização integra recursos do Google Maps Platform
              para exibir o endereço da clínica e facilitar o traçado de rotas.
              O uso desse recurso está sujeito aos{' '}
              <a
                href="https://maps.google.com/help/terms_maps/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#127682] hover:text-[#16323B]"
              >
                Termos de Serviço Adicionais do Google Maps
              </a>{' '}
              e à{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[#127682] hover:text-[#16323B]"
              >
                Política de Privacidade do Google
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-6 flex justify-end border-t border-[#D8EEF3] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#127682] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0F616B] transition-colors cursor-pointer whitespace-nowrap"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};
