/* SMC consent manager — gates GA4 + Meta Pixel behind explicit opt-in.
   PIPEDA / Quebec Law 25 posture: no tracking until "Accept". Choice stored 12 months.
   To re-open the banner (e.g. from privacy page): smcPrivacyChoices() */
(function () {
  var GA_ID = "G-S2G5EMSYY9";
  var PIXEL_ID = "921953610727268";
  var KEY = "smc-consent";
  var MAX_AGE_DAYS = 365;

  /* Always define a gtag stub so inline onclick="gtag(...)" handlers never throw,
     even when consent is absent or declined. Events go nowhere unless GA loads. */
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

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
