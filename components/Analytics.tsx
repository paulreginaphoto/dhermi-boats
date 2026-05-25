/* eslint-disable @next/next/next-script-for-ga */

const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

function scriptValue(value: string) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

const clickTrackingScript = `(function () {
  window.dataLayer = window.dataLayer || [];

  function textFor(node) {
    return (node.getAttribute("aria-label") || node.textContent || "").replace(/\\s+/g, " ").trim().slice(0, 120);
  }

  document.addEventListener("click", function (event) {
    var target = event.target && event.target.closest ? event.target.closest("[data-analytics-event]") : null;
    if (!target) return;

    var eventName = target.getAttribute("data-analytics-event");
    if (!eventName) return;

    var detail = {
      link_url: target.href || "",
      link_text: textFor(target),
      analytics_tour: target.getAttribute("data-analytics-tour") || target.getAttribute("data-tour-id") || target.getAttribute("data-whatsapp-key") || "",
      analytics_placement: target.getAttribute("data-analytics-placement") || "",
      whatsapp_key: target.getAttribute("data-whatsapp-key") || "",
      outbound: Boolean(target.hostname && target.hostname !== window.location.hostname)
    };

    window.dataLayer.push(Object.assign({ event: eventName }, detail));
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, detail);
    }
  }, { passive: true });
})();`;

export function Analytics() {
  return (
    <>
      {gtmId ? (
        <>
          <script
            id="gtm-loader"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer",${scriptValue(gtmId)});`
            }}
          />
          <noscript>
            <iframe
              title="Google Tag Manager"
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      ) : null}
      <script
        id="analytics-click-tracking"
        dangerouslySetInnerHTML={{
          __html: clickTrackingScript
        }}
      />
    </>
  );
}
