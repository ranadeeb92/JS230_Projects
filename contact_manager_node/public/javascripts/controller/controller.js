import {
  addContact,
  removeContact,
  updateContact,
  getFilteredContacts,
} from "../model/contact.js";
import { add, getTags } from "../model/tag.js";
import {
  showContactForm,
  hideContactForm,
  showContacts,
  hideContacts,
  showNav,
  hideNav,
  showTagForm,
  hideTagForm,
  showTags,
  hideTags,
} from "../view/index.js";

let nameFilter = "";
let tagFilter = [];

function addToTagFilterArray(name) {
  tagFilter.push(name);
}

function removeFromTagFilterArray(name) {
  tagFilter.splice(tagFilter.indexOf(name));
}

function setNameFilter(value) {
  nameFilter = value;
}

// delete handler
async function deleteHandler(id) {
  await removeContact(id);
  showContacts();
}

// cancel handler
function cancelContactFormHandler() {
  hideContactForm();
  showNav();
  showContacts();
  showTags();
}

function cancelTagFormHandler() {
  hideTagForm();
  showNav();
  showContacts();
  showTags();
}

// contact form handlers
function createContactFormHandler(id) {
  hideContacts();
  hideTags();
  hideNav();
  showContactForm(id);
}

async function submitContactFormHandler(contactInfo) {
  let contact;
  if (contactInfo.id !== undefined) {
    contact = await updateContact(contactInfo);
  } else {
    contact = await addContact(contactInfo);
  }
  console.log(contact);
  hideContactForm();
  showNav();
  showTags();
  showContacts();
}

// tag form handler
function createTagFormHandler() {
  hideContacts();
  hideNav();
  hideTags();
  showTagForm();
}

function submitTagFormHandler(tagInfo) {
  add(tagInfo);
  console.log(getTags());
  hideTagForm();
  showNav();
  showTags();
  showContacts();
}

// filter
async function tagFilterHandler(tagName, checked) {
  if (checked) {
    addToTagFilterArray(tagName);
  } else {
    removeFromTagFilterArray(tagName);
  }
  let contacts = await getFilteredContacts(nameFilter, tagFilter);
  showContacts(contacts);
}

async function searchHandler(value) {
  setNameFilter(value);
  let contacts = await getFilteredContacts(nameFilter, tagFilter);
  showContacts(contacts);
}

function setView() {
  showContacts();
  showTags();
}

setView();

export {
  createContactFormHandler,
  submitContactFormHandler,
  cancelContactFormHandler,
  cancelTagFormHandler,
  deleteHandler,
  createTagFormHandler,
  submitTagFormHandler,
  tagFilterHandler,
  searchHandler,
};
