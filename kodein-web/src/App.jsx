import { useState, useEffect, useRef} from 'react';
import PatternWaves from './PatternWaves';
import HoloCard from './holoCard';
import portofolio1 from "./assets/kayuArdana.jpg"
import techText from './techText'

function useContainerWidth(max = 430) {
  const ref = useRef(null);
  const [width, setWidth] = useState(max);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.min(max, Math.floor(entry.contentRect.width)));
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [max]);

  return [ref, width];
}

export default function App() {
  const [cardRef, cardWidth] = useContainerWidth(430);

  // 1. State untuk Navigasi Mobile
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 2. State untuk Tab Telemetry di Hero (Preview, UI, Logic, Infra)
  const [activeTab, setActiveTab] = useState('preview');

  // 3. State untuk Interactive Audit Tool (Kodein vs Cheap Template)
  const [compareMode, setCompareMode] = useState('kodein');

  // 4. State untuk Accordion portofolio1 Karya (Default buka project 1)
  const [expandedProject, setExpandedProject] = useState(1);

  // 5. State untuk Filter Deliverables di bagian Investasi
  const [activeScope, setActiveScope] = useState('all');

  // Fungsi toggle untuk accordion project
  const toggleProject = (id) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  // Helper untuk mengecek apakah item deliverable cocok dengan filter aktif
  const isScopeVisible = (cats) => {
    if (activeScope === 'all') return true;
    return cats.split(',').includes(activeScope);
  };

  // Effect untuk Scroll Reveal Animation & Mouse Radial Glow pada Bento/Tier Card
  useEffect(() => {
    // Intersection Observer untuk animasi masuk (.reveal)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active', 'opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    // Efek sorotan kursor mouse pada kartu (.bento-card & .tier-card)
    const cards = document.querySelectorAll('.bento-card, .tier-card');
    const handleMouseMove = (e) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="antialiased selection:bg-accent/30 selection:text-white bg-midnight text-white min-h-screen">
      
      <nav id="navbar" className="fixed flex justify-between px-6 h-16 items-center w-full z-50 backdrop-blur-md bg-midnight/80 hairline-b transition-all duration-300">

            <a href="#">
              <img src="src/assets/KodeinLogo-04 (1).png" alt="logo kodein" className="w-10 h-auto object-contain" />
            </a>

          {/* Center: Minimalist Links */}
          <div className="nav-center hidden md:flex items-center gap-8">
            <a href="#arsitektur" className="nav-link font-body text-sm text-slate hover:text-white transition-colors">Arsitektur</a>
            <a href="#kapabilitas" className="nav-link font-body text-sm text-slate hover:text-white transition-colors">Kapabilitas</a>
            <a href="#karya" className="nav-link font-body text-sm text-slate hover:text-white transition-colors">Karya Terpilih</a>
            <a href="#investasi" className="nav-link font-body text-sm text-slate hover:text-white transition-colors">Investasi</a>
            <a href="#proses" className="nav-link font-body text-sm text-slate hover:text-white transition-colors">Protokol</a>
          </div>

          {/* Right: High-Contrast CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a href="#investasi" className="group hidden sm:flex items-center gap-2 cta-primary px-8 py-2 rounded-md text-sm font-display font-semibold tracking-tight text-white">
              Konsultasi Eksekutif <span className="cta-arrow">→</span>
            </a>
            <button 
              id="mobile-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer" 
              aria-label="Toggle Navigation Menu"
            >
              <span className={`block w-5 h-px bg-white/70 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-5 h-px bg-white/70 transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-3 h-px bg-white/70 transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1 w-5' : ''}`}></span>
            </button>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="mobile-menu md:hidden absolute top-full left-0 right-0 bg-midnight/95 backdrop-blur-xl hairline-b">
            <div className="px-6 py-6 flex flex-col gap-4">
              <a href="#arsitektur" className="font-body text-sm text-slate hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Arsitektur</a>
              <a href="#kapabilitas" className="font-body text-sm text-slate hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Kapabilitas</a>
              <a href="#karya" className="font-body text-sm text-slate hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Karya Terpilih</a>
              <a href="#investasi" className="font-body text-sm text-slate hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Investasi &amp; Spesifikasi</a>
              <a href="#proses" className="font-body text-sm text-slate hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>Protokol Eksekusi</a>
              <a href="#investasi" className="cta-primary px-5 py-2.5 rounded-md text-sm font-display font-semibold tracking-tight text-center text-white mt-2" onClick={() => setMobileMenuOpen(false)}>Konsultasi Eksekutif</a>
            </div>
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════════ */}
      {/* HERO SECTION: ASYMMETRIC ARCHITECTURAL HERO */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="arsitektur" className="min-h-dvh h-auto px-4 py-24 flex items-center justify-center relative overflow-hidden">
        
        {/* Layer 1: Background PatternWaves dari React Bits */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <PatternWaves
            preset="silk"
            color="#027cb8"
            backgroundColor="#000724"
            fade="edges"
            interactive={true}
            cursorSize={50}
            cursorStrength={0.6}
            pattern="dot"
            wave="silk"
            spacing={9}
            markSize={0.95}
            depth={0.95}
            light={0}
            shine={0.8}
            contrast={1.2}
            speed={0.35}
            scale={1}
            direction={20}
            opacity={0.65}
            fadeSize={0.5}
            characters=".:-=+*#%@"
            intro
            paused={false}
          />
        </div>

        {/* Layer 2: Ambient Light Accent at 12% Opacity */}
        <div 
          className="absolute top-0 right-1/4 w-150 h-150 rounded-full pointer-events-none opacity-[0.12] z-0" 
          style={{ background: 'radial-gradient(circle, #027cb8, transparent 70%)' }}
        ></div>

        {/* Layer 3: Main Hero Content */}
        <div className="max-w-350 mx-auto px-6 relative z-10">
          <div className="hero-grid grid grid-cols-1 lg:grid-cols-12 gap-0 items-start">
            
            {/* Left Column (7 Cols on desktop): Typography & High-Impact Copy */}
            <div className="lg:col-span-7 pr-0 lg:pr-12 lg:hairline-r py-4">
              <div className="reveal">
                <span className="font-mono text-[11px] text-accent tracking-[0.2em] uppercase">ENTERPRISE WEB ENGINEERING — EST. 2026</span>
              </div>

              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight mt-6 reveal" style={{ transitionDelay: '0.08s' }}>
                Kodein ID
              </h1>

              <p className="font-display font-medium text-xl sm:text-2xl text-accent/90 mt-3 tracking-tight reveal" style={{ transitionDelay: '0.14s' }}>
                Turning logic into digital magic.
              </p>

              <p className="font-body text-[15px] text-slate leading-relaxed mt-6 max-w-xl reveal" style={{ transitionDelay: '0.2s' }}>
                Kami membangun arsitektur web yang mengkonversi bukan template generik yang diulang-ulang. Setiap baris kode direkayasa untuk <span className="text-white/90 font-medium">performa sub-detik</span>, <span className="text-white/90 font-medium">keamanan enterprise-grade</span>, dan <span className="text-white/90 font-medium">ROI terukur</span> bagi klien korporasi Indonesia.
              </p>

              {/* Dual Call to Action */}
              <div className="flex flex-wrap items-center gap-4 mt-8 reveal" style={{ transitionDelay: '0.26s' }}>
                <a href="#investasi" className="group cta-primary px-7 py-3 rounded-md font-display font-semibold text-sm tracking-tight text-white flex items-center gap-2">
                  Mulai Konsultasi <span className="cta-arrow">→</span>
                </a>
                <a href="#kapabilitas" className="cta-ghost px-7 py-3 rounded-md font-display font-medium text-sm tracking-tight text-slate hover:text-white">
                  Lihat Spesifikasi Teknis
                </a>
              </div>

              {/* Micro Metrics SLA Bar */}
              <div className="flex items-center gap-6 sm:gap-8 mt-10 pt-6 hairline-t reveal" style={{ transitionDelay: '0.32s' }}>
                <div>
                  <span className="font-mono text-2xl font-medium telemetry-value text-white">47<span className="text-accent">+</span></span>
                  <p className="font-mono text-[10px] text-slate mt-0.5 tracking-wider uppercase">Projects Delivered</p>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div>
                  <span className="font-mono text-2xl font-medium telemetry-value text-white">99.98<span className="text-accent">%</span></span>
                  <p className="font-mono text-[10px] text-slate mt-0.5 tracking-wider uppercase">Uptime SLA</p>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div>
                  <span className="font-mono text-2xl font-medium telemetry-value text-white">&lt;0.4<span className="text-accent">s</span></span>
                  <p className="font-mono text-[10px] text-slate mt-0.5 tracking-wider uppercase">Avg. LCP Paint</p>
                </div>
              </div>
            </div>
     <div className="lg:col-span-5 pl-0 lg:pl-12 mt-8 lg:mt-0">
              <div
                ref={cardRef}
                className="hairline flex flex-col items-center justify-center w-full max-w-120 mx-auto p-4 sm:p-6 bg-surface/40 backdrop-blur-sm"
              >
                <HoloCard
                  image={portofolio1}
                  foilColor="#e2e6ec"
                  intensity={0}
                  edgeSparkle={0}
                  glare={0}
                  scale={1}
                  frame={0}
                  tiltMax={14}
                  hoverScale={1.04}
                  radius={12}
                  width={cardWidth}
                  shadow
                  alt="Contoh portofolio website"
                />
                <a
                  href="#karya"
                  className="font-mono cursor-pointer pt-6 hover:text-shadow-accent hover:text-shadow-sm transition-all duration-100 ease-in-out"
                >
                  See More
                </a>
              </div>
            </div>
        </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* CORPORATE TRUST & ECOSYSTEM SECTOR BAR */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-8 hairline-t hairline-b bg-surface/20">
        <div className="max-w-350 mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <span className="font-mono text-[10px] text-slate/70 tracking-[0.2em] uppercase">BUILT BY SMK TRI RATNA STUDENT</span>
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 font-mono text-xs text-white/60">
              <span className="hover:text-accent transition-colors flex items-center gap-1.5"><span className="w-1 h-1 bg-accent"></span> HTML </span>
              <span className="hover:text-accent transition-colors flex items-center gap-1.5"><span className="w-1 h-1 bg-accent"></span> TAILWIND </span>
              <span className="hover:text-accent transition-colors flex items-center gap-1.5"><span className="w-1 h-1 bg-accent"></span> JAVASCRIPT</span>
              <span className="hover:text-accent transition-colors flex items-center gap-1.5"><span className="w-1 h-1 bg-accent"></span> REACT JS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 01: ASYMMETRIC BENTO GRID (KAPABILITAS) */}
      {/* ═══════════════════════════════════════════════ */}
<section id="kapabilitas" className="py-24 relative">
        <div className="max-w-350 mx-auto px-6">
          
          {/* Section Index Header */}
          <div className="flex items-center gap-4 mb-10 reveal">
            <span className="font-mono text-[11px] text-accent tracking-[0.2em] uppercase">[ 01 // LAYANAN &amp; KEUNGGULAN ]</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <div className="mb-14 reveal" style={{ transitionDelay: '0.06s' }}>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight leading-[1.1]">
              Bukan Hanya Website.<br />
              <span className="text-slate">Ini Identitas Bisnis</span>
              <span className="text-accent"> Anda.</span>
            </h2>
            <p className="font-body text-sm text-slate leading-relaxed mt-4 max-w-xl">
              Calon klien biasanya mengecek website sebelum menghubungi Anda. Kami membangun website yang tampil profesional, cepat dibuka, dan mengarahkan pengunjung untuk meminta penawaran.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="bento-grid grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">

            {/* Card 1 */}
            <div className="bento-card bg-midnight p-8 lg:p-10 reveal" style={{ transitionDelay: '0.08s' }}>
              <div className="radial-glow"></div>
              <span className="font-mono text-[10px] text-accent tracking-[0.15em] uppercase">Desain &amp; Pengembangan</span>
              <h3 className="font-display font-semibold text-xl mt-3 tracking-tight">Desain Khusus Sesuai Brand Perusahaan</h3>
              <p className="font-body text-sm text-slate leading-relaxed mt-3">
                Tampilan dibuat dari nol mengikuti logo, warna, dan karakter bisnis Anda, bukan memakai template yang sama dengan ribuan situs lain. Hasilnya website yang terlihat berbeda dari kompetitor dan konsisten dengan materi perusahaan lainnya.
              </p>

              {/* Daftar hasil kerja */}
              <div className="mt-6 p-4 rounded bg-surface/50 border border-white/10 font-mono text-[11px] space-y-2">
                <div className="flex items-center justify-between text-slate/70 pb-2 border-b border-white/5">
                  <span>YANG ANDA TERIMA</span>
                  <span className="text-accent">Siap Online</span>
                </div>
                <div className="text-slate/90 space-y-1.5">
                  <div><span className="text-emerald-400">✓</span> Desain halaman sesuai identitas brand</div>
                  <div><span className="text-emerald-400">✓</span> Tampil rapi di HP, tablet, dan laptop</div>
                  <div><span className="text-emerald-400">✓</span> Kode bersih, mudah dikembangkan nanti</div>
                  <div><span className="text-emerald-400">✓</span> Dokumentasi untuk tim internal Anda</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                <span className="font-mono text-[10px] text-slate border border-white/10 px-2 py-0.5 rounded-sm">Desain dari Figma</span>
                <span className="font-mono text-[10px] text-slate border border-white/10 px-2 py-0.5 rounded-sm">React JS</span>
                <span className="font-mono text-[10px] text-slate border border-white/10 px-2 py-0.5 rounded-sm">Tailwind CSS</span>
                <span className="font-mono text-[10px] text-slate border border-white/10 px-2 py-0.5 rounded-sm">JavaScript</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bento-card bg-midnight p-8 lg:p-10 reveal" style={{ transitionDelay: '0.14s' }}>
              <div className="radial-glow"></div>
              <span className="font-mono text-[10px] text-accent tracking-[0.15em] uppercase">Hosting &amp; Keamanan</span>
              <h3 className="font-display font-semibold text-xl mt-3 tracking-tight">Server Cepat di Jakarta, Bukan Hosting Murah</h3>
              <p className="font-body text-sm text-slate leading-relaxed mt-3">
                Website berjalan di server SSD NVMe di data center Jakarta, tidak digabung dengan ribuan situs lain. Pengunjung dari Indonesia mendapat halaman yang terbuka cepat, dan sertifikat SSL (gembok HTTPS) sudah termasuk.
              </p>

              <div className="mt-6 preview-image-frame rounded h-32 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80" 
                  alt="Server data center untuk hosting website" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-midnight via-transparent to-midnight/80 p-3 flex items-end justify-between">
                  <span className="font-mono text-[10px] text-white bg-midnight/80 px-2 py-0.5 rounded border border-accent/40">SERVER DI JAKARTA</span>
                  <span className="font-mono text-[10px] text-emerald-400 font-semibold bg-midnight/80 px-2 py-0.5 rounded border border-emerald-500/40">SSL AKTIF</span>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate">Target waktu muat halaman</span>
                  <span className="font-mono text-[11px] text-accent telemetry-value font-medium">Di bawah 1 detik</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bento-card bg-midnight p-8 lg:p-10 reveal" style={{ transitionDelay: '0.20s' }}>
              <div className="radial-glow"></div>
              <span className="font-mono text-[10px] text-accent tracking-[0.15em] uppercase">Strategi &amp; Konten</span>
              <h3 className="font-display font-semibold text-xl mt-3 tracking-tight">Alur Website yang Mengarah ke Penawaran</h3>
              <p className="font-body text-sm text-slate leading-relaxed mt-3">
                Susunan halaman dan isi kontennya dirancang untuk calon klien korporat, termasuk direktur dan manajer pembelian. Mereka bisa memahami layanan Anda, melihat bukti kerja, lalu meminta proposal tanpa harus mencari-cari informasi.
              </p>

              <div className="mt-6 p-4 rounded bg-surface/50 border border-white/10 font-mono text-[11px] space-y-2">
                <div className="flex items-center justify-between text-slate/70 pb-2 border-b border-white/5">
                  <span>PERJALANAN CALON KLIEN</span>
                  <span className="text-emerald-400">3 LANGKAH</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div className="p-2 border border-white/10 rounded bg-midnight/80">
                    <span className="text-slate block">01. KENAL</span>
                    <span className="text-white font-medium">Layanan jelas</span>
                  </div>
                  <div className="p-2 border border-accent/30 rounded bg-midnight/80">
                    <span className="text-accent block">02. PERCAYA</span>
                    <span className="text-white font-medium">portofolio1</span>
                  </div>
                  <div className="p-2 border border-emerald-500/30 rounded bg-midnight/80">
                    <span className="text-emerald-400 block">03. HUBUNGI</span>
                    <span className="text-white font-medium">Minta proposal</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-5">
                <span className="font-mono text-[10px] text-slate border border-white/10 px-2 py-0.5 rounded-sm">Penataan Halaman</span>
                <span className="font-mono text-[10px] text-slate border border-white/10 px-2 py-0.5 rounded-sm">Formulir Permintaan Proposal</span>
                <span className="font-mono text-[10px] text-slate border border-white/10 px-2 py-0.5 rounded-sm">Penulisan Konten</span>
              </div>
            </div>

            {/* Card 4: Interactive Comparison Module */}
            <div className="bento-card bg-midnight p-8 lg:p-10 reveal" style={{ transitionDelay: '0.26s' }}>
              <div className="radial-glow"></div>
              <span className="font-mono text-[10px] text-accent tracking-[0.15em] uppercase">Perbandingan</span>
              <h3 className="font-display font-semibold text-xl mt-3 tracking-tight">Template Siap Pakai vs Buatan Kodein.id</h3>
              <p className="font-body text-sm text-slate leading-relaxed mt-3 mb-4">
                Template memang lebih murah di awal, tetapi biasanya lebih lambat dan sulit dibedakan dari situs lain. Pilih salah satu untuk melihat perbedaannya.
              </p>

              {/* Interactive Comparison Toggle Buttons */}
              <div className="flex items-center gap-0 mb-4 hairline rounded-md overflow-hidden w-fit">
                <button 
                  onClick={() => setCompareMode('cheap')}
                  className={`compare-tab font-mono text-[11px] px-4 py-2 transition-all cursor-pointer ${
                    compareMode === 'cheap' ? 'bg-red-500/20 text-red-300 font-semibold' : 'text-slate hover:text-white'
                  }`}
                >
                  Template Siap Pakai
                </button>
                <button 
                  onClick={() => setCompareMode('kodein')}
                  className={`compare-tab font-mono text-[11px] px-4 py-2 transition-all cursor-pointer ${
                    compareMode === 'kodein' ? 'bg-white/10 text-white border-accent/40 font-semibold' : 'text-slate hover:text-white'
                  }`}
                >
                  Standar Kodein.id
                </button>
              </div>

              {/* Comparison Panel: Kodein */}
              {compareMode === 'kodein' ? (
                <div className="compare-panel space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate">Skor kecepatan Google (Lighthouse)</span>
                    <span className="font-mono text-[11px] text-emerald-400 telemetry-value font-semibold">Target 90+ dari 100</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-[10px] text-slate">Waktu halaman utama muncul</span>
                    <span className="font-mono text-[11px] text-emerald-400 telemetry-value font-semibold">Di bawah 2 detik</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-[10px] text-slate">Ukuran halaman</span>
                    <span className="font-mono text-[11px] text-emerald-400 telemetry-value font-semibold">Ringan, tanpa plugin tambahan</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-[10px] text-slate">Keunikan desain</span>
                    <span className="font-mono text-[11px] text-emerald-400 font-semibold">Dibuat khusus untuk Anda</span>
                  </div>
                </div>
              ) : (
                /* Comparison Panel: Template */
                <div className="compare-panel space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate">Skor kecepatan Google (Lighthouse)</span>
                    <span className="font-mono text-[11px] text-red-400 telemetry-value font-semibold">Umumnya 30–60 dari 100</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-[10px] text-slate">Waktu halaman utama muncul</span>
                    <span className="font-mono text-[11px] text-red-400 telemetry-value font-semibold">Sering 4–6 detik</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-[10px] text-slate">Ukuran halaman</span>
                    <span className="font-mono text-[11px] text-red-400 telemetry-value font-semibold">Berat karena banyak plugin</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-mono text-[10px] text-slate">Keunikan desain</span>
                    <span className="font-mono text-[11px] text-red-400 font-semibold">Mirip situs lain yang pakai template sama</span>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 02: SELECTED WORKS / ARSITEKTUR KARYA */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="karya" className="py-24 relative">
        <div className="max-w-350 mx-auto px-6">
          
          {/* Section Index Header */}
          <div className="flex items-center gap-4 mb-10 reveal">
            <span className="font-mono text-[11px] text-accent tracking-[0.2em] uppercase">[ 02 // KARYA TERPILIH ]</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <div className="mb-14 reveal" style={{ transitionDelay: '0.06s' }}>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight leading-[1.1]">
              Our<br />
              <span className="text-accent">Project</span>
            </h2>
          </div>

          <div className="flex flex-col">
            <a target="_blank" href="https://kayuardana.vercel.app/">
            <img className="pb-5" src={portofolio1}></img>
            </a>
          <div className="pb-5 flex flex-row gap-2">
            <span className="font-mono text-[10px] text-slate border border-white/10 px-2 py-0.5 rounded-sm">HTML</span>
            <span className="font-mono text-[10px] text-slate border border-white/10 px-2 py-0.5 rounded-sm">CSS</span>
            <span className="font-mono text-[10px] text-slate border border-white/10 px-2 py-0.5 rounded-sm">Tailwind</span>
            <span className="font-mono text-[10px] text-slate border border-white/10 px-2 py-0.5 rounded-sm">Vanilla Jasvascript</span>
          </div>
</div>
          {/* Expandable Editorial Project Rows */}
          <div className="space-y-0 hairline-b">

            {/* Project 01 */}
            <div 
              className={`project-row hairline-t cursor-pointer reveal ${expandedProject === 1 ? 'expanded' : ''}`} 
              style={{ transitionDelay: '0.08s' }} 
              onClick={() => toggleProject(1)}
            >
              </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 03: EXECUTIVE INVESTMENT MATRIX */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="investasi" className="py-24 relative">
        <div className="max-w-350 mx-auto px-6">
          
          {/* Section Index Header */}
          <div className="flex items-center gap-4 mb-10 reveal">
            <span className="font-mono text-[11px] text-accent tracking-[0.2em] uppercase">[ 03 // INVESTASI &amp; SPESIFIKASI ]</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <div className="mb-6 reveal" style={{ transitionDelay: '0.06s' }}>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight leading-[1.1]">
              Investasi digital yang terukur.<br />
              <span className="text-slate">Transparansi penuh, spesifikasi akurat, tanpa biaya tersembunyi.</span>
            </h2>
          </div>

          <p className="font-body text-sm text-slate max-w-2xl mb-8 reveal" style={{ transitionDelay: '0.10s' }}>
            Setiap paket dirancang untuk tahap pertumbuhan bisnis yang berbeda. Pilih paket yang sesuai dengan kebutuhan otoritas pasar Anda, atau hubungi kami untuk arsitektur custom.
          </p>

          {/* Interactive Scope Deliverable Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 mb-10 reveal" style={{ transitionDelay: '0.14s' }}>
            <span className="font-mono text-[10px] text-slate tracking-wider uppercase mr-2">Filter Deliverables:</span>
            {[
              { id: 'all', label: 'Semua Deliverable' },
              { id: 'design', label: 'UI/UX Figma' },
              { id: 'dev', label: 'Engineering & Kode' },
              { id: 'infra', label: 'Cloud NVMe' },
              { id: 'seo', label: 'SEO & Optimasi' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveScope(btn.id)}
                className={`scope-btn font-mono text-[11px] px-3.5 py-1.5 rounded-sm hairline transition-all cursor-pointer ${
                  activeScope === btn.id
                    ? 'text-white bg-white/10 border-accent/40 font-medium'
                    : 'text-slate hover:text-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Pricing Tier Grid (3 Structured Cards) */}
          <div className="tier-grid grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/10">

            {/* Tier 1: Executive Showcase */}
            <div className="tier-card bg-midnight p-8 sm:p-10 reveal" style={{ transitionDelay: '0.16s' }}>
              <div className="radial-glow"></div>
              <span className="font-mono text-[10px] text-slate tracking-[0.15em] uppercase">Tier 01 // Emerging Brand</span>
              <h3 className="font-display font-bold text-2xl mt-2 tracking-tight text-white">Executive Showcase</h3>
              <p className="font-body text-[13px] text-slate mt-2 leading-relaxed">
                Untuk emerging corporate brands &amp; profil perusahaan berdampak tinggi yang membutuhkan konversi presisi.
              </p>

              <div className="mt-6 mb-8 pt-4 border-t border-white/5">
                <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-white telemetry-value">Rp 6<span className="text-xl">.000.000</span></span>
                <span className="block font-mono text-[10px] text-slate/80 mt-1">One-time Investment • Hak Milik Penuh</span>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('design,dev') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-slate scope-text">Landing page custom konversi tinggi (hingga 5 seksi arsitektur)</span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('design') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-slate scope-text">Responsive Mobile-First UI (diuji di iOS &amp; Android)</span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('infra') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-slate scope-text">2 GB NVMe Hosting Cepat <span className="font-mono text-[10px] text-accent/80">(Newbie Tier Cloud)</span></span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('infra') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-slate scope-text">Gratis Domain Korporasi (.com / .id) 1 Tahun</span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('infra') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-slate scope-text">Sertifikat Keamanan SSL A+ Rating</span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('seo') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-slate scope-text">Basic Technical SEO &amp; Indexing Google Console</span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('dev') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-slate scope-text">14 Hari Kerja Delivery Timeline</span>
                </div>
              </div>

              <a href="https://wa.me/6281234567890?text=Halo%20Kodein.id,%20saya%20tertarik%20konsultasi%20paket%20Executive%20Showcase" target="_blank" rel="noopener noreferrer" className="block mt-10 text-center cta-ghost px-6 py-3 rounded-md font-display font-medium text-sm tracking-tight text-slate hover:text-white">
                Pilih Paket Executive
              </a>
            </div>

            {/* Tier 2: Corporate Presence */}
            <div className="tier-card bg-midnight p-8 sm:p-10 accent-border accent-glow relative reveal" style={{ transitionDelay: '0.22s' }}>
              <div className="radial-glow"></div>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent"></div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-accent tracking-[0.15em] uppercase font-semibold">Tier 02 // Most Popular</span>
                <span className="font-mono text-[9px] text-white tracking-widest bg-accent/20 border border-accent/40 px-2 py-0.5 rounded-sm font-semibold">MOST SELECTED BY CORPORATE</span>
              </div>

              <h3 className="font-display font-bold text-2xl mt-2 tracking-tight text-white">Corporate Presence</h3>
              <p className="font-body text-[13px] text-slate mt-2 leading-relaxed">
                Untuk perusahaan mapan menengah ke atas yang membutuhkan otoritas pasar komprehensif dan katalog dinamis.
              </p>

              <div className="mt-6 mb-8 pt-4 border-t border-accent/20">
                <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-white telemetry-value">Rp 11<span className="text-xl">.500.000</span></span>
                <span className="block font-mono text-[10px] text-accent mt-1 font-medium">Optimal ROI Architecture • Hak Milik Penuh</span>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('design,dev') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-white/90 scope-text">Multi-page custom architecture (hingga 10–12 halaman terstruktur)</span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('design') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-white/90 scope-text">Bespoke UI/UX Design System eksklusif di Figma</span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('dev') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-white/90 scope-text">Custom JavaScript Micro-interactions (GSAP Motion)</span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('infra') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-white/90 scope-text">5 GB Dedicated NVMe Hosting <span className="font-mono text-[10px] text-accent font-semibold">(Competent Tier)</span></span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('dev') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-white/90 scope-text">Dynamic Content / Catalog System tanpa bloat</span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('seo') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-white/90 scope-text">Advanced On-Page SEO &amp; Core Web Vitals Optimization</span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('infra') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-white/90 scope-text">Priority Technical Support &amp; SLA Pemeliharaan</span>
                </div>
              </div>

              <a href="https://wa.me/6281234567890?text=Halo%20Kodein.id,%20saya%20tertarik%20konsultasi%20paket%20Corporate%20Presence" target="_blank" rel="noopener noreferrer" className="group mt-10 text-center cta-primary px-6 py-3 rounded-md font-display font-semibold text-sm tracking-tight text-white flex items-center justify-center gap-2">
                Pilih Corporate Presence <span className="cta-arrow">→</span>
              </a>
            </div>

            {/* Tier 3: Signature Bespoke */}
            <div className="tier-card bg-midnight p-8 sm:p-10 reveal" style={{ transitionDelay: '0.28s' }}>
              <div className="radial-glow"></div>
              <span className="font-mono text-[10px] text-slate tracking-[0.15em] uppercase">Tier 03 // Enterprise Custom</span>
              <h3 className="font-display font-bold text-2xl mt-2 tracking-tight text-white">Signature Bespoke</h3>
              <p className="font-body text-[13px] text-slate mt-2 leading-relaxed">
                Untuk market leader &amp; enterprise yang membutuhkan ekosistem digital kustom, integrasi API, dan keamanan tinggi.
              </p>

              <div className="mt-6 mb-8 pt-4 border-t border-white/5">
                <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-white telemetry-value">Rp 18<span className="text-xl">.000.000</span></span>
                <span className="block font-mono text-[10px] text-slate/80 mt-1">Full Custom Ecosystem • Dedicated Engineer</span>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('design,dev') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-slate scope-text">Full custom web application / interactive client platform</span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('design') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-slate scope-text">Unlimited custom layouts &amp; advanced scroll choreography</span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('infra') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-slate scope-text">10 GB Dedicated Performance NVMe <span className="font-mono text-[10px] text-accent/80">(Expert Tier)</span></span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('dev') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-slate scope-text">Integrasi Custom API &amp; Lead CRM / ERP Korporasi</span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('dev,infra') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-slate scope-text">Dedicated Engineering Support &amp; Timbal Balik Cepat</span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('infra') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-slate scope-text">High-Concurrency &amp; Penetration Testing Hardening</span>
                </div>
                <div className={`scope-item flex items-start gap-2.5 transition-opacity duration-300 ${isScopeVisible('seo') ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="text-accent mt-0.5 text-xs">▸</span>
                  <span className="font-body text-[13px] text-slate scope-text">Enterprise Real-Time Analytics &amp; SLA Monitoring</span>
                </div>
              </div>

              <a href="https://wa.me/6281234567890?text=Halo%20Kodein.id,%20saya%20tertarik%20konsultasi%20paket%20Signature%20Bespoke" target="_blank" rel="noopener noreferrer" className="block mt-10 text-center cta-ghost px-6 py-3 rounded-md font-display font-medium text-sm tracking-tight text-slate hover:text-white">
                Konsultasi Signature Enterprise
              </a>
            </div>

          </div>

          {/* Quick Comparison Matrix Table */}
          <div className="mt-12 hairline rounded-md bg-surface/20 p-6 sm:p-8 reveal" style={{ transitionDelay: '0.12s' }}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] text-accent tracking-wider uppercase font-semibold">Tabel Komparasi Spesifikasi Teknis</span>
            </div>
            <div className="overflow-x-auto scrollbar-thumb-blue-200">
              <table className="w-full text-left">
                <thead>
                  <tr className="hairline-b text-slate">
                    <th className="font-mono text-[10px] tracking-wider uppercase py-3 pr-4">Spesifikasi Kunci</th>
                    <th className="font-mono text-[10px] tracking-wider uppercase py-3 px-4 text-center">Executive (Rp 6M)</th>
                    <th className="font-mono text-[10px] text-accent tracking-wider uppercase py-3 px-4 text-center font-semibold">Corporate (Rp 11.5M)</th>
                    <th className="font-mono text-[10px] tracking-wider uppercase py-3 pl-4 text-center">Bespoke (Rp 18M)</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-[12px]">
                  <tr className="hairline-b">
                    <td className="py-3 pr-4 text-slate">Jumlah Halaman / Layout</td>
                    <td className="py-3 px-4 text-center text-white/70">Hingga 5 Halaman</td>
                    <td className="py-3 px-4 text-center text-white font-medium">10–12 Halaman</td>
                    <td className="py-3 pl-4 text-center text-white/70">Unlimited / Custom</td>
                  </tr>
                  <tr className="hairline-b">
                    <td className="py-3 pr-4 text-slate">Bespoke UI/UX Figma</td>
                    <td className="py-3 px-4 text-center text-white/40">—</td>
                    <td className="py-3 px-4 text-center text-accent font-semibold">✓ Eksklusif</td>
                    <td className="py-3 pl-4 text-center text-accent font-semibold">✓ Full System</td>
                  </tr>
                  <tr className="hairline-b">
                    <td className="py-3 pr-4 text-slate">Dedicated NVMe Storage</td>
                    <td className="py-3 px-4 text-center text-white/70 telemetry-value">2 GB SSD</td>
                    <td className="py-3 px-4 text-center text-white telemetry-value font-medium">5 GB SSD</td>
                    <td className="py-3 pl-4 text-center text-white/70 telemetry-value">10 GB Dedicated</td>
                  </tr>
                  <tr className="hairline-b">
                    <td className="py-3 pr-4 text-slate">Custom Micro-interactions</td>
                    <td className="py-3 px-4 text-center text-white/40">Standar</td>
                    <td className="py-3 px-4 text-center text-accent font-semibold">✓ GSAP Advanced</td>
                    <td className="py-3 pl-4 text-center text-accent font-semibold">✓ 3D / Choreography</td>
                  </tr>
                  <tr className="hairline-b">
                    <td className="py-3 pr-4 text-slate">Integrasi API &amp; CRM</td>
                    <td className="py-3 px-4 text-center text-white/40">—</td>
                    <td className="py-3 px-4 text-center text-white/40">—</td>
                    <td className="py-3 pl-4 text-center text-accent font-semibold">✓ REST / GraphQL</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-slate">Level Support &amp; SLA</td>
                    <td className="py-3 px-4 text-center text-white/50">Standar 30 Hari</td>
                    <td className="py-3 px-4 text-center text-white font-medium">Priority 90 Hari</td>
                    <td className="py-3 pl-4 text-center text-accent font-semibold">Dedicated 1 Tahun</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 04: PROTOKOL EKSEKUSI (PROCESS) */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="proses" className="py-24 relative">
        <div className="max-w-350 mx-auto px-6">
          
          <div className="flex items-center gap-4 mb-10 reveal">
            <span className="font-mono text-[11px] text-accent tracking-[0.2em] uppercase">[ 04 // PROTOKOL EKSEKUSI ]</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <div className="mb-14 reveal" style={{ transitionDelay: '0.06s' }}>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight leading-[1.1]">
              Dari blueprint arsitektur hingga deployment produksi.<br />
              <span className="text-slate">Empat fase baku, tanpa kompromi kualitas.</span>
            </h2>
          </div>

          <div className="process-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">

            <div className="bg-midnight p-8 relative reveal" style={{ transitionDelay: '0.08s' }}>
              <span className="font-mono text-5xl font-bold text-white/4 absolute top-4 right-6 select-none pointer-events-none">01</span>
              <span className="font-mono text-[10px] text-accent tracking-[0.15em] uppercase font-semibold">Fase 01</span>
              <h3 className="font-display font-semibold text-lg mt-3 tracking-tight text-white">Discovery &amp; Blueprint</h3>
              <p className="font-body text-[13px] text-slate leading-relaxed mt-3">
                Analisis kebutuhan komprehensif, pemetaan kompetitor pasar, definisi user journey, dan penyusunan technical blueprint serta arsitektur informasi.
              </p>
              <div className="mt-6 flex items-center gap-2 pt-4 border-t border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span className="font-mono text-[10px] text-slate">Durasi: 3–5 Hari Kerja</span>
              </div>
            </div>

            <div className="bg-midnight p-8 relative reveal" style={{ transitionDelay: '0.14s' }}>
              <span className="font-mono text-5xl font-bold text-white/4 absolute top-4 right-6 select-none pointer-events-none">02</span>
              <span className="font-mono text-[10px] text-accent tracking-[0.15em] uppercase font-semibold">Fase 02</span>
              <h3 className="font-display font-semibold text-lg mt-3 tracking-tight text-white">Bespoke UI Architecture</h3>
              <p className="font-body text-[13px] text-slate leading-relaxed mt-3">
                Perancangan desain Figma bespoke beresolusi tinggi dengan sistem token warna presisi, tipografi editorial, dan validasi visual bersama tim eksekutif Anda.
              </p>
              <div className="mt-6 flex items-center gap-2 pt-4 border-t border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span className="font-mono text-[10px] text-slate">Durasi: 5–7 Hari Kerja</span>
              </div>
            </div>

            <div className="bg-midnight p-8 relative reveal" style={{ transitionDelay: '0.20s' }}>
              <span className="font-mono text-5xl font-bold text-white/4 absolute top-4 right-6 select-none pointer-events-none">03</span>
              <span className="font-mono text-[10px] text-accent tracking-[0.15em] uppercase font-semibold">Fase 03</span>
              <h3 className="font-display font-semibold text-lg mt-3 tracking-tight text-white">Clean-Code Engineering</h3>
              <p className="font-body text-[13px] text-slate leading-relaxed mt-3">
                Transformasi desain menjadi kode semantic zero-bloat — HTML5 modern, utility CSS, modular JavaScript ES2024+, serta optimasi micro-interaction responsif.
              </p>
              <div className="mt-6 flex items-center gap-2 pt-4 border-t border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                <span className="font-mono text-[10px] text-slate">Durasi: 7–10 Hari Kerja</span>
              </div>
            </div>

            <div className="bg-midnight p-8 relative reveal" style={{ transitionDelay: '0.26s' }}>
              <span className="font-mono text-5xl font-bold text-white/4 absolute top-4 right-6 select-none pointer-events-none">04</span>
              <span className="font-mono text-[10px] text-accent tracking-[0.15em] uppercase font-semibold">Fase 04</span>
              <h3 className="font-display font-semibold text-lg mt-3 tracking-tight text-white">NVMe Deploy &amp; QA</h3>
              <p className="font-body text-[13px] text-slate leading-relaxed mt-3">
                Penyebaran ke cloud node NVMe Jakarta, konfigurasi proteksi SSL A+, uji beban lintas browser, audit Lighthouse 100/100, dan serah terima dokumentasi teknis.
              </p>
              <div className="mt-6 flex items-center gap-2 pt-4 border-t border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="font-mono text-[10px] text-slate">Durasi: 2–3 Hari Kerja</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* FOOTER & ARCHITECTURAL WATERMARK */}
      {/* ═══════════════════════════════════════════════ */}
      <footer className="pt-24 pb-12 relative hairline-t bg-midnight">
        <div className="max-w-350 mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
            
            <div className="md:col-span-">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-display font-bold text-xl tracking-tight text-white">KODEIN<span className="text-accent">.</span>ID</span>
                <span className="status-dot"></span>
              </div>
              <p className="font-body text-sm text-slate leading-relaxed max-w-sm">
                Premier B2B digital engineering &amp; web architecture agency di Indonesia. Mengubah logika bisnis korporasi menjadi pengalaman digital berkecepatan sub-detik yang menghasilkan konversi.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <a href="https://WA.ME/62895380003033" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-slate hover:text-accent transition-colors">WhatsApp</a>
                <span className="text-white/10">|</span>
                <a href="https://www.instagram.com/jhnthn14/" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-slate hover:text-accent transition-colors">Instagram</a>
                <span className="text-white/10">|</span>
                <a href="https://github.com/alvinojhonathan070-blip" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-slate hover:text-accent transition-colors">GitHub Repository</a>
              </div>
            </div>

            <div>
              <span className="font-mono text-[10px] text-slate/70 tracking-[0.2em] uppercase mb-4 block">Arsitektur Situs</span>
              <div className="space-y-2.5">
                <a href="#arsitektur" className="block font-body text-sm text-slate hover:text-white transition-colors">Arsitektur Utama</a>
                <a href="#kapabilitas" className="block font-body text-sm text-slate hover:text-white transition-colors">Kapabilitas &amp; Teknologi</a>
                <a href="#karya" className="block font-body text-sm text-slate hover:text-white transition-colors">Karya Terpilih</a>
                <a href="#investasi" className="block font-body text-sm text-slate hover:text-white transition-colors">Investasi &amp; Spesifikasi</a>
                <a href="#proses" className="block font-body text-sm text-slate hover:text-white transition-colors">Protokol Eksekusi</a>
              </div>
            </div>

            <div>
              <span className="font-mono text-[10px] text-slate/70 tracking-[0.2em] uppercase mb-4 block">Markas Operasional</span>
              <div className="space-y-1.5">
                <p className="font-body text-sm text-white/90">Tangerang, Indonesia</p>
                <p className="font-mono text-[11px] text-slate/70">Rukan Crown, Jl. Green Lake City Boulevard No.21, RT.004/RW.008, Petir, Cipondoh, Tangerang City, Banten 15147</p>
                <p className="font-mono text-[11px] text-slate/70">kode3inid@gmail.com</p>
              </div>
              <a href="#investasi" className="group inline-flex items-center gap-2 mt-6 cta-primary px-5 py-2.5 rounded-md font-display font-semibold text-sm tracking-tight text-white">
                Konsultasi Eksekutif <span className="cta-arrow">→</span>
              </a>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 hairline-t gap-4">
            <p className="font-mono text-[10px] text-slate/40 tracking-wider">© 2026 KODEIN.ID — ALL RIGHTS RESERVED // DIGITAL ENGINEERING JKT</p>
            <p className="font-mono text-[10px] text-slate/40 tracking-wider">TURNING LOGIC INTO DIGITAL MAGIC</p>
          </div>

        </div>
      </footer>
    </div>
  );
}