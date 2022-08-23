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
            
            input = "0"+input; //Adds a 0 so that operations like -3 will work.
            processedInput = [];
            continueAfterValidation = textValidation();
            
            if(continueAfterValidation)
            {
                textToArrayFormating();
                console.log("done textToArrayFormating()");
                outputText.textContent = operate();
                console.log("done operate()");
                console.table(processedInput);
            }
            input = input.substring(1,input.length); //Ensures that the 0 is not seen after usage
            console.log("done all");
        }
        else if(this.id === "c")
        {
            clearInput();
        }
        else if(this.id === "delete")
        {
            deleteLastCharacter();
        }
    }
    else
    { 
        input += this.id;
        inputText.textContent = input;
        limitDisplayLength();
    }
    if(this.id ==="=") 
    {
        console.log("done enterInput");
        console.log(finished);
    }   
}
function isOperator(item)
{
    return (item == "+" ||  item == "-" || item == "*" || item == "/") 
}
function deleteLastCharacter()
{
    input = input.substring(0,input.length-1);
    inputText.textContent = input;
    limitDisplayLength();
    outputText.textContent = "";
}
function operate()
{
    let num1,operator,num2,result;
    
    for(let i=0;i<processedInput.length;i++)
    {
        if(num1==null)
        {
            num1 = parseFloat(processedInput[i]);
        }
        else if(operator==null)
        {
            operator = processedInput[i];
        }
        else if(num2==null)
        {
            num2 = parseFloat(processedInput[i]);
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
                    if(num2 == 0)
                    {
                        result = "ERROR: #/0";
                        return result;
                        break;
                    }
                    result = divide(num1,num2);
                    break;
                }
            }
            num1 = result;
            operator = null;
            num2 = null;
        }
    }
    console.log("done calculations");
    console.log(num1);
    if(num1 != parseInt(num1))
    {
        num1 = num1.toPrecision(maxNumberOfCharactersOutput);
    }
    num1 = num1.toString();
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
    iteration:
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
                break iteration;
            }
        }
        previousKey = currentKey;
    }
    if(isOperator(input[input.length-1]))
    {
        alert("ERROR: You can not end with an operator!");
        noErrors = false;
    }
    return noErrors;
}
function clearInput()
{
    input = "";
    processedInput = [];
    inputText.textContent = ""; 
    outputText.textContent = "";
}
function limitDisplayLength()
{

    while(inputText.textContent.length > maxNumberOfCharactersInput)
    {
        inputText.textContent = inputText.textContent.slice(1);
    }    
}

const inputText = document.querySelector('#inputText');
const outputText = document.querySelector('#outputText');

const keys = Array.from(document.querySelectorAll('.key'));
let input = "";
let output = "";
const maxNumberOfCharactersInput = 21;
const maxNumberOfCharactersOutput = 13;
let processedInput = [];
let continueAfterValidation = true;

const displayMaxWidth = inputText.offsetWidth;
const displayMaxHeight = inputText.offSetHeight;
keys.forEach(key => key.addEventListener('click',enterInput));
inputText.textContent = input; 