let total = 0;
let placeholder = "0";
let prevOperator;
let percentageMode = false;
let baseValue; 

const answer = document.querySelector('.answer');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    answer.innerText = placeholder;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'CE':
            placeholder = '0';
            total = 0;
            break;
        case '=':
            if(prevOperator === null){
                return;
            }
            if (percentageMode) {
                const percentage = parseFloat(placeholder);
                placeholder = (baseValue * (percentage / 100)).toString();
                percentageMode = false;
            }
            flushOperation(parseFloat(placeholder));
            prevOperator = null;
            placeholder = total;
            total = 0;
            break;
        case '√':
            if(placeholder !== "0") {
                placeholder = Math.sqrt(parseFloat(placeholder)).toString();
            }
            break;
        case '+':
        case '×':    
        case '−':
        case '÷':
            solve(symbol);
            break;
        case '%':
            if (!percentageMode) {
                baseValue = parseFloat(placeholder);
                placeholder = '0';
                percentageMode = true;
            } else {
                const percentage = parseFloat(placeholder);
                placeholder = (baseValue * (percentage / 100)).toString();
                percentageMode = false;
            }
            break;
    }
}

function solve(symbol){
    if(placeholder === '0'){
        return;
    }

    const intPlaceholder = parseFloat(placeholder);

    if(total === 0){
        total = intPlaceholder;
    }
    else{
        flushOperation(intPlaceholder);
    }
    prevOperator = symbol;
    placeholder = '0';
}

function flushOperation(intPlaceholder){
    if(prevOperator === '+'){
        total += intPlaceholder;
    }
    else if(prevOperator === '−'){
        total -= intPlaceholder;
    }
    else if(prevOperator === '÷'){
        total /= intPlaceholder;
    }
    else if(prevOperator === '×'){
        total *= intPlaceholder;
    }
}

function handleNumber(numberString){
    if(placeholder === "0"){
        placeholder = numberString;
    }
    else{
        placeholder += numberString;
    }
}

function init(){
    document.querySelector('.cal-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();
