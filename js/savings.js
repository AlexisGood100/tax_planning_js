document.addEventListener('DOMContentLoaded', () => {
  console.log("Savings script loaded");

  const form = document.getElementById('savings-form');
  const resultDiv = document.getElementById('savings-result');

  if (!form) return console.warn("Savings form not found");

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const savingsInput = parseFloat(document.getElementById('monthly-savings').value);
    const netIncomeRaw = localStorage.getItem('netIncome');
    const netIncome = parseFloat(netIncomeRaw);

    if (isNaN(savingsInput) || savingsInput <= 0) {
      resultDiv.textContent = "Please enter a valid monthly savings amount.";
      resultDiv.classList.add('text-red-600');
      return;
    }

    if (isNaN(netIncome) || netIncome <= 0) {
      resultDiv.textContent = "No net income found. Please fill out the Budget tab first.";
      resultDiv.classList.add('text-red-600');
      return;
    }

    const savingsRatio = (savingsInput / netIncome) * 100;
    let feedback = "";

    if (savingsRatio < 5) {
      feedback = "Your savings rate is low. Aim for at least 10% if possible.";
    } else if (savingsRatio < 10) {
      feedback = "You're on your way! Try to reach 10–15% for better security.";
    } else if (savingsRatio < 20) {
      feedback = "Great job! Your savings rate is in the healthy target range.";
    } else {
      feedback = "Excellent! You're saving a strong portion of your income.";
    }

    resultDiv.classList.remove('text-red-600');
    resultDiv.classList.add('text-green-700');
    resultDiv.innerHTML = `
      <p><strong>Savings Ratio:</strong> ${savingsRatio.toFixed(1)}%</p>
      <p class="text-sm text-gray-600">${feedback}</p>
    `;

    localStorage.setItem('monthlySavings', savingsInput.toFixed(2));
    localStorage.setItem('savingsRatio', savingsRatio.toFixed(1));
  });
});
