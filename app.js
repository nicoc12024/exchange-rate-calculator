const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");
const swapBtn = document.getElementById("swap");
const rateEl = document.getElementById("rate");

// Fetch exchange rates and update the DOM
async function fetchExchangeRates() {
  const apiKey = "043c95279cb1f71c37b01b88";
  const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currencyEl_one.value}`);
  const data = await res.json();

  updateDOM(data);
}

function updateDOM(data) {
  const rate = data.conversion_rates[currencyEl_two.value];
  rateEl.innerText = `1 ${currencyEl_one.value} = ${rate} ${currencyEl_two.value}`;
  amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
}

// Event listeners
currencyEl_one.addEventListener("change", fetchExchangeRates);
amountEl_one.addEventListener("input", fetchExchangeRates);
currencyEl_two.addEventListener("change", fetchExchangeRates);
amountEl_two.addEventListener("input", fetchExchangeRates);
swapBtn.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  fetchExchangeRates();
});

fetchExchangeRates();

