/**
 * Runtime translation dictionaries.
 *
 * English is the source of truth: its keys define the `TranslationKey` type,
 * so the compiler guarantees French and Spanish stay complete — a missing or
 * misspelled key in any language is a build error, not a silent blank string.
 */

export const LANGS = ['en', 'fr', 'es'] as const;
export type Lang = (typeof LANGS)[number];

const en = {
  // Accessibility / chrome
  'a11y.skip': 'Skip to content',
  'a11y.mainNav': 'Main navigation',
  'a11y.langSwitcher': 'Site language',

  // Navigation
  'nav.about': 'About',
  'nav.experience': 'Experience',
  'nav.projects': 'Projects',
  'nav.skills': 'Skills',
  'nav.contact': 'Contact',

  // Hero
  'hero.status': 'Open to new opportunities',
  'hero.location': 'Toronto, Canada',
  'hero.role': 'Senior Fullstack Software Engineer',
  'hero.intro':
    'I design and ship web products end to end — from architecture to the last interaction detail — with Angular, .NET and 8+ years of production experience.',
  'hero.ctaProjects': 'Selected work',
  'hero.ctaContact': 'Get in touch',
  'hero.scroll': 'Scroll',

  // About
  'about.label': 'About',
  'about.title': 'From first commit to production.',
  'about.p1':
    'I’m Deiby, a fullstack engineer based in Toronto. For over eight years I’ve built software for travel tech, broadcasting, telecom and finance — leading projects from requirements to production, and staying long after release to make them better.',
  'about.p2':
    'My home turf is the Angular + .NET stack, with serious mileage in React, Blazor and real-time systems. I care about clean architecture, honest estimates and interfaces that feel effortless.',
  'about.factsLocation': 'Based in',
  'about.factsLanguages': 'Languages',
  'about.factsEducation': 'Education',
  'about.langEn': 'English',
  'about.langFr': 'French',
  'about.langEs': 'Spanish',
  'about.levelEn': 'Professional',
  'about.levelFr': 'Learning',
  'about.levelEs': 'Native',

  // Highlight stats
  'stats.years': 'Years of experience',
  'stats.companies': 'Companies & industries',
  'stats.countries': 'Countries worked in',
  'stats.languages': 'Working languages',

  // Experience
  'exp.label': 'Experience',
  'exp.title': 'Where I’ve built.',
  'exp.now': 'Now',
  'exp.triparc.role': 'Senior Software Developer',
  'exp.triparc.summary':
    'Driving feature development across a large-scale travel-technology platform: leading the modernization of a legacy .NET web stack into Angular and .NET Core, and shipping end-to-end functionality with Entity Framework and SQL Server.',
  'exp.enlace.role': 'Fullstack Software Developer',
  'exp.enlace.summary':
    'Built and maintained a video-streaming web platform for an international TV network — new features, performance and reliability — with Angular, .NET Core, Entity Framework and SQL Server.',
  'exp.overactive.role': 'Fullstack Software Engineer',
  'exp.overactive.summary':
    'Developed applications for a US client using React and Next.js with server-side rendering and GraphQL, alongside Angular, .NET Core and SQL Server product work.',
  'exp.novatec.role': 'Senior Developer',
  'exp.novatec.summary':
    'Delivered across the full software lifecycle — design, development, testing and support — building Angular applications for a telecommunications company.',
  'exp.fitideas.role': 'Software Developer',
  'exp.fitideas.summary':
    'Created real-time, map-based data-visualization features using WebSockets, .NET Core, Angular and Redux for state management.',
  'exp.colvatel.role': 'Development Engineer',
  'exp.colvatel.summary':
    'Led a hybrid mobile and web educational platform from requirements to production for the private sector, using Angular, .NET Core and Ionic.',

  // Projects
  'proj.label': 'Projects',
  'proj.title': 'Things I tinker with.',
  'proj.sub':
    'Selected personal work — the production code lives in private repos, but these show how I think.',
  'proj.view': 'View on GitHub',
  'proj.wms.desc':
    'Inventory management system with products, customers and purchase orders, built on the MERN stack with TypeScript.',
  'proj.contacts.desc':
    'Contact management app exploring Blazor’s component model and .NET fullstack development.',
  'proj.billsplitter.desc':
    'A small C# utility for splitting shared expenses fairly between friends.',
  'proj.annotations.desc':
    'Custom validation attributes for .NET — extending Data Annotations for real-world form rules.',
  'proj.prision.desc':
    'Information system for managing a state prison facility — inmates, records and control workflows.',
  'proj.authsite.desc':
    'Microsite handling failed-authentication flows for a digital safety-deposit product.',

  // Skills
  'skills.label': 'Skills',
  'skills.title': 'The toolbox.',
  'skills.groupFrontend': 'Frontend',
  'skills.groupBackend': 'Backend',
  'skills.groupData': 'Data & Cloud',
  'skills.groupPractices': 'Practices & Tooling',

  // Education (degree names; institutions stay literal)
  'edu.lambton': 'Computer Software & Database Development',
  'edu.tadeo': 'Systems Engineering',
  'edu.fedesoft': 'Fullstack & Hybrid Applications Development',
  'edu.sena': 'Information Systems Analysis & Development',

  // Contact / footer
  'contact.label': 'Contact',
  'contact.title': 'Let’s build something that lasts.',
  'contact.body':
    'I’m open to senior engineering roles, interesting products and good conversations — in English, Spanish or French. The fastest way to reach me is email.',
  'contact.cta': 'Say hello',
  'footer.credit': 'Designed & built with Angular',
  'footer.top': 'Back to top',
};

