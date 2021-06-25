import {
  deleteHandler,
  createContactFormHandler,
} from "../controller/controller.js";
import { getAllContacts } from "../model/contact.js";
import { remove } from "./helpers.js";

function hideContacts() {
  remove(document.querySelector(".contacts").firstElementChild);
}

async function showContacts(contacts) {
  let contactsToShow = contacts ? contacts : await getAllContacts();
  let contactTemplate = Handlebars.compile(
    document.getElementById("contactsTemplate").innerHTML
  );
  Handlebars.registerPartial(
    "contactTemplate",
    document.getElementById("contactTemplate").innerHTML
  );

  let contactsContainer = document.querySelector(".contacts");
  contactsContainer.innerHTML = contactTemplate({ contacts: contactsToShow });

  let updateButton = document.querySelectorAll(".update");
  updateButton.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      createContactFormHandler(e.currentTarget.dataset.id);
    });
  });

  let deleteButton = document.querySelectorAll(".delete");
  deleteButton.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      deleteHandler(e.currentTarget.dataset.id);
    });
  });
}

export { showContacts, hideContacts };
