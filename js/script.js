import { createCategory } from "./components/create-category.js";
import { craeteEditCategory } from "./components/create-edit-category.js";
import { createHeader } from "./components/create-header.js";
import { createPairs } from "./components/create-pairs.js";
import { createComponent } from "./helpers/create-element.js";
import { fetchCards, fetchCategories } from "./services/api_service.js";

async function initApp() {
   const header = document.querySelector('.header');
   const app = document.querySelector('#app');

   const headerObject = createHeader(header);
   const categoryObject = createCategory(app);
   const editCategoryObject = craeteEditCategory(app);
   // todo  открытие карточки pairsObject function createPairs()
   const createPairsObject = createPairs(app);

   function allSectionUnmount() {
      [categoryObject, editCategoryObject, createPairsObject].forEach(obj => obj.unmount());
   }

   async function renderIndex(ev) {
      ev?.preventDefault();
      allSectionUnmount();
      const categories = await fetchCategories();
      headerObject.updateHeaderSubtitle('Категории');
      if (categories.error) {
         app.append(createComponent('p', {
            className: 'server-error',
            textContent: 'Ошибка сервера. Зайдите попозже.',
         }));
         return;
      };
      categoryObject.mount(categories);
   }
   renderIndex();

   headerObject.headerLogoLink.addEventListener('click', renderIndex);
   headerObject.headerButton.addEventListener('click', () => {
      allSectionUnmount();
      headerObject.updateHeaderSubtitle('Новая категория');
      editCategoryObject.mount();
   });

   categoryObject.categoryList.addEventListener('click', async ({ target }) => {
      const categoryItem = target.closest('.category__item');
      if (target.closest('.category__edit')) {
         const dataCards = await fetchCards(categoryItem.dataset.id);
         allSectionUnmount();
         headerObject.updateHeaderSubtitle('Редактирование');
         editCategoryObject.mount(dataCards);
         return;
      }
      if (target.closest('.category__del')) {
         console.log('del');
         return;
      }
      if (categoryItem) {
         const dataCards = await fetchCards(categoryItem.dataset.id);
         allSectionUnmount();
         headerObject.updateHeaderSubtitle(dataCards.title);
         createPairsObject.mount(dataCards);
      }
   });
   createPairsObject.buttonCardReturn.addEventListener('click', renderIndex);

}

initApp();