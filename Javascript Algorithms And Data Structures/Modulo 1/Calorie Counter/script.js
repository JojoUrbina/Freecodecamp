// Select the DOM element with the id 'calorie-counter' and assign it to the variable calorieCounter
const calorieCounter = document.getElementById('calorie-counter');

// Select the DOM element with the id 'budget' and assign it to the variable budgetNumberInput
const budgetNumberInput = document.getElementById('budget');

// Select the DOM element with the id 'entry-dropdown' and assign it to the variable entryDropdown
const entryDropdown = document.getElementById('entry-dropdown');

// Select the DOM element with the id 'add-entry' and assign it to the variable addEntryButton
const addEntryButton = document.getElementById('add-entry');

// Select the DOM element with the id 'clear' and assign it to the variable clearButton
const clearButton = document.getElementById('clear');

// Select the DOM element with the id 'output' and assign it to the variable output
const output = document.getElementById('output');

// Variable to store if any error occurred during calorie calculation
let isError = false;

// Function to clean an input string from unwanted characters
function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, '');
}

// Function to check if an input string is invalid
function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

// Function to add an entry of food or exercise to the form
function addEntry() {
  // Select the input container corresponding to the selected value in the dropdown menu and assign it to the variable targetInputContainer
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  // Get the current entry number by adding 1 to the total number of inputs in the selected input container
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  // Create an HTML string for the new entry
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`;
  // Insert the HTML string at the end of the selected input container
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

// Function to calculate calories
function calculateCalories(e) {
  // Prevent the default behavior of the form submission
  e.preventDefault();
  // Reset the isError variable to false at the beginning of each calculation
  isError = false;

  // Select all number input fields in the different blocks of the form and assign them to variables
  const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
  const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
  const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
  const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
  const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

  // Calculate consumed calories for each block
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  // If an error occurred during calorie calculation, exit the function
  if (isError) {
    return;
  }

  // Calculate consumed and remaining calories, as well as calorie surplus or deficit
  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';
  // Update the HTML content of the output element with the results
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `;

  // Show the output element by removing the 'hide' class
  output.classList.remove('hide');
}

// Function to get calories from input fields
function getCaloriesFromInputs(list) {
  let calories = 0;

  // Iterate over each input field in the list and sum up the calories
  for (const item of list) {
    // Clean the input string and check if it is invalid
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);

    // If an invalid input is found, show an alert and set isError to true, then exit the function
    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    // Sum up the calories after converting the string to a number
    calories += Number(currVal);
  }
  return calories;
}

// Function to clear the form and reset all input fields
function clearForm() {
  // Select all input containers and convert them to an array
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  // Iterate over each input container and clear its HTML content
  for (const container of inputContainers) {
    container.innerHTML = '';
  }

  // Reset the value of the budget input field and hide the output element
  budgetNumberInput.value = '';
  output.innerText = '';
  output.classList.add('hide');
}

// Add a click event to the add entry button that will call the addEntry function when clicked
addEntryButton.addEventListener("click", addEntry);

// Add a submit event to the form that will call the calculateCalories function when the form is submitted
calorieCounter.addEventListener("submit", calculateCalories);

// Add a click event to the clear button that will call the clearForm function when clicked
clearButton.addEventListener("click",clearForm);
