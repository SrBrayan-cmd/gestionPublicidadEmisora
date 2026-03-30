// Esperamos a que el DOM esté cargado para enlazar eventos y elementos.
document.addEventListener('DOMContentLoaded', () => {
    // Guardamos botón de pestaña lista.
    const btnLista = document.getElementById('tab-lista');
    // Guardamos botón de pestaña registro.
    const btnRegistro = document.getElementById('tab-registro');
    // Guardamos sección de lista.
    const sectionLista = document.getElementById('lista');
    // Guardamos sección de registro.
    const sectionRegistro = document.getElementById('registro');

    // Creamos arreglo de tabs válidos (sin null).
    const tabs = [btnLista, btnRegistro].filter(Boolean);
    // Creamos arreglo de secciones válidas (sin null).
    const sections = [sectionLista, sectionRegistro].filter(Boolean);

    // Inicializamos la vista para abrir por defecto la lista.
    function inicializarVista() {
        // Si faltan elementos base, detenemos la inicialización.
        if (!btnLista || !sectionLista) return;
        // Activamos la sección de lista al iniciar.
        activarTab(sectionLista, btnLista);
    }

    // Esta función activa una pestaña y desactiva las demás.
    function activarTab(seccionActiva, botonActivo) {
        // Validamos que vengan elementos correctos.
        if (!seccionActiva || !botonActivo) return;

        // Quitamos active de todas las secciones.
        sections.forEach(seccion => {
            seccion.classList.remove('active');
        });

        // Quitamos active de todos los tabs.
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Activamos la sección seleccionada.
        seccionActiva.classList.add('active');
        // Activamos el botón seleccionado.
        botonActivo.classList.add('active');
    }

    // Ejecutamos la vista inicial.
    inicializarVista();

    // Si existe botón lista, le asignamos su evento click.
    if (btnLista && sectionLista) {
        btnLista.addEventListener('click', () => activarTab(sectionLista, btnLista));
    }

    // Si existe botón registro, le asignamos su evento click.
    if (btnRegistro && sectionRegistro) {
        btnRegistro.addEventListener('click', () => activarTab(sectionRegistro, btnRegistro));
    }

    // Seleccionamos todos los checkboxes de días.
    const checkDias = document.querySelectorAll('#dias-container input');
    // Guardamos el input hidden donde se guardan los días seleccionados.
    const inputDias = document.getElementById('ord-dias');

    // Si existen checks e input hidden, sincronizamos su valor.
    if (checkDias.length && inputDias) {
        // Recorremos cada checkbox para escuchar cambios.
        checkDias.forEach(chk => {
            // Al cambiar un check, reconstruimos la lista de días.
            chk.addEventListener('change', () => {
                // Tomamos solo checks marcados y extraemos su valor.
                const seleccionados = Array.from(checkDias)
                    .filter(c => c.checked)
                    .map(c => c.value);

                // Guardamos los días unidos por coma en el hidden.
                inputDias.value = seleccionados.join(', ');
            });
        });
    }

    // Guardamos contenedor visual de horarios.
    const contHorarios = document.getElementById('horarios-container');
    // Guardamos input hidden de horarios.
    const inputHorarios = document.getElementById('ord-horarios');
    // Guardamos botón para agregar nuevas horas.
    const btnAdd = document.getElementById('addHora');

    // Si existen elementos de horarios, configuramos su comportamiento.
    if (contHorarios && inputHorarios && btnAdd) {
        // Al pulsar agregar, creamos un nuevo input time.
        btnAdd.addEventListener('click', () => {
            // Creamos nuevo input.
            const input = document.createElement('input');
            // Definimos tipo hora.
            input.type = 'time';
            // Agregamos clase para ubicarlo y estilizarlo.
            input.classList.add('hora');

            // Insertamos el nuevo input antes del botón agregar.
            contHorarios.insertBefore(input, btnAdd);
        });

        // Tomamos el primer formulario de la página.
        const form = document.querySelector('form');

        // Si existe formulario, antes de enviar consolidamos horarios.
        if (form) {
            // Al enviar, leemos todas las horas y las guardamos en el hidden.
            form.addEventListener('submit', () => {
                // Tomamos todos los inputs con clase hora.
                const horas = document.querySelectorAll('.hora');

                // Armamos arreglo solo con valores no vacíos.
                const lista = Array.from(horas)
                    .map(h => h.value)
                    .filter(v => v !== '');

                // Guardamos la lista final como texto separado por comas.
                inputHorarios.value = lista.join(', ');
            });
        }
    }

    // Guardamos el select de cliente.
    const selectCliente = document.getElementById('cliente_select');
    // Guardamos input visible de nombre cliente.
    const inputNombre = document.getElementById('cliente_nombre');
    // Guardamos input hidden de id cliente.
    const inputId = document.getElementById('cliente_id');

    // Si existen los tres elementos, sincronizamos datos al cambiar cliente.
    if (selectCliente && inputNombre && inputId) {
        // Al cambiar opción, tomamos nombre e id para llenar inputs.
        selectCliente.addEventListener('change', () => {
            // Guardamos la opción actualmente seleccionada.
            const opcion = selectCliente.options[selectCliente.selectedIndex];

            // Leemos nombre desde data attribute o vacío.
            const nombre = opcion.getAttribute('data-nombre') || '';
            // Leemos id seleccionado o vacío.
            const id = opcion.value || '';

            // Mostramos nombre del cliente en el input de solo lectura.
            inputNombre.value = nombre;
            // Guardamos id del cliente en hidden para enviar al backend.
            inputId.value = id;
        });
    }

    // Seleccionamos todos los botones para anular orden.
    const botonesAnular = document.querySelectorAll('.btn-action.anular');

    // Recorremos cada botón para configurar su flujo de confirmación.
    botonesAnular.forEach(btn => {
        // Al hacer clic en anular, ejecutamos validaciones y prompts.
        btn.addEventListener('click', () => {
            // Leemos rol del usuario desde data-rol.
            const rol = btn.getAttribute('data-rol');

            // Si el rol no tiene permiso, mostramos aviso y salimos.
            if (rol !== 'admin' && rol !== 'superadmin') {
                alert('No tienes permisos para anular órdenes');
                return;
            }

            // Leemos id de la orden a anular.
            const idOrden = btn.getAttribute('data-id');
            // Si no hay id, detenemos proceso.
            if (!idOrden) return;

            // Pedimos el motivo de anulación.
            let motivo = prompt('Ingrese el motivo de la anulación:', 'Por revisar');
            // Si el usuario cancela, detenemos proceso.
            if (motivo === null) return;

            // Pedimos comentarios adicionales opcionales.
            let comentarios = prompt('Ingrese comentarios adicionales (opcional):', '');
            // Si cancela este prompt, dejamos comentarios en blanco.
            if (comentarios === null) comentarios = '';

            // Pedimos confirmación final antes de redirigir.
            const confirmar = confirm(`¿Deseas realmente anular la orden ${idOrden}?`);
            // Si no confirma, detenemos proceso.
            if (!confirmar) return;

            // Redirigimos al script PHP con parámetros codificados.
            window.location.href = `funciones/anularorden.php?id=${idOrden}&motivo=${encodeURIComponent(motivo)}&comentarios=${encodeURIComponent(comentarios)}`;
        });
    });
});