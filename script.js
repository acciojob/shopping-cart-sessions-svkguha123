/*
// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {}

// Add item to cart
function addToCart(productId) {}

// Remove item from cart
function removeFromCart(productId) {}

// Clear cart
function clearCart() {}

// Initial render
renderProducts();
renderCart();
*/
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Cart data
let cart = [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((cartItem) => {
    const li = document.createElement("li");
    li.innerHTML = `${cartItem.name} - $${cartItem.price} <button class="remove-from-cart-btn" data-id="${cartItem.id}">Remove from Cart</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const productToAdd = products.find((product) => product.id === productId);
  if (!productToAdd) return;
  cart.push(productToAdd);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  const indexToRemove = cart.findIndex((cartItem) => cartItem.id === productId);
  if (indexToRemove === -1) return;
  cart.splice(indexToRemove, 1);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  sessionStorage.removeItem("cart");
  renderCart();
}

// Event listeners
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.dataset.id);
    addToCart(productId);
  }
});

cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.dataset.id);
    removeFromCart(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();

// Check if cart data is in session storage and render cart
const cartData = sessionStorage.getItem("cart");
if (cartData) {
  cart = JSON.parse(cartData);
  renderCart();
}