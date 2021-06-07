class Item {
  constructor(name, quantity) {
    this.name = capitalize(name);
    this.quantity = quantity || 1;
  }
}

class GroceryList{
  constructor(id) {
    this.list = document.querySelector(id);
  }

  addItemToList(item){
    let li = document.createElement('li');
    li.textContent = item.quantity + " " + item.name;
    this.list.appendChild(li);
  }
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function clearForm(form) {
  form.reset();
}

document.addEventListener("DOMContentLoaded", function() {
  let form = document.querySelector('form');
  let groceryList = new GroceryList('#grocery-list');

  form.addEventListener('submit', event => {
    event.preventDefault();
    let itemName = form.querySelector('#name').value;
    let itemQuantity = form.querySelector('#quantity').value;

    let item = new Item(itemName, itemQuantity);
    groceryList.addItemToList(item);
    clearForm(form);
  });
});