let opValue = '';
let firstValue = '';
let step = 0;

const operators = ['+', '-', '*', '/', '='];

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            break;
    }
}

function calulate(val) {
    // Check for operator
    // Operator stored
    if (operators.includes(val)) {
        if (val == '=') {
            display.value = operate(opValue, firstValue, secondValue);
            firstValue = display.value;
            secondValue = '';
        }
        else if (opValue != '' && secondValue != '') {
            // Must be evaluated, first value is stored as operate
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
        // First value added until operator
        if (opValue == '') {
            firstValue = display.value;
            console.log(firstValue);
        }
        // If first value and operator stored, second value added
        else {
            secondValue = display.value;
            console.log(secondValue);
        }
    }
}


const calcContainer = document.getElementById('calculator');

const display = document.getElementById('display-area');
const buttons = document.querySelectorAll('button');

// Event listener checks for every button
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        // If operator, display value is just operator
        if (operators.includes(e.target.value)) {
            display.value = e.target.value;
            step = 1;
        }
        // If last operator, display value only next value
        else if (step == 1) {
            display.value = e.target.value
            step = 0;        
        }
        else if (display.value != '') {
            display.value += e.target.value
        }
        else {
            display.value = e.target.value
        }
        
        calulate(e.target.value);
    });
});
