document.addEventListener("DOMContentLoaded", ()=> {
  let modal = document.getElementById('modal');
  let modalLayer = document.getElementById('modal-layer');
  let modalTitle = modal.querySelector('h3');
  let modalImage = modal.querySelector('img');
  let modalText = modal.querySelector('p');
  let teamLinks = document.querySelectorAll('#team li > a');
  let closeLink = document.querySelector('#modal a.close');

  // show modal
  function showModal() {
    event.preventDefault();
    let link = event.target.closest('a');
    modalTitle.textContent = link.dataset.name;
    modalImage.src = link.dataset.imgSource;
    modalImage.alt = link.dataset.name;
    modalText.textContent = link.dataset.text;
    modalLayer.classList.replace('hide', 'show');
    modal.classList.replace('hide', 'show');
  }

  function hideModal() {
    event.preventDefault();
    modalTitle.textContent = '';
    modalImage.src = '';
    modalImage.alt = '';
    modalText.textContent = '';
    modalLayer.classList.replace('show', 'hide');
    modal.classList.replace('show', 'hide');
  }

  teamLinks.forEach(link => link.addEventListener('click', showModal));
  modalLayer.addEventListener('click', hideModal);
  closeLink.addEventListener('click', hideModal);
  document.addEventListener('keyup', function(event){
    if(event.key === 'Escape') {
      hideModal();
    }
  });
});