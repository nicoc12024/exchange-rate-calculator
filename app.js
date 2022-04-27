const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");
const swapBtn = document.getElementById("swap");
const rateEl = document.getElementById("rate");

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  const apiKey = "043c95279cb1f71c37b01b88";

  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      const rate = data.conversion_rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);
swapBtn.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
