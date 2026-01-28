// URL file JSON produk
const PRODUCTS_URL = 'data/products.json';

// Load produk dari JSON
async function loadProducts() {
    try {
        const response = await fetch(PRODUCTS_URL);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        document.getElementById('product-list').innerHTML = 
            '<div class="error">Gagal memuat produk. Silakan refresh halaman.</div>';
    }
}

// Tampilkan produk
function displayProducts(products) {
    const container = document.getElementById('product-list');
    
    if (products.length === 0) {
        container.innerHTML = '<div class="no-products">Belum ada produk tersedia.</div>';
        return;
    }
    
    let html = '';
    
    products.forEach(product => {
        html += `
            <div class="product-card">
                ${product.type === 'multi_device' ? 
                    '<span class="product-badge">Multi Device</span>' : 
                    '<span class="product-badge" style="background:#6c757d">Single</span>'}
                
                <img src="${product.thumbnail_url || 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?w=400&h=200&fit=crop'}" 
                     alt="${product.title}" 
                     class="product-image">
                
                <h3 class="product-title">${product.title}</h3>
                
                <div class="product-price">Rp ${product.price.toLocaleString('id-ID')}</div>
                
                <ul class="product-features">
                    <li><i class="fas fa-check"></i> ${product.features} Fitur Premium</li>
                    <li><i class="fas fa-sync-alt"></i> Auto Update Script</li>
                    <li><i class="fas fa-headset"></i> Support 24/7</li>
                </ul>
                
                <div class="buttons">
                    <a href="${product.whatsapp_link || 'https://wa.me/628xxxxxxxxxx'}" 
                       target="_blank" 
                       class="btn btn-wa">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                    <a href="${product.telegram_link || 'https://t.me/xxxxxxxx'}" 
                       target="_blank" 
                       class="btn btn-tg">
                        <i class="fab fa-telegram"></i> Telegram
                    </a>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Modal detail produk
function setupModal() {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// Load saat halaman siap
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupModal();
});

// Login admin (simulasi)
function loginAdmin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Ganti dengan credential asli
    if (username === 'yummbayz' && password === 'altheric123') {
        localStorage.setItem('admin_logged_in', 'true');
        window.location.href = 'admin/dashboard.html';
    } else {
        alert('Username atau password salah!');
    }
}

// Cek login admin
function checkAdminLogin() {
    if (!localStorage.getItem('admin_logged_in') && 
        window.location.pathname.includes('/admin/')) {
        window.location.href = '/admin/';
    }
}

// Logout admin
function logoutAdmin() {
    localStorage.removeItem('admin_logged_in');
    window.location.href = '/';
}
