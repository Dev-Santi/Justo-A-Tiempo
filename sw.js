self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
});

self.addEventListener("fetch", (e) => {
    console.log("[Servicio Worker] Recurso obtenido " + e.request.url);
});
