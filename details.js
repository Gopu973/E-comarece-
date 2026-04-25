const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://fakestoreapi.com/products/${id}`)
  .then(res => res.json())
  .then(item => {
    const container = document.getElementById("details-container");
    container.innerHTML = `
      <h2>${item.title}</h2>
      <img src="${item.image}" alt="${item.title}">
      <p><strong>Price:</strong> ₹${item.price}</p>
      <p><strong>Description:</strong> ${item.description}</p>
      <p><strong>Category:</strong> ${item.category}</p>
    `;
  });