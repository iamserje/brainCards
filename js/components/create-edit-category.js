import { createComponent } from "../helpers/create-element.js";

const TITLE = 'Введите название категории';

export function craeteEditCategory(app) {

   const editCategorySection = createComponent('section', {
      className: 'edit section-offset'
   });

   const container = createComponent('div', {
      className: 'container edit__container'
   });

   const editSectionTitle = createComponent('h2', {
      className: 'edit__title',
      contentEditable: true,
      title: 'Можно редактировать'
   });

   const table = createComponent('table', {
      className: 'edit__table table'
   });
   const thead = createComponent('thead');
   const trThead = createComponent('tr');
   const tableHeadSellMain = createComponent('th', {
      className: 'table__cell',
      textContent: 'main'
   });
   const tableHeadSellSecond = createComponent('th', {
      className: 'table__cell',
      textContent: 'second'
   });
   const tableHeadSellEmpty = createComponent('th', {
      className: 'table__cell',
   });

   const tbody = createComponent('tbody');

   const btnWrapper = createComponent('div', {
      className: 'edit__btn-wrapper'
   });
   const buttonAddRow = createComponent('button', {
      className: 'edit__btn edit__add-row',
      textContent: 'Добавить пару'
   });
   const buttonSave = createComponent('button', {
      className: 'edit__btn edit__save',
      textContent: 'Сохранить категорию'
   });
   const buttonCansel = createComponent('button', {
      className: 'edit__btn edit__cancel',
      textContent: 'Отмена'
   });

   editCategorySection.append(container);
   btnWrapper.append(buttonAddRow, buttonSave, buttonCansel);
   trThead.append(tableHeadSellMain, tableHeadSellSecond, tableHeadSellEmpty)
   thead.append(trThead);
   table.append(thead, tbody);
   container.append(editSectionTitle, table, btnWrapper);

   function createTrBody(dataArr) {
      const trTbody = createComponent('tr');
      const tableBodySellOne = createComponent('td', {
         className: 'table__cell table__cell_one',
         contentEditable: true,
         textContent: dataArr[0]
      });
      const tableBodySellTwo = createComponent('td', {
         className: 'table__cell table__cell_two',
         contentEditable: true,
         textContent: dataArr[1]
      });
      const tableBodySellDel = createComponent('td', {
         className: 'table__cell',
      });
      const tbodyDelRow = createComponent('button', {
         className: 'table__del',
         textContent: 'x'
      });

      tbodyDelRow.addEventListener('click', () => {
         if (confirm('Вы уверены ?')) {
            trTbody.remove();
         }
      });
      tableBodySellDel.append(tbodyDelRow);
      trTbody.append(tableBodySellOne, tableBodySellTwo, tableBodySellDel);

      return trTbody;
   }

   function clearTitle() {
      if (editSectionTitle.textContent === TITLE) {
         editSectionTitle.textContent = '';
      }
   }

   function checkTitle() {
      if (editSectionTitle.textContent === '') {
         editSectionTitle.textContent = TITLE;
      }
   }

   editSectionTitle.addEventListener('focus', clearTitle);
   editSectionTitle.addEventListener('blur', checkTitle);

   buttonAddRow.addEventListener('click', () => {
      const emptyRow =createTrBody(['', '']);
      tbody.append(emptyRow);
   })

   function mount(data = { title: TITLE, pairs: [] }) {
      tbody.textContent = '';
      editSectionTitle.textContent = data.title;
      if (editSectionTitle.textContent === TITLE) {
         editSectionTitle.classList.add('edit__title_change');
      } else {
         editSectionTitle.classList.remove('edit__title_change');
      }

      const rows = data.pairs.map(createTrBody);
      const emptyRow =createTrBody(['', '']);
      tbody.append(...rows, emptyRow);
      app.append(editCategorySection);
   }

   function unmount() {
      editCategorySection.remove();
   }

   return { mount, unmount };
}
/*
   <section class="edit section-offset">
      <div class="container edit__container">
        <h2 class="edit__title" contenteditable="true" title="Можно редактировать">Семья</h2>
        <table class="edit__table table">
          <thead>
            <tr>
              <th class="table__cell">main</th>
              <th class="table__cell">second</th>
              <th class="table__cell"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="table__cell table__cell_one" contenteditable="true">брат</td>
              <td class="table__cell table__cell_two" contenteditable="true">brother</td>
              <td class="table__cell"><button class="table__del">x</button></td>
            </tr>
          </tbody>
        </table>
        <div class="edit__btn-wrapper">
          <button class="edit__btn edit__add-row">Добавить пару</button>
          <button class="edit__btn edit__save" data-id="bczp358gktzy">Сохранить категорию</button>
          <button class="edit__btn edit__cancel">Отмена</button>
        </div>
      </div>
   </section>
*/