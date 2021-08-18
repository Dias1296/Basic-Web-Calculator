let curremt_display_value;
const display_element = document.getElementById("result_text");
const display_help_element = document.getElementById("help_text");
let firstNumber, operator, secondNumber, previousResult = "";

function add(a, b) {
    a = parseInt(a);
    b = parseInt(b);
    if(!Number.isInteger(a)) {
        return "First value is not an integer";
    }
    else if(!Number.isInteger(b)) {
        return "Second value is not an integer";
    }
    else {
        return a + b;
    }
}

function subtract(a, b) {
    a = parseInt(a);
    b = parseInt(b);
    if(!Number.isInteger(a)) {
        return "First value is not an integer";
    }
    else if(!Number.isInteger(b)) {
        return "Second value is not an integer";
    }
    else {
        return a - b;
    }
}

function multiply(a, b) {
    a = parseInt(a);
    b = parseInt(b);
    if(!Number.isInteger(a)) {
        return "First value is not an integer";
    }
    else if(!Number.isInteger(b)) {
        return "Second value is not an integer";
    }
    else {
        return a * b;
    }
}

function divide(a, b) {
    a = parseInt(a);
    b = parseInt(b);
    if(!Number.isInteger(a)) {
        return "First value is not an integer";
    }
    else if(!Number.isInteger(b)) {
        return "Second value is not an integer";
    }
    else {
        return a / b;
    }
}

function operate(operation, numberFirst, numberSecond){
    switch(operation.toLowerCase()){
        case "+":
            return add(numberFirst, numberSecond);
            break;
        case "-":
            return subtract(numberFirst, numberSecond);
            break;
        case "*":
            return multiply(numberFirst, numberSecond);
            break;
        case "/":
            return divide(numberFirst, numberSecond);
            break;
    }
}

function populate_display(display_string) {
    display_element.value = display_string;
}

function numberClick(e) {
    if(display_element.value==="")//Verify if display is empty
    {
        display_element.value = firstNumber = display_help_element.value = e.target.innerHTML;
    }
    else if(isNaN(display_element.value)) {//String in display is NOT a number
        operator = display_element.value;
        display_element.value = secondNumber = e.target.innerHTML;
        display_help_element.value = firstNumber + " " + operator + " " + secondNumber;
    }
    else {//String in display is a number
        display_element.value += e.target.innerHTML;
        if (secondNumber){//Second number is defined
            secondNumber += e.target.innerHTML;
            display_help_element.value = firstNumber + " " + operator + " " + secondNumber;
        }
        else {
            firstNumber = display_help_element.value = display_element.value;
        }
    }
}

function operatorClick(e){
    if(display_element.value === ""){//String in display is empty
        firstNumber = previousResult;
        display_element.value = previousResult;
        display_help_element.value = previousResult;
    }
    else if (isNaN(display_element.value)){//String in display is not a number
        display_element.value = e.target.innerHTML;
        display_help_element.value = display_help_element.value.replace(operator, e.target.innerHTML);
        operator = e.target.innerHTML;
    }
    else {//String in display is a number
        if(firstNumber && operator && secondNumber){//All elements of operation already defined
            firstNumber = operate(operator, firstNumber, secondNumber);
            display_element.value = operator = e.target.innerHTML;
            display_help_element.value = firstNumber + " " + operator;
            secondNumber = "";
        }
        else {//Not all elements selected
            firstNumber = display_element.value;
            display_element.value = operator = e.target.innerHTML;
            display_help_element.value = firstNumber + " " + operator;
        }
    }
}

function equalClick(e){
    if(firstNumber && operator && secondNumber){
        display_element.value = previousResult = operate(operator, firstNumber, secondNumber);
        display_help_element.value = firstNumber + " " + operator + " " + secondNumber + " = " + previousResult; 
        operator = firstNumber = secondNumber = "";
    }
}

