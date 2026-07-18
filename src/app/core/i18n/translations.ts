/**
 * Runtime translation dictionaries.
 *
 * English is the source of truth: its keys define the `TranslationKey` type,
 * so the compiler guarantees French and Spanish stay complete. A missing or
 * misspelled key in any language is a build error, not a silent blank string.
 *
 * Copy conventions: no em dashes anywhere; French uses a narrow no-break
 * space ( ) before ':'; Spanish job titles use sentence case.
 */

export const LANGS = ['en', 'fr', 'es'] as const;
export type Lang = (typeof LANGS)[number];

const en = {
  // Accessibility / chrome
  'a11y.skip': 'Skip to content',
  'a11y.mainNav': 'Main navigation',
  'a11y.menu': 'Menu',
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
    'I design and ship web products end to end, from architecture to the last interaction detail, with Angular, .NET and nearly a decade of production experience.',
  'hero.ctaProjects': 'Selected work',
  'hero.ctaContact': 'Get in touch',
  'hero.scroll': 'Scroll',

  // About
  'about.label': 'About',
  'about.title': 'From first commit to production.',
  'about.p1':
    'I’m Deiby, a fullstack engineer based in Toronto. For nearly a decade I’ve built software for travel tech, broadcasting, telecom and finance, leading projects from requirements to production and staying long after release to make them better.',
  'about.p2':
    'My home turf is the Angular + .NET stack, with serious mileage in React, Blazor and real-time systems. I care about clean architecture, honest estimates and interfaces that feel effortless. These days I’m channeling all of it into AI-assisted products.',
  'about.factsLocation': 'Based in',
  'about.factsLanguages': 'Languages',
  'about.factsEducation': 'Education',
  'about.langEn': 'English',
  'about.langFr': 'French',
  'about.langEs': 'Spanish',
  'about.levelEn': 'Professional',
  'about.levelFr': 'Advanced (B2)',
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
    'Built and maintained a video-streaming web platform for an international TV network, focusing on new features, performance and reliability, with Angular, .NET Core, Entity Framework and SQL Server.',
  'exp.overactive.role': 'Fullstack Software Engineer',
  'exp.overactive.summary':
    'Developed applications for a US client using React and Next.js with server-side rendering and GraphQL, alongside Angular, .NET Core and SQL Server product work.',
  'exp.novatec.role': 'Senior Developer',
  'exp.novatec.summary':
    'Delivered across the full software lifecycle, from design and development to testing and support, building Angular and Python solutions used daily by consultants and customers of Claro, a major telecom.',
  'exp.fitideas.role': 'Software Developer',
  'exp.fitideas.summary':
    'Created real-time, map-based data-visualization features using WebSockets, .NET Core, Angular and Redux for state management.',
  'exp.colvatel.role': 'Development Engineer',
  'exp.colvatel.summary':
    'Built web and mobile applications for a telecommunications company: Ionic and Angular on the front, C# services over MongoDB and SQL Server behind them.',
  'exp.itehl.role': 'Software Developer',
  'exp.itehl.summary':
    'Developed a new online-education platform from the ground up with .NET Core, Angular and SQL Server.',

  // Projects
  'proj.label': 'Projects',
  'proj.title': 'Things I tinker with.',
  'proj.sub':
    'Selected personal work. The production code lives in private repos, but these show how I think.',
  'proj.view': 'View on GitHub',
  'proj.featured': 'Featured',
  'proj.wip': 'In development',
  'proj.langgrade.desc':
    'AI-powered language-learning platform: automated proficiency grading and personalized feedback across languages. Born from my own journey to French fluency.',
  'proj.wms.desc':
    'Inventory management system with products, customers and purchase orders, built on the MERN stack with TypeScript.',
  'proj.contacts.desc':
    'Contact management app exploring Blazor’s component model and .NET fullstack development.',
  'proj.billsplitter.desc':
    'A small C# utility for splitting shared expenses fairly between friends.',
  'proj.annotations.desc':
    'Custom validation attributes for .NET, extending Data Annotations to real-world form rules.',
  'proj.prision.desc':
    'Information system for managing a state prison facility: inmates, records and control workflows.',
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
    'I’m open to senior engineering roles, interesting products and good conversations, in English, Spanish or French. The fastest way to reach me is email.',
  'contact.cta': 'Say hello',
  'contact.ctaCall': 'Book a call',
  'footer.credit': 'Designed & built with Angular',
  'footer.top': 'Back to top',
};

