
// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/tournyx/service-worker.js")
      .then((reg) => {
        console.log("✅ Service Worker Registered! Scope:", reg.scope);
      })
      .catch((err) => {
        console.error("❌ Service Worker failed:", err);
      });
  });
}
