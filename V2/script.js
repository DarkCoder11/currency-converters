const API_KEY = "ff719742157712ae2bdfda9f4830dc32";
const API_URL = `https://data.fixer.io/api/latest?access_key=${API_KEY}`;

const date = document.getElementById("date");
const swapBtn = document.getElementById("swapBtn");
const amountInput = document.getElementById("amount");
const errorElement = document.getElementById("error");
const convertBtn = document.getElementById("convertBtn");
const baseCurrencySelect = document.getElementById("baseCurrency");
const targetCurrencySelect = document.getElementById("targetCurrency");
const conversionRateElement = document.getElementById("conversionRate");
const convertedAmountElement = document.getElementById("convertedAmount");

const fetchConversionRates = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.rates;
  } catch (error) {
    throw new Error("Unable to fetch conversion rates.");
  }
};

const dateConvert = () => {
  const dateNow = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    hour12: true,
  });

  date.innerText = dateNow;
};

const populateCurrencyDropdowns = async () => {
  try {
    const rates = await fetchConversionRates();
    const currencies = Object.keys(rates);

    currencies.forEach((currency) => {
      const option = document.createElement("option");
      option.value = currency;
      option.textContent = currency;
      baseCurrencySelect.appendChild(option);
      targetCurrencySelect.appendChild(option.cloneNode(true));
    });
  } catch (error) {
    errorElement.textContent = error.message;
  }
};

const convertCurrency = () => {
  errorElement.textContent = "";

  const baseCurrency = baseCurrencySelect.value;
  const targetCurrency = targetCurrencySelect.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount)) {
    errorElement.textContent = "Please enter a valid amount.";
    return;
  }

  fetchConversionRates()
    .then((rates) => {
      if (rates[baseCurrency] && rates[targetCurrency]) {
        const conversionRate = rates[targetCurrency] / rates[baseCurrency];
        const convertedAmount = amount * conversionRate;

        conversionRateElement.textContent = conversionRate.toFixed(4);
        convertedAmountElement.textContent = convertedAmount.toFixed(2);
      } else {
        errorElement.textContent = "Selected currencies are not supported.";
      }
    })
    .catch((error) => {
      errorElement.textContent = error.message;
    });
};

swapBtn.addEventListener("click", () => {
  const temp = baseCurrencySelect.value;
  baseCurrencySelect.value = targetCurrencySelect.value;
  targetCurrencySelect.value = temp;
  convertCurrency();
});

dateConvert();

document.addEventListener("DOMContentLoaded", populateCurrencyDropdowns);
convertBtn.addEventListener("click", convertCurrency);
