// Esperamos a que el documento esté listo para manipular la interfaz.
document.addEventListener('DOMContentLoaded', () => {
    // Guardamos el botón de la pestaña de lista.
    const btnLista = document.getElementById('tab-lista');
    // Guardamos el botón de la pestaña de gestión.
    const btnGestion = document.getElementById('tab-gestion');
    // Guardamos la sección de lista.
    const sectionLista = document.getElementById('section-lista');
    // Guardamos la sección de gestión.
    const sectionGestion = document.getElementById('section-gestion');

    // Guardamos el input donde se muestra el número de orden.
    const inputNumero = document.getElementById('g-numero_orden');
    // Guardamos el input donde se muestra el motivo.
    const inputMotivo = document.getElementById('g-motivo');
    // Guardamos el textarea donde se muestran comentarios.
    const textareaComentarios = document.getElementById('g-comentarios');

    // Esta función activa la pestaña seleccionada y desactiva las demás.
    function activarTab(seccionActiva, botonActivo) {
        // Quitamos la clase active de ambas secciones.
        [sectionLista, sectionGestion].forEach(s => s.classList.remove('active'));
        // Quitamos la clase active de ambos botones.
        [btnLista, btnGestion].forEach(b => b.classList.remove('active'));
        // Activamos la sección indicada.
        seccionActiva.classList.add('active');
        // Activamos el botón indicado.
        botonActivo.classList.add('active');
    }

    // Si existen los botones y secciones, configuramos cambio de pestañas.
    if (btnLista && btnGestion && sectionLista && sectionGestion) {
        // Al dar clic en lista, mostramos la lista.
        btnLista.addEventListener('click', () => activarTab(sectionLista, btnLista));
        // Al dar clic en gestión, mostramos gestión.
        btnGestion.addEventListener('click', () => activarTab(sectionGestion, btnGestion));
    }

    // Seleccionamos todos los enlaces del menú principal.
    const menuLinks = document.querySelectorAll('header nav ul li a');
    // Obtenemos la ruta actual para marcar el enlace activo.
    const currentPath = window.location.pathname.split('/').pop();
    // Recorremos cada enlace para marcar si corresponde.
    menuLinks.forEach(link => {
        // Obtenemos el href del enlace actual.
        const href = link.getAttribute('href');
        // Si coincide con la ruta, agregamos active-link.
        if (href === currentPath || (href === 'index.html' && currentPath === '')) {
            link.classList.add('active-link');
        } else {
            // Si no coincide, quitamos active-link.
            link.classList.remove('active-link');
        }
    });

    // Seleccionamos todos los botones "Revisar" de la tabla.
    const btnsRevisar = document.querySelectorAll('.btn-action.view');

    // Recorremos cada botón para asignar su evento.
    btnsRevisar.forEach(btn => {
        // Al hacer clic en revisar, leemos la fila y llevamos datos al formulario.
        btn.addEventListener('click', () => {
            // Buscamos la fila padre del botón presionado.
            const fila = btn.closest('tr');
            // Si no hay fila, detenemos el proceso.
            if (!fila) return;

            // Leemos el número de orden desde la primera columna.
            const numeroOrden = fila.children[0].textContent.trim();
            // Leemos el motivo desde la cuarta columna.
            const motivo = fila.children[3].textContent.trim();
            // Leemos los comentarios desde la quinta columna (oculta).
            const comentarios = fila.children[4].textContent.trim();

            // Si existe el input del número, lo llenamos.
            if (inputNumero) inputNumero.value = numeroOrden;
            // Si existe el input del motivo, lo llenamos.
            if (inputMotivo) inputMotivo.value = motivo;
            // Si existe el textarea de comentarios, lo llenamos.
            if (textareaComentarios) textareaComentarios.value = comentarios;

            // Cambiamos automáticamente a la pestaña de gestión.
            activarTab(sectionGestion, btnGestion);
        });
    });
});