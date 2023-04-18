import { createCategory } from "./components/create-category.js";
import { createHeader } from "./components/create-header.js";
import { createComponent } from "./helpers/create-element.js";
import { fetchCategories } from "./services/api_service.js";

async function initApp() {
   const header = document.querySelector('.header');
   const app = document.querySelector('#app');

   const headerObject = createHeader(header);

   const categoryObject = createCategory(app);
   console.log(categoryObject);

   async function renderIndex(ev) {
      ev?.preventDefault();
      const categories = await fetchCategories();
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
      categoryObject.unmount();
      headerObject.updateHeaderSubtitle('Новая категория');
   })
}

initApp();