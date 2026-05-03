export type Lang = 'es' | 'en' | 'ca'

export function detectLang(acceptLanguage: string | null, override?: string): Lang {
  if (override === 'es' || override === 'en' || override === 'ca') return override
  if (!acceptLanguage) return 'es'
  const langs = acceptLanguage.split(',').map(l => l.split(';')[0].trim().toLowerCase())
  for (const l of langs) {
    if (l.startsWith('ca')) return 'ca'
    if (l.startsWith('en')) return 'en'
    if (l.startsWith('es')) return 'es'
  }
  return 'es'
}

export const translations = {
  es: {
    langSwitcher: { label: 'Idioma', es: 'ES', en: 'EN', ca: 'CA' },
    nav: {
      about: 'Nosotros',
      offer: 'Qué ofrecemos',
      schedules: 'Horarios',
      prices: 'Precios',
      location: 'Ubicación',
      contact: 'Contacto',
    },
    hero: {
      badge: '🏐 Sesión de prueba gratuita · Sin compromiso',
      headline: 'Entrena vóley playa en Barcelona y mejora mientras te diviertes',
      subheadline: 'Todos los niveles · Grupos reducidos · Entrenadores certificados · Gran comunidad',
      ctaPrimary: 'Únete a un entrenamiento',
      ctaSecondary: 'Ver horarios',
    },
    about: {
      title: '¿Quiénes somos?',
      description: '¡Hola! Somos Sara, Jesús y David, apasionadxs del vóley playa y del rock 🤘. Tras años entrenando y compitiendo, hemos creado Block N\'Roll: un espacio donde aprender, mejorar, disfrutar y construir comunidad. Entrenamientos dinámicos, intensos y adaptados a cada persona, ¡en un ambiente cercano, divertido y lleno de arena!',
      founders: [
        { name: 'Sara', role: 'Co-fundadora & Entrenadora' },
        { name: 'Jesús', role: 'Co-fundador & Entrenador' },
        { name: 'David', role: 'Co-fundador & Entrenador' },
      ],
    },
    forWho: {
      title: '¿Para quién?',
      cards: [
        { icon: '🌱', title: 'Iniciación', description: '¿Nunca has tocado un balón? El punto de partida perfecto.' },
        { icon: '📈', title: 'Nivel básico', description: 'Conoces los fundamentos y quieres construir una base sólida.' },
        { icon: '🔥', title: 'Nivel intermedio', description: 'Compites o quieres llevar tu juego al siguiente nivel.' },
        { icon: '👥', title: 'Jugadores sociales', description: 'Quieres conocer gente y disfrutar del deporte con buen rollo.' },
      ],
      note: 'Puedes apuntarte solx, en pareja o con tu grupo de amigxs. Nos encargamos de formar grupos equilibrados.',
    },
    offer: {
      title: 'Qué ofrecemos',
      features: [
        { icon: '🎯', title: 'Entrenamiento personalizado', description: 'Sesiones completas adaptadas a tu nivel y objetivos.' },
        { icon: '👥', title: 'Grupos reducidos', description: 'Máximo 8 jugadorxs por pista para un seguimiento cercano.' },
        { icon: '⏱️', title: 'Sesiones de 90 min', description: 'Con entrenadores certificados de nivel 1.' },
        { icon: '🆓', title: 'Sesión de prueba gratuita', description: 'Ven a conocernos sin ningún compromiso.' },
        { icon: '🤝', title: 'Sesiones privadas', description: 'Disponibilidad de entrenos privados o personalizados.' },
        { icon: '🤘', title: 'Gran comunidad', description: 'Comunidad activa, buen rollo… ¡y mucha arena!' },
      ],
    },
    methodology: {
      title: 'Nuestra metodología',
      description: 'Diseñamos sesiones dinámicas para maximizar las repeticiones y situaciones reales de juego. Cada ejercicio se adapta a tu nivel para que progreses desde tu punto de partida.',
      pillars: [
        { icon: '💪', title: 'Físico', description: 'Resistencia, velocidad, coordinación y fuerza específica.' },
        { icon: '🏐', title: 'Técnico', description: 'Control de balón, precisión y gestos técnicos clave.' },
        { icon: '🧠', title: 'Táctico', description: 'Lectura del juego, toma de decisiones y posicionamiento.' },
      ],
    },
    schedules: {
      title: 'Horarios',
      subtitle: 'Temporada 2025-2026',
      days: 'Lunes a Viernes',
      hours: '18:00 – 22:30',
      duration: 'Cada sesión: 90 minutos',
      instagram: 'Horarios específicos publicados en Instagram',
      summerTitle: '⚠️ Entrenamiento de verano disponible',
      summerText: 'Mayo – Julio 2025 con horarios limitados (mañana y tarde). Escríbenos si te interesa.',
      ctaButton: 'Preguntar por plazas disponibles',
    },
    prices: {
      title: 'Precios',
      plans: [
        { name: '1 día/semana', price: '35€', period: '/mes', tag: null, description: 'Perfecto para empezar' },
        { name: '2 días/semana', price: '65€', period: '/mes', tag: 'Más popular', description: 'La opción más completa' },
        { name: 'Grupo reducido', price: 'Consultar', period: '', tag: null, description: 'Para grupos personalizados' },
      ],
      federationNote: '🛡️ Licencia federativa obligatoria (incluye seguro deportivo): 35€/año. Podemos gestionarla por ti sin coste adicional.',
    },
    location: {
      title: 'Dónde entrenamos',
      venue: 'CEM Eurofitness Vall d\'Hebron',
      address: 'Pg. de la Vall d\'Hebron 178, Horta-Guinardó, Barcelona 08035',
      features: ['Pistas outdoor de vóley playa', 'Iluminación para entrenos nocturnos', 'Vestuarios, duchas y bar'],
      transport: {
        metro: 'Metro L3 Montbau (7 min) · L5 Vall d\'Hebron (8 min)',
        bus: 'Bus 19, 27, 60, 76, H4, V17, V21',
        car: 'Fácil acceso y zona de aparcamiento',
      },
      mapCta: 'Ver en Google Maps',
    },
    community: {
      title: 'Nuestra comunidad',
      tagline: 'Ven por el vóley, quédate por la comunidad 🤘',
      testimonials: [
        { name: 'María G.', text: 'Los entrenamientos son súper dinámicos y los entrenadores te corrigen constantemente. ¡Ha mejorado mucho mi técnica!' },
        { name: 'Carlos R.', text: 'Empecé sin saber nada de vóley playa y ahora compito en torneos amateur. El ambiente del club es increíble.' },
        { name: 'Laura M.', text: 'Lo mejor es la mezcla de niveles y lo bien que te acogen desde el primer día. ¡Muy recomendable!' },
      ],
    },
    coaches: {
      title: 'Tus entrenadores',
      credentials: ['📜 Certificación oficial Nivel 1', '🎯 +6 años compitiendo y entrenando', '🎵 Apasionadxs del vóley y el buen ambiente'],
      coaches: [
        { name: 'Jesús García', initials: 'JG' },
        { name: 'David Bardina', initials: 'DB' },
      ],
    },
    contact: {
      title: '¿Listo para tu primera sesión?',
      subtitle: 'Rellena el formulario o contáctanos directamente. Te encontraremos el grupo perfecto.',
      form: {
        name: 'Nombre',
        email: 'Email',
        phone: 'Teléfono (opcional)',
        message: 'Mensaje',
        messagePlaceholder: '¿Cuál es tu nivel? ¿Tienes alguna pregunta?',
        submit: 'Enviar mensaje',
      },
      whatsapp: 'Escríbenos por WhatsApp',
      emailCta: 'Envíanos un email',
      social: 'Síguenos en Instagram',
      handle: '@blocknrollbeachvolleybcn',
    },
  },

  en: {
    langSwitcher: { label: 'Language', es: 'ES', en: 'EN', ca: 'CA' },
    nav: {
      about: 'About',
      offer: 'What we offer',
      schedules: 'Schedules',
      prices: 'Prices',
      location: 'Location',
      contact: 'Contact',
    },
    hero: {
      badge: '🏐 Free trial session · No commitment',
      headline: 'Train beach volleyball in Barcelona and improve while having fun',
      subheadline: 'All levels · Small groups · Certified coaches · Great community',
      ctaPrimary: 'Join a training session',
      ctaSecondary: 'See schedules',
    },
    about: {
      title: 'Who are we?',
      description: 'Hi! We are Sara, Jesús and David, passionate about beach volleyball and rock 🤘. After years training and competing, we created Block N\'Roll: a space to learn, improve, enjoy and build a community. Dynamic, intensive training adapted to each person, in a welcoming, fun and sandy atmosphere!',
      founders: [
        { name: 'Sara', role: 'Co-founder & Coach' },
        { name: 'Jesús', role: 'Co-founder & Coach' },
        { name: 'David', role: 'Co-founder & Coach' },
      ],
    },
    forWho: {
      title: 'Who is it for?',
      cards: [
        { icon: '🌱', title: 'Complete beginners', description: 'Never touched a volleyball? The perfect starting point.' },
        { icon: '📈', title: 'Basic level', description: 'You know the basics and want to build a solid foundation.' },
        { icon: '🔥', title: 'Intermediate', description: 'You compete or want to take your game to the next level.' },
        { icon: '👥', title: 'Social players', description: 'Looking to meet people and enjoy sport with good vibes.' },
      ],
      note: 'Train solo, with a partner, or bring your whole group. We form balanced groups adapted to each level.',
    },
    offer: {
      title: 'What we offer',
      features: [
        { icon: '🎯', title: 'Personalised training', description: 'Complete sessions adapted to your level and goals.' },
        { icon: '👥', title: 'Small groups', description: 'Max 8 players per court for close personal attention.' },
        { icon: '⏱️', title: '90-minute sessions', description: 'With Level 1 certified coaches.' },
        { icon: '🆓', title: 'Free trial session', description: 'Come and meet us with no commitment.' },
        { icon: '🤝', title: 'Private sessions', description: 'Private and custom training sessions available.' },
        { icon: '🤘', title: 'Great community', description: 'Active community, great vibes… and lots of sand!' },
      ],
    },
    methodology: {
      title: 'Our training approach',
      description: 'We design dynamic sessions to maximise repetitions and real game situations. Each exercise is adapted to your level so you progress from your starting point.',
      pillars: [
        { icon: '💪', title: 'Physical', description: 'Endurance, speed, coordination and specific strength.' },
        { icon: '🏐', title: 'Technical', description: 'Ball control, precision and key technical gestures.' },
        { icon: '🧠', title: 'Tactical', description: 'Reading the game, decision-making and positioning.' },
      ],
    },
    schedules: {
      title: 'Schedules',
      subtitle: 'Season 2025-2026',
      days: 'Monday to Friday',
      hours: '18:00 – 22:30',
      duration: 'Each session: 90 minutes',
      instagram: 'Specific times published on Instagram',
      summerTitle: '⚠️ Summer training available',
      summerText: 'May – July 2025 with limited morning and afternoon slots. Message us if you\'re interested.',
      ctaButton: 'Ask about available spots',
    },
    prices: {
      title: 'Prices',
      plans: [
        { name: '1 day/week', price: '€35', period: '/month', tag: null, description: 'Perfect to get started' },
        { name: '2 days/week', price: '€65', period: '/month', tag: 'Most popular', description: 'The most complete option' },
        { name: 'Small group', price: 'Ask us', period: '', tag: null, description: 'For custom group sessions' },
      ],
      federationNote: '🛡️ Federation license required (includes sports insurance): €35/year. We can handle the paperwork for you at no extra cost.',
    },
    location: {
      title: 'Where we train',
      venue: 'CEM Eurofitness Vall d\'Hebron',
      address: 'Pg. de la Vall d\'Hebron 178, Horta-Guinardó, Barcelona 08035',
      features: ['Outdoor beach volleyball courts', 'Night lighting for evening sessions', 'Changing rooms, showers and bar'],
      transport: {
        metro: 'Metro L3 Montbau (7 min walk) · L5 Vall d\'Hebron (8 min walk)',
        bus: 'Bus 19, 27, 60, 76, H4, V17, V21',
        car: 'Easy access and parking available',
      },
      mapCta: 'View on Google Maps',
    },
    community: {
      title: 'Our community',
      tagline: 'Come for the volleyball, stay for the community 🤘',
      testimonials: [
        { name: 'María G.', text: 'The sessions are super dynamic and coaches correct you constantly. My technique has improved so much!' },
        { name: 'Carlos R.', text: 'I started knowing nothing about beach volleyball and now I compete in amateur tournaments. The club atmosphere is incredible.' },
        { name: 'Laura M.', text: 'The best thing is the mix of levels and how welcoming everyone is from day one. Highly recommended!' },
      ],
    },
    coaches: {
      title: 'Your coaches',
      credentials: ['📜 Official Level 1 Certification', '🎯 6+ years competing and coaching', '🎵 Passionate about volleyball and good vibes'],
      coaches: [
        { name: 'Jesús García', initials: 'JG' },
        { name: 'David Bardina', initials: 'DB' },
      ],
    },
    contact: {
      title: 'Ready for your first session?',
      subtitle: 'Fill in the form or contact us directly. We\'ll find the perfect group for you.',
      form: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone (optional)',
        message: 'Message',
        messagePlaceholder: 'What is your level? Any questions?',
        submit: 'Send message',
      },
      whatsapp: 'Chat on WhatsApp',
      emailCta: 'Send us an email',
      social: 'Follow us on Instagram',
      handle: '@blocknrollbeachvolleybcn',
    },
  },

  ca: {
    langSwitcher: { label: 'Idioma', es: 'ES', en: 'EN', ca: 'CA' },
    nav: {
      about: 'Nosaltres',
      offer: 'Què oferim',
      schedules: 'Horaris',
      prices: 'Preus',
      location: 'Ubicació',
      contact: 'Contacte',
    },
    hero: {
      badge: '🏐 Sessió de prova gratuïta · Sense compromís',
      headline: 'Entrena vòlei platja a Barcelona i millora mentre t\'ho passes bé',
      subheadline: 'Tots els nivells · Grups reduïts · Entrenadors certificats · Gran comunitat',
      ctaPrimary: 'Uneix-te a un entrenament',
      ctaSecondary: 'Veure horaris',
    },
    about: {
      title: 'Qui som?',
      description: 'Hola! Som la Sara, en Jesús i el David, apassionadxs del vòlei platja i del rock 🤘. Després d\'anys entrenant i competint, hem creat el Block N\'Roll: un espai per aprendre, millorar, gaudir i construir comunitat. Entrenaments dinàmics, intensos i adaptats a cada persona, en un ambient proper, divertit i ple de sorra!',
      founders: [
        { name: 'Sara', role: 'Co-fundadora i Entrenadora' },
        { name: 'Jesús', role: 'Co-fundador i Entrenador' },
        { name: 'David', role: 'Co-fundador i Entrenador' },
      ],
    },
    forWho: {
      title: 'Per a qui és?',
      cards: [
        { icon: '🌱', title: 'Iniciació', description: 'Mai has tocat una pilota? El punt de partida perfecte.' },
        { icon: '📈', title: 'Nivell bàsic', description: 'Coneixes els fonaments i vols construir una base sòlida.' },
        { icon: '🔥', title: 'Nivell intermedi', description: 'Competeixes o vols portar el teu joc al següent nivell.' },
        { icon: '👥', title: 'Jugadors socials', description: 'Vols conèixer gent i gaudir de l\'esport amb bon rotllo.' },
      ],
      note: 'Pots apuntar-te solx, en parella o amb el teu grup d\'amigxs. Ens encarreguem de formar grups equilibrats.',
    },
    offer: {
      title: 'Què oferim',
      features: [
        { icon: '🎯', title: 'Entrenament personalitzat', description: 'Sessions completes adaptades al teu nivell i objectius.' },
        { icon: '👥', title: 'Grups reduïts', description: 'Màxim 8 jugadorxs per pista per a un seguiment proper.' },
        { icon: '⏱️', title: 'Sessions de 90 min', description: 'Amb entrenadors certificats de nivell 1.' },
        { icon: '🆓', title: 'Sessió de prova gratuïta', description: 'Vine a conèixer-nos sense cap compromís.' },
        { icon: '🤝', title: 'Sessions privades', description: 'Disponibilitat d\'entrenaments privats o personalitzats.' },
        { icon: '🤘', title: 'Gran comunitat', description: 'Comunitat activa, bon rotllo… i molta sorra!' },
      ],
    },
    methodology: {
      title: 'La nostra metodologia',
      description: 'Dissenyem sessions dinàmiques per maximitzar les repeticions i situacions reals de joc. Cada exercici s\'adapta al teu nivell perquè progressis des del teu punt de partida.',
      pillars: [
        { icon: '💪', title: 'Físic', description: 'Resistència, velocitat, coordinació i força específica.' },
        { icon: '🏐', title: 'Tècnic', description: 'Control de pilota, precisió i gestos tècnics clau.' },
        { icon: '🧠', title: 'Tàctic', description: 'Lectura del joc, presa de decisions i posicionament.' },
      ],
    },
    schedules: {
      title: 'Horaris',
      subtitle: 'Temporada 2025-2026',
      days: 'Dilluns a divendres',
      hours: '18:00 – 22:30',
      duration: 'Cada sessió: 90 minuts',
      instagram: 'Horaris específics publicats a Instagram',
      summerTitle: '⚠️ Entrenament d\'estiu disponible',
      summerText: 'Maig – Juliol 2025 amb horaris limitats (matí i tarda). Escriu-nos si t\'interessa.',
      ctaButton: 'Preguntar per places disponibles',
    },
    prices: {
      title: 'Preus',
      plans: [
        { name: '1 dia/setmana', price: '35€', period: '/mes', tag: null, description: 'Perfecte per començar' },
        { name: '2 dies/setmana', price: '65€', period: '/mes', tag: 'Més popular', description: 'L\'opció més completa' },
        { name: 'Grup reduït', price: 'Consultar', period: '', tag: null, description: 'Per a grups personalitzats' },
      ],
      federationNote: '🛡️ Llicència federativa obligatòria (inclou assegurança esportiva): 35€/any. Podem gestionar-la per tu sense cost addicional.',
    },
    location: {
      title: 'On entrenem',
      venue: 'CEM Eurofitness Vall d\'Hebron',
      address: 'Pg. de la Vall d\'Hebron 178, Horta-Guinardó, Barcelona 08035',
      features: ['Pistes outdoor de vòlei platja', 'Il·luminació per a entrenaments nocturns', 'Vestuaris, dutxes i bar'],
      transport: {
        metro: 'Metro L3 Montbau (7 min a peu) · L5 Vall d\'Hebron (8 min a peu)',
        bus: 'Bus 19, 27, 60, 76, H4, V17, V21',
        car: 'Fàcil accés i zona d\'aparcament',
      },
      mapCta: 'Veure a Google Maps',
    },
    community: {
      title: 'La nostra comunitat',
      tagline: 'Vine pel vòlei, queda\'t per la comunitat 🤘',
      testimonials: [
        { name: 'María G.', text: 'Els entrenaments són super dinàmics i els entrenadors et corregeixen constantment. Ha millorat molt la meva tècnica!' },
        { name: 'Carlos R.', text: 'Vaig començar sense saber res de vòlei platja i ara competeeixo en tornejos amateur. L\'ambient del club és increïble.' },
        { name: 'Laura M.', text: 'El millor és la barreja de nivells i com t\'acullen des del primer dia. Molt recomanable!' },
      ],
    },
    coaches: {
      title: 'Els teus entrenadors',
      credentials: ['📜 Certificació oficial Nivell 1', '🎯 +6 anys competint i entrenant', '🎵 Apassionadxs del vòlei i el bon ambient'],
      coaches: [
        { name: 'Jesús García', initials: 'JG' },
        { name: 'David Bardina', initials: 'DB' },
      ],
    },
    contact: {
      title: 'Llest per a la teva primera sessió?',
      subtitle: 'Omple el formulari o contacta\'ns directament. Et trobarem el grup perfecte.',
      form: {
        name: 'Nom',
        email: 'Email',
        phone: 'Telèfon (opcional)',
        message: 'Missatge',
        messagePlaceholder: 'Quin és el teu nivell? Tens alguna pregunta?',
        submit: 'Enviar missatge',
      },
      whatsapp: 'Escriu-nos per WhatsApp',
      emailCta: 'Envia\'ns un email',
      social: 'Segueix-nos a Instagram',
      handle: '@blocknrollbeachvolleybcn',
    },
  },
} as const satisfies Record<Lang, unknown>

export type T = typeof translations.es
export function t(lang: Lang): T {
  return translations[lang] as T
}
