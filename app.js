const form = document.getElementById('genderForm');
const resultDiv = document.getElementById('result');
const predictionParagraph = document.getElementById('prediction');
const saveResultButton = document.getElementById('saveResult');
const savedAnswersDiv = document.getElementById('savedAnswers');
const answersList = document.getElementById('answersList');
const clearDataButton = document.getElementById('clearData');
clearDataButton.addEventListener('click', clearData);

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nameInput = document.getElementById('name');

    try {
        const response = await fetch(`https://api.genderize.io/?name=${nameInput.value}`);
        const data = await response.json();

        displayResult(data);
    } catch (error) {
        displayError("Error fetching data.");
    }
});

function displayResult(data) {
    resultDiv.style.display = 'block';
    savedAnswersDiv.style.display = 'none';

    if (data.gender !== null && data.gender !== undefined) {
        // Display the prediction if available
        predictionParagraph.textContent = `Prediction: ${data.gender} (${(data.probability * 100).toFixed(2)}%)`;
        saveResultButton.onclick = () => saveResult(data.gender);
    } else {
        // Display an error message for no prediction
        predictionParagraph.textContent = 'Prediction: No prediction available for the entered name.';
        saveResultButton.onclick = null; // Disable the saveResultButton if no prediction

    }
}


function displayError(message) {
    resultDiv.style.display = 'none';
    savedAnswersDiv.style.display = 'none';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;

    // Append error to the cont ainer
    document.querySelector('.container').appendChild(errorDiv);
}

function saveResult() {
    // Implement saving the result using local storage
    savedAnswersDiv.style.display = 'block';

    const nameInput = document.getElementById('name').value;
    const genderInput = document.querySelector('input[name="gender"]:checked');

    if (genderInput) {
        const savedAnswerItem = document.createElement('li');
        savedAnswerItem.textContent = `Saved Answer: ${genderInput.value}`;

        // Save the result to local storage
        localStorage.setItem(nameInput, genderInput.value);

        answersList.appendChild(savedAnswerItem);
    } else {
        alert('Please select a gender before saving.');
    }
}
function clearData() {
    // Implement clearing the saved data from local storage
    const nameInput = document.getElementById('name').value;

    // Check if the saved answer exists for the entered name
    if (localStorage.getItem(nameInput)) {
        // Remove the saved answer from local storage
        localStorage.removeItem(nameInput);

        // Clear the saved answers on the page
        answersList.innerHTML = '';
    }
}