export let cart = [{
  productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
  quantity: 2
},
{
  productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
  quantity: 4
}];

export function addToCart(productId){
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

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem)=>{
    if (cartItem.productId !== productId){
      newCart.push(cartItem)
    }
  })
  cart = newCart;
}