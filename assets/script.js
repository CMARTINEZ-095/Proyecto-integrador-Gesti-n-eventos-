// Carrusel automático para index.html
document.addEventListener('DOMContentLoaded', function() {
    // Carrusel automático
    const carousel = document.getElementById('autoCarousel');
    if (carousel) {
        const items = carousel.querySelectorAll('.carousel-item');
        let index = 0;
        function autoScrollCarousel() {
            index = (index + 1) % items.length;
            carousel.scrollTo({
                left: items[index].offsetLeft,
                behavior: 'smooth'
            });
        }
        setInterval(autoScrollCarousel, 4000);
    }

    // Menú redes sociales
    window.toggleSubmenu = function() {
        const submenu = document.getElementById("submenu");
        submenu.classList.toggle("active");
    };

    // Mostrar/ocultar la planilla de asistencia
    const toggleBtn = document.getElementById('toggleAsistenciaBtn');
    const panelContainer = document.getElementById('asistenciaPanelContainer');
    let visible = true;
    if (toggleBtn && panelContainer) {
        toggleBtn.addEventListener('click', function() {
            visible = !visible;
            panelContainer.style.display = visible ? 'block' : 'none';
            toggleBtn.textContent = visible ? 'Ocultar Control de Asistencia' : 'Mostrar Control de Asistencia';
        });
    }

    // Funcionalidad para los botones de Confirmar/Anular en la tabla de asistencia
    const table = document.querySelector('.asistencia-table-alt tbody');
    if (table) {
        table.addEventListener('click', function(e) {
            if (e.target.classList.contains('asistencia-btn--confirmar')) {
                // Cambiar estado a Confirmada
                const row = e.target.closest('tr');
                const estado = row.querySelector('.asistencia-estado-alt');
                estado.textContent = 'Confirmada';
                estado.classList.remove('asistencia-estado--pendiente');
                estado.classList.add('asistencia-estado--confirmada');
                // Cambiar botón a Anular
                e.target.textContent = 'Anular';
                e.target.classList.remove('asistencia-btn--confirmar');
                e.target.classList.add('asistencia-btn--anular');
            } else if (e.target.classList.contains('asistencia-btn--anular')) {
                // Cambiar estado a Pendiente
                const row = e.target.closest('tr');
                const estado = row.querySelector('.asistencia-estado-alt');
                estado.textContent = 'Pendiente';
                estado.classList.remove('asistencia-estado--confirmada');
                estado.classList.add('asistencia-estado--pendiente');
                // Cambiar botón a Confirmar
                e.target.textContent = 'Confirmar';
                e.target.classList.remove('asistencia-btn--anular');
                e.target.classList.add('asistencia-btn--confirmar');
            }
        });
    }

    // Función para alternar el menú hamburguesa en miperfil.html
    // Menú hamburguesa
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    hamburgerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', function(e) {
        if (!hamburgerBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
    // Cerrar sesión
    document.getElementById('logoutBtn').onclick = function() {
        window.location.href = '../pages/iniciarsesion.html';
    };

    // Calendario de eventos
    const eventos = [
        { nombre: 'Torneo de Fútbol', fecha: '2025-06-23', id: 'futbol' },
        { nombre: 'Torneo de Volleyball', fecha: '2025-06-25', id: 'volley' },
        { nombre: 'Nudos Mágicos', fecha: '2025-06-07', id: 'nudos' },
        { nombre: 'Moldeando Emociones', fecha: '2025-05-18', id: 'moldeando' },
        { nombre: 'Coloreando Sueños', fecha: '2025-06-15', id: 'coloreando' }
    ];
    function renderCalendar() {
        const calendar = document.getElementById('calendar');
        calendar.innerHTML = '';
        eventos.forEach(ev => {
            const evDiv = document.createElement('div');
            evDiv.className = 'evento-item';
            evDiv.innerHTML = `<strong>${ev.nombre}</strong> - <span>${ev.fecha}</span> <button onclick="registrarEvento('${ev.id}', '${ev.nombre}')">Registrarse</button>`;
            calendar.appendChild(evDiv);
        });
    }
    window.registrarEvento = function(id, nombre) {
        alert('Te has registrado al evento: ' + nombre);
    }
    renderCalendar();

    // Buscador (función básica)
    function buscarEventos(e) {
        e.preventDefault();
        const input = document.getElementById('mainSearchInput') || document.getElementById('dropdownSearchInput');
        const query = input.value.trim();
        if(query) {
            alert('Buscando: ' + query);
        }
    }
    // Mostrar información dinámica al hacer clic en el menú hamburguesa
    const infoSection = document.getElementById('infoSection');
    function mostrarInfo(tipo) {
        infoSection.style.display = 'block';
        let html = '';
        switch(tipo) {
            case 'calendario':
                html = `<h2>Calendario de Eventos</h2><ul><li>23/06/2025 - Torneo de Fútbol</li><li>25/06/2025 - Torneo de Volleyball</li><li>07/06/2025 - Nudos Mágicos</li><li>18/05/2025 - Moldeando Emociones</li><li>15/06/2025 - Coloreando Sueños</li></ul>`;
                break;
            case 'inscripciones':
                html = `<h2>Mis Inscripciones</h2><ul><li>No tienes inscripciones activas. ¡Regístrate en un evento!</li></ul>`;
                break;
            case 'historial':
                html = `<h2>Historial de Eventos</h2><ul><li>18/05/2025 - Moldeando Emociones (Asististe)</li></ul>`;
                break;
            case 'proximos':
                html = `<h2>Próximos Eventos</h2><ul><li>23/06/2025 - Torneo de Fútbol</li><li>25/06/2025 - Torneo de Volleyball</li></ul>`;
                break;
            case 'galeria':
                html = `<h2>Galería</h2><div style='display:flex;gap:10px;flex-wrap:wrap;'><img src='../assets/images/coloreandosueños1.jpg' alt='Coloreando Sueños' style='width:120px;border-radius:8px;'><img src='../assets/images/nudosmajicos1.jpg' alt='Nudos Mágicos' style='width:120px;border-radius:8px;'><img src='../assets/images/moldeandoemociones1.jpg' alt='Moldeando Emociones' style='width:120px;border-radius:8px;'></div>`;
                break;
            case 'certificados':
                html = `<h2>Certificados</h2><ul><li>No tienes certificados disponibles aún.</li></ul>`;
                break;
            default:
                infoSection.style.display = 'none';
                return;
        }
        infoSection.innerHTML = html;
        window.scrollTo({top: infoSection.offsetTop-60, behavior:'smooth'});
    }
    document.querySelector("a[href='#calendario']").onclick = function(e){e.preventDefault();mostrarInfo('calendario');};
    document.querySelectorAll(".dropdown-menu a").forEach(a => {
        if(a.textContent.includes('Mis Inscripciones')) a.onclick = function(e){e.preventDefault();mostrarInfo('inscripciones');};
        if(a.textContent.includes('Historial de Eventos')) a.onclick = function(e){e.preventDefault();mostrarInfo('historial');};
        if(a.textContent.includes('Próximos Eventos')) a.onclick = function(e){e.preventDefault();mostrarInfo('proximos');};
        if(a.textContent.includes('Galería')) a.onclick = function(e){e.preventDefault();mostrarInfo('galeria');};
        if(a.textContent.includes('Certificados')) a.onclick = function(e){e.preventDefault();mostrarInfo('certificados');};
    });

    // Notificacion de registro
    function registrarAlmanaque(nombre) {
      mostrarToast('Te has registrado al evento: ' + nombre);
    }
    function mostrarToast(mensaje) {
      var toast = document.getElementById('toast');
      toast.textContent = mensaje;
      toast.style.display = 'block';
      toast.style.opacity = '1';
      setTimeout(function() {
        toast.style.opacity = '0';
        setTimeout(function(){ toast.style.display = 'none'; }, 400);
      }, 2200);
    }

    // Interacción de estrellas y envío de comentario para reseñas
    // Interacción de estrellas y envío de comentario para reseñas
    const stars = document.querySelectorAll('.review-stars-input .star');
    let rating = 0;
    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('mouseenter', function() {
                const val = parseInt(this.getAttribute('data-value'));
                stars.forEach((s, i) => s.classList.toggle('active', i < val));
            });
            star.addEventListener('mouseleave', function() {
                stars.forEach((s, i) => s.classList.toggle('active', i < rating));
            });
            star.addEventListener('click', function() {
                rating = parseInt(this.getAttribute('data-value'));
                stars.forEach((s, i) => s.classList.toggle('active', i < rating));
            });
        });
        var reviewForm = document.getElementById('reviewForm');
        if (reviewForm) {
            reviewForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const comment = document.getElementById('reviewComment').value.trim();
                const msg = document.getElementById('reviewFormMsg');
                if (rating === 0) {
                    msg.textContent = 'Por favor selecciona una calificación.';
                    msg.style.color = '#c423d9';
                    return;
                }
                if (comment.length < 5) {
                    msg.textContent = 'El comentario es muy corto.';
                    msg.style.color = '#c423d9';
                    return;
                }
                msg.textContent = '¡Gracias por tu reseña!';
                msg.style.color = '#1bc47d';
                this.reset();
                stars.forEach(s => s.classList.remove('active'));
                rating = 0;
            });
        }
    }
});
