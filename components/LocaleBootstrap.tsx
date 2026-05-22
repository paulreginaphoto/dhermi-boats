import { basePath } from "@/lib/site";
import { defaultLocale, locales } from "@/lib/i18n";
import Script from "next/script";

const supportedLocaleSet = JSON.stringify(locales);
const bootstrapBasePath = JSON.stringify(basePath || "");

function toScript(localeList: string, bootstrapBasePath: string) {
  return `(function(){
  var locales = new Set(${localeList});
  var defaultLocale = ${JSON.stringify(defaultLocale)};
  var basePath = ${bootstrapBasePath};
  var translationsUrl = (basePath ? basePath : "") + "/locales/translations.json";
  var urlLocale = (new URL(window.location.href)).searchParams.get("dlang");
  var storedLocale = null;

  try { storedLocale = window.localStorage.getItem("dhermi-language"); } catch (_e) {}

  function isLocale(value) {
    return Boolean(value && locales.has(value));
  }

  function activeLocale() {
    if (isLocale(urlLocale)) {
      return urlLocale;
    }
    if (isLocale(storedLocale)) {
      return storedLocale;
    }
    return defaultLocale;
  }

  var locale = activeLocale();
  if (urlLocale) {
    try {
      window.localStorage.setItem("dhermi-language", locale);
    } catch (_e) {}
  }

  document.documentElement.lang = locale === "al" ? "sq" : locale;

  try {
    window.document.querySelectorAll("[data-locale-switcher]").forEach(function (button) {
      var isActive = button.getAttribute("data-locale") === locale;
      button.classList.toggle("bg-ink", isActive);
      button.classList.toggle("text-pearl", isActive);
      button.classList.toggle("text-ink-soft", !isActive);
      button.setAttribute("aria-current", isActive ? "true" : "false");
    });
  } catch (_e) {}

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

  var translationsStore = null;
  var observerTimer = null;

  function applyLocaleText() {
    try {
      window.document.querySelectorAll("[data-i18n]").forEach(setContent);
    } catch (_e) {}
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
      observer.observe(window.document.documentElement, { childList: true, subtree: true });
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

  updateTranslations();
})();`;
}

export function LocaleBootstrap() {
  return (
    <Script
      id="dhermi-locale-bootstrap"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: toScript(supportedLocaleSet, bootstrapBasePath)
      }}
    />
  );
}
