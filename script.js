// ТОВАРЫ
const products = [
    { id: 1, name: "Щетка стеклоочистителя всесезонные Avantech 350 мм (штука)", price: 590, category: "дворники", image: "Щетка стеклоочистителя.jpg" },
    { id: 2, name: "Щетка стеклоочистителя всесезонные Avantech 400 мм (штука)", price: 690, category: "дворники", image: "Щетка стеклоочистителя.jpg" },
    { id: 3, name: "Щетка стеклоочистителя всесезонные Avantech 450 мм (штука)", price: 790, category: "дворники", image: "Щетка стеклоочистителя.jpg" },
    { id: 4, name: "Щетка стеклоочистителя всесезонные Avantech 500 мм (штука)", price: 890, category: "дворники", image: "Щетка стеклоочистителя.jpg" },
    { id: 5, name: "Щетка стеклоочистителя всесезонные Avantech 550 мм (штука)", price: 990, category: "дворники", image: "Щетка стеклоочистителя.jpg" },
    { id: 6, name: "Щетка стеклоочистителя всесезонные Avantech 600 мм (штука)", price: 1090, category: "дворники", image: "Щетка стеклоочистителя.jpg" },
    { id: 7, name: "Щетка стеклоочистителя всесезонные Avantech 650 мм (штука)", price: 1190, category: "дворники", image: "Щетка стеклоочистителя.jpg" },
    { id: 8, name: "Щетка стеклоочистителя всесезонные Avantech 700 мм (штука)", price: 1290, category: "дворники", image: "Щетка стеклоочистителя.jpg" },
    { id: 9, name: "Автомобильный компрессор AVS 580 12V", price: 2950, category: "компрессоры", image: "Компрессор AVS.jpg" },
    { id: 10, name: "Ароматизатор «Морской бриз»", price: 490, category: "пахучки", image: "Ароматизатор морской бриз.jpg" },
    { id: 11, name: "Жидкость для омывателя -30°C", price: 260, category: "автохимия", image: "Жидкость омыв.jpg" },
    { id: 12, name: "Чехлы на сиденья универсальные", price: 6290, category: "аксессуары", image: "Чехлы.jpg" },
    { id: 13, name: "Ароматизатор AREON x version", price: 130, category: "аксессуары", image: "Ароматизатор.jpg" },
    { id: 14, name: "Автомобильный компрессор Goodyear GY-40L", price: 3990, category: "компрессоры", image: "Компрессор GOODYEAR.jpg" },
    { id: 15, name: "Полироль для кузова  AVS", price: 420, category: "автохимия", image: "Полироль для кузова.jpg" },
    { id: 16, name: "Освежитель воздуха", price: 690, category: "пахучки", image: "Освежитель воздуха.jpg" },
    { id: 17, name: "Очиститель стекол Grass", price: 350, category: "автохимия", image: "Очиститель стекол.jpg" }
];

// Корзина
let cart = JSON.parse(localStorage.getItem('avtostar_cart')) || [];

function saveCart() {
    localStorage.setItem('avtostar_cart', JSON.stringify(cart));
    updateCartUI();
    updateCartCount();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    showNotification(`${product.name} добавлен в корзину!`);
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        saveCart();
    }
}

function clearCart() {
    if (confirm("Очистить всю корзину?")) {
        cart = [];
        saveCart();
    }
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items-list');
    const totalSpan = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p style='text-align:center;'>Корзина пуста</p>";
        totalSpan.innerText = "0";
        return;
    }
    
    let html = '';
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    ${item.price}₽ x ${item.quantity}
                </div>
                <div>
                    ${itemTotal}₽
                    <button onclick="removeFromCart(${item.id})" style="background:#c0392b; color:white; border:none; padding:5px 10px; margin-left:10px; border-radius:5px; cursor:pointer;">−</button>
                </div>
            </div>
        `;
    });
    cartContainer.innerHTML = html;
    totalSpan.innerText = total;
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cart-count');
    if (countElement) countElement.innerText = count;
}

function renderCatalog(filter = 'all') {
    const catalogDiv = document.getElementById('catalog');
    if (!catalogDiv) return;
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);
    
    catalogDiv.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price} ₽</div>
                <button onclick="addToCart(${product.id})">В корзину</button>
            </div>
        </div>
    `).join('');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2a9d8f;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// ОФОРМЛЕНИЕ ЗАКАЗА (отправка на сервер)
function checkout() {
    if (cart.length === 0) {
        alert("Корзина пуста!");
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    fetch('backend/api.php?action=order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: cart, total: total })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`✅ Заказ оформлен!\nНомер заказа: ${data.orderId}\nСумма: ${total} ₽\nСпасибо за покупку в Avtostar!`);
            cart = [];
            saveCart();
            closeCart();
        } else {
            alert("Ошибка при оформлении заказа. Попробуйте позже.");
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert("Ошибка соединения с сервером. Убедитесь, что Apache запущен.");
    });
}

