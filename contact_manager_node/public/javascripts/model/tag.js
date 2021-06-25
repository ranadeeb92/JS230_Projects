let tagsArray = getFromLocalStorage();

function add(tagName) {
  if (!exists(tagName)) {
    tagsArray.push(tagName);
    addToLocalStorage();
  }
}

function getTags() {
  return tagsArray.slice();
}

function exists(tagName) {
  return tagsArray.some((tag) => tag.toLowerCase() === tagName.toLowerCase());
}

function addToLocalStorage() {
  localStorage.setItem("tags", getTags().join(","));
}

function getFromLocalStorage() {
  return localStorage.getItem("tags")
    ? localStorage.getItem("tags").split(",")
    : [];
}

function getArrayOfTagObjects() {
  return getFromLocalStorage().map((tag) => {
    return { name: tag };
  });
}

export { add, getTags, getArrayOfTagObjects };
