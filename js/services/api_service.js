const API_URL = 'https://husky-river-swing.glitch.me/';

export async function fetchCategories() {
   try {
      const response = await fetch(`${API_URL}/api/category`);
      if (response.status === 200 || response.status === 201) {
         const categories = await response.json();
         return categories;
      } else {
         const error = await response.json();
         throw error;
      }
   } catch (error) {
      return {error};
   }
}