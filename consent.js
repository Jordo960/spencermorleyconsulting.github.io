/* SMC consent manager — gates GA4 + Meta Pixel behind explicit opt-in.
   PIPEDA / Quebec Law 25 posture: no tracking until "Accept". Choice stored 12 months.
   To re-open the banner (e.g. from privacy page): smcPrivacyChoices()

   2026-08-05 — added the Meta event mirror. Every gtag('event', ...) already
   fired from the page HTML is now also sent to the Meta Pixel, so ad
   optimisation and retargeting have real conversions to work with. No HTML
   changes were required, and nothing fires before consent. See META_MAP. */
(function () {
  var GA_ID = "G-S2G5EMSYY9";
  var PIXEL_ID = "921953610727268";
  var KEY = "smc-consent";
  var MAX_AGE_DAYS = 365;
  var CURRENCY = "CAD";

  /* GA4 event name -> Meta event. standard:true sends a Meta *standard* event
     via fbq("track") — those are directly selectable as an ad objective.
     standard:false sends fbq("trackCustom"), which shows up in Events Manager
     and can be turned into a custom conversion. */
  var META_MAP = {
    generate_lead:              { name: "Lead",             standard: true  },
    begin_checkout:             { name: "InitiateCheckout", standard: true  },
    quick_check_lead_confirmed: { name: "LeadConfirmed",    standard: false },
    cta_click:                  { name: "CTAClick",         standard: false }
  };

  /* Always define a gtag stub so inline onclick="gtag(...)" handlers never throw,
     even when consent is absent or declined. Events go nowhere unless GA loads. */
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  /* ---- Meta event mirror -------------------------------------------------
     Wraps the gtag stub so any gtag("event", name, params) call anywhere on the
     site also reaches the pixel. fbq only exists after consent is granted, so
     the guard below is what keeps this compliant — do not remove it. */
  function mirrorToMeta(name, params) {
    if (typeof window.fbq !== "function") return;   /* no consent, no pixel */
    var map = META_MAP[name];
    if (!map) return;
    params = params || {};

    var payload = {};
    if (params.event_category) payload.content_category = String(params.event_category);
    if (params.event_label)    payload.content_name     = String(params.event_label);
    if (params.page)           payload.source_page      = String(params.page);

    /* Priced CTAs are labelled with the dollar amount, e.g. "audit_600",
       "snapshot_750". Pull it out so Meta can optimise on value. */
    var priced = /_(\d{2,5})$/.exec(String(params.event_label || ""));
    if (priced) {
      payload.value = Number(priced[1]);
      payload.currency = CURRENCY;
    }

    try { window.fbq(map.standard ? "track" : "trackCustom", map.name, payload); }
    catch (e) {}
  }

  var _gtag = window.gtag;
  window.gtag = function () {
    if (arguments[0] === "event") {
      try { mirrorToMeta(arguments[1], arguments[2]); } catch (e) {}
    }
    return _gtag.apply(this, arguments);
  };

  /* Calendly posts a message to the parent window when a booking completes.
     That is the only true "booked a call" signal on the site — the CTA clicks
     above are only intent. Listener is harmless without consent. */
  function watchCalendly() {
    window.addEventListener("message", function (e) {
      if (!e || !e.data || typeof e.data.event !== "string") return;
      if (String(e.origin).indexOf("calendly.com") === -1) return;
      if (e.data.event !== "calendly.event_scheduled") return;
      if (typeof window.fbq === "function") {
        try { window.fbq("track", "Schedule", { content_name: "consultation_15min" }); }
        catch (er) {}
      }
      window.gtag("event", "schedule_confirmed", {
        "event_category": "calendly",
        "event_label": "consultation_15min"
      });
    }, false);
  }

  function readChoice() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (!obj.choice || !obj.ts) return null;
      var ageDays = (Date.now() - obj.ts) / 86400000;
      if (ageDays > MAX_AGE_DAYS) { localStorage.removeItem(KEY); return null; }
      return obj.choice;
    } catch (e) { return null; }
  }

  function saveChoice(choice) {
    try { localStorage.setItem(KEY, JSON.stringify({ choice: choice, ts: Date.now() })); } catch (e) {}
  }

  function loadTrackers() {
    /* GA4 */
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_ID);

    /* Meta Pixel */
    !function (f, b, e, v, n, t, sc) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      sc = b.getElementsByTagName(e)[0]; sc.parentNode.insertBefore(t, sc);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", PIXEL_ID);
    fbq("track", "PageView");
  }

  function removeBanner() {
    var el = document.getElementById("smc-consent-banner");
    if (el) el.parentNode.removeChild(el);
  }

  function showBanner() {
    if (document.getElementById("smc-consent-banner")) return;
    var wrap = document.createElement("div");
    wrap.id = "smc-consent-banner";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-label", "Privacy choices");
    wrap.innerHTML =
      '<style>' +
      '#smc-consent-banner{position:fixed;bottom:16px;left:16px;right:16px;max-width:520px;margin:0 auto;z-index:99999;' +
      'background:#1A1A1A;color:#fff;border:1px solid #C5A059;border-radius:10px;padding:18px 20px;' +
      'font-family:Lato,Arial,sans-serif;font-size:14px;line-height:1.5;box-shadow:0 8px 30px rgba(0,0,0,.35)}' +
      '#smc-consent-banner p{margin:0 0 12px}' +
      '#smc-consent-banner a{color:#C5A059;text-decoration:underline}' +
      '#smc-consent-banner .smc-cb-row{display:flex;gap:10px;flex-wrap:wrap}' +
      '#smc-consent-banner button{cursor:pointer;border-radius:6px;padding:9px 18px;font-size:14px;font-family:inherit}' +
      '#smc-consent-banner .smc-accept{background:#C5A059;border:1px solid #C5A059;color:#1A1A1A;font-weight:700}' +
      '#smc-consent-banner .smc-decline{background:transparent;border:1px solid #666;color:#ddd}' +
      '</style>' +
      '<p>We use two optional tools — Google Analytics and the Meta Pixel — to understand how people find this site and to show relevant ads. ' +
      'Nothing runs unless you say yes. <a href="/privacy.html">Privacy policy</a></p>' +
      '<div class="smc-cb-row">' +
      '<button type="button" class="smc-accept">Accept</button>' +
      '<button type="button" class="smc-decline">Decline</button>' +
      '</div>';
    document.body.appendChild(wrap);
    wrap.querySelector(".smc-accept").addEventListener("click", function () {
      saveChoice("granted"); removeBanner(); loadTrackers();
    });
    wrap.querySelector(".smc-decline").addEventListener("click", function () {
      saveChoice("denied"); removeBanner();
    });
  }

  /* Public hook to revisit the choice (linked from privacy page) */
  window.smcPrivacyChoices = function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
    showBanner();
  };

  function init() {
    watchCalendly();
    var choice = readChoice();
    if (choice === "granted") { loadTrackers(); }
    else if (choice === null) { showBanner(); }
    /* "denied": do nothing — stub gtag keeps onclick handlers safe */
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
