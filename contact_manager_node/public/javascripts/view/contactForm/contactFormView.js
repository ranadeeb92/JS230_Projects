import {
  createCheckboxTags,
  markSelectedCheckboxes,
  getSelectedCheckboxes,
  expandSelectList,
} from "./checkboxSelectMenu.js";
import { remove } from "../helpers.js";
import { getSingleContact } from "../../model/contact.js";
import {
  submitContactFormHandler,
  cancelContactFormHandler,
} from "../../controller/controller.js";

function getUserInput() {
  let form = document.querySelector('form[data-type="content"]');
  let data = new FormData(form);
  let contact = {};
  let selectedCheckBoxValues = getSelectedCheckboxes(form);
  data.append("tags", selectedCheckBoxValues);
  data.forEach((value, key) => {
    contact[key] = value;
  });
  contact.tags = contact.tags.split(",");
  return contact;
}

function createContactForm(contact) {
  let formTemplate = Handlebars.compile(
    document.getElementById("addContactForm").innerHTML
  );
  let form = formTemplate(contact);
  return form;
}

async function showContactForm(id) {
  let contact = { tags: [] };
  if (id) {
    contact = await getSingleContact(id);
    console.log(contact);
  }
  let form = createContactForm(contact);
  document.querySelector(".navbar").insertAdjacentHTML("afterend", form);

  document.getElementById("checkboxes").innerHTML = createCheckboxTags();
  markSelectedCheckboxes(contact.tags);

  let selectbox = document.querySelector(".selectBox");
  selectbox.addEventListener("click", expandSelectList);

  let cancelBtn = document.getElementById("cancel");
  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cancelContactFormHandler();
  });

  document
    .querySelector('form[data-type="content"]')
    .addEventListener("submit", (e) => {
      e.preventDefault();
      let contact = getUserInput();
      if (id) {
        contact.id = id;
      }
      submitContactFormHandler(contact);
    });
}

function hideContactForm() {
  remove(document.querySelector(".contact-form"));
}

export { showContactForm, hideContactForm };
