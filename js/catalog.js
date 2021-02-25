'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i = 0; i < Product.allProducts.length; i++) {
    let option = document.createElement("option");
    option.text = Product.allProducts[i].name;;
    selectElement.add(option);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}
let counter = 0;
// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  // TODO: suss out the item picked from the select list
  const selectElement = document.getElementById('items');
  let item = selectElement.options[selectElement.selectedIndex].text;
  // TODO: get the quantity
  let quantityNo = document.getElementById('quantity').value;
  // TODO: using those, add one item to the Cart
  let index;
  if (localStorage.getItem('cart') !== null && counter == 0){
    let savedItems = JSON.parse(localStorage.getItem('cart'));
    for(let i = 0; i < savedItems.length; i++){
      cart.addItem(savedItems[i].product,savedItems[i].quantity);
      counter++;
    }
  }
  for (let i = 0; i < Product.allProducts.length; i++){
    if (Product.allProducts[i].name === item){
      index = i;
      break;
    }
  }
  cart.addItem(Product.allProducts[index],quantityNo);
  counter++;
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  let cartItemNo = document.getElementById('itemCount');
  if (localStorage.getItem('cart') !== null && counter == 0){
    let cartCounter = JSON.parse(localStorage.getItem('cart')).length;
    cartItemNo.textContent = `(${cartCounter})`;
  } else {
    cartItemNo.textContent = `(${counter})`;
  }
  
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  
  // TODO: Get the item and quantity from the form
  let items = JSON.parse(localStorage.getItem('cart'));
  let cartContents = document.getElementById('cartContents');
  while (cartContents.firstChild){
    cartContents.removeChild(cartContents.firstChild);
  }
  // TODO: Add a new element to the cartContents div with that information
  if (items !== null){
    let cartContents = document.getElementById('cartContents');
    for (let i = 0; i < items.length; i++){
      let article = document.createElement('article');
      article.setAttribute('style','margin-bottom: 15px; clear:both');
      cartContents.appendChild(article);
      let img = document.createElement('img');
      img.setAttribute('src', items[i].product.filePath);
      img.setAttribute('style','width: 400px; height: 200px; float: left; margin-bottom: 15px;');
      article.appendChild(img);
      let ul = document.createElement('ul');
      ul.setAttribute('style','background-color:grey; color:white;')
      article.appendChild(ul);
      let li1 = document.createElement('li');
      ul.appendChild(li1);
      li1.textContent = `item name: ${items[i].product.name}`;
      let li2 = document.createElement('li');
      ul.appendChild(li2);
      li2.textContent = `item quantity: ${items[i].quantity}`;
    }
  }
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
updateCounter();
updateCartPreview();

