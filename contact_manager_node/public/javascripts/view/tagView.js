import { tagFilterHandler } from "../controller/controller.js";
import { getArrayOfTagObjects } from "../model/tag.js";
import { remove } from "./helpers.js";

function showTags() {
  let tagsTemplate = Handlebars.compile(
    document.getElementById("tagsTemplate").innerHTML
  );
  let tags = getArrayOfTagObjects();
  let tagsDiv = document.createElement("div");
  let scrollDiv = document.createElement("div");
  let h2 = document.createElement("h2");
  h2.textContent = "Tags";
  tagsDiv.classList.add("tags");
  scrollDiv.classList.add("add-scroll");
  scrollDiv.innerHTML = tagsTemplate({ tags: tags });

  tagsDiv.appendChild(h2);
  tagsDiv.appendChild(scrollDiv);
  document.querySelector(".tagsContainer").appendChild(tagsDiv);

  scrollDiv.addEventListener("change", (e) => {
    e.preventDefault();
    if (e.target.checked === true) {
      tagFilterHandler(e.target.value, true);
    } else {
      tagFilterHandler(e.target.value, false);
    }
  });
}

function hideTags() {
  remove(document.querySelector(".tags"));
}

export { showTags, hideTags };
