import { createComponent } from "../helpers/create-element.js";

export function createHeader(parent) {
   const container = createComponent('div', {
      className: 'container header__container',
   });
   parent.append(container);

   const headerLogoLink = createComponent('a', {
      href: '#',
      className: 'header__logo-link',
   });
   // container.append(headerLogoLink);

   const logoImage = new Image();
   logoImage.src = 'img/logo.svg';
   logoImage.className = ('header__logo');
   logoImage.alt = 'Логотип сервиса Brain Cards';
   headerLogoLink.append(logoImage);

   const headerSubtitle = createComponent('h2', {
      className: 'header__subtitle',
      textContent: 'Категории',
   });
   // container.append(headerSubtitle);

   function updateHeaderSubtitle(title) {
      headerSubtitle.textContent = title;
   }

   const headerButton = createComponent('button', {
      className: 'header__btn',
      textContent: 'Добавить категорию',
   });
   container.append(headerLogoLink, headerSubtitle, headerButton);

   return {headerLogoLink, headerButton, updateHeaderSubtitle};
}

/*
<header class="header">
    <div class="container header__container">
      <a class="header__logo-link" href="#">
        <img class="header__logo" src="img/logo.svg" alt="Логотип сервиса Brain Cards">
      </a>
      <h2 class="header__subtitle">Категории</h2>
      <button class="header__btn">Добавить категорию</button>
    </div>
  </header>
*/