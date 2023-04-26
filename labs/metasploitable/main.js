const numberInput = document.getElementById('number-input');
const submitButton = document.getElementById('submit-button');
const result = document.getElementById('result');

submitButton.addEventListener('click', () => {
  const number = parseInt(numberInput.value);
  if (isNaN(number)) {
    result.textContent = 'Please enter a valid number';
    return;
  }
  if (number < 1 || number > 20) {
    result.textContent = 'Please enter a number between 1-20';
    return;
  }
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      result.textContent = "The address to your machine is " + data[number.toString()] + "."
    })
    .catch(error => console.error(error));
});