function clearClick(e){
    firstNumber = operator = secondNumber = previousResult = "";
    display_element.value = "";
    display_help_element.value = "";
}

function create_number_events(){
    let calc_number_div_children = document.getElementById("calc_number_div_id").children;
    calc_number_div_children[calc_number_div_children.length-1].addEventListener("click", numberClick);
    for(let i = 0; i<calc_number_div_children.length-1; i++) {
        let number_button_element = calc_number_div_children[i].children;
        for(let j = 0; j<number_button_element.length; j++){
            number_button_element[j].addEventListener("click", numberClick);
        }
    }
}

function create_operator_events(){
    let operator_div_children = document.getElementById("operator_div_id").children;
    operator_div_children[operator_div_children.length-1].addEventListener("click", equalClick);
    for(let i = 0; i<operator_div_children.length-1; i++){
        let operator_button_element = operator_div_children[i].children;
        for (let j=0; j<operator_button_element.length; j++){
            operator_button_element[j].addEventListener("click", operatorClick);
        }
    }
}

function create_clear_event(){
    let clear_div_children = document.getElementById("clear_div_id").children;
    clear_div_children[clear_div_children.length-1].addEventListener("click", clearClick);
}

function numberKeyDisplay(key) {
    if(display_element.value==="")//Verify if display is empty
    {
        display_element.value = firstNumber = display_help_element.value = key;
    }
    else if(isNaN(display_element.value)) {//String in display is NOT a number
        operator = display_element.value;
        display_element.value = secondNumber = key;
        display_help_element.value = firstNumber + " " + operator + " " + secondNumber;
    }
    else {//String in display is a number
        display_element.value += key;
        if (secondNumber){//Second number is defined
            secondNumber += key;
            display_help_element.value = firstNumber + " " + operator + " " + secondNumber;
        }
        else {
            firstNumber = display_help_element.value = display_element.value;
        }
    }
}

function operatorKeyDisplay(key){
    if(display_element.value === ""){//String in display is empty
        firstNumber = previousResult;
        display_element.value = previousResult;
        display_help_element.value = previousResult;
    }
    else if (isNaN(display_element.value)){//String in display is not a number
        display_element.value = key;
        display_help_element.value = display_help_element.value.replace(operator, key);
        operator = key;
    }
    else {//String in display is a number
        if(firstNumber && operator && secondNumber){//All elements of operation already defined
            firstNumber = operate(operator, firstNumber, secondNumber);
            display_element.value = operator = key;
            display_help_element.value = firstNumber + " " + operator;
            secondNumber = "";
        }
        else {//Not all elements selected
            firstNumber = display_element.value;
            display_element.value = operator = key;
            display_help_element.value = firstNumber + " " + operator;
        }
    }
}

function equalKeyDisplay(key){
    if(firstNumber && operator && secondNumber){
        display_element.value = previousResult = operate(operator, firstNumber, secondNumber);
        display_help_element.value = firstNumber + " " + operator + " " + secondNumber + " = " + previousResult; 
        operator = firstNumber = secondNumber = "";
    }
}

function clearKeyDisplay(key){
    firstNumber = operator = secondNumber = previousResult = "";
    display_element.value = "";
    display_help_element.value = "";
}

function numberKeyClick(e){
    /*console.log(e);
    console.log(e.key);*/
    console.log(e.key);
    switch(e.key){
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            numberKeyDisplay(e.key);
            break;
        case "/":
        case "*":
        case "-":
        case "+":
            operatorKeyDisplay(e.key);
            break;
        case "Enter":
            equalKeyDisplay(e.key);
            break;
        case "Backspace":
            clearKeyDisplay(e.key);
            break;
    }
}

function create_keypress_number_events(){
    document.addEventListener("keydown", numberKeyClick);
}

create_number_events();
create_operator_events();
create_clear_event();
create_keypress_number_events();

//#ToDo ---> Falta adicionar interação com help display!!!!