export type TranslationKey = keyof typeof en;

const fr: Record<TranslationKey, string> = {
  'a11y.skip': 'Aller au contenu',
  'a11y.mainNav': 'Navigation principale',
  'a11y.menu': 'Menu',
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
    'Je conçois et livre des produits web de bout en bout, de l’architecture au moindre détail d’interaction, avec Angular, .NET et près de dix ans d’expérience en production.',
  'hero.ctaProjects': 'Travaux choisis',
  'hero.ctaContact': 'Me contacter',
  'hero.scroll': 'Défiler',

  'about.label': 'À propos',
  'about.title': 'Du premier commit à la production.',
  'about.p1':
    'Je suis Deiby, ingénieur fullstack installé à Toronto. Depuis près de dix ans, je développe des logiciels pour la travel tech, l’audiovisuel, les télécoms et la finance, en menant les projets des exigences jusqu’à la production et en continuant de les améliorer bien après la mise en ligne.',
  'about.p2':
    'Mon terrain de jeu, c’est la stack Angular + .NET, avec une solide expérience de React, Blazor et des systèmes temps réel. Je tiens à une architecture propre, des estimations honnêtes et des interfaces qui semblent évidentes. Ces temps-ci, je mets tout cela au service de produits assistés par l’IA.',
  'about.factsLocation': 'Basé à',
  'about.factsLanguages': 'Langues',
  'about.factsEducation': 'Formation',
  'about.langEn': 'Anglais',
  'about.langFr': 'Français',
  'about.langEs': 'Espagnol',
  'about.levelEn': 'Professionnel',
  'about.levelFr': 'Avancé (B2)',
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
    'Développement de fonctionnalités sur une plateforme de technologie de voyage à grande échelle : modernisation d’une stack web .NET héritée vers Angular et .NET Core, et livraison de fonctionnalités de bout en bout avec Entity Framework et SQL Server.',
  'exp.enlace.role': 'Développeur fullstack',
  'exp.enlace.summary':
    'Développement et maintenance d’une plateforme web de streaming vidéo pour une chaîne de télévision internationale, avec un accent sur les nouvelles fonctionnalités, la performance et la fiabilité, en Angular, .NET Core, Entity Framework et SQL Server.',
  'exp.overactive.role': 'Ingénieur logiciel fullstack',
  'exp.overactive.summary':
    'Développement d’applications pour un client américain avec React et Next.js (rendu côté serveur) et GraphQL, en parallèle de projets Angular, .NET Core et SQL Server.',
  'exp.novatec.role': 'Développeur senior',
  'exp.novatec.summary':
    'Intervention sur tout le cycle de vie logiciel, de la conception au support en passant par les tests, avec des solutions Angular et Python utilisées au quotidien par les consultants et clients de Claro, grand opérateur télécom.',
  'exp.fitideas.role': 'Développeur logiciel',
  'exp.fitideas.summary':
    'Création de fonctionnalités de visualisation de données en temps réel sur carte, avec WebSockets, .NET Core, Angular et Redux pour la gestion d’état.',
  'exp.colvatel.role': 'Ingénieur de développement',
  'exp.colvatel.summary':
    'Développement d’applications web et mobiles pour un opérateur de télécommunications : Ionic et Angular côté front, services C# sur MongoDB et SQL Server côté back.',
  'exp.itehl.role': 'Développeur logiciel',
  'exp.itehl.summary':
    'Développement d’une nouvelle plateforme de formation en ligne à partir de zéro, avec .NET Core, Angular et SQL Server.',

  'proj.label': 'Projets',
  'proj.title': 'Ce que je bricole.',
  'proj.sub':
    'Une sélection de projets personnels. Le code de production vit dans des dépôts privés, mais ceux-ci montrent ma façon de penser.',
  'proj.view': 'Voir sur GitHub',
  'proj.featured': 'À la une',
  'proj.wip': 'En développement',
  'proj.langgrade.desc':
    'Plateforme d’apprentissage des langues propulsée par l’IA : évaluation automatique du niveau et retours personnalisés, toutes langues confondues. Née de mon propre chemin vers un français courant.',
  'proj.wms.desc':
    'Système de gestion d’inventaire avec produits, clients et bons de commande, construit sur la stack MERN en TypeScript.',
  'proj.contacts.desc':
    'Application de gestion de contacts explorant le modèle de composants de Blazor et le fullstack .NET.',
  'proj.billsplitter.desc':
    'Petit utilitaire C# pour partager équitablement des dépenses entre amis.',
  'proj.annotations.desc':
    'Attributs de validation personnalisés pour .NET, pour étendre les Data Annotations à des règles de formulaire réelles.',
  'proj.prision.desc':
    'Système d’information pour la gestion d’un établissement pénitentiaire : détenus, dossiers et flux de contrôle.',
  'proj.authsite.desc':
    'Microsite gérant les parcours d’authentification échouée pour un produit de coffre-fort numérique.',

  'skills.label': 'Compétences',
  'skills.title': 'La boîte à outils.',
  'skills.groupFrontend': 'Frontend',
  'skills.groupBackend': 'Backend',
  'skills.groupData': 'Données et cloud',
  'skills.groupPractices': 'Pratiques et outils',

  'edu.lambton': 'Développement logiciel et bases de données',
  'edu.tadeo': 'Ingénierie des systèmes',
  'edu.fedesoft': 'Développement fullstack et applications hybrides',
  'edu.sena': 'Analyse et développement de systèmes d’information',

  'contact.label': 'Contact',
  'contact.title': 'Construisons quelque chose qui dure.',
  'contact.body':
    'Je suis ouvert aux postes d’ingénierie senior, aux produits intéressants et aux bonnes conversations, en anglais, en espagnol ou en français. Le plus rapide reste le courriel.',
  'contact.cta': 'Dire bonjour',
  'contact.ctaCall': 'Réserver un appel',
  'footer.credit': 'Conçu et développé avec Angular',
  'footer.top': 'Haut de page',
};

