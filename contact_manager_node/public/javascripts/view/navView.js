import { hide, show } from "./helpers.js";
import {
  createContactFormHandler,
  createTagFormHandler,
  searchHandler,
} from "../controller/controller.js";

function showNav() {
  show(document.querySelector(".navbar"));
}

function hideNav() {
  hide(document.querySelector(".navbar"));
}

let createContactBtn = document.querySelector("#createContact");
createContactBtn.addEventListener("click", () => createContactFormHandler());

let createTagBtn = document.getElementById("createTag");
createTagBtn.addEventListener("click", () => createTagFormHandler());

let serachInput = document.getElementById("search-input");
serachInput.addEventListener("keyup", (e) => {
  searchHandler(e.target.value);
});

export { showNav, hideNav };
