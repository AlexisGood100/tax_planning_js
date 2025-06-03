// Estimated state and federal tax rates (simplified for educational purposes)
const stateTaxData = {
  "Alabama": { stateRate: 0.05, federalRate: 0.12 },
  "Alaska": { stateRate: 0.00, federalRate: 0.12 },
  "Arizona": { stateRate: 0.045, federalRate: 0.12 },
  "Arkansas": { stateRate: 0.055, federalRate: 0.12 },
  "California": { stateRate: 0.09, federalRate: 0.12 },
  "Colorado": { stateRate: 0.0455, federalRate: 0.12 },
  "Connecticut": { stateRate: 0.06, federalRate: 0.12 },
  "Delaware": { stateRate: 0.052, federalRate: 0.12 },
  "Florida": { stateRate: 0.00, federalRate: 0.12 },
  "Georgia": { stateRate: 0.0575, federalRate: 0.12 },
  "Hawaii": { stateRate: 0.08, federalRate: 0.12 },
  "Idaho": { stateRate: 0.06, federalRate: 0.12 },
  "Illinois": { stateRate: 0.0495, federalRate: 0.12 },
  "Indiana": { stateRate: 0.0323, federalRate: 0.12 },
  "Iowa": { stateRate: 0.06, federalRate: 0.12 },
  "Kansas": { stateRate: 0.057, federalRate: 0.12 },
  "Kentucky": { stateRate: 0.05, federalRate: 0.12 },
  "Louisiana": { stateRate: 0.06, federalRate: 0.12 },
  "Maine": { stateRate: 0.07, federalRate: 0.12 },
  "Maryland": { stateRate: 0.0575, federalRate: 0.12 },
  "Massachusetts": { stateRate: 0.05, federalRate: 0.12 },
  "Michigan": { stateRate: 0.0425, federalRate: 0.12 },
  "Minnesota": { stateRate: 0.07, federalRate: 0.12 },
  "Mississippi": { stateRate: 0.05, federalRate: 0.12 },
  "Missouri": { stateRate: 0.05, federalRate: 0.12 },
  "Montana": { stateRate: 0.06, federalRate: 0.12 },
  "Nebraska": { stateRate: 0.055, federalRate: 0.12 },
  "Nevada": { stateRate: 0.00, federalRate: 0.12 },
  "New Hampshire": { stateRate: 0.00, federalRate: 0.12 },
  "New Jersey": { stateRate: 0.0637, federalRate: 0.12 },
  "New Mexico": { stateRate: 0.049, federalRate: 0.12 },
  "New York": { stateRate: 0.062, federalRate: 0.12 },
  "North Carolina": { stateRate: 0.0475, federalRate: 0.12 },
  "North Dakota": { stateRate: 0.04, federalRate: 0.12 },
  "Ohio": { stateRate: 0.04, federalRate: 0.12 },
  "Oklahoma": { stateRate: 0.05, federalRate: 0.12 },
  "Oregon": { stateRate: 0.09, federalRate: 0.12 },
  "Pennsylvania": { stateRate: 0.0307, federalRate: 0.12 },
  "Rhode Island": { stateRate: 0.055, federalRate: 0.12 },
  "South Carolina": { stateRate: 0.07, federalRate: 0.12 },
  "South Dakota": { stateRate: 0.00, federalRate: 0.12 },
  "Tennessee": { stateRate: 0.00, federalRate: 0.12 },
  "Texas": { stateRate: 0.00, federalRate: 0.12 },
  "Utah": { stateRate: 0.0495, federalRate: 0.12 },
  "Vermont": { stateRate: 0.065, federalRate: 0.12 },
  "Virginia": { stateRate: 0.0575, federalRate: 0.12 },
  "Washington": { stateRate: 0.00, federalRate: 0.12 },
  "West Virginia": { stateRate: 0.065, federalRate: 0.12 },
  "Wisconsin": { stateRate: 0.053, federalRate: 0.12 },
  "Wyoming": { stateRate: 0.00, federalRate: 0.12 }
};

function populateStateOptions() {
  const select = document.getElementById('state-select');
  if (!select) return console.warn("State dropdown not found");

  Object.keys(stateTaxData).forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    select.appendChild(option);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  populateStateOptions();

  const form = document.getElementById('budget-form');
  const resultDiv = document.getElementById('net-income-result');

  if (!form || !resultDiv) {
    console.warn("Budget form or result container missing.");
    return;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const grossIncome = parseFloat(document.getElementById('gross-income').value);
    const state = document.getElementById('state-select').value;

    if (!state || isNaN(grossIncome) || grossIncome <= 0) {
      resultDiv.textContent = "Please enter a valid income and select a state.";
      resultDiv.classList.remove('text-green-700');
      resultDiv.classList.add('text-red-600');
      return;
    }

    const { stateRate, federalRate } = stateTaxData[state];
    const federalWithholding = grossIncome * federalRate;
    const stateWithholding = grossIncome * stateRate;
    const totalWithholding = federalWithholding + stateWithholding;
    const netIncome = grossIncome - totalWithholding;

    const estimatedAnnualRefund = federalWithholding * 12 * 0.10;

    resultDiv.innerHTML = `
      <p><strong>Federal Withholding:</strong> $${federalWithholding.toFixed(2)}</p>
      <p><strong>State Withholding:</strong> $${stateWithholding.toFixed(2)}</p>
      <p><strong>Total Withheld (Monthly):</strong> $${totalWithholding.toFixed(2)}</p>
      <p><strong>Net Take-Home (Monthly):</strong> $${netIncome.toFixed(2)}</p>
      <hr class="my-2" />
      <p class="text-sm text-gray-700">
        <strong>Estimated Year-End Refund (Federal):</strong> $${estimatedAnnualRefund.toFixed(2)}<br/>
        (Assumes 10% refund on federal withholding — varies by individual)
      </p>
      <p class="text-sm text-gray-600">
        (Tax Rates Used: State ${stateRate * 100}%, Federal ${federalRate * 100}%)
      </p>
    `;

    resultDiv.classList.remove('text-red-600');
    resultDiv.classList.add('text-green-700');

    // Store for use in savings tab
    localStorage.setItem('netIncome', netIncome.toFixed(2));
    localStorage.setItem('grossIncome', grossIncome.toFixed(2));
  });
});
