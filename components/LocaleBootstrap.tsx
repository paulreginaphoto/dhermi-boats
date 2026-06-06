import { InlineRuntimeScript } from "@/components/InlineRuntimeScript";
import { basePath } from "@/lib/site";
import { whatsappNumber } from "@/lib/site";
import { defaultLocale, locales, translations } from "@/lib/i18n";
import { whatsappMessages } from "@/lib/whatsappMessages";

const supportedLocaleSet = JSON.stringify(locales);
const bootstrapBasePath = JSON.stringify(basePath || "");
const bootstrapWhatsappNumber = JSON.stringify(whatsappNumber);
const bootstrapWhatsappMessages = JSON.stringify(whatsappMessages);
const bootstrapDefaultTranslations = JSON.stringify(translations.en);
const localizedPageMetadata = JSON.stringify({
  "/": {
    en: {
      title: "Dhërmi Boat Tours with Local Skipper | Dhermi Boat",
      description:
        "Book premium small-group and private boat tours from Dhërmi with a local skipper. Gjipe, Grama Bay, Blue Cave, sunset tours and WhatsApp availability."
    },
    fr: {
      title: "Tours en bateau à Dhërmi avec skipper local | Dhermi Boat",
      description:
        "Réservez des tours en bateau en petit groupe ou privés depuis Dhërmi avec un skipper local. Gjipe, Grama Bay, Grotte Bleue, coucher de soleil et disponibilité WhatsApp."
    },
    sq: {
      title: "Ture me varkë në Dhërmi me skipper lokal | Dhermi Boat",
      description:
        "Rezervoni ture me varkë në grupe të vogla ose private nga Dhërmiu me skipper lokal. Gjipe, Grama Bay, Shpella Blu, perëndim dhe disponueshmëri në WhatsApp."
    }
  },
  "/tours/": {
    en: {
      title: "Compare Dhermi Boat Tours | Dhermi Boat",
      description: translations.en["page.tours.heroText"] ?? "Prices, timing and stops in one place."
    },
    fr: {
      title: "Comparer les tours en bateau à Dhërmi | Dhermi Boat",
      description: translations.fr["page.tours.heroText"] ?? "Prix, horaires et arrêts au même endroit."
    },
    sq: {
      title: "Krahasoni turet me varkë në Dhërmi | Dhermi Boat",
      description: translations.sq["page.tours.heroText"] ?? "Çmimet, oraret dhe ndalesat në një vend."
    }
  },
  "/boat-photos/": {
    en: {
      title: "Dhermi Boat Tour Photos | Dhermi Boat",
      description: translations.en["page.photos.text"] ?? "Real photos from Gjipe, Grama Bay, Blue Cave and the boat."
    },
    fr: {
      title: "Photos des tours en bateau à Dhërmi | Dhermi Boat",
      description: translations.fr["page.photos.text"] ?? "Photos réelles de Gjipe, Grama Bay, Grotte Bleue et du bateau."
    },
    sq: {
      title: "Foto të tureve me varkë në Dhërmi | Dhermi Boat",
      description: translations.sq["page.photos.text"] ?? "Foto reale nga Gjipe, Grama Bay, Shpella Blu dhe varka."
    }
  },
  "/faq/": {
    en: {
      title: "Dhermi Boat Tour FAQ | Dhermi Boat",
      description: translations.en["section.faq.text"] ?? "Short answers before you book."
    },
    fr: {
      title: "FAQ des tours en bateau à Dhërmi | Dhermi Boat",
      description: translations.fr["section.faq.text"] ?? "Réponses courtes avant de réserver."
    },
    sq: {
      title: "FAQ për turet me varkë në Dhërmi | Dhermi Boat",
      description: translations.sq["section.faq.text"] ?? "Përgjigje të shkurtra para rezervimit."
    }
  },
  "/contact/": {
    en: {
      title: "Contact Dhermi Boat | Booking Form",
      description: "Fill the booking form, then send the completed request by WhatsApp or email."
    },
    fr: {
      title: "Contact Dhermi Boat | Formulaire de réservation",
      description: "Remplissez le formulaire, puis envoyez la demande complète par WhatsApp ou email."
    },
    sq: {
      title: "Kontakt Dhermi Boat | Formular rezervimi",
      description: "Plotësoni formularin, pastaj dërgoni kërkesën me WhatsApp ose email."
    }
  }
});

