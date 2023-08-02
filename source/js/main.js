window.addEventListener('DOMContentLoaded', () => {

  const navToggle = document.querySelector('.nav-toggle');
  const pageNav = document.querySelector('.nav');
  const header = document.querySelector('.header__wrapper');
  const body = document.querySelector('.page__body');
  const navList = document.querySelector('.nav__list');

  header.classList.remove('header__wrapper--nojs');

  pageNav.classList.remove('nav--opened');
  pageNav.classList.add('nav--closed');

  navToggle.addEventListener('click', function (evt) {
    evt.stopPropagation();
    if (navToggle.classList.contains('nav-toggle--closed')) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  body.addEventListener('click', function (evt) {
    if (evt.target !== navList) {
      closeMenu();
    }
  });

  function openMenu() {
    navToggle.classList.remove('nav-toggle--closed');
    navToggle.classList.add('nav-toggle--opened');
    body.classList.add('page__body--lock');
    pageNav.classList.remove('nav--closed');
    pageNav.classList.add('nav--opened');
  }

  function closeMenu() {
    navToggle.classList.remove('nav-toggle--opened');
    navToggle.classList.add('nav-toggle--closed');
    body.classList.remove('page__body--lock');
    pageNav.classList.remove('nav--opened');
    pageNav.classList.add('nav--closed');
  }

  const menuLinks = document.querySelectorAll('.anchor-link[data-goto]');

  function onMenuLinkClick(evt) {
    const menuLink = evt.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
      if (pageNav.classList.contains('nav--opened')) {
        pageNav.classList.remove('nav--opened');
        pageNav.classList.add('nav--closed');
        body.classList.remove('page__body--lock');
        navToggle.classList.remove('nav-toggle--opened');
        navToggle.classList.add('nav-toggle--closed');
      }
      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth',
      });
      evt.preventDefault();
    }
  }

  if (menuLinks.length > 0) {
    menuLinks.forEach((menuLink) => {
      menuLink.addEventListener('click', onMenuLinkClick);
    });

  }


  const formInput = document.querySelectorAll('input');

  formInput.forEach((el) => {
    el.addEventListener('change', changeHandler);
  });

  // записывает изменение значения инпута в localStorage
  function changeHandler(e) {
    localStorage.setItem(e.target.name, e.target.value);
  }

  // записывает значения инпута из localStorage в инпут формы
  function getCheckStorage() {
    for (let i = 0; i < formInput.length; i++) {
      formInput[i].value = localStorage.getItem(formInput[i].name);
    }
  }
  getCheckStorage();
});