export type TranslationKey = keyof typeof en;

const fr: Record<TranslationKey, string> = {
  'a11y.skip': 'Aller au contenu',
  'a11y.mainNav': 'Navigation principale',
  'a11y.langSwitcher': 'Langue du site',

  'nav.about': 'À propos',
  'nav.experience': 'Parcours',
  'nav.projects': 'Projets',
  'nav.skills': 'Compétences',
  'nav.contact': 'Contact',

  'hero.status': 'Ouvert à de nouvelles opportunités',
  'hero.location': 'Toronto, Canada',
  'hero.role': 'Ingénieur logiciel fullstack senior',
  'hero.intro':
    'Je conçois et livre des produits web de bout en bout — de l’architecture au moindre détail d’interaction — avec Angular, .NET et plus de 8 ans d’expérience en production.',
  'hero.ctaProjects': 'Travaux choisis',
  'hero.ctaContact': 'Me contacter',
  'hero.scroll': 'Défiler',

  'about.label': 'À propos',
  'about.title': 'Du premier commit à la production.',
  'about.p1':
    'Je suis Deiby, ingénieur fullstack installé à Toronto. Depuis plus de huit ans, je développe des logiciels pour la travel tech, l’audiovisuel, les télécoms et la finance — en menant les projets des exigences jusqu’à la production, et en continuant de les améliorer bien après la mise en ligne.',
  'about.p2':
    'Mon terrain de jeu, c’est la stack Angular + .NET, avec une solide expérience de React, Blazor et des systèmes temps réel. Je tiens à une architecture propre, des estimations honnêtes et des interfaces qui semblent évidentes.',
  'about.factsLocation': 'Basé à',
  'about.factsLanguages': 'Langues',
  'about.factsEducation': 'Formation',
  'about.langEn': 'Anglais',
  'about.langFr': 'Français',
  'about.langEs': 'Espagnol',
  'about.levelEn': 'Professionnel',
  'about.levelFr': 'En apprentissage',
  'about.levelEs': 'Langue maternelle',

  'stats.years': 'Années d’expérience',
  'stats.companies': 'Entreprises et secteurs',
  'stats.countries': 'Pays d’exercice',
  'stats.languages': 'Langues de travail',

  'exp.label': 'Parcours',
  'exp.title': 'Là où j’ai construit.',
  'exp.now': 'Auj.',
  'exp.triparc.role': 'Développeur logiciel senior',
  'exp.triparc.summary':
    'Développement de fonctionnalités sur une plateforme de technologie de voyage à grande échelle : modernisation d’une stack web .NET héritée vers Angular et .NET Core, et livraison de fonctionnalités de bout en bout avec Entity Framework et SQL Server.',
  'exp.enlace.role': 'Développeur fullstack',
  'exp.enlace.summary':
    'Développement et maintenance d’une plateforme web de streaming vidéo pour une chaîne de télévision internationale — nouvelles fonctionnalités, performance et fiabilité — avec Angular, .NET Core, Entity Framework et SQL Server.',
  'exp.overactive.role': 'Ingénieur logiciel fullstack',
  'exp.overactive.summary':
    'Développement d’applications pour un client américain avec React et Next.js (rendu côté serveur) et GraphQL, en parallèle de projets Angular, .NET Core et SQL Server.',
  'exp.novatec.role': 'Développeur senior',
  'exp.novatec.summary':
    'Intervention sur tout le cycle de vie logiciel — conception, développement, tests et support — pour des applications Angular destinées à un opérateur de télécommunications.',
  'exp.fitideas.role': 'Développeur logiciel',
  'exp.fitideas.summary':
    'Création de fonctionnalités de visualisation de données en temps réel sur carte, avec WebSockets, .NET Core, Angular et Redux pour la gestion d’état.',
  'exp.colvatel.role': 'Ingénieur de développement',
  'exp.colvatel.summary':
    'Pilotage d’une plateforme éducative hybride mobile et web, des exigences à la production, pour le secteur privé, avec Angular, .NET Core et Ionic.',

  'proj.label': 'Projets',
  'proj.title': 'Ce que je bricole.',
  'proj.sub':
    'Une sélection de projets personnels — le code de production vit dans des dépôts privés, mais ceux-ci montrent ma façon de penser.',
  'proj.view': 'Voir sur GitHub',
  'proj.wms.desc':
    'Système de gestion d’inventaire avec produits, clients et bons de commande, construit sur la stack MERN en TypeScript.',
  'proj.contacts.desc':
    'Application de gestion de contacts explorant le modèle de composants de Blazor et le fullstack .NET.',
  'proj.billsplitter.desc':
    'Petit utilitaire C# pour partager équitablement des dépenses entre amis.',
  'proj.annotations.desc':
    'Attributs de validation personnalisés pour .NET — étendre les Data Annotations à des règles de formulaire réelles.',
  'proj.prision.desc':
    'Système d’information pour la gestion d’un établissement pénitentiaire — détenus, dossiers et flux de contrôle.',
  'proj.authsite.desc':
    'Microsite gérant les parcours d’authentification échouée pour un produit de coffre-fort numérique.',

  'skills.label': 'Compétences',
  'skills.title': 'La boîte à outils.',
  'skills.groupFrontend': 'Frontend',
  'skills.groupBackend': 'Backend',
  'skills.groupData': 'Données & Cloud',
  'skills.groupPractices': 'Pratiques & Outils',

  'edu.lambton': 'Développement logiciel et bases de données',
  'edu.tadeo': 'Ingénierie des systèmes',
  'edu.fedesoft': 'Développement fullstack et applications hybrides',
  'edu.sena': 'Analyse et développement de systèmes d’information',

  'contact.label': 'Contact',
  'contact.title': 'Construisons quelque chose qui dure.',
  'contact.body':
    'Je suis ouvert aux postes d’ingénierie senior, aux produits intéressants et aux bonnes conversations — en anglais, en espagnol ou en français. Le plus rapide reste le courriel.',
  'contact.cta': 'Dire bonjour',
  'footer.credit': 'Conçu et développé avec Angular',
  'footer.top': 'Haut de page',
};

