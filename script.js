let opValue = '';
let firstValue = '';
let secondValue = '';
let step = 0;
let buffer = 0;

const operators = ['+', '-', '*', '/', '=', 'AC'];

// When called, it performs equation based on operator
// Rounds decimals to the hundreths place
function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            if (!((a+b) % 1 == 0)) {
                return (a+b).toFixed(2);
            }
            return a + b;
        case '-':
            if (!((a-b) % 1 == 0)) {
                return (a-b).toFixed(2);
            }
            return a - b;
        case '*':
            if (!((a*b) % 1 == 0)) {
                return (a*b).toFixed(2);
            }
            return a * b;
        case '/':
            if (b == 0) {
                return "Can't divide by 0!";
            }
            if (!((a/b) % 1 == 0)) {
                return (a/b).toFixed(2);
            }
            return a / b;
        default:
            break;
    }
}

// Clears display screen and variables associated with it
function clear() {
    display.value = '';
    firstValue = '';
    opValue = '';
    secondValue = '';
    step = 0;
    buffer = 0;
}

// Calculates target value based on conditions to display on screen
function calulate(val) {
    // Check for operator
    // Operator stored
    if (operators.includes(val)) {
        buffer = 0;
        undoButton.disabled = true;
        // Checks for clear button
        if (val == 'AC') {
            clear();
        }
        // Checks for equal button
        // Buffer equals one to check if user clicks a button besides an operator
        // after operate function
        else if (val == '=') {
            if (firstValue == '') {
                clear();
                return;
            }
            if (firstValue != '' && opValue == '') {
                display.value = firstValue;
                return;
            }
            display.value = operate(opValue, firstValue, secondValue);
            buffer = 1;
            firstValue = display.value;
            secondValue = '';
        }
        else if (opValue != '' && secondValue != '') {
            // Must be evaluated, first value is stored as operate
            // Buffer equals one to check if user clicks a button besides an operator
            // after operate function
            display.value = operate(opValue, firstValue, secondValue);
            firstValue = display.value;
            secondValue = '';
            opValue = val;
        }
        else {
            opValue = val;
        }
    }
    else {
        // Checks if user presses a button besides an operator after 
        // the operate() function.
        if (buffer == 1) {
            clear();
            display.value = val;
            firstValue = display.value;
            buffer = 0;
        }
        // First value added until operator
        else if (opValue == '') {
            firstValue = display.value;
            if (firstValue.includes('.')) {
                deciButton.disabled = true;
            }
        }
        // If first value and operator stored, second value added
        else {
            secondValue = display.value;
            if (secondValue.includes('.')) {
                deciButton.disabled = true;
            }
        }
    }
}


const calcContainer = document.getElementById('calculator');

const display = document.getElementById('display-area');
const buttons = document.querySelectorAll('button');
const deciButton = document.getElementById('btn_.');
const undoButton = document.getElementById('btn_←');

// Event listener checks for every button
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        deciButton.disabled = false;
        undoButton.disabled = false;

        // Check for operator
        if (operators.includes(e.target.value)) {
            // If operator, display value is just operator
            display.value = e.target.value;
            step = 1;
        }
        // If last operator, display value only next value
        else if (step == 1) {
            display.value = e.target.value
            step = 0;        
        }
        // Checks if event target is the undo button
        else if (e.target.value == '←') {
            if (firstValue == '') {
                clear();
            }
            else if (firstValue != '' && opValue == '') {
                firstValue = firstValue.slice(0, -1);
                display.value = firstValue;
            }
            else {
                // If the second value is '', second value turns to 0
                if (secondValue.slice(0, -1) == '') {
                    secondValue = 0;
                }
                else {
                    secondValue = secondValue.slice(0, -1);
                }
                display.value = secondValue;
            }
        }
        // If 0 is only on display, event target value replaces 0
        // Checks for string instead of type number ('0.' would equal 0)
        else if (display.value == '0') {
            if (e.target.value == '.') {
                display.value += e.target.value;
            }
            else {
                display.value = e.target.value;
            }
        }
        else if (display.value != '') {
            display.value += e.target.value
        }
        else {
            display.value = e.target.value
        }

        // Calculate function called
        calulate(e.target.value);
    });
});
