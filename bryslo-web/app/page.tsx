"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Zap,
  Code2,
  ShieldCheck,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  PenTool,
  Rocket,
} from "lucide-react";

// --- DATA ---
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  gallery: string[];
  liveUrl: string;
}

const PROJECTS: Project[] = [
  {
    id: "apex-automation",
    title: "Apex Automation – Robotické systémy",
    category: "Automatizace",
    description: "Futuristická dark-mode one-page prezentace pro dodavatele průmyslových a robotických technologií. Zaměřeno na bleskovou rychlost načtení, moderní vizuál a čistý kód.",
    tags: ["One-Page", "Tech Dark UI", "Živá ukázka"],
    image: "/Apex2.png",
    gallery: ["/Apex2.png"],
    liveUrl: "https://tomileo.github.io/Apex-Automations/",
  },
];

const COUNTRY_CODES = [
  { code: "+420", label: "CZ", flag: "🇨🇿" },
  { code: "+421", label: "SK", flag: "🇸🇰" },
  { code: "+49", label: "DE", flag: "🇩🇪" },
  { code: "+43", label: "AT", flag: "🇦🇹" },
  { code: "+48", label: "PL", flag: "🇵🇱" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);

  // Phone custom selector
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  // ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalProject(null);
        setCountryDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openModal = (proj: Project) => {
    setActiveModalProject(proj);
    setSelectedGalleryIdx(0);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const phone = formData.get("phone");
    formData.set("phone", `${selectedCountry.code} ${phone}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result: { success: boolean; message?: string } = await response.json();

      if (!response.ok || !result.success) {
        setFormError(result.message || "Poptávku se nepodařilo odeslat. Zkuste to prosím znovu.");
        return;
      }

      form.reset();
      setSelectedCountry(COUNTRY_CODES[0]);
      setFormSubmitted(true);
    } catch {
      setFormError("Při odesílání došlo k chybě. Zkontrolujte připojení a zkuste to znovu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-[#e11d48] selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* BACKGROUND AMBIENT GLOWS */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-[#e11d48]/10 blur-[130px]" />
        <div className="absolute top-[35%] right-[-10%] h-[450px] w-[550px] rounded-full bg-[#dc2626]/8 blur-[150px]" />
        <div className="absolute bottom-[20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#e11d48]/8 blur-[160px]" />
      </div>

      {/* --- NAVBAR --- */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#27272a]/60 bg-[#09090b]/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
          {/* Logo */}
          <a href="#" className="group flex items-center gap-1.5 text-2xl font-bold tracking-tight text-white">
            <span className="transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_12px_rgba(225,29,72,0.8)]">Bryslo</span>
            <span className="h-2 w-2 rounded-full bg-[#e11d48] transition-transform duration-300 group-hover:scale-125 animate-pulse" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-base lg:text-lg font-medium text-[#a1a1aa]">
            <a href="#vyhody" className="transition-colors hover:text-white">Výhody</a>
            <a href="#jak-pracujeme" className="transition-colors hover:text-white">Jak pracujeme</a>
            <a href="#portfolio" className="transition-colors hover:text-white">Portfolio</a>
            <a href="#kontakt" className="transition-colors hover:text-white">Kontakty</a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#kontakt"
              className="relative inline-flex items-center justify-center rounded-xl bg-[#be123c] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#e11d48]/20 transition-all duration-300 hover:bg-[#9f1239] hover:shadow-xl hover:shadow-[#e11d48]/30 active:scale-95"
            >
              Nezávazná poptávka
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#a1a1aa] hover:text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="border-b border-[#27272a] bg-[#09090b]/95 px-6 py-6 md:hidden">
            <div className="flex flex-col gap-4 text-base font-medium text-[#a1a1aa]">
              <a href="#vyhody" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Výhody</a>
              <a href="#jak-pracujeme" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Jak pracujeme</a>
              <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Portfolio</a>
              <a href="#kontakt" onClick={() => setMobileMenuOpen(false)} className="hover:text-white">Kontakty</a>
              <a
                href="#kontakt"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center rounded-xl bg-[#be123c] py-3 font-semibold text-white hover:bg-[#9f1239]"
              >
                Poptat web
              </a>
            </div>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-36 pb-20 sm:pt-44 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#27272a] bg-[#18181b]/70 px-4 py-1.5 text-xs sm:text-sm font-medium text-[#e4e4e7] backdrop-blur-md mb-8">
            <Sparkles className="h-4 w-4 text-[#e11d48]" />
            <span>Moderní weby na míru pro lokální firmy</span>
          </div>

          {/* Main Headline */}
          <h1 className="mx-auto max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            Stavíme rychlé weby, které vám přivedou{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e11d48] to-[#fb7185]">
              reálné zákazníky
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-[#a1a1aa] leading-relaxed">
            Jednostránkové weby optimalizované pro mobily a okamžité volání. Žádné zdlouhavé agenturní procesy ani pomalý WordPress – hotovo na klíč do 7 až 14 dnů.
          </p>

          {/* CTA Group */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#kontakt"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#be123c] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#e11d48]/25 transition-all duration-300 hover:bg-[#9f1239] hover:shadow-2xl hover:shadow-[#e11d48]/35 active:scale-95"
            >
              <span>Chci nezávazný návrh</span>
              <ArrowRight size={18} />
            </a>
            <a
              href="#portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-[#27272a] bg-[#18181b]/50 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#3f3f46] hover:bg-[#18181b] active:scale-95"
            >
              Prohlédnout ukázky
            </a>
          </div>

          {/* Proof / Stat Bar */}
          <div className="mx-auto mt-16 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 sm:mt-24 sm:gap-6">
            {[
              { title: "Blesková rychlost na mobilu", desc: "Načtení do 1 vteřiny" },
              { title: "100% vlastnictví", desc: "Žádné vazby na předplatné" },
              { title: "Spuštění do 14 dnů", desc: "Od zadání po živou doménu" },
            ].map((stat, i) => (
              <div key={i} className="h-full flex flex-col rounded-xl border border-[#27272a] bg-[#121215]/60 p-4 text-left backdrop-blur-sm sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="font-semibold text-white text-sm sm:text-base">{stat.title}</span>
                    <p className="mt-1 text-xs text-[#71717a]">{stat.desc}</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#e11d48]" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- FEATURES / PROČ MY --- */}
      <section id="vyhody" className="relative z-10 py-24 border-t border-[#27272a]/60 bg-[#0c0c0e]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs uppercase tracking-widest text-[#e11d48] font-bold">Proč zvolit Bryslo</h2>
            <p className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Web, který funguje jako váš nejlepší obchodník
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 */}
            <div className="group rounded-2xl border border-[#27272a] bg-[#121215] p-8 transition-all duration-300 hover:border-[#e11d48]/50 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e11d48]/10 text-[#e11d48] group-hover:bg-[#e11d48] group-hover:text-white transition-colors">
                <Zap size={24} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">Bleskový výkon na mobilu</h3>
              <p className="mt-3 text-[#a1a1aa] text-sm leading-relaxed">
                Zákazníci z mobilu nečekají. Váš web naběhne okamžitě a rovnou jim nabídne jedno velké tlačítko pro přímé vytočení čísla nebo otevření navigace k vám na dílnu.
              </p>
              <div className="mt-6 inline-flex text-xs font-semibold text-[#e11d48] bg-[#e11d48]/10 px-3 py-1 rounded-full">
                Index rychlosti 99+
              </div>
            </div>

            {/* Card 2 */}
            <div className="group rounded-2xl border border-[#27272a] bg-[#121215] p-8 transition-all duration-300 hover:border-[#e11d48]/50 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e11d48]/10 text-[#e11d48] group-hover:bg-[#e11d48] group-hover:text-white transition-colors">
                <Code2 size={24} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">Moderní kód bez šablon</h3>
              <p className="mt-3 text-[#a1a1aa] text-sm leading-relaxed">
                Žádný zabugovaný a nafouknutý WordPress s 30 pluginy, které se každý měsíc lámou. Stavíme na čistém a moderním Next.js kódu, který se vám nikdy nerozbije.
              </p>
              <div className="mt-6 inline-flex text-xs font-semibold text-[#e11d48] bg-[#e11d48]/10 px-3 py-1 rounded-full">
                0% zranitelností šablon
              </div>
            </div>

            {/* Card 3 */}
            <div className="group rounded-2xl border border-[#27272a] bg-[#121215] p-8 transition-all duration-300 hover:border-[#e11d48]/50 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e11d48]/10 text-[#e11d48] group-hover:bg-[#e11d48] group-hover:text-white transition-colors">
                <ShieldCheck size={24} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">Férová cena bez poplatků</h3>
              <p className="mt-3 text-[#a1a1aa] text-sm leading-relaxed">
                Platíte pouze jednou za hotový funkční web na klíč. Neuvazujeme vás do drahých měsíčních licencí ani skrytých poplatků za údržbu. Web je 100% váš.
              </p>
              <div className="mt-6 inline-flex text-xs font-semibold text-[#e11d48] bg-[#e11d48]/10 px-3 py-1 rounded-full">
                Jasná fixní cena
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROCESS / JAK PRACUJEME --- */}
      <section id="jak-pracujeme" className="relative z-10 py-24 border-t border-[#27272a]/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs uppercase tracking-widest text-[#e11d48] font-bold">Transparentní proces</h2>
            <p className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Váš nový web bez stresu a složitého vysvětlování
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                num: "01",
                icon: MessageSquare,
                title: "Grafický koncept zdarma",
                desc: "Zavoláme si na 15 minut, zjistíme, co potřebujete, a připravíme vám hrubý grafický návrh. Přesně vidíte výsledek předem a bez rizika.",
              },
              {
                num: "02",
                icon: PenTool,
                title: "Rychlý vývoj na míru",
                desc: "Jakmile si odsouhlasíme koncept, web napíšeme a zoptimalizujeme pro telefony, rychlost i vyhledávače. Všechno odbavíme během pár dnů.",
              },
              {
                num: "03",
                icon: Rocket,
                title: "Spuštění do 14 dnů",
                desc: "Napojíme vaši doménu, nastavíme formuláře a telefonní čísla na váš mobil. Web je živý a připravený přijímat zakázky od nových zákazníků.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="group relative cursor-pointer rounded-2xl border border-[#27272a] bg-[#121215]/80 p-8 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[#e11d48]/50 hover:bg-[#18181b] hover:shadow-xl hover:shadow-[#e11d48]/10"
              >
                {/* Ghost Number in background */}
                <div className="absolute top-2 right-4 text-7xl font-extrabold text-[#27272a]/30 pointer-events-none select-none">
                  {step.num}
                </div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#e11d48]/10 text-[#e11d48] transition-colors group-hover:bg-[#e11d48] group-hover:text-white">
                  <step.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white relative z-10">{step.title}</h3>
                <p className="mt-3 text-sm text-[#a1a1aa] leading-relaxed relative z-10">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#27272a] bg-[#18181b] px-4 py-1.5 text-xs text-[#a1a1aa]">
              <Clock size={14} className="text-[#e11d48]" />
              Průměrná doba dodání kompletního webu: <strong className="text-white">7 až 14 dnů</strong>
            </span>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO / UKÁZKY PRÁCE --- */}
      <section id="portfolio" className="relative z-10 py-24 border-t border-[#27272a]/60 bg-[#0c0c0e]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs uppercase tracking-widest text-[#e11d48] font-bold">Portfolio</h2>
            <p className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Ukázky hotových webů
            </p>
            <p className="mt-3 text-sm text-[#a1a1aa]">
              Klikněte na libovolný projekt pro otevření detailního náhledu a více fotografií.
            </p>
          </div>

          {/* Two visible by default, all when expanded */}
          <div className="mt-16 flex flex-wrap justify-center gap-8">
            {(showAllProjects ? PROJECTS : PROJECTS.slice(0, 2)).map((proj) => (
              <div
                key={proj.id}
                onClick={() => openModal(proj)}
                className="group w-full max-w-lg cursor-pointer overflow-hidden rounded-2xl border border-[#27272a] bg-[#121215] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#e11d48]/60 shadow-lg md:w-[calc(50%-1rem)]"
              >
                {/* Project Image */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent opacity-80" />
                </div>

                {/* Card Info */}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {proj.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="rounded-md border border-[#27272a] bg-[#18181b] px-2.5 py-1 text-xs text-[#a1a1aa]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#e11d48] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#a1a1aa] line-clamp-2">
                    {proj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {PROJECTS.length > 2 && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#27272a] bg-[#18181b] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#3f3f46] hover:bg-[#27272a] active:scale-95"
              >
                <span>{showAllProjects ? "Skrýt další ukázky" : "Zobrazit více ukázek"}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${showAllProjects ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* --- LIGHTBOX MODAL --- */}
      {activeModalProject && (
        <div
          onClick={() => setActiveModalProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border border-[#27272a] bg-[#121215] shadow-2xl p-4 sm:p-6"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-3 right-3 rounded-xl bg-[#27272a]/50 p-2.5 text-[#a1a1aa] transition-colors hover:bg-[#3f3f46] hover:text-white sm:p-3"
            >
              <X size={26} />
            </button>

            {/* Modal Content */}
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="rounded-md bg-[#e11d48]/10 text-[#e11d48] text-xs font-semibold px-2.5 py-1">
                {activeModalProject.category}
              </span>
            </div>
            <h2 className="pr-12 text-2xl sm:text-3xl font-bold text-white">{activeModalProject.title}</h2>
            <p className="mt-2 text-sm sm:text-base text-[#a1a1aa]">{activeModalProject.description}</p>

            {/* Main Featured Image in Modal */}
            <div className="relative mt-4 aspect-[16/9] max-h-[55dvh] w-full overflow-hidden rounded-xl border border-[#27272a] bg-black">
              <Image
                src={activeModalProject.gallery[selectedGalleryIdx]}
                alt="Detail náhledu"
                fill
                className="object-contain"
              />
            </div>

            {/* Thumbnail Switcher */}
            {activeModalProject.gallery.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {activeModalProject.gallery.map((img, gIdx) => (
                  <button
                    key={gIdx}
                    onClick={() => setSelectedGalleryIdx(gIdx)}
                    className={`relative h-16 w-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedGalleryIdx === gIdx ? "border-[#e11d48] scale-105" : "border-[#27272a] opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Modal Footer / Action */}
            <div className="mt-6 pt-6 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {activeModalProject.tags.map((t, idx) => (
                  <span key={idx} className="rounded-md border border-[#27272a] bg-[#18181b] px-2.5 py-1 text-xs text-[#a1a1aa]">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={activeModalProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#be123c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#9f1239] transition-colors"
              >
                <span>Otevřít aktivní web</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* --- CONTACT SECTION --- */}
      <section id="kontakt" className="relative z-10 py-24 border-t border-[#27272a]/60">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="text-xs uppercase tracking-widest text-[#e11d48] font-bold">Nezávazná poptávka</h2>
                <h3 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Pojďme posunout váš byznys na další úroveň
                </h3>
                <p className="mt-4 text-base text-[#a1a1aa] leading-relaxed">
                  Vyplňte krátký formulář nebo nám přímo zavolejte. Do 24 hodin se vám ozveme zpět s konkrétním návrhem a cenovou nabídkou bez jakýchkoli závazků.
                </p>

                <div className="mt-8 space-y-5">
                  <div className="flex items-center gap-4 text-[#d4d4d8]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#27272a] bg-[#18181b] text-[#e11d48]">
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className="block text-xs text-[#71717a]">Přímá telefonní linka</span>
                      <a href="tel:+420608231057" className="font-semibold text-white hover:text-[#e11d48] transition-colors">
                        +420 608 231 057
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[#d4d4d8]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#27272a] bg-[#18181b] text-[#e11d48]">
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className="block text-xs text-[#71717a]">Napište nám e-mail</span>
                      <a href="mailto:bryslo.web@gmail.com" className="font-semibold text-white hover:text-[#e11d48] transition-colors">
                        bryslo.web@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[#d4d4d8]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#27272a] bg-[#18181b] text-[#e11d48]">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className="block text-xs text-[#71717a]">Lokalita</span>
                      <span className="font-semibold text-white">Zlínský kraj & celá ČR online</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 24h Response Box */}
              <div className="mt-8 rounded-xl border border-[#27272a] bg-[#18181b]/50 p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#e11d48]" />
                  <p className="text-xs text-[#a1a1aa]">
                    Garantujeme odpověď a kalkulaci <strong className="text-white">do 24 hodin</strong> od odeslání.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#27272a] bg-[#121215] p-8 sm:p-10 shadow-2xl">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#22c55e]/10 text-[#22c55e]">
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 className="text-2xl font-bold text-white">Poptávka byla úspěšně odeslána!</h4>
                    <p className="text-sm text-[#a1a1aa] max-w-md mx-auto">
                      Děkujeme za váš zájem. Vaši poptávku zpracujeme a ozveme se vám do 24 hodin na uvedený telefon či e-mail.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <input type="hidden" name="access_key" value="00e07a8f-0d3b-4fa6-a47f-474325c64751" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="min-w-0">
                        <label className="block text-xs font-medium text-[#a1a1aa] mb-2">
                          Jméno a příjmení *
                        </label>
                        <input
                          required
                          name="name"
                          type="text"
                          placeholder="Jan Novák"
                          className="w-full rounded-xl border border-[#27272a] bg-[#18181b] px-4 py-3 text-sm text-white placeholder-[#71717a] focus:border-[#e11d48] focus:outline-none focus:ring-1 focus:ring-[#e11d48]"
                        />
                      </div>

                      <div className="min-w-0">
                        <label className="block text-xs font-medium text-[#a1a1aa] mb-2">
                          E-mail *
                        </label>
                        <input
                          required
                          name="email"
                          type="email"
                          placeholder="jan@email.cz"
                          className="w-full rounded-xl border border-[#27272a] bg-[#18181b] px-4 py-3 text-sm text-white placeholder-[#71717a] focus:border-[#e11d48] focus:outline-none focus:ring-1 focus:ring-[#e11d48]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#a1a1aa] mb-2">
                        Název firmy / Obor *
                      </label>
                      <input
                        required
                        name="company"
                        type="text"
                        placeholder="Autoservis Novák s.r.o."
                        className="w-full rounded-xl border border-[#27272a] bg-[#18181b] px-4 py-3 text-sm text-white placeholder-[#71717a] focus:border-[#e11d48] focus:outline-none focus:ring-1 focus:ring-[#e11d48]"
                      />
                    </div>

                    {/* Phone with Custom Country Selector */}
                    <div>
                      <label className="block text-xs font-medium text-[#a1a1aa] mb-2">
                        Telefonní číslo *
                      </label>
                      <div className="flex w-full min-w-0 gap-2">
                        {/* Selector */}
                        <div className="relative shrink-0">
                          <button
                            type="button"
                            onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                            className="flex h-full items-center gap-1.5 rounded-xl border border-[#27272a] bg-[#18181b] px-3.5 py-3 text-sm text-white hover:border-[#3f3f46] focus:outline-none"
                          >
                            <span>{selectedCountry.flag}</span>
                            <span className="font-mono text-xs">{selectedCountry.code}</span>
                            <ChevronDown size={14} className="text-[#71717a]" />
                          </button>

                          {countryDropdownOpen && (
                            <div className="absolute top-full left-0 z-20 mt-1 w-32 rounded-xl border border-[#27272a] bg-[#18181b] p-1 shadow-xl">
                              {COUNTRY_CODES.map((c) => (
                                <button
                                  key={c.code}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(c);
                                    setCountryDropdownOpen(false);
                                  }}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-white hover:bg-[#27272a]"
                                >
                                  <span>{c.flag}</span>
                                  <span>{c.code}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Input */}
                        <input
                          required
                          name="phone"
                          type="tel"
                          placeholder="777 123 456"
                          className="box-border w-full min-w-0 max-w-full flex-1 rounded-xl border border-[#27272a] bg-[#18181b] px-4 py-3 text-sm text-white placeholder-[#71717a] focus:border-[#e11d48] focus:outline-none focus:ring-1 focus:ring-[#e11d48]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#a1a1aa] mb-2">
                        O jaký web máte zájem / poznámka
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Potřebujeme nový jednostránkový web pro naši autodílnu s přehledem služeb a okamžitým voláním..."
                        className="w-full rounded-xl border border-[#27272a] bg-[#18181b] px-4 py-3 text-sm text-white placeholder-[#71717a] focus:border-[#e11d48] focus:outline-none focus:ring-1 focus:ring-[#e11d48]"
                      />
                    </div>

                    {formError && (
                      <p role="alert" className="text-sm text-red-400">
                        {formError}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-[#be123c] py-4 text-sm font-bold text-white shadow-xl shadow-[#e11d48]/25 transition-all duration-300 hover:bg-[#9f1239] hover:shadow-2xl hover:shadow-[#e11d48]/35 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? "Odesílám..." : "Odeslat nezávaznou poptávku"}
                    </button>
                    <p className="text-center text-xs text-[#71717a]">
                      Odesláním formuláře souhlasíte se zpracováním osobních údajů pro vyřízení poptávky.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-[#27272a]/60 bg-[#09090b]">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 py-8 text-center">
          <p className="text-base font-medium text-white">Bryslo | Rychlé weby pro lokální byznys</p>
          <p className="text-sm text-[#a1a1aa]">© 2026 Bryslo.cz. Všechna práva vyhrazena.</p>
        </div>
      </footer>

    </div>
  );
}