const es: Record<TranslationKey, string> = {
  'a11y.skip': 'Saltar al contenido',
  'a11y.mainNav': 'Navegación principal',
  'a11y.langSwitcher': 'Idioma del sitio',

  'nav.about': 'Sobre mí',
  'nav.experience': 'Experiencia',
  'nav.projects': 'Proyectos',
  'nav.skills': 'Habilidades',
  'nav.contact': 'Contacto',

  'hero.status': 'Abierto a nuevas oportunidades',
  'hero.location': 'Toronto, Canadá',
  'hero.role': 'Ingeniero de software fullstack senior',
  'hero.intro':
    'Diseño y entrego productos web de principio a fin — desde la arquitectura hasta el último detalle de interacción — con Angular, .NET y más de 8 años de experiencia en producción.',
  'hero.ctaProjects': 'Trabajo seleccionado',
  'hero.ctaContact': 'Hablemos',
  'hero.scroll': 'Desliza',

  'about.label': 'Sobre mí',
  'about.title': 'Del primer commit a producción.',
  'about.p1':
    'Soy Deiby, ingeniero fullstack radicado en Toronto. Durante más de ocho años he construido software para travel tech, televisión, telecomunicaciones y finanzas — liderando proyectos desde los requisitos hasta producción, y quedándome después del lanzamiento para hacerlos mejores.',
  'about.p2':
    'Mi terreno natural es el stack Angular + .NET, con bastante kilometraje en React, Blazor y sistemas en tiempo real. Me importan la arquitectura limpia, las estimaciones honestas y las interfaces que se sienten naturales.',
  'about.factsLocation': 'Ubicado en',
  'about.factsLanguages': 'Idiomas',
  'about.factsEducation': 'Formación',
  'about.langEn': 'Inglés',
  'about.langFr': 'Francés',
  'about.langEs': 'Español',
  'about.levelEn': 'Profesional',
  'about.levelFr': 'Aprendiendo',
  'about.levelEs': 'Nativo',

  'stats.years': 'Años de experiencia',
  'stats.companies': 'Empresas e industrias',
  'stats.countries': 'Países de trabajo',
  'stats.languages': 'Idiomas de trabajo',

  'exp.label': 'Experiencia',
  'exp.title': 'Donde he construido.',
  'exp.now': 'Hoy',
  'exp.triparc.role': 'Desarrollador de Software Senior',
  'exp.triparc.summary':
    'Desarrollo de funcionalidades en una plataforma de tecnología de viajes a gran escala: liderando la modernización de un stack web .NET heredado hacia Angular y .NET Core, y entregando funcionalidad de extremo a extremo con Entity Framework y SQL Server.',
  'exp.enlace.role': 'Desarrollador Fullstack',
  'exp.enlace.summary':
    'Construcción y mantenimiento de una plataforma web de streaming de video para una cadena de televisión internacional — nuevas funcionalidades, rendimiento y confiabilidad — con Angular, .NET Core, Entity Framework y SQL Server.',
  'exp.overactive.role': 'Ingeniero de Software Fullstack',
  'exp.overactive.summary':
    'Desarrollo de aplicaciones para un cliente de EE. UU. con React y Next.js (renderizado del lado del servidor) y GraphQL, junto con proyectos en Angular, .NET Core y SQL Server.',
  'exp.novatec.role': 'Desarrollador Senior',
  'exp.novatec.summary':
    'Entrega a lo largo de todo el ciclo de vida del software — diseño, desarrollo, pruebas y soporte — construyendo aplicaciones Angular para una empresa de telecomunicaciones.',
  'exp.fitideas.role': 'Desarrollador de Software',
  'exp.fitideas.summary':
    'Creación de funcionalidades de visualización de datos en tiempo real sobre mapas, usando WebSockets, .NET Core, Angular y Redux para el manejo de estado.',
  'exp.colvatel.role': 'Ingeniero de Desarrollo',
  'exp.colvatel.summary':
    'Liderazgo de una plataforma educativa híbrida móvil y web, desde los requisitos hasta producción, para el sector privado, con Angular, .NET Core e Ionic.',

  'proj.label': 'Proyectos',
  'proj.title': 'Lo que construyo por gusto.',
  'proj.sub':
    'Trabajo personal seleccionado — el código de producción vive en repositorios privados, pero estos muestran cómo pienso.',
  'proj.view': 'Ver en GitHub',
  'proj.wms.desc':
    'Sistema de gestión de inventario con productos, clientes y órdenes de compra, construido sobre el stack MERN con TypeScript.',
  'proj.contacts.desc':
    'Aplicación de gestión de contactos explorando el modelo de componentes de Blazor y el fullstack .NET.',
  'proj.billsplitter.desc':
    'Pequeña utilidad en C# para dividir gastos compartidos de forma justa entre amigos.',
  'proj.annotations.desc':
    'Atributos de validación personalizados para .NET — extendiendo Data Annotations a reglas de formulario reales.',
  'proj.prision.desc':
    'Sistema de información para la gestión de una cárcel estatal — internos, expedientes y flujos de control.',
  'proj.authsite.desc':
    'Micrositio que gestiona los flujos de autenticación fallida para un producto de caja de seguridad digital.',

  'skills.label': 'Habilidades',
  'skills.title': 'La caja de herramientas.',
  'skills.groupFrontend': 'Frontend',
  'skills.groupBackend': 'Backend',
  'skills.groupData': 'Datos & Cloud',
  'skills.groupPractices': 'Prácticas & Herramientas',

  'edu.lambton': 'Desarrollo de Software y Bases de Datos',
  'edu.tadeo': 'Ingeniería de Sistemas',
  'edu.fedesoft': 'Desarrollo Fullstack y Aplicaciones Híbridas',
  'edu.sena': 'Análisis y Desarrollo de Sistemas de Información',

  'contact.label': 'Contacto',
  'contact.title': 'Construyamos algo que perdure.',
  'contact.body':
    'Estoy abierto a roles de ingeniería senior, productos interesantes y buenas conversaciones — en inglés, español o francés. La vía más rápida es el correo.',
  'contact.cta': 'Escríbeme',
  'footer.credit': 'Diseñado y construido con Angular',
  'footer.top': 'Volver arriba',
};

export const TRANSLATIONS: Record<Lang, Record<TranslationKey, string>> = { en, fr, es };
