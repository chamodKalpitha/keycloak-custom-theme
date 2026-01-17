import { i18nBuilder } from "@keycloakify/login-ui/i18n";
import type { ThemeName } from "@/kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { I18nProvider, useI18n } = i18nBuilder
  .withThemeName<ThemeName>()
  .withCustomTranslations({
    en: {
      welcomeMessage:
        "Welcome to Acme inc - Your gateway to seamless planning and organization.",
      loginAccountTitle: "Login to your account",
      registerTitle: "Register a new account",
      registerSubtitle: "Create your account to get started",
      email: "Email",
      enterCredentials: "Enter your credentials below to login",
      noAccount: "Don't have an account?",
      doRegister: "Sign up",
      updatePasswordTitleSubtitle: "Protect your account with a new password",
      "organization.selectTitle": "Choose Your Organization",
      "organization.pickPlaceholder": "Pick an organization to continue",
      "carousel.slide1.title": "Get a premium business address.",
      "carousel.slide1.description":
        "Take your business to the next level with a unique, physical U.S. address and a virtual mailbox accessible anywhere, anytime. Manage your mail with ease, and enjoy the benefits of digitized paper mail, multi-user access, and more.",
      "carousel.slide2.title": "One-click access to the best growth tools.",
      "carousel.slide2.description":
        "Apply for banking, payments, payroll, accounting, and more with Firstbase Loop and get onboarded in seconds. No more lengthy applications or manual data entry. Just seamless access to the tools you need to grow your business.",
      "carousel.slide3.title": "Your company's all-in-one compliance solution",
      "carousel.slide3.description":
        "Put ongoing compliance, filings, and reports on autopilot. Never miss a deadline. Now includes beneficial ownership filings. Stay compliant with ease and focus on what matters most - growing your business.",
    },
    ar: {
      welcomeMessage:
        "مرحبًا بك في Acme inc - بوابتك إلى التخطيط والتنظيم السلس.",
      loginAccountTitle: "تسجيل الدخول  إلى حسابك",
      registerTitle: "تسجيل حساب جديد",
      registerSubtitle: "أنشئ حسابك للبدء",
      email: "البريد الإلكتروني",
      enterCredentials: "أدخل بيانات الاعتماد الخاصة بك أدناه لتسجيل الدخول",
      doRegister: "إنشاء حساب",
      noAccount: "ليس لديك حساب؟",
      updatePasswordTitleSubtitle: "احمِ حسابك بكلمة مرور جديدة",
      "organization.selectTitle": "اختر مؤسستك",
      "organization.pickPlaceholder": "اختر مؤسسة للمتابعة",
      "carousel.slide1.title": "احصل على عنوان أعمال مميز.",
      "carousel.slide1.description":
        "ارتقِ بعملك إلى المستوى التالي مع عنوان أمريكي فعلي وصندوق بريد افتراضي يمكنك الوصول إليه من أي مكان وفي أي وقت. أدر بريدك بسهولة واستفد من رقمنة البريد وإمكانية تعدد المستخدمين والمزيد.",

      "carousel.slide2.title": "وصول بنقرة واحدة إلى أفضل أدوات النمو.",
      "carousel.slide2.description":
        "قدّم على الخدمات البنكية والمدفوعات والرواتب والمحاسبة والمزيد باستخدام Firstbase Loop وابدأ خلال ثوانٍ. لا مزيد من الطلبات الطويلة أو الإدخال اليدوي. فقط وصول سهل للأدوات التي تحتاجها لتنمية عملك.",

      "carousel.slide3.title": "حل متكامل لامتثال شركتك",
      "carousel.slide3.description":
        "ضع الامتثال والتقارير والتقديمات الدورية على الوضع التلقائي. لا تفوت أي موعد نهائي. يشمل الآن تقارير الملكية الفعلية. حافظ على الامتثال وركّز على تنمية عملك.",
    },
    fr: {
      welcomeMessage:
        "Bienvenue sur Acme inc Votre passerelle vers une planification et une organisation sans faille.",
      loginAccountTitle: "Connectez-vous à votre compte",
      registerTitle: "Créer    un nouveau compte",
      registerSubtitle: "Créez votre compte pour commencer",
      email: "E-mail",
      enterCredentials:
        "Entrez vos informations d'identification ci-dessous pour vous connecter",
      doRegister: "S'inscrire",
      noAccount: "Vous n'avez pas de compte?",
      updatePasswordTitleSubtitle:
        "Protégez votre compte avec un nouveau mot de passe",
      "organization.selectTitle": "Choisissez Votre Organisation",
      "organization.pickPlaceholder":
        "Sélectionnez une organisation pour continuer",
      "carousel.slide1.title": "Obtenez une adresse professionnelle premium.",
      "carousel.slide1.description":
        "Faites passer votre entreprise au niveau supérieur avec une adresse physique aux États-Unis et une boîte aux lettres virtuelle accessible partout et à tout moment. Gérez votre courrier facilement et profitez du courrier numérisé, de l’accès multi-utilisateurs, et plus encore.",

      "carousel.slide2.title":
        "Accès en un clic aux meilleurs outils de croissance.",
      "carousel.slide2.description":
        "Postulez pour la banque, les paiements, la paie, la comptabilité et plus avec Firstbase Loop et soyez opérationnel en quelques secondes. Plus de formulaires longs ni de saisie manuelle. Juste un accès simple aux outils dont vous avez besoin pour développer votre entreprise.",

      "carousel.slide3.title":
        "La solution tout-en-un pour la conformité de votre entreprise",
      "carousel.slide3.description":
        "Mettez la conformité, les déclarations et les rapports en pilote automatique. Ne manquez plus aucune échéance. Inclut maintenant les déclarations de bénéficiaires effectifs. Restez conforme et concentrez-vous sur la croissance de votre entreprise.",
    },
  })
  .build();

export { I18nProvider, useI18n };
