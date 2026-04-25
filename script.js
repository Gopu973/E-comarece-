
// Get references to DOM elements
const container = document.getElementById("card-container"); // Product card container
const searchInput = document.getElementById("search"); // Search input box
const sortSelect = document.getElementById("sortSelect"); // Sort dropdown
const refreshBtn = document.getElementById("refreshBtn"); // Refresh button
const categorySelect = document.getElementById("categorySelect"); // Category dropdown

// Data arrays
let products = []; // All products
let filteredProducts = []; // Filtered products to display
let categories = []; // Product categories

// Fetch products and categories from Fake Store API
function fetchProducts() {
  // Fetch all products
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
      products = data; // Store products
      filteredProducts = [...products]; // Initialize filtered list
      displayProducts(filteredProducts); // Show products
      fetchCategories(); // Fetch categories next
    });
}

// Fetch product categories from API
function fetchCategories() {
  fetch("https://fakestoreapi.com/products/categories")
    .then(res => res.json())
    .then(data => {
      categories = data; // Store categories
      populateCategoryDropdown(); // Fill dropdown
    });
}

// Populate category dropdown with options
function populateCategoryDropdown() {
  categorySelect.innerHTML = '<option value="all">All categories</option>'; // Default option
  categories.forEach(cat => {
    const option = document.createElement("option"); // Create option element
    option.value = cat; // Set value
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1); // Capitalize
    categorySelect.appendChild(option); // Add to dropdown
  });
}

// Initial fetch on page load
fetchProducts();

// Display products in card grid
function displayProducts(items) {
  container.innerHTML = ""; // Clear previous cards
  items.forEach(item => {
    const card = document.createElement("div"); // Create card div
    card.classList.add("card"); // Add card class
    // Card HTML
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>₹${item.price}</p>
      <button onclick="viewDetails(${item.id})">View Details</button>
    `;
    container.appendChild(card); // Add card to container
  });
}

// Navigate to details page for product
function viewDetails(id) {
  window.location.href = `details.html?id=${id}`;
}

// Search filter: update product list as user types
searchInput.addEventListener("input", e => {
  filterProducts();
});

// Category filter: update product list when category changes
categorySelect.addEventListener("change", () => {
  filterProducts();
});

// Filter products by search keyword and category
function filterProducts() {
  const keyword = searchInput.value.toLowerCase(); // Get search text
  const selectedCategory = categorySelect.value; // Get selected category
  filteredProducts = products.filter(p => {
    const matchesKeyword = p.title.toLowerCase().includes(keyword); // Title matches search
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory; // Category matches
    return matchesKeyword && matchesCategory; // Both must match
  });
  applySort(); // Sort after filtering
}

// Sort functionality: update product list when sort changes
sortSelect.addEventListener("change", () => {
  applySort();
});

// Sort products by price
function applySort() {
  let sorted = [...filteredProducts]; // Copy filtered list
  const sortValue = sortSelect.value; // Get sort option
  if (sortValue === "price-asc") {
    sorted.sort((a, b) => a.price - b.price); // Low to high
  } else if (sortValue === "price-desc") {
    sorted.sort((a, b) => b.price - a.price); // High to low
  }
  displayProducts(sorted); // Show sorted products
}

// Reload button: reset filters and reload products
refreshBtn.addEventListener("click", () => {
  searchInput.value = ""; // Clear search
  sortSelect.value = "default"; // Reset sort
  categorySelect.value = "all"; // Reset category
  fetchProducts(); // Reload products
});
