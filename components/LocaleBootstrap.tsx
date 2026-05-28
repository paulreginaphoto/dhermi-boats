import { InlineRuntimeScript } from "@/components/InlineRuntimeScript";
import { basePath } from "@/lib/site";
import { whatsappNumber } from "@/lib/site";
import { defaultLocale, locales } from "@/lib/i18n";
import { whatsappMessages } from "@/lib/whatsappMessages";

const supportedLocaleSet = JSON.stringify(locales);
const bootstrapBasePath = JSON.stringify(basePath || "");
const bootstrapWhatsappNumber = JSON.stringify(whatsappNumber);
const bootstrapWhatsappMessages = JSON.stringify(whatsappMessages);

function toScript(localeList: string, bootstrapBasePath: string, bootstrapWhatsappNumber: string, bootstrapWhatsappMessages: string) {
  return `(function(){
  var locales = new Set(${localeList});
  var defaultLocale = ${JSON.stringify(defaultLocale)};
  var basePath = ${bootstrapBasePath};
  var whatsappNumber = ${bootstrapWhatsappNumber};
  var whatsappMessages = ${bootstrapWhatsappMessages};
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
    searchParams.set("dlang", locale);
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

  function applyLocaleSwitchers() {
    try {
    window.document.querySelectorAll("[data-locale-switcher]").forEach(function (button) {
      var nextLocale = button.getAttribute("data-locale");
      var isActive = button.getAttribute("data-locale") === locale;
      button.toggleAttribute("data-active", isActive);
      if (isLocale(nextLocale)) {
        var target = new URL(window.location.href);
        target.searchParams.set("dlang", nextLocale);
        target.searchParams.delete("lang");
        button.setAttribute("href", target.pathname + target.search + target.hash);
      }
      if (isActive) {
        button.setAttribute("aria-current", "true");
      } else {
        button.removeAttribute("aria-current");
      }
    });
    } catch (_e) {}
  }

  applyLocaleSwitchers();

  function setContent(node) {
    var key = node.getAttribute("data-i18n");
    if (!key) return;
    var localeValueMap = translationsStore && translationsStore[locale];
    var value = localeValueMap && localeValueMap[key];
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
        var message = messageMap && (messageMap[locale] || messageMap[defaultLocale]);
        if (message && link.setAttribute) {
          link.setAttribute("href", "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message));
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
        node.setAttribute(
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
  var observerTimer = null;

  function applyLocaleText() {
    applyLocaleSwitchers();
    try {
      window.document.querySelectorAll("[data-i18n]").forEach(setContent);
    } catch (_e) {}
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
      translationsStore = null;
      applyLocaleText();
      observeLocaleNodes();
      return;
    }

    fetch(translationsUrl, { credentials: "same-origin" })
      .then(function (response) {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then(function (data) {
        if (data && data[locale]) {
          translationsStore = data;
          applyLocaleText();
          observeLocaleNodes();
        }
      })
      .catch(function () {});
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
      code={toScript(supportedLocaleSet, bootstrapBasePath, bootstrapWhatsappNumber, bootstrapWhatsappMessages)}
    />
  );
}
