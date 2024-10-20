document.addEventListener("DOMContentLoaded", async () => {
  const homePageDiv = document.querySelector(".home_page");

  try {
      const response = await fetch("http://localhost:8000/items/");
      const data = await response.json();
      console.log(data);
      
      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      let cartCount = cart.length || 0;
      
      data.forEach(({ imageUrl, name, description, price }) => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("items");
  
          const img = document.createElement("img");
          img.src = imageUrl;
          img.alt = name;
  
          const nameElem = document.createElement("h3");
          nameElem.textContent = name;
  
          const descriptionElem = document.createElement("p");
          descriptionElem.textContent = description;
  
          const priceElem = document.createElement("h5");
          priceElem.textContent = `$${price}`;
  
          const addToCartButton = document.createElement("button");
          addToCartButton.textContent = "Add to cart";
          addToCartButton.classList.add(`add-to-cart`);
  
          addToCartButton.addEventListener("click", () => {
              cart.push({ name, price });
              cartCount++;
              updateCartCount();
              sessionStorage.setItem("cart", JSON.stringify(cart));
          });
  
          productDiv.append(img, nameElem, descriptionElem, priceElem, addToCartButton);
          homePageDiv.append(productDiv);
      });
      
      updateCartCount();
      
      function updateCartCount() {
          const cartCountElement = document.getElementById("cart-count");
          cartCountElement.textContent = cartCount;
          sessionStorage.setItem("cartCount", cartCount);
      }
  } catch (error) {
      console.error("Error fetching data:", error);
  }
});
