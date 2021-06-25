function show(element) {
  element.classList.remove("d-none");
  element.classList.add("d-flex");
}

function hide(element) {
  element.classList.remove("d-flex");
  element.classList.add("d-none");
}

function remove(element) {
  element.remove();
}

export { show, hide, remove };
