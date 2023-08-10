const API_KEY = "ff719742157712ae2bdfda9f4830dc32";
const API_URL = `https://data.fixer.io/api/latest?access_key=${API_KEY}`;

const date = document.getElementById("date");
const swapBtn = document.getElementById("swapBtn");

const amountInput = document.getElementById("amount");
const convertedAmountElement = document.getElementById("convertedAmount");

const errorElement = document.getElementById("error");
const convertBtn = document.getElementById("convertBtn");
const baseCurrencySelect = document.getElementById("baseCurrency");
const targetCurrencySelect = document.getElementById("targetCurrency");
const conversionRateElement = document.getElementById("conversionRate");

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

const convertCurrency = (direction) => {
  errorElement.textContent = "";

  const baseCurrency = baseCurrencySelect.value;
  const targetCurrency = targetCurrencySelect.value;
  const amountFrom = parseFloat(amountInput.value);
  const amountTo = parseFloat(convertedAmountElement.value);

  if (isNaN(amountFrom || amountTo)) {
    errorElement.textContent = "Please enter a valid amount.";
    return;
  }

  fetchConversionRates()
    .then((rates) => {
      if (rates[baseCurrency] && rates[targetCurrency]) {
        const conversionRate =
          direction === "convert_from"
            ? rates[targetCurrency] / rates[baseCurrency]
            : rates[baseCurrency] / rates[targetCurrency];

        const convertedAmount =
          direction === "convert_from"
            ? amountFrom * conversionRate
            : amountTo * conversionRate;

        conversionRateElement.textContent = conversionRate.toFixed(4);
        if (direction === "convert_from") {
          convertedAmountElement.value = convertedAmount.toFixed(2);
        } else {
          amountInput.value = convertedAmount.toFixed(2);
        }
      } else {
        errorElement.textContent = "Selected currencies are not supported.";
      }
    })
    .catch((error) => {
      errorElement.textContent = error.message;
    });
};

dateConvert();

document.addEventListener("DOMContentLoaded", populateCurrencyDropdowns);

baseCurrencySelect.addEventListener("change", () =>
  convertCurrency("convert_from")
);
targetCurrencySelect.addEventListener("change", () =>
  convertCurrency("convert_to")
);

amountInput.addEventListener("input", () => convertCurrency("convert_from"));
convertedAmountElement.addEventListener("input", () =>
  convertCurrency("convert_to")
);
