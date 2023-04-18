import { createComponent } from "../helpers/create-element.js";

export function createCategory(app) {
   const sectionCategory = createComponent('section', {
      className: 'category section-offset',
   });

   const sectionContainer = createComponent('div', {
      className: 'container',
   });
   sectionCategory.append(sectionContainer);

   const categoryList = createComponent('ul', {
      className: 'category__list',
   });

   sectionContainer.append(categoryList);

   function createCategoryCard(data) {
      const categoryListItem = createComponent('li', {
         className: 'category__item',
      });
      categoryListItem.dataset.id = data.id;

      const categoryCardButton = createComponent('button', {
         className: 'category__card',
      });

      const categoryTitle = createComponent('span', {
         className: 'category__title',
         textContent: `${data.title}`,
      });
      const categoryPairs = createComponent('span', {
         className: 'category__pairs',
         textContent: `${data.length} ${(data.length%10 === 2 || data.length%10 === 3 || data.length%10 === 4) ? 'пары' : (data.length%10 === 1 ? 'пара' : 'пар')}`,
      });
      categoryCardButton.append(categoryTitle, categoryPairs);

      const categoryButtonEdit = createComponent('button', {
         className: 'category__btn category__edit',
         'aria-label': 'редактировать',
      });
      const categoryButtonDel = createComponent('button', {
         className: 'category__btn category__del',
         'aria-label': 'удалить',
      });
      categoryListItem.append(categoryCardButton, categoryButtonEdit, categoryButtonDel);

      return categoryListItem;
   }

   function mount(data) {
      categoryList.textContent = '';
      app.append(sectionCategory);
      const cards = data.map(createCategoryCard);
      categoryList.append(...cards);
   }

   function unmount() {
      sectionCategory.remove();
   }

   return {mount, unmount, categoryList};
}

// {/* <section class="category section-offset">
//       <div class="container">
//         <ul class="category__list">
//           <li class="category__item" data-id="bc2iv1cwi6ht">
//             <button class="category__card">
//               <span class="category__title">Косвенные местоимения</span>
//               <span class="category__pairs">7 пар</span>
//             </button>
//             <button class="category__btn category__edit" aria-label="редактировать"></button>
//             <button class="category__btn category__del" aria-label="удалить"></button>
//           </li> */}