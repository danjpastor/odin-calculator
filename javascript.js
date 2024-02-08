
// Grab all button DOMs
const display = document.querySelector('#display');
const numbers = document.querySelectorAll('.number');
const oprs = document.querySelectorAll('.opr')
const equals = document.querySelector('.equals')
const bsp = document.querySelector('.bsp')
const clear = document.querySelector('.clear')

let num1 = null;
let num2 = null;
let oper = null;

canType = true;

function calculate(num1, oper, num2) {
    if (oper == '+'){
        return Number(num1) + Number(num2)
    }else if (oper == '-'){
        return num1 - num2
    }else if (oper == '*'){
        return num1 * num2
    }else if (oper == '/'){
        return num1 / num2
    }
}

function clearOpr(){
    oprs.forEach((operator) => {
        operator.style.cssText = 'background-color: white;'
    })
}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
    let input = number.textContent;

    if (Number(display.textContent) < 1 ){
        display.textContent = ''
    } else if (num1 != null && canType == false){
        display.textContent = ''
        canType = true;
    }

    display.textContent += input
    console.log(input);
    });
  });

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
    if (num1 != null || display.textContent != ''){
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
    }
})

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