import React, {useState} from 'react';
import {Menu, X} from 'lucide-react';
import {ButterflyMark} from './ButterflyMark';

interface HeaderProps {
  onOpenBooking: () => void;
}

const NAV_LINKS = [
  {label: 'Início', href: '#inicio'},
  {label: 'Sobre nós', href: '#sobre'},
  {label: 'Especialidades', href: '#especialidades'},
  {label: 'Localização', href: '#localizacao'},
  {label: 'Contato', href: '#contato'},
] as const;

export const Header: React.FC<HeaderProps> = ({onOpenBooking}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#D8EEF3] bg-white/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand wordmark (single line, clean) */}
        <a
          href="#inicio"
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#127682] rounded-md"
        >
          <ButterflyMark size={32} />
          <span className="font-display text-2xl font-semibold tracking-tight text-[#16323B]">
            Fisio Life
          </span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4A6570]"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#E8A4BE] hover:text-[#16323B] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#127682]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action + mobile menu button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenBooking}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#127682] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0F616B] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#127682]"
          >
            Agendar atendimento
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex md:hidden h-11 w-11 items-center justify-center rounded-lg text-[#16323B] hover:bg-[#FBE9EF] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#127682]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[#D8EEF3] bg-white px-4 py-4 md:hidden"
        >
          <nav aria-label="Menu móvel" className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-[#16323B] hover:bg-[#FBE9EF]/60 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="mt-2 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#127682] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0F616B] transition-colors cursor-pointer"
            >
              Agendar atendimento
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
