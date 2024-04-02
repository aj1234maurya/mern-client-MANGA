import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// let storedLanguage = localStorage.getItem("i18nextLng");

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    // lng: storedLanguage,
    resources: {
      en: {
        translation: {
          name: "Name",
          email: "Email",
          password: "Password",
          register: "Register",
          sign_up: "Sign Up",
          already: "Already have an account?",
          log: "Login",
        },
      },
      hi: {
        translation: {
          name: "नाम",
          email: "ईमेल",
          password: "पासवर्ड",
          register: "पंजीकृत करें",
          sign_up: "नाम लिखो",
          already: "पहले से ही एक खाता है?",
          log: "लॉगिन",
        },
      },
    },
  });

// export default i18n;
