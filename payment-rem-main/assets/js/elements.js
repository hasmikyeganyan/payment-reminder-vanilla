import { deleteAndRenderTransactions, fetchAndRenderCategoryTransactions } from '../../transactions.js';

export const createAccountListElement = (account) => {
  const li = document.createElement('li');
  li.classList.add('d-flex', 'align-items-center');
  const i = document.createElement('i');
  i.classList.add('fa-regular', 'fa-user', 'text-secondary');
  const text = document.createTextNode(account.fullname);
  li.appendChild(i);
  li.appendChild(text);

  return li;
};

export const createCategoryListElement = (category) => {
  const li = document.createElement('li');
  li.classList.add('d-flex', 'align-items-center');
  const i = document.createElement('i');
  i.classList.add('fa-regular', 'fa-bookmark', 'text-secondary');
  const text = document.createTextNode(` ${category.name}`);
  li.appendChild(i);
  li.appendChild(text);

  li.addEventListener('click', () => fetchAndRenderCategoryTransactions(category._id));

  return li;
};

export const createCategorySelectOptionElement = (category) => {
  const option = document.createElement('option');
  option.value = category._id;
  option.text = category.name;

  return option;
};

export const createTransactionListElement = (transaction) => {
  const li = document.createElement('li');
  li.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'pb-3', 'mb-4', 'border-bottom');

  const details = document.createElement('div');
  details.classList.add('details', 'd-flex', 'align-items-center', 'justify-content-between', 'gap-3');

  const icon = document.createElement('i');
  icon.classList.add(
    'fa',
    `fa-${transaction.type == 'income' ? 'hand-holding-dollar' : 'money-bill-wheat'}`,
    `text-${transaction.type == 'income' ? 'success' : 'danger'}`,
    'h4'
  );

  const detailsText = document.createElement('div');
  const title = document.createElement('h6');
  title.classList.add('m-0');
  title.innerText = transaction.title;

  const date = document.createElement('small');

  const fDate = new Date(transaction.date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  date.classList.add('text-secondary', 'p-0', 'm-0');
  date.innerText = fDate;

  detailsText.appendChild(title);
  detailsText.appendChild(date);
  details.appendChild(icon);
  details.appendChild(detailsText);

  const amount = document.createElement('div');
  amount.classList.add('amount', 'd-flex', 'gap-3');

  const amountText = document.createElement('h6');
  amountText.classList.add('m-0', 'text-secondary');
  amountText.innerText = `${transaction.type == 'income' ? '+' : '-'}` + transaction.amount + '$';

  const delIcon = document.createElement('i');
  delIcon.classList.add('fa', 'fa-trash', 'text-danger', 'cursor-pointer');

  amount.appendChild(amountText);
  amount.appendChild(delIcon);

  delIcon.onclick = () => deleteAndRenderTransactions(transaction._id);

  li.appendChild(details);
  li.appendChild(amount);

  return li;
};
