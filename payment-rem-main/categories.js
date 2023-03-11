import { handleError } from './api.js';
import { createCategoryListElement, createCategorySelectOptionElement } from './assets/js/elements.js';
import { fetchCategories, createCategory } from './controllers/categories.js';

const categoriesList = document.getElementById('categories-list');
const categoriesSelect = document.getElementById('add-transaction-category-select');

const renderCategoriesList = (categories) => {
  categoriesList.innerHTML = '';
  categories.forEach((category) => categoriesList.appendChild(createCategoryListElement(category)));
};

const renderCategoriesSelect = (categories) => {
  if (categories.length > 0) {
    categoriesSelect.innerHTML = '';
    categories.forEach((category) => categoriesSelect.appendChild(createCategorySelectOptionElement(category)));
  }
};

export const fetchAndRenderCategories = () => {
  fetchCategories()
    .then((response) => {
      renderCategoriesList(response);
      renderCategoriesSelect(response);
    })
    .catch((error) => handleError(error));
};

const addCategoryForm = document.getElementById('add-category-form');
addCategoryForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = addCategoryForm['name'].value;

  const category = { name };

  createCategory(category).then((response) => {
    if (response) {
      fetchAndRenderCategories();
      showAddCategoryModal(true);
    }
  });
});
