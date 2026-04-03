import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  Menu, 
  X, 
  Star,
  Calendar,
  Shield,
  HeartPulse,
  User
} from "lucide-react";
import { useState, useEffect } from "react";

const services = [
  {
    title: "Hammastarkastus",
    description: "Säännöllinen tarkastus on perusta terveelle hymylle. Tutkimme hampaat, ikenet ja suun limakalvot.",
    icon: <SearchIcon className="w-6 h-6" />,
  },
  {
    title: "Hammaskiven poisto",
    description: "Hellävarainen ja perusteellinen puhdistus ehkäisee ientulehdusta ja pitää suun raikkaana.",
    icon: <SparklesIcon className="w-6 h-6" />,
  },
  {
    title: "Paikkaushoidot",
    description: "Käytämme laadukkaita ja kestäviä materiaaleja hampaiden paikkaukseen ja lohkeamien korjaamiseen.",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "Purentavaivat",
    description: "Apua purentalihasten kireyteen, leukanivelvaivoihin ja hampaiden narskutteluun.",
    icon: <HeartPulse className="w-6 h-6" />,
  },
];

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function SparklesIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-brand-100 selection:text-brand-900">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-200 group-hover:scale-110 transition-transform">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-lg font-serif font-bold leading-none text-slate-900">Helinä Vainio</span>
              <span className="text-[10px] uppercase tracking-widest text-brand-600 font-bold">Hammaslääkäri</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Palvelut", "Meistä", "Yhteystiedot"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors"
              >
                {item}
              </button>
            ))}
            <a 
              href="tel:0503370008"
              className="bg-brand-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-brand-100 hover:bg-brand-700 hover:shadow-brand-200 transition-all active:scale-95 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Varaa aika
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {["Palvelut", "Meistä", "Yhteystiedot"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-2xl font-serif font-bold text-slate-900 text-left"
                >
                  {item}
                </button>
              ))}
              <div className="h-px bg-slate-100 my-4" />
              <a 
                href="tel:0503370008"
                className="flex items-center gap-4 text-brand-600 font-bold text-xl"
              >
                <Phone />
                050 3370008
              </a>
              <div className="flex items-center gap-4 text-slate-500">
                <MapPin />
                Topeliuksenkatu 18 C 34, Helsinki
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-brand-50 rounded-bl-[100px] hidden lg:block" />
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Star className="w-3 h-3 fill-current" />
              Yksilöllistä hammashoitoa Helsingissä
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-[1.1] mb-6">
              Terve hymy on <span className="text-brand-600 italic">kaunis</span> hymy.
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
              Tervetuloa asiantuntevaan ja välittävään hammashoitoon Töölöön. 
              Tarjoamme monipuoliset palvelut rennossa ja luottamuksellisessa ympäristössä.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="tel:0503370008"
                className="bg-brand-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-brand-200 hover:bg-brand-700 transition-all flex items-center justify-center gap-2 group"
              >
                Varaa aika soittamalla
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button 
                onClick={() => scrollToSection("palvelut")}
                className="px-8 py-4 rounded-full text-lg font-bold text-slate-900 border border-slate-200 hover:bg-slate-50 transition-all"
              >
                Tutustu palveluihin
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/person${i}/100/100`} 
                      alt="Asiakas" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm text-slate-500 font-medium">Satoja tyytyväisiä asiakkaita</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1629909608135-ca29e0c1e2b0?auto=format&fit=crop&q=80&w=1000" 
                alt="Moderni hammaslääkärivastaanotto" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="glass-card p-4 rounded-2xl border-white/30 text-slate-900">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="font-bold">Vapaat ajat tällä viikolla</span>
                  </div>
                  <p className="text-sm text-slate-600">Soita ja kysy peruutusaikoja!</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-200/50 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-100 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-50 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Vuoden kokemus", value: "20+" },
              { label: "Tyytyväisiä asiakkaita", value: "2k+" },
              { label: "Palvelut", value: "15+" },
              { label: "Sijainti", value: "Töölö" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-bold text-brand-600 mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="palvelut" className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Kattavat palvelut suun terveyteen</h2>
            <p className="text-slate-600">
              Tarjoamme laajan valikoiman hammaslääkäripalveluita perushoidosta vaativampiin toimenpiteisiin. 
              Käytössämme on nykyaikaiset laitteet ja menetelmät.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-brand-100/50 transition-all"
              >
                <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm mb-6 italic">Kysy rohkeasti myös muista palveluista!</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Juurihoito", "Proteetiikka", "Hampaiden valkaisu", "Iensairaudet", "Pelkopotilaat"].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-full text-sm font-medium border border-slate-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="meistä" className="section-padding bg-brand-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full" />
          <div className="absolute bottom-20 right-20 w-96 h-96 border border-white rounded-full" />
        </div>
        
        <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Hammaslääkäri Helinä Vainio</h2>
            <div className="space-y-6 text-brand-100 leading-relaxed">
              <p>
                Olen toiminut hammaslääkärinä Helsingissä jo yli kahden vuosikymmenen ajan. 
                Vastaanotollani Töölössä panostan erityisesti kiireettömään kohtaamiseen ja 
                yksilölliseen hoitosuunnitelmaan.
              </p>
              <p>
                Uskon, että hyvä hammashoito perustuu luottamukseen. Siksi selitän aina 
                toimenpiteet huolellisesti ja varmistan, että potilas tuntee olonsa mukavaksi koko käynnin ajan.
              </p>
              <div className="pt-4 space-y-4">
                {[
                  "Laaja kokemus yleishammashoidosta",
                  "Erityisosaamista pelkopotilaiden kohtaamisessa",
                  "Jatkuva kouluttautuminen uusimpiin menetelmiin",
                  "Vastaanotto Töölön sydämessä"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-400" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-square rounded-full border-8 border-brand-800 overflow-hidden relative z-10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=1000" 
                alt="Hammaslääkäri Helinä Vainio" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl z-20 text-slate-900 hidden md:block">
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm font-bold italic">"Paras hammaslääkäri, jolla olen koskaan käynyt. Erittäin hellävarainen!"</p>
              <p className="text-xs text-slate-500 mt-2">— Pitkäaikainen asiakas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="yhteystiedot" className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Ota yhteyttä ja varaa aika</h2>
              <p className="text-slate-600 mb-12">
                Vastaanottoni sijaitsee hyvien kulkuyhteyksien varrella Helsingin Töölössä. 
                Voit varata ajan soittamalla tai jättämällä viestin.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Puhelin</h4>
                    <a href="tel:0503370008" className="text-2xl font-serif font-bold text-brand-600 hover:text-brand-700 transition-colors">
                      050 3370008
                    </a>
                    <p className="text-sm text-slate-500 mt-1">Vastaamme puheluihin arkisin klo 8-16.</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Osoite</h4>
                    <p className="text-lg text-slate-700">Topeliuksenkatu 18 C 34</p>
                    <p className="text-lg text-slate-700">00250 Helsinki</p>
                    <a 
                      href="https://www.google.com/maps/dir/?api=1&destination=Topeliuksenkatu+18+C+34+00250+Helsinki" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-brand-600 hover:underline mt-2 inline-block"
                    >
                      Katso reittiohjeet
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Aukioloajat</h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-slate-700">
                      <span>Maanantai</span> <span className="font-medium">08:00 – 16:00</span>
                      <span>Tiistai</span> <span className="font-medium">08:00 – 16:00</span>
                      <span>Keskiviikko</span> <span className="font-medium">08:00 – 16:00</span>
                      <span>Torstai</span> <span className="font-medium">08:00 – 16:00</span>
                      <span>Perjantai</span> <span className="font-medium">08:00 – 14:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-[40px] p-2 overflow-hidden shadow-inner min-h-[400px] relative group">
              <div className="absolute inset-0 bg-slate-200 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
                <MapPin className="w-12 h-12 mb-4 opacity-20" />
                <p className="font-medium">Kartta ladataan tässä...</p>
                <p className="text-xs mt-2">Topeliuksenkatu 18, Helsinki</p>
                <div className="mt-6 w-full h-full bg-slate-300/50 rounded-3xl border-4 border-white/50 overflow-hidden">
                   {/* Placeholder for map visual */}
                   <div className="w-full h-full relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
                          <MapPin className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                   </div>
                </div>
              </div>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Topeliuksenkatu+18+C+34+00250+Helsinki" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <span className="text-xl font-serif font-bold">Helinä Vainio</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
                Asiantuntevaa ja välittävää hammashoitoa Helsingin Töölössä jo yli 20 vuoden kokemuksella. 
                Tervetuloa palveltavaksi!
              </p>
              <div className="flex gap-4">
                {/* Social placeholders */}
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-600 transition-colors cursor-pointer">
                  <span className="font-bold">fb</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-600 transition-colors cursor-pointer">
                  <span className="font-bold">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Pikalinkit</h4>
              <ul className="space-y-4 text-slate-400">
                <li><button onClick={() => scrollToSection("palvelut")} className="hover:text-white transition-colors">Palvelut</button></li>
                <li><button onClick={() => scrollToSection("meistä")} className="hover:text-white transition-colors">Meistä</button></li>
                <li><button onClick={() => scrollToSection("yhteystiedot")} className="hover:text-white transition-colors">Yhteystiedot</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Tietosuoja</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Yhteystiedot</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-500" />
                  <a href="tel:0503370008">050 3370008</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-500 shrink-0 mt-1" />
                  <span>Topeliuksenkatu 18 C 34,<br />00250 Helsinki</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-top border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Hammaslääkäri Helinä Vainio. Kaikki oikeudet pidätetään.</p>
            <div className="flex gap-8">
              <p>SEO Optimoitu Hammashoito Helsinki</p>
              <p>Töölön Hammaslääkäripalvelut</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <a 
          href="tel:0503370008"
          className="w-16 h-16 bg-brand-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-brand-400 animate-pulse"
        >
          <Phone className="w-8 h-8" />
        </a>
      </div>
    </div>
  );
}
