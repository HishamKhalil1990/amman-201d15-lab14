'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart'));
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tbody = document.querySelector('tbody');
  let tfoot = document.querySelector('tfoot');
  if (tbody.firstChild !== null){
    while(tbody.firstChild){
      tbody.removeChild(tbody.firstChild);
    }
  }
  if (tfoot.firstChild !== null){
    while(tfoot.firstChild){
      tfoot.removeChild(tfoot.firstChild);
    }
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  let tbody = document.querySelector('tbody');
  let tfoot = document.querySelector('tfoot');
  let totalQuantity = 0;
  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
  for (let i = 0; i < cart.items.length; i++){
    let tr1 = document.createElement('tr');
    tbody.appendChild(tr1);
    for (let j = 0; j < 3; j++){
      let td = document.createElement('td');
      tr1.appendChild(td);
      switch (j){
        case 0:
          td.textContent = 'x';
          td.setAttribute('style','font-size: 30px');
          break;
        case 1:
          td.textContent = cart.items[i].quantity;
          totalQuantity += parseInt(cart.items[i].quantity);
          break;
        case 2:
          td.textContent = cart.items[i].product.name;
          break;
      }
    }
  }
  let tr2 = document.createElement('tr');
  tfoot.appendChild(tr2);
    for (let j = 0; j < 3; j++){
      let td = document.createElement('td');
      tr2.appendChild(td);
      if (j == 0){
        td.textContent = 'total quantity';
      } else if (j == 1){
        td.textContent = totalQuantity;
      } else {
        td.textContent = '';
      }
    }
}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table
  event.preventDefault();
  let tr = event.path[1];
  let itemName = tr.childNodes[2].textContent;
  cart.removeItem(itemName);
  loadCart();
  clearCart();
  showCart();

}

// This will initialize the page and draw the cart on screen
renderCart();
