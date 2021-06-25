import { getArrayOfTagObjects } from "../../model/tag.js";

let expands = false;
function expandSelectList() {
  let checkBoxes = document.getElementById("checkboxes");
  if (expands) {
    checkBoxes.style.display = "none";
    expands = false;
  } else {
    checkBoxes.style.display = "block";
    expands = true;
  }
}

function createCheckboxTags() {
  let tagsTemplate = Handlebars.compile(
    document.getElementById("tagsTemplate").innerHTML
  );
  let tagsArray = getArrayOfTagObjects();
  let tags = tagsTemplate({ tags: tagsArray });
  return tags;
}

function markSelectedCheckboxes(checkedTags) {
  let checkBoxFeilds = document.getElementById("checkboxes");
  [...checkBoxFeilds.children].forEach((child) => {
    if (checkedTags.includes(child.firstElementChild.id)) {
      child.firstElementChild.checked = true;
    }
  });
}

function getSelectedCheckboxes(form) {
  let checkBoxes = form.querySelectorAll('input[type="checkbox"]');
  let selectedCheckBoxValues = [];
  checkBoxes.forEach((checkBox) => {
    if (checkBox.checked) {
      selectedCheckBoxValues.push(checkBox.value);
    }
  });
  return selectedCheckBoxValues;
}

export {
  createCheckboxTags,
  markSelectedCheckboxes,
  getSelectedCheckboxes,
  expandSelectList,
};
