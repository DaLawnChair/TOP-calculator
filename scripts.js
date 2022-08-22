function add(a,b) 
{
    return a+b;
};
function subtract(a,b)
{
    return a-b;
}
function multiply(a,b) 
{
    return a*b;
};

function divide(a,b) 
{
    return a/b;
};

function enterInput()
{
    if(this.classList.contains("release"))
    {
        if(this.id === "=")
        {
            processedInput = [];
            continueAfterValidation = textValidation();
            
            if(continueAfterValidation)
            {
                textToArrayFormating();
                outputText.textContent = operate();
                console.table(processedInput);
            }
        }
        else if(this.id === "C")
        {
            clearInput();
        }
    }
    else
    { 
        input += this.id;
        inputText.textContent = input.slice(1);
    }
    limitDisplayLength();
}
function isOperator(item)
{
    return (item == "+" ||  item == "-" || item == "*" || item == "/") 
}

function operate()
{
    let num1,operator,num2,result;
    let singleOperation = {
        num1, operator, num2
    }

    for(let i=0;i<processedInput.length;i++)
    {
        if(num1==null)
        {
            num1 = parseInt(processedInput[i]);
        }
        else if(operator==null)
        {
            operator = processedInput[i];
        }
        else if(num2==null)
        {
            num2 = parseInt(processedInput[i]);
            switch(operator)
            {
                case "+":
                {
                    result = add(num1,num2);
                    break;
                }
                case "-":
                {
                    result = subtract(num1,num2);
                    break;
                } 
                case "*":
                {
                    result = multiply(num1,num2);
                    break;
                }
                case "/":
                {
                    result = divide(num1,num2);
                    break;
                }
            }

            num1 = result;
            operator = null;
            num2 = null;
        }
    }
    return num1;
}
function textToArrayFormating()
{
    let keyTracker = 0;
    for(let i=0;i<input.length;i++)
    {
        if(processedInput[keyTracker]==undefined)
        {
            processedInput[keyTracker] = "";
        }
        if(isOperator(input[i]))
        {
            if(isOperator(input[i-1]) && input[i]=="-")
            {
                processedInput[keyTracker] += input[i];
            }
            else
            {
                ++keyTracker;
                processedInput[keyTracker] =  input[i];
                ++keyTracker;
            }
        }
        else
        {
            processedInput[keyTracker] += input[i];
        }
    }
}
function textValidation()
{
    let noErrors = true;
    let currentKey;
    let previousKey = input[0];
    for(let i=1;i<input.length;i++)
    {
        currentKey = input[i];

        if(isOperator(currentKey) && isOperator(previousKey))
        {
            if(currentKey=="-") //This protects negative numbers when using operations
            {
                continue;
            }
            else
            {
                alert("ERROR: You can not have mutliply operators right next to each other!");
                noErrors = false;
            }
        }
        previousKey = currentKey;
    }
    if(isOperator(input[input.length-1]))
    {
        alert("ERROR: You can not end with an operator!");
        noErrors = false;
    }

    if(input.search("/0")!=-1)
    {
        alert("ERROR: You can not divide by 0!");
        noErrors = false;
    }
    return noErrors;
}
function clearInput()
{
    input = "0";
    processedInput = [];
    inputText.textContent = "0"; 
    outputText.textContent = "";
}
function limitDisplayLength()
{
    while(inputText.offsetWidth > displayMaxWidth)
    {
        inputText.textContent = inputText.textContent.slice(1);
    }    
}


const inputText = document.querySelector('#inputText');
const outputText = document.querySelector('#outputText');

const keys = Array.from(document.querySelectorAll('.key'));
let input = "0";
let output = "";
let processedInput = [];
let continueAfterValidation = true;

const displayMaxWidth = inputText.offsetWidth;
keys.forEach(key => key.addEventListener('click',enterInput));
inputText.textContent = "0"; 


