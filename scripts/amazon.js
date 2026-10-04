import {cart, addToCart} from "../data/cart.js";
import {products} from "../data/products.js";

let productsHTML ="";
products.forEach((product)=>{
  productsHTML += `
          <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $ ${(product.priceCents /100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button"
          data-product-id ="${product.id}">
            Add to Cart
          </button>
        </div>
  `;

});

document.querySelector(".js-products-grid").innerHTML = productsHTML;
let timer = null;
document.querySelectorAll('.js-add-to-cart-button').forEach((button)=>{
  button.addEventListener("click",()=>{
    //best practice when coding: separate different stuff in functions
    const {productId} = button.dataset;
    addedMessage(productId)
    addToCart(productId)
    calculateQuantity()
  })
})

//calculateQuantity will not go into cart.js because it calculates a value for the main page, not the cart page, and it's not changing anything on the cart.
function calculateQuantity(){
      let totalQuantity =0;
      cart.forEach((cartItem)=>{
      totalQuantity+=cartItem.quantity;
    })
    document.querySelector(".js-cart-quantity").textContent = totalQuantity
}//best practice is to group related code together in its own  file
/*
function addToCart(productId){
      let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value)
    let matchingItem;
    cart.forEach((cartItem)=>{
      if (productId === cartItem.productId){
        matchingItem  = cartItem;
      }
    })
    if (matchingItem){
      matchingItem.quantity+=quantity
    }

    else{
      cart.push({
        productId,
        quantity
      })
    }
}
*/
function addedMessage(productId){
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`)
    if (addedMessage.classList.contains("visible")){
      addedMessage.classList.remove("visible");
      clearInterval(timer)
      addedMessage.classList.add("visible");
      timer = setTimeout(()=>{
        addedMessage.classList.remove("visible");
      },2000)
    }
    else if (!addedMessage.classList.contains("visible"))
    {
      addedMessage.classList.add("visible");
      timer = setTimeout(()=>{
      addedMessage.classList.remove("visible");
    },2000)
    }
}