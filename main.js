document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    
    // Drawers
    const drawers = {
        cart: document.getElementById('cart-drawer'),
        login: document.getElementById('login-drawer')
    };

    // Toggles
    const toggles = {
        cart: document.getElementById('cart-toggle'),
        login: document.getElementById('login-toggle')
    };

    // Cerrar botones
    const closeBtns = document.querySelectorAll('.close-drawer');

    // Funciones
    function openDrawer(id) {
        drawers[id].classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeAll() {
        Object.values(drawers).forEach(d => d && d.classList.remove('active'));
        const lightbox = document.getElementById('quick-view-lightbox');
        if(lightbox) lightbox.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Eventos
    if(toggles.cart) toggles.cart.addEventListener('click', (e) => { e.preventDefault(); openDrawer('cart'); });
    if(toggles.login) toggles.login.addEventListener('click', (e) => { e.preventDefault(); openDrawer('login'); });
    
    closeBtns.forEach(btn => btn.addEventListener('click', closeAll));
    if(overlay) overlay.addEventListener('click', closeAll);

    // Lógica del Quick View (Lightbox)
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const lightbox = document.getElementById('quick-view-lightbox');
    const closeLightbox = document.getElementById('close-lightbox');

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aquí en un entorno real harías un fetch() para traer la info del producto.
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if(closeLightbox) closeLightbox.addEventListener('click', closeAll);
    
    // Color Swatches en Quick View
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            swatches.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
