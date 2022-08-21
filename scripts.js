function enterInput()
{
    if(this.classList.contains("release"))
    {
        if(this.id === "=")
        {
            processedInput = [];
            continueAfterValidation = textValidation();
            console.log(continueAfterValidation);
            if(continueAfterValidation)
            {
                textToArrayFormating();
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
        inputText.textContent = input;
    }
    limitDisplayLength();
}
function isOperator(item)
{
    return (item == "+" || item == "-" || item == "*" || item == "/")
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
            ++keyTracker;
            processedInput[keyTracker] =  input[i];
            ++keyTracker;
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
    if(isOperator(previousKey))
    {
        alert("ERROR: You can not start off with an operator!");
        noErrors = false;
    }
    for(let i=1;i<input.length;i++)
    {
        currentKey = input[i];
        if(isOperator(currentKey) == isOperator(previousKey))
        {
            alert("ERROR: You can not have mutliply operators right next to each other!");
            noErrors = false;
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
    input = "";
    processedInput = [];
    inputText.textContent = ""; //
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
let input = "";
let output = "";
let processedInput = [];
let continueAfterValidation = true;
const displayMaxWidth = inputText.offsetWidth;
keys.forEach(key => key.addEventListener('click',enterInput));

inputText.textContent = "12312312313132";


