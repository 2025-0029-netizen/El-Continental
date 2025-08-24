// content-loader.js - Carga el contenido del admin en las páginas correspondientes

// Función para cargar salas en salas.html
function loadSalasContent() {
    const salas = JSON.parse(localStorage.getItem('salas') || '[]');
    const salasContainer = document.getElementById('salas-dinamicas');
    
    if (salasContainer && salas.length > 0) {
        salasContainer.innerHTML = salas.map(sala => `
            <div class="sala-card">
                <h3>${sala.nombre}</h3>
                <p class="sala-descripcion">${sala.descripcion}</p>
                <div class="sala-info">
                    <span class="sala-juego">${sala.juego}</span>
                    <span class="sala-jugadores">👥 ${sala.maxJugadores} jugadores</span>
                </div>
                <div class="sala-fecha">Creada: ${sala.fecha}</div>
                <button class="btn-unirse">Unirse a la Sala</button>
            </div>
        `).join('');
    } else if (salasContainer) {
        salasContainer.innerHTML = '<p class="no-content">No hay salas disponibles en este momento.</p>';
    }
}

// Función para cargar podium en podium.html
function loadPodiumContent() {
    const podium = JSON.parse(localStorage.getItem('podium') || '[]');
    const podiumContainer = document.getElementById('podium-dinamico');
    
    if (podiumContainer && podium.length > 0) {
        // Ordenar por posición
        const podiumOrdenado = podium.sort((a, b) => parseInt(a.posicion) - parseInt(b.posicion));
        
        podiumContainer.innerHTML = podiumOrdenado.map(item => `
            <div class="podium-entry posicion-${item.posicion}">
                <div class="podium-medal">
                    ${item.posicion === '1' ? '🥇' : item.posicion === '2' ? '🥈' : '🥉'}
                </div>
                <div class="podium-info">
                    <h3>${item.jugador}</h3>
                    <p class="podium-torneo">${item.torneo}</p>
                    <p class="podium-puntos">${item.puntos} puntos</p>
                    <p class="podium-fecha">${item.fecha}</p>
                </div>
            </div>
        `).join('');
    } else if (podiumContainer) {
        podiumContainer.innerHTML = '<p class="no-content">El podium estará disponible próximamente.</p>';
    }
}

// Función para cargar galería
function loadGaleriaContent() {
    const galeria = JSON.parse(localStorage.getItem('galeria') || '[]');
    
    // Cargar galería competitiva
    const galeriaCompetitiva = document.getElementById('galeria-competitiva');
    if (galeriaCompetitiva) {
        const competitivo = galeria.filter(item => item.categoria === 'competitivo');
        if (competitivo.length > 0) {
            galeriaCompetitiva.innerHTML = competitivo.map(item => `
                <div class="galeria-item">
                    ${item.tipo === 'video' ? 
                        `<video controls poster="" style="width: 100%; border-radius: 5px;">
                            <source src="${item.url}" type="video/mp4">
                            Tu navegador no soporta video.
                        </video>` :
                        `<img src="${item.url}" alt="${item.titulo}" style="width: 100%; border-radius: 5px;">`
                    }
                    <div class="galeria-info">
                        <h4>${item.titulo}</h4>
                        <p>${item.descripcion}</p>
                        <small>Agregado: ${item.fecha}</small>
                    </div>
                </div>
            `).join('');
        } else {
            galeriaCompetitiva.innerHTML = '<p class="no-content">No hay contenido competitivo disponible.</p>';
        }
    }
    
    // Cargar galería amateur
    const galeriaAmateur = document.getElementById('galeria-amateur');
    if (galeriaAmateur) {
        const amateur = galeria.filter(item => item.categoria === 'amateur');
        if (amateur.length > 0) {
            galeriaAmateur.innerHTML = amateur.map(item => `
                <div class="galeria-item">
                    ${item.tipo === 'video' ? 
                        `<video controls poster="" style="width: 100%; border-radius: 5px;">
                            <source src="${item.url}" type="video/mp4">
                            Tu navegador no soporta video.
                        </video>` :
                        `<img src="${item.url}" alt="${item.titulo}" style="width: 100%; border-radius: 5px;">`
                    }
                    <div class="galeria-info">
                        <h4>${item.titulo}</h4>
                        <p>${item.descripcion}</p>
                        <small>Agregado: ${item.fecha}</small>
                    </div>
                </div>
            `).join('');
        } else {
            galeriaAmateur.innerHTML = '<p class="no-content">No hay contenido amateur disponible.</p>';
        }
    }
}

// Función para cargar streamers
function loadStreamersContent() {
    const streamers = JSON.parse(localStorage.getItem('streamers') || '[]');
    const streamersContainer = document.getElementById('streamers-dinamicos');
    
    if (streamersContainer && streamers.length > 0) {
        streamersContainer.innerHTML = streamers.map(streamer => `
            <div class="streamer-card">
                <div class="streamer-avatar">
                    ${streamer.avatar ? 
                        `<img src="${streamer.avatar}" alt="${streamer.nombre}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">` :
                        '<div class="avatar-placeholder">📹</div>'
                    }
                </div>
                <div class="streamer-info">
                    <h3>${streamer.nombre}</h3>
                    <p class="streamer-plataforma">${streamer.plataforma}</p>
                    <p class="streamer-descripcion">${streamer.descripcion}</p>
                    <p class="streamer-horario"><strong>Horario:</strong> ${streamer.horario || 'Por definir'}</p>
                    <a href="${streamer.url}" target="_blank" class="btn-seguir">Ver Canal</a>
                </div>
            </div>
        `).join('');
    } else if (streamersContainer) {
        streamersContainer.innerHTML = '<p class="no-content">No hay streamers registrados en este momento.</p>';
    }
}

