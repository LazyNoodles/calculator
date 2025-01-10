// Select DOM elements
const display = document.querySelector('.number-display');
const buttons = document.querySelectorAll('button');

// Variables to store calculation state
let currentInput = '';
let previousInput = '';
let operator = '';

// Helper function to update the display
function updateDisplay(value) {
    display.textContent = value || '0';
}

// Function to handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (!isNaN(buttonText) || buttonText === '.') {
            // If the button is a number or a decimal point
            currentInput += buttonText;
            updateDisplay(currentInput);
        } else if (button.id === 'clear') {
            // Clear all inputs
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay('0');
        } else if (button.id === 'equal') {
            // Perform calculation on equals
            if (previousInput && operator && currentInput) {
                const result = calculate(Number(previousInput), Number(currentInput), operator);
                updateDisplay(result);
                previousInput = result;
                currentInput = '';
                operator = '';
            }
        } else if (button.classList.contains('input-button-operator')) {
            // Store the operator and move current input to previous
            if (currentInput) {
                previousInput = currentInput;
                currentInput = '';
            }
            operator = buttonText;
        }
    });
});

// Function to perform basic arithmetic
function calculate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : 'Error';
        default:
            return 'Error';
    }
} 
