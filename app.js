const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");
const swapBtn = document.getElementById("swap");
const rateEl = document.getElementById("rate");


// Fetch exchange rates and update the DOM
function calculate() {
  const apiKey = "043c95279cb1f71c37b01b88";

  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currencyEl_one.value}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currencyEl_two.value];
      rateEl.innerText = `1 ${currencyEl_one.value} = ${rate} ${currencyEl_two.value}`;
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
