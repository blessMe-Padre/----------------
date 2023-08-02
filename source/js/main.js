import './vendor';
import baguetteBox from './modules/baguettebox.js';

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

  /* eslint-disable no-new */
  /* eslint-disable no-undef */
  // Swiper 7.4.1

  if (document.querySelector('.yacht__slider')) {
    new Swiper('.yacht__slider', {
      observer: true,
      slidesPerView: 1,
      loop: true,
      spaceBetween: 34,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

    });
  }

  if (document.querySelector('.routes__slider')) {
    new Swiper('.routes__slider', {
      slidesPerView: 3,
      loop: true,
      spaceBetween: 25,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      },

    });
  }

  // popup
  const popupOpenBtn = document.querySelectorAll('.popup-open-btn');
  const closeBtn = document.querySelector('.popup__btn');
  const popup = document.querySelector('.popup');
  const popupBody = document.querySelector('.popup__body');
  const page = document.querySelector('.page');
  const wrapper = document.querySelector('.wrapper');
  // const header = document.querySelector('.header');
  const input = document.querySelector('input[type="text"]');

  const lockPaddingValue = window.innerWidth - wrapper.offsetWidth + 'px';

  if (popup) {
    const openModalWindow = () => {
      popup.classList.add('is-active');
      page.classList.add('scroll-lock');
      header.style.paddingRight = lockPaddingValue;
      wrapper.style.paddingRight = lockPaddingValue;
      input.focus();
    };

    const closeModalWindow = () => {
      popup.classList.remove('is-active');
      page.classList.remove('scroll-lock');
      header.style.paddingRight = null;
      wrapper.style.paddingRight = null;
    };

    popupOpenBtn.forEach((button) => {
      button.addEventListener('click', () => {
        openModalWindow();
      });
    });

    closeBtn.addEventListener('click', () => {
      closeModalWindow();
    });

    // закрываем окно по esc
    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Esc' || evt.key === 'Escape') {
        if (popup.classList.contains('is-active')) {
          evt.preventDefault();
          closeModalWindow();
        }
      }
    });

    // закрываем окно по клику вне попапа
    popup.addEventListener('click', function (evt) {
      if (evt.target === popupBody) {
        closeModalWindow();
      }
    });
  }

  baguetteBox.run('.routs-item__img-wrapper');

  // DOMContentLoaded
});
