document.addEventListener('DOMContentLoaded', () => {
    // ================= BASE DE DATOS FALSA DE PRODUCTOS =================
    const products = [
        { id: 1, name: "Tulip Aviator", price: 39.22, category: "Aviator", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600", colors: ["#000000", "#c0c0c0"], tags: ["Classic", "Metal"], isNew: false, isSale: false },
        { id: 2, name: "Brave Heart Yellow", price: 68.19, category: "Brave Heart", img: "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?w=600", colors: ["#e1c699", "#000000"], tags: ["Trendy", "Acetate"], isNew: true, isSale: true },
        { id: 3, name: "Duoshade Flowers", price: 68.19, category: "Flowers", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600", colors: ["#7a5c43"], tags: ["Premium", "Polarized"], isNew: false, isSale: false },
        { id: 4, name: "Retro Vintage 90s", price: 45.00, category: "Retro Vintage", img: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=600", colors: ["#800000", "#000000"], tags: ["Vintage", "UV400"], isNew: false, isSale: true },
        { id: 5, name: "Oversized Glam", price: 85.50, category: "Oversized", img: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600", colors: ["#000000", "#ffffff"], tags: ["Glamour", "Large"], isNew: true, isSale: false },
        { id: 6, name: "Cat Eye Chic", price: 55.00, category: "Cat Eye", img: "https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=600", colors: ["#ffb6c1"], tags: ["Feminine", "Chic"], isNew: false, isSale: false },
        { id: 7, name: "Round Premium", price: 120.00, category: "Premium", img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600", colors: ["#d4af37", "#000000"], tags: ["Luxury", "Round"], isNew: true, isSale: false },
        { id: 8, name: "Square Classic", price: 40.00, category: "Square", img: "https://images.unsplash.com/photo-1556306535-0f09a536f01f?w=600", colors: ["#000000"], tags: ["Standard", "Everyday"], isNew: false, isSale: false }
    ];

    // ================= DIBUJAR PRODUCTOS EN HTML =================
    const productGrid = document.getElementById('product-grid');
    
    function renderProducts(productList) {
        if (!productGrid) return;
        productGrid.innerHTML = '';
        
        if(productList.length === 0) {
            productGrid.innerHTML = '<p>No se encontraron productos con estos filtros.</p>';
            return;
        }

        productList.forEach(prod => {
            let badges = '';
            if(prod.isSale) badges += `<span class="sale-badge">Sale</span>`;
            if(prod.isNew) badges += `<span class="new-badge">New</span>`;

            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-img-wrap">
                    ${badges}
                    <img src="${prod.img}" alt="${prod.name}">
                    <div class="quick-view-btn" data-id="${prod.id}">Quick View</div>
                </div>
                <h3 class="product-title">${prod.name}</h3>
                <span class="product-price">$${prod.price.toFixed(2)}</span>
            `;
            productGrid.appendChild(card);
        });

        attachQuickViewEvents();
    }

    // Renderizar al inicio si estamos en shop.html
    if (productGrid) renderProducts(products);

    // ================= FILTROS (Shop Page) =================
    const categoryLinks = document.querySelectorAll('.category-list a');
    const priceSlider = document.getElementById('price-slider');
    const priceDisplay = document.getElementById('price-display');
    
    let currentCategory = 'all';
    let maxPrice = 200;

    function applyFilters() {
        const filtered = products.filter(p => {
            const matchCategory = currentCategory === 'all' || p.category === currentCategory;
            const matchPrice = p.price <= maxPrice;
            return matchCategory && matchPrice;
        });
        renderProducts(filtered);
    }

    if (categoryLinks) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                categoryLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                currentCategory = link.getAttribute('data-cat');
                applyFilters();
            });
        });
    }

    if (priceSlider) {
        priceSlider.addEventListener('input', (e) => {
            maxPrice = e.target.value;
            priceDisplay.textContent = `$${maxPrice}`;
            applyFilters();
        });
    }

    // ================= QUICK VIEW (LIGHTBOX) DINÁMICO =================
    const lightbox = document.getElementById('quick-view-lightbox');
    const closeLb = document.getElementById('close-lightbox');
    
    // Elementos del DOM dentro del Lightbox
    const lbImg = document.getElementById('lb-img');
    const lbCat = document.getElementById('lb-cat');
    const lbTitle = document.getElementById('lb-title');
    const lbPrice = document.getElementById('lb-price');
    const lbTags = document.getElementById('lb-tags');
    const lbColors = document.getElementById('lb-colors');

    function attachQuickViewEvents() {
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const prod = products.find(p => p.id === id);
                
                if(prod) {
                    // Llenar datos
                    lbImg.src = prod.img;
                    lbCat.textContent = prod.category;
                    lbTitle.textContent = prod.name;
                    lbPrice.textContent = `$${prod.price.toFixed(2)}`;
                    
                    // Llenar tags
                    lbTags.innerHTML = prod.tags.map(t => `<span>${t}</span>`).join('');
                    
                    // Llenar colores
                    lbColors.innerHTML = prod.colors.map((c, i) => 
                        `<div class="color-swatch ${i===0 ? 'active':''}" style="background-color: ${c};"></div>`
                    ).join('');

                    // Re-atar eventos a los colores nuevos
                    const swatches = lbColors.querySelectorAll('.color-swatch');
                    swatches.forEach(swatch => {
                        swatch.addEventListener('click', function() {
                            swatches.forEach(s => s.classList.remove('active'));
                            this.classList.add('active');
                        });
                    });

                    // Mostrar modal
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }

    if (closeLb) {
        closeLb.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // ================= DRAWERS (Login & Cart) =================
    const overlay = document.getElementById('overlay');
    const toggleLogin = document.getElementById('login-toggle');
    const toggleCart = document.getElementById('cart-toggle');
    const drawerLogin = document.getElementById('login-drawer');
    const drawerCart = document.getElementById('cart-drawer');
    const closeDrawers = document.querySelectorAll('.close-drawer');

    function openDrawer(el) {
        if(el) {
            el.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeAll() {
        if(drawerLogin) drawerLogin.classList.remove('active');
        if(drawerCart) drawerCart.classList.remove('active');
        if(lightbox) lightbox.classList.remove('active');
        if(overlay) overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (toggleLogin) toggleLogin.addEventListener('click', (e) => { e.preventDefault(); openDrawer(drawerLogin); });
    if (toggleCart) toggleCart.addEventListener('click', (e) => { e.preventDefault(); openDrawer(drawerCart); });
    closeDrawers.forEach(btn => btn.addEventListener('click', closeAll));
    if (overlay) overlay.addEventListener('click', closeAll);
});
