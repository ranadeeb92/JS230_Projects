import { remove } from "./helpers.js";
import {
  submitTagFormHandler,
  cancelTagFormHandler,
} from "../controller/controller.js";

function createTagForm() {
  let formTemplate = Handlebars.compile(
    document.getElementById("addTagForm").innerHTML
  );
  let form = formTemplate();
  return form;
}

function getUserInput() {
  let form = document.querySelector('form[data-type="tag"]');
  let data = new FormData(form);
  let tag = Object.fromEntries(data);
  return tag.tagName;
}

function showTagForm() {
  let form = createTagForm();
  document.querySelector(".navbar").insertAdjacentHTML("afterend", form);

  let cancelBtn = document.getElementById("cancel");
  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cancelTagFormHandler();
  });

  document
    .querySelector('form[data-type="tag"]')
    .addEventListener("submit", (e) => {
      e.preventDefault();
      submitTagFormHandler(getUserInput());
    });
}

function hideTagForm() {
  remove(document.querySelector(".tag-form"));
}

export { showTagForm, hideTagForm };
