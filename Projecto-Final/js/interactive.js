document.querySelectorAll(".tab-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); // Evitamos que recargue la página

        const tabId = link.dataset.tab;

        // Eliminar clase "active" de todos los enlaces y pestañas
        document.querySelectorAll(".tab-link").forEach(el => el.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));

        // Agregar clase "active" al enlace y al contenido correspondiente
        link.classList.add("active");
        document.getElementById(tabId).classList.add("active");
    });
});