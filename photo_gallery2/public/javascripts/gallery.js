document.addEventListener('DOMContentLoaded', function(){
  let photosTemplate = Handlebars.compile(document.getElementById('photos').innerHTML);
  let photoInfoTemplate = Handlebars.compile(document.getElementById('photo_information').innerHTML);
  let photoComments = Handlebars.compile(document.getElementById('photo_comments').innerHTML);
  let photo_comment =  Handlebars.compile(document.getElementById('photo_comment').innerHTML);
  Handlebars.registerPartial('photo_comment', document.getElementById('photo_comment').innerHTML);
  
  let slides = document.getElementById('slides');
  let sctionHeader = document.querySelector('section > header');
  let sectionComments = document.querySelector('#comments ul');
  let form = document.querySelector('form');


  let photos;
  // fetch photos data 
  async function getPhotos() {
    try{
      let response = await fetch('/photos', {method: 'GET'});
      let data = await response.json();
      photos = data;
      renderPhotos(data);
      renderPhotoInfo(data[0].id);
      getComments(data[0].id);
      sildeShow.init();
    }catch(error){
      console.log(error);
    }
  }
  // render photos on the page
  function renderPhotos(data) {
    //slides.insertAdjacentHTML('beforeend',photosTemplate({photos: data}));
    slides.innerHTML = photosTemplate({photos: data});
  }
  
  // render photo informatio
  function renderPhotoInfo(photoId) {
    let photo = photos.find(photo => photo.id = photoId);
    //sctionHeader.insertAdjacentHTML('beforeend', photoInfoTemplate(photo));
    sctionHeader.innerHTML = photoInfoTemplate(photo);
  }


  // get comment for a photo
  async function getComments(photoId) {
    try{
      let response = await fetch("/comments?photo_id=" + photoId);
      let data = await response.json();
      renderComments(data);
    }catch(error) {
      console.log(error);
    }
  }
  // render comments for a photo
  function renderComments(comments) {
    //sectionComments.insertAdjacentHTML('beforeend', photoComments({comments: comments}));
    sectionComments.innerHTML = photoComments({comments: comments});
  }

  function renderComment(comment) {
    sectionComments.insertAdjacentHTML('beforeend', photo_comment(comment));
  }

  let sildeShow = {
    nextSlide(e) {
      e.preventDefault();
      let next = this.currentSlide.nextElementSibling;
      if(!next) {
        next = this.firstSlide;
      }
      this.fadeOut(this.currentSlide);
      this.fadeIn(next);
      this.renderPhotoContent(next.getAttribute('data-id'));
      this.currentSlide = next;
    },

    prevSlide(e) {
      e.preventDefault();
      let prev = this.currentSlide.previousElementSibling;
      if(!prev) {
        prev = this.lastSlide;
      }
      this.fadeOut(this.currentSlide);
      this.fadeIn(prev);
      this.renderPhotoContent(prev.getAttribute('data-id'));
      this.currentSlide = prev;
    },

    fadeOut(slide) {
      slide.classList.remove('show');
      slide.classList.add('hide');
    },

    fadeIn(slide) {
      slide.classList.remove('hide');
      slide.classList.add('show');
    },

    renderPhotoContent(id) {
      renderPhotoInfo(Number(id));
      getComments(id);
    },

    bind() {
      let prev = this.slideshow.querySelector("a.prev");
      let next = this.slideshow.querySelector("a.next");
      prev.addEventListener('click', e => { this.prevSlide(e)});
      next.addEventListener('click', e => { this.nextSlide(e)});
    },
    init() {
      console.log("init")
      this.slideshow = document.querySelector('#slideshow');
      let slides = this.slideshow.querySelectorAll('figure');
      this.lastSlide = slides[slides.length -1];
      this.firstSlide = slides[0];
      this.currentSlide = this.firstSlide;
      this.bind();
    }
  };

  // like and favorite a photo
  sctionHeader.addEventListener('click', e => {
    e.preventDefault();
    let button = e.target;
    if(button.tagName === 'A') {
      let buttonType = button.getAttribute('data-property');
      if(buttonType) {
        let href = button.getAttribute('href');
        let dataId = button.getAttribute('data-id');
        let text = button.textContent;
        incrementLikeOrFavorite();

        async function incrementLikeOrFavorite() {
          let response = await fetch(href, 
            {
              method:"POST", 
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              },
              body: 'photo_id=' + dataId
           });
          let data = await response.json();
          button.textContent = text.replace(/\d+/, data.total);
        }

      }
    }
  });

  getPhotos();

  // add a new comment for a photo

  form.addEventListener('submit', e => {
    e.preventDefault();
    let data = new FormData(form);

    let encodedData = [];
    for([key, value] of data.entries()) {
      if(key === 'photo_id') {
        let currentSlideId = sildeShow.currentSlide.getAttribute('data-id');
        value = currentSlideId;
      }
      encodedData.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
    }
    encodedData = encodedData.join('&');

    addComment();
    async function addComment() {
      let response = await fetch(form.action, {
        method : form.method,
        headers :{
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: encodedData
      });

      let comment = await response.json();
      renderComment(comment);
      form.reset();
    }
  });

});