const es: Record<TranslationKey, string> = {
  'a11y.skip': 'Saltar al contenido',
  'a11y.mainNav': 'Navegación principal',
  'a11y.menu': 'Menú',
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
    'Diseño y entrego productos web de principio a fin, desde la arquitectura hasta el último detalle de interacción, con Angular, .NET y casi una década de experiencia en producción.',
  'hero.ctaProjects': 'Trabajo seleccionado',
  'hero.ctaContact': 'Hablemos',
  'hero.scroll': 'Desliza',

  'about.label': 'Sobre mí',
  'about.title': 'Del primer commit a producción.',
  'about.p1':
    'Soy Deiby, ingeniero fullstack radicado en Toronto. Durante casi una década he construido software para travel tech, televisión, telecomunicaciones y finanzas, liderando proyectos desde los requisitos hasta producción y quedándome después del lanzamiento para hacerlos mejores.',
  'about.p2':
    'Mi terreno natural es el stack Angular + .NET, con bastante kilometraje en React, Blazor y sistemas en tiempo real. Me importan la arquitectura limpia, las estimaciones honestas y las interfaces que se sienten naturales. Últimamente pongo todo eso al servicio de productos asistidos por IA.',
  'about.factsLocation': 'Ubicado en',
  'about.factsLanguages': 'Idiomas',
  'about.factsEducation': 'Formación',
  'about.langEn': 'Inglés',
  'about.langFr': 'Francés',
  'about.langEs': 'Español',
  'about.levelEn': 'Profesional',
  'about.levelFr': 'Avanzado (B2)',
  'about.levelEs': 'Nativo',

  'stats.years': 'Años de experiencia',
  'stats.companies': 'Empresas e industrias',
  'stats.countries': 'Países de trabajo',
  'stats.languages': 'Idiomas de trabajo',

  'exp.label': 'Experiencia',
  'exp.title': 'Donde he construido.',
  'exp.now': 'Hoy',
  'exp.triparc.role': 'Desarrollador de software senior',
  'exp.triparc.summary':
    'Desarrollo de funcionalidades en una plataforma de tecnología de viajes a gran escala: liderando la modernización de un stack web .NET heredado hacia Angular y .NET Core, y entregando funcionalidad de extremo a extremo con Entity Framework y SQL Server.',
  'exp.enlace.role': 'Desarrollador fullstack',
  'exp.enlace.summary':
    'Construcción y mantenimiento de una plataforma web de streaming de video para una cadena de televisión internacional, con foco en nuevas funcionalidades, rendimiento y confiabilidad, usando Angular, .NET Core, Entity Framework y SQL Server.',
  'exp.overactive.role': 'Ingeniero de software fullstack',
  'exp.overactive.summary':
    'Desarrollo de aplicaciones para un cliente de EE. UU. con React y Next.js (renderizado del lado del servidor) y GraphQL, junto con proyectos en Angular, .NET Core y SQL Server.',
  'exp.novatec.role': 'Desarrollador senior',
  'exp.novatec.summary':
    'Entrega a lo largo de todo el ciclo de vida del software, del diseño al soporte pasando por las pruebas, con soluciones en Angular y Python usadas a diario por consultores y clientes de Claro, gran operador de telecomunicaciones.',
  'exp.fitideas.role': 'Desarrollador de software',
  'exp.fitideas.summary':
    'Creación de funcionalidades de visualización de datos en tiempo real sobre mapas, usando WebSockets, .NET Core, Angular y Redux para el manejo de estado.',
  'exp.colvatel.role': 'Ingeniero de desarrollo',
  'exp.colvatel.summary':
    'Construcción de aplicaciones web y móviles para una empresa de telecomunicaciones: Ionic y Angular en el front, servicios en C# sobre MongoDB y SQL Server en el back.',
  'exp.itehl.role': 'Desarrollador de software',
  'exp.itehl.summary':
    'Desarrollo de una nueva plataforma de educación en línea desde cero, con .NET Core, Angular y SQL Server.',

  'proj.label': 'Proyectos',
  'proj.title': 'Lo que construyo por gusto.',
  'proj.sub':
    'Trabajo personal seleccionado. El código de producción vive en repositorios privados, pero estos muestran cómo pienso.',
  'proj.view': 'Ver en GitHub',
  'proj.featured': 'Destacado',
  'proj.wip': 'En desarrollo',
  'proj.langgrade.desc':
    'Plataforma de aprendizaje de idiomas impulsada por IA: evaluación automática del nivel y retroalimentación personalizada en varios idiomas. Nacida de mi propio camino hacia la fluidez en francés.',
  'proj.wms.desc':
    'Sistema de gestión de inventario con productos, clientes y órdenes de compra, construido sobre el stack MERN con TypeScript.',
  'proj.contacts.desc':
    'Aplicación de gestión de contactos explorando el modelo de componentes de Blazor y el fullstack .NET.',
  'proj.billsplitter.desc':
    'Pequeña utilidad en C# para dividir gastos compartidos de forma justa entre amigos.',
  'proj.annotations.desc':
    'Atributos de validación personalizados para .NET, extendiendo Data Annotations a reglas de formulario reales.',
  'proj.prision.desc':
    'Sistema de información para la gestión de una cárcel estatal: internos, expedientes y flujos de control.',
  'proj.authsite.desc':
    'Micrositio que gestiona los flujos de autenticación fallida para un producto de caja de seguridad digital.',

  'skills.label': 'Habilidades',
  'skills.title': 'La caja de herramientas.',
  'skills.groupFrontend': 'Frontend',
  'skills.groupBackend': 'Backend',
  'skills.groupData': 'Datos y cloud',
  'skills.groupPractices': 'Prácticas y herramientas',

  'edu.lambton': 'Desarrollo de Software y Bases de Datos',
  'edu.tadeo': 'Ingeniería de Sistemas',
  'edu.fedesoft': 'Desarrollo Fullstack y Aplicaciones Híbridas',
  'edu.sena': 'Análisis y Desarrollo de Sistemas de Información',

  'contact.label': 'Contacto',
  'contact.title': 'Construyamos algo que perdure.',
  'contact.body':
    'Estoy abierto a roles de ingeniería senior, productos interesantes y buenas conversaciones, en inglés, español o francés. La vía más rápida es el correo.',
  'contact.cta': 'Escríbeme',
  'contact.ctaCall': 'Agenda una llamada',
  'footer.credit': 'Diseñado y construido con Angular',
  'footer.top': 'Volver arriba',
};

export const TRANSLATIONS: Record<Lang, Record<TranslationKey, string>> = { en, fr, es };
