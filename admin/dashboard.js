<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Bayzpedia</title>
    <link rel="stylesheet" href="../style.css">
    <style>
        .dashboard-container {
            padding: 40px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .form-add-product {
            background: rgba(255,255,255,0.05);
            padding: 30px;
            border-radius: 15px;
            margin-top: 30px;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">
                <h1>Admin<span class="accent"> Panel</span></h1>
            </div>
            <button onclick="logout()" class="admin-btn">
                <i class="fas fa-sign-out-alt"></i> Logout
            </button>
        </div>
    </header>
    
    <div class="dashboard-container">
        <h2>Tambah Produk Baru</h2>
        
        <div class="form-add-product">
            <div class="grid-2">
                <div class="form-group">
                    <label>Nama Produk</label>
                    <input type="text" id="product-name" class="form-control" 
                           placeholder="Contoh: Shorekeeper Multi Platform">
                </div>
                
                <div class="form-group">
                    <label>Harga (Rp)</label>
                    <input type="number" id="product-price" class="form-control" 
                           placeholder="55000">
                </div>
                
                <div class="form-group">
                    <label>Tipe Bot</label>
                    <select id="product-type" class="form-control">
                        <option value="multi_device">Multi Device</option>
                        <option value="single_device">Single Device</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Jumlah Fitur</label>
                    <input type="number" id="product-features" class="form-control" 
                           placeholder="25">
                </div>
                
                <div class="form-group">
                    <label>URL Gambar Thumbnail</label>
                    <input type="url" id="product-image" class="form-control" 
                           placeholder="https://example.com/image.jpg">
                </div>
                
                <div class="form-group">
                    <label>Link WhatsApp</label>
                    <input type="url" id="product-wa" class="form-control" 
                           placeholder="https://wa.me/628...">
                </div>
                
                <div class="form-group">
                    <label>Link Telegram</label>
                    <input type="url" id="product-tg" class="form-control" 
                           placeholder="https://t.me/...">
                </div>
            </div>
            
            <button onclick="addProduct()" class="btn-login" style="margin-top: 20px;">
                <i class="fas fa-plus"></i> Tambah Produk
            </button>
        </div>
        
        <div style="margin-top: 40px;">
            <h3>Produk Saat Ini</h3>
            <div id="current-products"></div>
        </div>
    </div>
    
    <script>
        // Cek login
        if (!localStorage.getItem('admin_logged_in')) {
            window.location.href = 'index.html';
        }
        
        function logout() {
            localStorage.removeItem('admin_logged_in');
            window.location.href = '../index.html';
        }
        
        function addProduct() {
            const product = {
                title: document.getElementById('product-name').value,
                price: parseInt(document.getElementById('product-price').value),
                type: document.getElementById('product-type').value,
                features: parseInt(document.getElementById('product-features').value),
                thumbnail_url: document.getElementById('product-image').value,
                whatsapp_link: document.getElementById('product-wa').value,
                telegram_link: document.getElementById('product-tg').value
            };
            
            alert('Produk berhasil ditambahkan!\n(Catatan: Untuk implementasi full, butuh backend)');
            
            // Reset form
            document.querySelectorAll('.form-control').forEach(input => {
                if (input.type !== 'select-one') input.value = '';
            });
        }
    </script>
</body>
</html>