// НАВИГАЦИЯ
function showPage(pageName) {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('catalog-page').style.display = 'none';
    document.getElementById('reviews-page').style.display = 'none';
    document.getElementById('contacts-page').style.display = 'none';
    
    if (pageName === 'home') {
        document.getElementById('home-page').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pageName === 'catalog') {
        document.getElementById('catalog-page').style.display = 'block';
        renderCatalog(currentFilter);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pageName === 'reviews') {
        document.getElementById('reviews-page').style.display = 'block';
        loadReviews();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pageName === 'contacts') {
        document.getElementById('contacts-page').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
    if (pageName === 'home') document.getElementById('nav-home').classList.add('active');
    if (pageName === 'catalog') document.getElementById('nav-catalog').classList.add('active');
    if (pageName === 'reviews') document.getElementById('nav-reviews').classList.add('active');
    if (pageName === 'contacts') document.getElementById('nav-contacts').classList.add('active');
}

// ========== ОТЗЫВЫ (РАБОТА С БАЗОЙ ДАННЫХ) ==========
function loadReviews() {
    const container = document.getElementById('reviews-container');
    if (!container) return;
    
    container.innerHTML = '<p style="text-align:center;">Загрузка отзывов...</p>';
    
    fetch('backend/api.php?action=reviews')
        .then(response => response.json())
        .then(reviews => {
            if (reviews.length === 0) {
                container.innerHTML = "<p style='text-align:center;'>Пока нет отзывов. Будьте первым!</p>";
                return;
            }
            
            container.innerHTML = reviews.map(review => `
                <div style="background: white; padding: 20px; border-radius: 15px; margin-bottom: 20px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: bold;">
                        <span>${escapeHtml(review.name)}</span>
                        <span style="color: gold;">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</span>
                    </div>
                    <div style="color: var(--gray); font-size: 0.8rem; margin-bottom: 10px;">${new Date(review.created_at).toLocaleDateString('ru-RU')}</div>
                    <p>${escapeHtml(review.comment)}</p>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Ошибка загрузки отзывов:', error);
            container.innerHTML = "<p style='text-align:center;'>Ошибка загрузки отзывов</p>";
        });
}

function submitReview(event) {
    event.preventDefault();
    
    const name = document.getElementById('review-name').value;
    const rating = parseInt(document.getElementById('review-rating').value);
    const comment = document.getElementById('review-text').value;
    
    if (!name || !rating || !comment) {
        alert("Заполните все поля!");
        return;
    }
    
    fetch('backend/api.php?action=add_review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, rating: rating, comment: comment })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Спасибо за ваш отзыв!");
            document.getElementById('review-form').reset();
            loadReviews();
        } else {
            alert("Ошибка при отправке отзыва");
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert("Ошибка соединения с сервером");
    });
}
// ==================================================

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// КОРЗИНА (открыть/закрыть)
function openCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar.classList.add('open');
    overlay.style.display = 'block';
}

function closeCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    sidebar.classList.remove('open');
    overlay.style.display = 'none';
}

let currentFilter = 'all';

function setupFilters() {
    const filters = document.querySelectorAll('.filter-btn');
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderCatalog(currentFilter);
        });
    });
}

// ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', () => {
    renderCatalog();
    setupFilters();
    loadReviews();
    
    document.getElementById('nav-home').addEventListener('click', (e) => { e.preventDefault(); showPage('home'); });
    document.getElementById('nav-catalog').addEventListener('click', (e) => { e.preventDefault(); showPage('catalog'); });
    document.getElementById('nav-reviews').addEventListener('click', (e) => { e.preventDefault(); showPage('reviews'); });
    document.getElementById('nav-contacts').addEventListener('click', (e) => { e.preventDefault(); showPage('contacts'); });
    document.getElementById('catalog-btn').addEventListener('click', () => showPage('catalog'));
    document.getElementById('footer-home').addEventListener('click', (e) => { e.preventDefault(); showPage('home'); });
    document.getElementById('footer-reviews').addEventListener('click', (e) => { e.preventDefault(); showPage('reviews'); });
    document.getElementById('footer-contacts').addEventListener('click', (e) => { e.preventDefault(); showPage('contacts'); });
    
    document.querySelectorAll('.cat-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('catalog');
            const cat = link.dataset.cat;
            const filterBtn = Array.from(document.querySelectorAll('.filter-btn')).find(btn => btn.dataset.filter === cat);
            if (filterBtn) filterBtn.click();
        });
    });
    
    document.getElementById('cart-icon-btn').addEventListener('click', openCart);
    document.getElementById('close-cart').addEventListener('click', closeCart);
    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
    document.getElementById('checkout-btn').addEventListener('click', checkout);
    document.getElementById('cart-overlay').addEventListener('click', closeCart);
    
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) reviewForm.addEventListener('submit', submitReview);
    
    showPage('home');
});