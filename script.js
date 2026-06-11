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
    { id: 15, name: "Полироль для кузова AVS", price: 420, category: "автохимия", image: "Полироль для кузова.jpg" },
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
    if (confirm("Очистить корзину?")) {
        cart = [];
        saveCart();
    }
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items-list');
    const totalSpan = document.getElementById('cart-total');
    
    if (!cartContainer) return;
    
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
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// ========== ИСПРАВЛЕННАЯ ФУНКЦИЯ CHECKOUT ==========
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
            alert(`✅ Заказ оформлен!\nНомер заказа: ${data.orderId}\nСумма: ${total} ₽\nСпасибо за покупку!`);
            cart = [];
            saveCart();
            closeCart();
        } else {
            alert("Ошибка при оформлении заказа");
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert("Ошибка соединения с сервером. Убедитесь, что Apache запущен.");
    });
}
// ==================================================

function loadReviews() {
    const container = document.getElementById('reviews-container');
    if (!container) return;
    
    container.innerHTML = '<p>Загрузка отзывов...</p>';
    
    fetch('backend/api.php?action=reviews')
        .then(response => response.json())
        .then(reviews => {
            if (reviews.length === 0) {
                container.innerHTML = "<p>Пока нет отзывов. Будьте первым!</p>";
                return;
            }
            
            container.innerHTML = reviews.map(review => `
                <div style="background: white; padding: 20px; border-radius: 15px; margin-bottom: 20px; box-shadow: 0 3px 10px rgba(0,0,0,0.1);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-weight: bold;">
                        <span>${escapeHtml(review.name)}</span>
                        <span style="color: gold;">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
                    </div>
                    <div style="color: gray; font-size: 0.8rem; margin-bottom: 10px;">${new Date(review.created_at).toLocaleDateString()}</div>
                    <p>${escapeHtml(review.comment)}</p>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Ошибка:', error);
            container.innerHTML = "<p>Ошибка загрузки отзывов</p>";
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
        body: JSON.stringify({ name, rating, comment })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Спасибо за отзыв!");
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

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

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
    if (!filters.length) return;
    
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderCatalog(currentFilter);
        });
    });
}

// Получаем параметр из URL для каталога
const urlParams = new URLSearchParams(window.location.search);
const catParam = urlParams.get('cat');
if (catParam && ['дворники', 'компрессоры', 'аксессуары', 'автохимия', 'пахучки'].includes(catParam)) {
    currentFilter = catParam;
}

// ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', () => {
    renderCatalog(currentFilter);
    setupFilters();
    loadReviews();
    
    const cartBtn = document.getElementById('cart-icon-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    const overlay = document.getElementById('cart-overlay');
    const reviewForm = document.getElementById('review-form');
    
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
    if (overlay) overlay.addEventListener('click', closeCart);
    if (reviewForm) reviewForm.addEventListener('submit', submitReview);
    
    // Активируем фильтр из URL
    if (catParam) {
        const filterBtn = Array.from(document.querySelectorAll('.filter-btn')).find(btn => btn.dataset.filter === catParam);
        if (filterBtn) filterBtn.click();
    }
});