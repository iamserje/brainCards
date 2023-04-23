import { createComponent } from "../helpers/create-element.js";
import { shumblePairs } from "../helpers/shumble-pairs.js";
import { showAlert } from "./show-allert.js";

export function createPairs(app) {
   const cardSection = createComponent('section', {
      className: 'card section-offset'
   });

   const container = createComponent('div', {
      className: 'container card__container'
   });

   const buttonCardReturn = createComponent('button', {
      className: 'card__return',
      ariaLabel: 'Возврат к категориям'
   });

   const buttonCardItem = createComponent('button', {
      className: 'card__item'
   });

   const spanCardFront = createComponent('span', {
      className: 'card__front',
      textContent: 'улыбка'
   });
   const spanCardBack = createComponent('span', {
      className: 'card__back',
      textContent: 'smile'
   });

   buttonCardItem.append(spanCardFront, spanCardBack);
   cardSection.append(container);
   container.append(buttonCardReturn, buttonCardItem);

   function cardController(data) {
      let index = 0;
      spanCardFront.textContent = data[index][0];
      spanCardBack.textContent = data[index][1];
      function flipCard() {
         buttonCardItem.classList.add('card__item_flipped');
         buttonCardItem.removeEventListener('click', flipCard);
         setTimeout(() => {
            buttonCardItem.classList.remove('card__item_flipped');
            setTimeout(() => {
               index++;
               if (index === data.length) {
                  spanCardFront.textContent = 'The end.';
                  showAlert('Возвращаемся к категориям');
                  setTimeout(() => {
                     buttonCardReturn.click();
                  }, 2000);
                  return;
               }
               spanCardFront.textContent = data[index][0];
               spanCardBack.textContent = data[index][1];
               setTimeout(() => {
                  buttonCardItem.addEventListener('click', flipCard);
               }, 200);
            }, 100);
         }, 1000);
      }
      buttonCardItem.addEventListener('click', flipCard);
   }


   function mount(data = { title: 'Категория:', pairs: [] }) {
      app.append(cardSection);
      cardController(shumblePairs(data.pairs));
   }

   function unmount() {
      cardSection.remove();
   }

   return {buttonCardReturn, mount, unmount };
}

/*
<section class="card section-offset">
      <div class="container card__container">
        <button class="card__return" aria-label="Возврат к категориям"></button>
        <button class="card__item">
          <span class="card__front">улыбка</span>
          <span class="card__back">smile</span>
        </button>
      </div>
    </section>
*/