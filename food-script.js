const cartItems = document.getElementById('cart-items');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');
const placeOrderBtn = document.getElementById('place-order');
const orderMessage = document.getElementById('order-message');

const TAX_RATE = 0.05;
const cart = [];

function addToCart(name, price) {
    cart.push({ name, price: parseFloat(price) });
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = '';
    let subtotal = 0;
    cart.forEach((item, index) => {
        subtotal += item.price;
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    subtotalEl.textContent = subtotal.toFixed(2);
    taxEl.textContent = tax.toFixed(2);
    totalEl.textContent = total.toFixed(2);
    placeOrderBtn.disabled = cart.length === 0;
}

function placeOrder() {
    orderMessage.classList.remove('hidden');
    orderMessage.textContent = 'Thank you! Your order has been placed.';
    cart.length = 0;
    renderCart();
}

// Attach events

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        addToCart(btn.dataset.name, btn.dataset.price);
    });
});

placeOrderBtn.addEventListener('click', placeOrder);
