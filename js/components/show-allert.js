import { createComponent } from "../helpers/create-element.js";

export function showAlert(text) {
   const alertBlock = createComponent('div', {
      className: 'alert'
   });
   const alertText = createComponent('p', {
      className: 'alert__text',
      textContent: text
   });
   alertBlock.append(alertText);
   document.body.append(alertBlock);
   setTimeout(() => {
      alertBlock.classList.add('alert_show');
   });
   setTimeout(() => {
      alertBlock.classList.remove('alert_show');
      setTimeout(() => {
         alertBlock.remove();
      }, 200);
   }, 3000);
}