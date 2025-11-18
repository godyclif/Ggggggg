
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        team: "Team",
        track: "Track",
        testimonials: "Testimonials",
        contact: "Contact"
      },
      hero: {
        title: "Fast & Reliable Logistics Solutions",
        subtitle: "RapidWave Logistics - Your trusted partner for 5 years of excellence in shipping and transport",
        cta: "Get Started",
        learnMore: "Learn More"
      },
      about: {
        title: "About RapidWave Logistics",
        content: "This company has been transporting for 5 years now and we recently just got our website built to serve more customers worldwide. Our commitment to excellence and customer satisfaction has made us a leader in the logistics industry.",
        mission: "Our Mission",
        missionText: "To provide fast, reliable, and cost-effective logistics solutions globally."
      },
      track: {
        title: "Track Your Shipment",
        subtitle: "Enter your tracking number to check your shipment status",
        placeholder: "Enter tracking number",
        button: "Track Shipment",
        note: "Real-time tracking coming soon"
      },
      team: {
        title: "Meet Our Team",
        subtitle: "Experienced professionals dedicated to your logistics needs"
      },
      testimonials: {
        title: "What Our Clients Say",
        subtitle: "Real experiences from our valued customers"
      },
      contact: {
        title: "Get In Touch",
        subtitle: "We're here to help with your logistics needs",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message"
      },
      footer: {
        about: "RapidWave Logistics has been providing reliable shipping and transport services for 5 years.",
        rights: "All rights reserved."
      }
    }
  },
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        about: "À Propos",
        team: "Équipe",
        track: "Suivi",
        testimonials: "Témoignages",
        contact: "Contact"
      },
      hero: {
        title: "Solutions Logistiques Rapides et Fiables",
        subtitle: "RapidWave Logistics - Votre partenaire de confiance depuis 5 ans d'excellence dans l'expédition et le transport",
        cta: "Commencer",
        learnMore: "En Savoir Plus"
      },
      about: {
        title: "À Propos de RapidWave Logistics",
        content: "Cette entreprise transporte des marchandises depuis 5 ans maintenant et nous venons de créer notre site web pour servir plus de clients dans le monde entier. Notre engagement envers l'excellence et la satisfaction client a fait de nous un leader dans l'industrie de la logistique.",
        mission: "Notre Mission",
        missionText: "Fournir des solutions logistiques rapides, fiables et rentables à l'échelle mondiale."
      },
      track: {
        title: "Suivez Votre Envoi",
        subtitle: "Entrez votre numéro de suivi pour vérifier le statut de votre envoi",
        placeholder: "Entrez le numéro de suivi",
        button: "Suivre l'Envoi",
        note: "Suivi en temps réel bientôt disponible"
      },
      team: {
        title: "Rencontrez Notre Équipe",
        subtitle: "Des professionnels expérimentés dédiés à vos besoins logistiques"
      },
      testimonials: {
        title: "Ce Que Disent Nos Clients",
        subtitle: "Expériences réelles de nos clients estimés"
      },
      contact: {
        title: "Contactez-Nous",
        subtitle: "Nous sommes là pour vous aider avec vos besoins logistiques",
        name: "Nom",
        email: "Email",
        message: "Message",
        send: "Envoyer le Message"
      },
      footer: {
        about: "RapidWave Logistics fournit des services d'expédition et de transport fiables depuis 5 ans.",
        rights: "Tous droits réservés."
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