function toScript(localeList: string, bootstrapBasePath: string, bootstrapWhatsappNumber: string, bootstrapWhatsappMessages: string, bootstrapPageMetadata: string, bootstrapDefaultTranslations: string) {
  return `(function(){
  var locales = new Set(${localeList});
  var defaultLocale = ${JSON.stringify(defaultLocale)};
  var basePath = ${bootstrapBasePath};
  var whatsappNumber = ${bootstrapWhatsappNumber};
  var whatsappMessages = ${bootstrapWhatsappMessages};
  var pageMetadata = ${bootstrapPageMetadata};
  var defaultTranslations = ${bootstrapDefaultTranslations};
  var translationsUrl = (basePath ? basePath : "") + "/locales/translations.json";
  var currentUrl = new URL(window.location.href);
  var searchParams = currentUrl.searchParams;
  var urlLocale = searchParams.get("dlang") || searchParams.get("lang");
  var storedLocale = null;
  var browserLocales = [];

  try { storedLocale = window.localStorage.getItem("dhermi-language"); } catch (_e) {}
  try {
    var navigatorLanguages = window.navigator.languages;
    browserLocales = Array.isArray(navigatorLanguages) && navigatorLanguages.length
      ? navigatorLanguages
      : [window.navigator.language || "en"];
  } catch (_e) {
    browserLocales = ["en"];
  }

  function isLocale(value) {
    return Boolean(value && locales.has(value));
  }

  function normalizeLocale(value) {
    if (!value) return value;
    if (value === "sq-AL") return "sq";
    var normalized = String(value).toLowerCase().replace("_", "-");
    if (normalized === "al" || normalized === "sq-al") return "sq";
    var primary = normalized.split("-")[0];
    return primary === "al" ? "sq" : primary;
  }

  function browserLocale() {
    for (var i = 0; i < browserLocales.length; i += 1) {
      var normalized = normalizeLocale(browserLocales[i]);
      if (isLocale(normalized)) {
        return normalized;
      }
    }
    return defaultLocale;
  }

  function activeLocale() {
    var normalizedUrlLocale = normalizeLocale(urlLocale);
    var normalizedStoredLocale = normalizeLocale(storedLocale);
    if (isLocale(normalizedUrlLocale)) {
      return normalizedUrlLocale;
    }
    if (isLocale(normalizedStoredLocale)) {
      return normalizedStoredLocale;
    }
    return browserLocale();
  }

  var locale = activeLocale();

  function normalizeUrlLocale() {
    if (!searchParams.has("dlang") && !searchParams.has("lang")) return;
    var previous = currentUrl.search;
    searchParams.delete("dlang");
    searchParams.delete("lang");
    if (currentUrl.search !== previous) {
      window.history.replaceState(null, "", currentUrl.pathname + currentUrl.search + currentUrl.hash);
    }
  }

  normalizeUrlLocale();

  try {
    window.localStorage.setItem("dhermi-language", locale);
  } catch (_e) {}

  document.documentElement.lang = locale;

  function selectLocale(selectedLocale) {
    if (!isLocale(selectedLocale)) return;
    locale = selectedLocale;
    try {
      currentUrl = new URL(window.location.href);
      searchParams = currentUrl.searchParams;
      searchParams.delete("dlang");
      searchParams.delete("lang");
      window.history.replaceState(null, "", currentUrl.pathname + currentUrl.search + currentUrl.hash);
      window.localStorage.setItem("dhermi-language", locale);
    } catch (_e) {}
    document.documentElement.lang = locale;
    updateTranslations();
  }

  function applyLocaleSwitchers() {
    try {
    window.document.querySelectorAll("[data-locale-switcher]").forEach(function (button) {
      var nextLocale = button.getAttribute("data-locale");
      var isActive = button.getAttribute("data-locale") === locale;
      button.toggleAttribute("data-active", isActive);
      if (isActive) {
        button.setAttribute("aria-current", "true");
        button.setAttribute("aria-pressed", "true");
      } else {
        button.removeAttribute("aria-current");
        button.setAttribute("aria-pressed", "false");
      }
      if (button.getAttribute("data-locale-listener-bound") !== "true") {
        button.setAttribute("data-locale-listener-bound", "true");
        button.addEventListener("click", function (event) {
          var preventDefault = event && event.preventDefault;
          if (typeof preventDefault === "function") preventDefault.call(event);
          selectLocale(button.getAttribute("data-locale"));
        });
      }
    });
    window.document.querySelectorAll("[data-locale-select]").forEach(function (select) {
      if (select.value !== locale) {
        select.value = locale;
      }
      if (select.getAttribute("data-locale-listener-bound") !== "true") {
        select.setAttribute("data-locale-listener-bound", "true");
        select.addEventListener("change", function () {
          selectLocale(select.value);
        });
      }
    });
    } catch (_e) {}
  }

  applyLocaleSwitchers();

  function writeAttr(element, name, value) {
    if (!element) return;
    var setter = element.setAttribute;
    if (typeof setter === "function") setter.call(element, name, value);
  }

  var unsafeWhatsappSymbols = /[\\uD83C-\\uDBFF][\\uDC00-\\uDFFF]|[\\u2600-\\u27BF]|\\uFFFD/g;

  function cleanWhatsappMessage(message) {
    return String(message || "")
      .replace(unsafeWhatsappSymbols, "")
      .replace(/[ \\t]+\\n/g, "\\n")
      .replace(/\\n{3,}/g, "\\n\\n")
      .trim();
  }

  function bookingFormHref(key) {
    var contactPath = (basePath ? basePath : "") + "/contact/";
    return contactPath + "#book";
  }

  function setContent(node) {
    var key = node.getAttribute("data-i18n");
    if (!key) return;
    var localeValueMap = translationsStore && translationsStore[locale];
    if (!localeValueMap && locale === defaultLocale) localeValueMap = defaultTranslations;
    var value = localeValueMap && localeValueMap[key];
    if (typeof value !== "string") value = defaultTranslations[key];
    if (typeof value === "string") {
      if (node.textContent !== value) {
        node.textContent = value;
      }
    }
  }

  function applyWhatsappLinks() {
    try {
      window.document.querySelectorAll("[data-whatsapp-key]").forEach(function (link) {
        var key = link.getAttribute("data-whatsapp-key");
        var messageMap = key && whatsappMessages[key];
        if (messageMap && link.setAttribute) {
          writeAttr(link, "href", bookingFormHref(key));
          if (link.removeAttribute) {
            link.removeAttribute("target");
            link.removeAttribute("rel");
          }
        }
      });
    } catch (_e) {}
  }

  function applyAnalyticsEvents() {
    try {
      window.document.querySelectorAll("[data-analytics-event-template][data-analytics-tour][data-analytics-placement]").forEach(function (node) {
        var template = node.getAttribute("data-analytics-event-template");
        var tour = node.getAttribute("data-analytics-tour");
        var placement = node.getAttribute("data-analytics-placement");
        if (!template || !tour || !placement) return;
        writeAttr(
          node,
          "data-analytics-event",
          template
            .replace("{tour}", tour)
            .replace("{language}", locale)
            .replace("{placement}", placement)
        );
      });
    } catch (_e) {}
  }

  var translationsStore = null;
  var translationsRequest = null;
  var observerTimer = null;

  function normalizedPathname() {
    var pathname = window.location.pathname || "/";
    if (basePath && pathname.indexOf(basePath + "/") === 0) {
      pathname = pathname.slice(basePath.length);
    }
    if (!pathname) pathname = "/";
    if (pathname !== "/" && pathname.charAt(pathname.length - 1) !== "/") pathname += "/";
    return pathname;
  }

  function setMetaContent(selector, value) {
    if (!value) return;
    try {
      var node = window.document.querySelector(selector);
      writeAttr(node, "content", value);
    } catch (_e) {}
  }

  function applyDocumentMetadata() {
    try {
      var pageMap = pageMetadata[normalizedPathname()];
      var metadata = pageMap && (pageMap[locale] || pageMap[defaultLocale]);
      if (!metadata) return;
      if (metadata.title) {
        window.document.title = metadata.title;
        setMetaContent('meta[property="og:title"]', metadata.title);
        setMetaContent('meta[name="twitter:title"]', metadata.title);
      }
      if (metadata.description) {
        setMetaContent('meta[name="description"]', metadata.description);
        setMetaContent('meta[property="og:description"]', metadata.description);
        setMetaContent('meta[name="twitter:description"]', metadata.description);
      }
    } catch (_e) {}
  }

  function applyLocaleText() {
    applyLocaleSwitchers();
    try {
      window.document.querySelectorAll("[data-i18n]").forEach(setContent);
    } catch (_e) {}
    applyDocumentMetadata();
    applyWhatsappLinks();
    applyAnalyticsEvents();
  }

  function scheduleLocaleText() {
    if (observerTimer) return;
    observerTimer = window.setTimeout(function () {
      observerTimer = null;
      applyLocaleText();
    }, 0);
  }

  function observeLocaleNodes() {
    try {
      if (!window.MutationObserver) return;
      var observer = new window.MutationObserver(scheduleLocaleText);
      observer.observe(window.document.documentElement, {
        attributeFilter: ["data-i18n"],
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true
      });
    } catch (_e) {}
  }

  function updateTranslations() {
    if (locale === defaultLocale) {
      applyLocaleText();
      observeLocaleNodes();
      return;
    }

    if (!translationsRequest) {
      translationsRequest = fetch(translationsUrl, { credentials: "same-origin" })
      .then(function (response) {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .catch(function () {});
    }

    translationsRequest.then(function (data) {
      if (data && data[locale]) {
        translationsStore = data;
      }
      applyLocaleText();
      observeLocaleNodes();
    });
  }

  function start() {
    updateTranslations();
    applyWhatsappLinks();
    applyAnalyticsEvents();
  }

  function hasNextRuntime() {
    try {
      return Boolean(window.__next_f || window.document.querySelector('script[src*="/_next/static/chunks"]'));
    } catch (_e) {
      return false;
    }
  }

  if (hasNextRuntime()) {
    window.setTimeout(start, 800);
  } else {
    start();
  }
})();`;
}

export function LocaleBootstrap() {
  return (
    <InlineRuntimeScript
      id="dhermi-locale-bootstrap"
      code={toScript(supportedLocaleSet, bootstrapBasePath, bootstrapWhatsappNumber, bootstrapWhatsappMessages, localizedPageMetadata, bootstrapDefaultTranslations)}
    />
  );
}