// Función para cargar clanes en clanes.html
function loadClanesContent() {
    const clanes = JSON.parse(localStorage.getItem('clanes') || '[]');
    const clanesContainer = document.getElementById('clanes-dinamicos');
    
    if (clanesContainer && clanes.length > 0) {
        clanesContainer.innerHTML = clanes.map(clan => `
            <div class="clan-card">
                <div class="clan-header">
                    ${clan.logo ? 
                        `<img src="${clan.logo}" alt="${clan.nombre}" class="clan-logo">` :
                        '<div class="clan-logo-placeholder">⚔️</div>'
                    }
                    <div class="clan-info">
                        <h3>${clan.tag} ${clan.nombre}</h3>
                        <p class="clan-tipo">${clan.tipo}</p>
                    </div>
                </div>
                <div class="clan-details">
                    <p class="clan-descripcion">${clan.descripcion}</p>
                    <div class="clan-stats">
                        <span class="clan-lider"><strong>Líder:</strong> ${clan.lider}</span>
                        <span class="clan-miembros"><strong>Miembros:</strong> ${clan.miembrosActuales}/${clan.maxMiembros}</span>
                    </div>
                    <div class="clan-fecha">Creado: ${clan.fechaCreacion}</div>
                    <button class="btn-unirse-clan">Solicitar Ingreso</button>
                </div>
            </div>
        `).join('');
    } else if (clanesContainer) {
        clanesContainer.innerHTML = '<p class="no-content">No hay clanes registrados en este momento.</p>';
    }
}

// Función para cargar ranking en ranking.html
function loadRankingContent() {
    const rankings = JSON.parse(localStorage.getItem('rankings') || '[]');
    const rankingContainer = document.getElementById('ranking-dinamico');
    
    if (rankingContainer && rankings.length > 0) {
        // Ordenar por puntos descendente
        const rankingsOrdenados = rankings.sort((a, b) => b.puntos - a.puntos);
        
        rankingContainer.innerHTML = rankingsOrdenados.map((jugador, index) => `
            <div class="ranking-entry posicion-${index + 1}">
                <div class="ranking-position">
                    <span class="position-number">#${index + 1}</span>
                    ${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}
                </div>
                <div class="ranking-player-info">
                    <h3>${jugador.jugador}</h3>
                    <p class="ranking-clan">${jugador.clan}</p>
                </div>
                <div class="ranking-stats">
                    <div class="stat-item">
                        <span class="stat-label">Puntos</span>
                        <span class="stat-value">${jugador.puntos.toLocaleString()}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Nivel</span>
                        <span class="stat-value">${jugador.nivel}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">K/D</span>
                        <span class="stat-value">${jugador.kd}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Win Rate</span>
                        <span class="stat-value">${jugador.winRate}%</span>
                    </div>
                </div>
            </div>
        `).join('');
    } else if (rankingContainer) {
        rankingContainer.innerHTML = '<p class="no-content">El ranking estará disponible próximamente.</p>';
    }
}
function loadStatsContent() {
    const salas = JSON.parse(localStorage.getItem('salas') || '[]');
    const podium = JSON.parse(localStorage.getItem('podium') || '[]');
    const galeria = JSON.parse(localStorage.getItem('galeria') || '[]');
    const streamers = JSON.parse(localStorage.getItem('streamers') || '[]');
    
    // Actualizar contadores en el admin si existe
    const salasCounter = document.querySelector('.stat-card:nth-child(3) .stat-number');
    if (salasCounter) salasCounter.textContent = salas.length;
    
    const galeriaCounter = document.querySelector('.stat-card:nth-child(4) .stat-number');
    if (galeriaCounter) galeriaCounter.textContent = galeria.length;
}

// Función universal para cargar contenido según la página
function loadContentForPage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'salas.html':
        case 'ver-mas-salas.html':
            loadSalasContent();
            break;
        case 'podium.html':
            loadPodiumContent();
            break;
        case 'galeria-competitivo.html':
        case 'galeria-amateur.html':
            loadGaleriaContent();
            break;
        case 'info-streamer.html':
            loadStreamersContent();
            break;
        case 'clanes.html':
            loadClanesContent();
            break;
        case 'ranking.html':
            loadRankingContent();
            break;
        case 'admin.html':
        case 'index.html':
            loadStatsContent();
            break;
    }
}

// Cargar contenido cuando la página esté lista
document.addEventListener('DOMContentLoaded', loadContentForPage);

// Recargar contenido cada 30 segundos para reflejar cambios
setInterval(loadContentForPage, 30000);
