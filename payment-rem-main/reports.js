import { handleError } from './api.js';
import { fetchCategoriesReport, fetchCategoryReport, fetchReport } from './controllers/reports.js';

const renderReport = (reports) => {
  const totalIncome = document.querySelector('#total-income');
  const totalExpense = document.querySelector('#total-expense');
  const total = document.querySelector('#total');

  const incomeValue = reports.find((report) => report._id === 'income');
  const expenseValue = reports.find((report) => report._id === 'expense');
  const totalValue = reports.find((report) => report._id === 'total');

  totalIncome.innerHTML = `${incomeValue.total}$`;
  totalExpense.innerHTML = `${expenseValue.total}$`;
  total.innerHTML = `${totalValue.total}$`;
};

const getChart = (domEl, data) => {
  new Chart(domEl, {
    type: 'doughnut',
    options: {
      responsive: true,
    },
    data: {
      datasets: [
        {
          data: data,
          borderWidth: 1,
        },
      ],
    },
  });
};

const renderCharts = (report, name, number) => {
  const elementId = document.getElementById(`chart-${number}`);
  elementId.innerHTML = '';
  const canvas = document.createElement('canvas');
  canvas.classList.add('pie-chart');
  elementId.appendChild(canvas);

  const canvasElement = elementId.querySelector('canvas');

  const expenseTotal = report.find((report) => report._id === 'expense');
  const incomeTotal = report.find((report) => report._id === 'income');
  const total = report.find((report) => report._id === 'total');

  getChart(canvasElement, [incomeTotal.total, expenseTotal.total, total.total]);

  const title = document.getElementById(`chart-${number}-title`);
  title.innerHTML = name;
};

export const fetchAndRenderReport = () => {
  fetchReport()
    .then((response) => renderReport(response))
    .catch((error) => handleError(error));
};

export const fetchAndRenderCategoriesReport = () => {
  fetchCategoriesReport()
    .then((response) => {
      const reports = response.filter((id) => id != null).slice(0, 3);
      reports.forEach((report, i) =>
        fetchCategoryReport(report._id).then((response) => renderCharts(response, report.name, i + 1))
      );
    })
    .catch((error) => handleError(error));
};
