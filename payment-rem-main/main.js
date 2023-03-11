const showHistoryModal = (modalIsOpen) => {
  const modal = document.getElementById('historyModal');
  const sidebarHome = document.getElementById('sidebar-home');
  const sidebarHistory = document.getElementById('sidebar-history');

  if (modalIsOpen) {
    modal.style.display = 'none';
    sidebarHome.classList.add('active');
    sidebarHistory.classList.remove('active');
  } else {
    modal.style.display = 'block';
    sidebarHome.classList.remove('active');
    sidebarHistory.classList.add('active');
  }
};

const showAddTransactionModal = (modalIsOpen) => {
  const modal = document.getElementById('addTransactionModal');

  if (modalIsOpen) modal.style.display = 'none';
  else modal.style.display = 'block';
};

const showAddCategoryModal = (modalIsOpen) => {
  const modal = document.getElementById('addCategoryModal');

  if (modalIsOpen) modal.style.display = 'none';
  else modal.style.display = 'block';
};
