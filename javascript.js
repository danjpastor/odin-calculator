
// Grab all button DOMs
const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.number');
const oprs = document.querySelectorAll('.opr')
const equals = document.querySelector('.equals')
const bsp = document.querySelector('.bsp')
const clear = document.querySelector('.clear')
const negpos = document.querySelector('.negpos')
const dec = document.querySelector('.decimal')

// Set up empty Variables for Operations
let num1 = null;
let num2 = null;
let oper = null;

// Toggle variable to clear screen before typing the next number.
canType = true;

// Basic function to perform arithmatic
function calculate(num1, oper, num2) {
    if (oper == '+'){
        return parseFloat((Number(num1) + Number(num2)).toFixed(2));
    }else if (oper == '-'){
        return parseFloat((num1 - num2).toFixed(2));
    }else if (oper == '*'){
        return parseFloat((num1 * num2).toFixed(2));
    }else if (oper == '/'){
        return parseFloat((num1 / num2).toFixed(2));
    }
}

// reset function to turn off operator active states
function clearOpr(){
    oprs.forEach((operator) => {
        operator.style.cssText = 'background-color: white;'
    })
}

// Loops through each number button and creates an event listener to type the number to the display.
numbers.forEach((number) => {
    number.addEventListener('click', () => {
    let input = number.textContent;

    if (Number(display.textContent) == 0 ){
        display.textContent = ''
    } else if (num1 != null && canType == false){
        display.textContent = ''
        canType = true;
    }

    display.textContent += input
    console.log(input);
    });
  });

// Operator logic when pressing an operrator button
oprs.forEach((operator) => {
    operator.addEventListener('click', () => {
    let input = operator.textContent;
        if (num1 == null && display.textContent != 0){
        oper = input
        operator.style.cssText = "background-color: red";
        num1 = Number(display.textContent)
        console.log(`num1: ${num1}`)
        canType = false;
        } else if (num1 != null && oper != null){
            clearOpr()
            num2 = Number(display.textContent)
            console.log(`num2: ${num2}`)
            result = calculate(num1, oper, num2)
            display.textContent = result
            num1 = result
            canType = false;
            oper = input
            operator.style.cssText = "background-color: red";
            console.log(`oper: ${oper}`)
        } else if (oper == null){
            oper = input
            canType = false
        }
    });
});

equals.addEventListener('click', () => {
    if (num1 != null && display.textContent != ''){
        num2 = display.textContent
        result = calculate(num1, oper, num2)
        display.textContent = result
        num1 = result
        num2 = null;
        canType = false;
        oper = null;
        console.log(`num1: ${num1}`)
        console.log(`num2: ${num2}`)
        console.log(`oper: ${oper}`)
        clearOpr()
    } else {
        console.log("Requires Two Numbers and an operator")
}})

clear.addEventListener('click', () => {
    num1 = null;
    num2 = null;
    oper = null;
    display.textContent = 0
    clearOpr()
})

bsp.addEventListener('click', () => {
    screen = display.textContent
    screenArray = screen.split('')
    screenArray.pop()
    newdisplay = screenArray.join('')
    display.textContent = newdisplay
    if (newdisplay.length < 1){
        display.textContent = 0
    }
})

negpos.addEventListener('click', () => {
    screen = Number(display.textContent)
    newscreen = screen * -1;
    display.textContent = newscreen
})

dec.addEventListener('click', () => {
    screen = display.textContent
    if (!screen.includes('.')){
        display.textContent += dec.textContent
    }
})