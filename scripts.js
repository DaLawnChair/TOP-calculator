function addToInputText()
{
    if(this.classList.contains("release"))
    {
        console.log("release key type");
    }
    else
    { 
        input += this.id;
    }
    inputText.innerText = input;
    limitDisplayLength();
}
function limitDisplayLength()
{
    while(inputText.offsetWidth > displayMaxWidth)
    {
        inputText.innerText = inputText.innerText.slice(1);
    }    
}

const inputText = document.querySelector('#inputText');
const outputText = document.querySelector('#outputText');

const keys = Array.from(document.querySelectorAll('.key'));
let input = "";
let output = "";
const displayMaxWidth = inputText.offsetWidth;
keys.forEach(key => key.addEventListener('click',addToInputText));
