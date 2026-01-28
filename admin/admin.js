// ============================================
// ADMIN PANEL BAYZPEDIA.STORE
// ============================================

// Konfigurasi
const API_URL = '../data/products.json';
const ADMIN_USERNAME = 'yummbayz';
const ADMIN_PASSWORD = 'altheric123';

// Cek login status
function checkLogin() {
    const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    const isLoginPage = window.location.pathname.includes('index.html');
    
    if (!isLoggedIn && !isLoginPage) {
        window.location.href = 'index.html';
        return false;
    }
    
    return isLoggedIn;
}

// Logout function
function logoutAdmin() {
    localStorage.removeItem('admin_logged_in');
    window.location.href = '../index.html';
}

// Load semua produk
async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Gagal load produk');
        
        const products = await response.json();
        displayProducts(products);
        return products;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('current-products').innerHTML = 
            '<div class="error">Gagal memuat produk</div>';
        return [];
    }
}

// Tampilkan produk di table
function displayProducts(products) {
    const container = document.getElementById('current-products');
    
    if (products.length === 0) {
        container.innerHTML = '<p>Belum ada produk.</p>';
        return;
    }
    
    let html = `
        <table class="products-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Thumbnail</th>
                    <th>Nama Produk</th>
                    <th>Harga</th>
                    <th>Tipe</th>
                    <th>Fitur</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    products.forEach((product, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>
                    <img src="${product.thumbnail_url || 'https://via.placeholder.com/50'}" 
                         alt="Thumbnail" 
                         style="width:50px;height:50px;object-fit:cover;border-radius:5px;">
                </td>
                <td><strong>${product.title}</strong></td>
                <td>Rp ${product.price.toLocaleString('id-ID')}</td>
                <td>
                    <span class="badge ${product.type === 'multi_device' ? 'badge-success' : 'badge-secondary'}">
                        ${product.type === 'multi_device' ? 'Multi' : 'Single'}
                    </span>
                </td>
                <td>${product.features} fitur</td>
                <td>
                    <button class="btn-sm btn-edit" onclick="editProduct(${index})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-sm btn-delete" onclick="deleteProduct(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}

// Tambah produk baru
async function addProduct() {
    // Validasi input
    const title = document.getElementById('product-name').value.trim();
    const price = document.getElementById('product-price').value;
    const type = document.getElementById('product-type').value;
    const features = document.getElementById('product-features').value;
    const thumbnail = document.getElementById('product-image').value.trim();
    const waLink = document.getElementById('product-wa').value.trim();
    const tgLink = document.getElementById('product-tg').value.trim();
    
    if (!title || !price || !features) {
        alert('Harap isi semua field wajib!');
        return;
    }
    
    const newProduct = {
        id: Date.now(), // Generate unique ID
        title: title,
        price: parseInt(price),
        type: type,
        features: parseInt(features),
        thumbnail_url: thumbnail || 'https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?w=400&h=200&fit=crop',
        whatsapp_link: waLink || `https://wa.me/628xxxxxxxxxx?text=Halo,%20saya%20mau%20beli%20${encodeURIComponent(title)}`,
        telegram_link: tgLink || 'https://t.me/username'
    };
    
    try {
        // Load produk yang ada
        const response = await fetch(API_URL);
        const products = await response.json();
        
        // Tambah produk baru
        products.push(newProduct);
        
        // Simpan ke JSON (dalam real scenario, ini butuh backend)
        // Untuk sekarang kita simpan di localStorage dulu
        localStorage.setItem('bayzpedia_products', JSON.stringify(products));
        
        // Update tampilan
        displayProducts(products);
        
        // Reset form
        document.getElementById('product-name').value = '';
        document.getElementById('product-price').value = '';
        document.getElementById('product-features').value = '';
        document.getElementById('product-image').value = '';
        document.getElementById('product-wa').value = '';
        document.getElementById('product-tg').value = '';
        
        alert('✅ Produk berhasil ditambahkan!\n\nCatatan: Untuk penyimpanan permanen, butuh backend server.');
        
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal menambah produk');
    }
}

// Edit produk
function editProduct(index) {
    alert(`Edit produk #${index + 1}\n\nFitur edit full butuh backend. Untuk sementara, hapus lalu buat baru.`);
}

// Hapus produk
async function deleteProduct(index) {
    if (!confirm(`Hapus produk #${index + 1}?`)) return;
    
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        
        products.splice(index, 1);
        
        // Simpan perubahan
        localStorage.setItem('bayzpedia_products', JSON.stringify(products));
        
        // Update tampilan
        displayProducts(products);
        
        alert('Produk berhasil dihapus!');
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal menghapus produk');
    }
}

// Login function
function loginAdmin(event) {
    if (event) event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem('admin_logged_in', 'true');
        window.location.href = 'dashboard.html';
    } else {
        alert('❌ Login gagal! Username/password salah.\n\nDefault: yummbayz / altheric123');
    }
}

// Export data produk
function exportProducts() {
    const products = JSON.parse(localStorage.getItem('bayzpedia_products') || '[]');
    
    if (products.length === 0) {
        alert('Belum ada data produk untuk di-export');
        return;
    }
    
    const dataStr = JSON.stringify(products, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `bayzpedia-products-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    alert(`✅ Berhasil export ${products.length} produk!\nFile: ${exportFileDefaultName}`);
}

// Import data produk
function importProducts(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const products = JSON.parse(e.target.result);
            
            if (!Array.isArray(products)) {
                throw new Error('Format JSON tidak valid');
            }
            
            localStorage.setItem('bayzpedia_products', JSON.stringify(products));
            displayProducts(products);
            
            alert(`✅ Berhasil import ${products.length} produk!`);
            
        } catch (error) {
            alert('❌ Gagal import file. Pastikan file JSON valid.');
        }
    };
    
    reader.readAsText(file);
    
    // Reset input file
    event.target.value = '';
}

// ============================================
// INITIALIZE ADMIN PANEL
// ============================================

// Auto execute berdasarkan halaman
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    
    // Jika di dashboard, load produk
    if (path.includes('dashboard.html')) {
        if (checkLogin()) {
            loadProducts();
            
            // Tambah event listener untuk form
            const addBtn = document.getElementById('add-product-btn');
            if (addBtn) {
                addBtn.addEventListener('click', addProduct);
            }
            
            // Tambah event listener untuk enter di form
            const inputs = document.querySelectorAll('.form-control');
            inputs.forEach(input => {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        addProduct();
                    }
                });
            });
        }
    }
    
    // Jika di login page, set default values
    if (path.includes('index.html') || path.endsWith('/admin/')) {
        document.getElementById('username').value = ADMIN_USERNAME;
        document.getElementById('password').value = ADMIN_PASSWORD;
        
        // Auto login jika di localhost (development)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            document.getElementById('username').value = ADMIN_USERNAME;
            document.getElementById('password').value = ADMIN_PASSWORD;
        }
    }
});

// ============================================
// CSS UNTUK ADMIN PANEL (tambahkan di style.css)
// ============================================
const adminCSS = `
/* ADMIN STYLES */
.badge {
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 600;
}

.badge-success {
    background: #25D366;
    color: white;
}

.badge-secondary {
    background: #6c757d;
    color: white;
}

.btn-sm {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    margin: 0 3px;
}

.btn-edit {
    background: #007bff;
    color: white;
}

.btn-delete {
    background: #dc3545;
    color: white;
}

.products-table {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border-radius: 10px;
    overflow: hidden;
    margin-top: 20px;
}

.products-table th {
    background: rgba(37, 211, 102, 0.1);
    padding: 15px;
    text-align: left;
    color: var(--primary);
}

.products-table td {
    padding: 15px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
}

.products-table tr:hover {
    background: rgba(255,255,255,0.02);
}

.error {
    color: #ff6b6b;
    padding: 20px;
    text-align: center;
    border: 1px dashed #ff6b6b;
    border-radius: 10px;
    margin: 20px 0;
}
`;

// Inject CSS ke halaman admin
if (document.head && window.location.pathname.includes('/admin/')) {
    const style = document.createElement('style');
    style.textContent = adminCSS;
    document.head.appendChild(style);
}
