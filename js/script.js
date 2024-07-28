const calc = document.querySelector('.calc-container');
const history = document.querySelector('.calc-header');
const result = document.getElementById('result');
const historyWrapper = document.querySelector('.history-inner');
const invalidHandler = document.getElementById('invalid');
const socials = document.querySelector('.socials');
const socialsBtn = document.querySelector('.socials-button');

// Socials Button
socialsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  socials.classList.toggle('show');
})

// Paused Cursor Animations when typing
const typingEffect = (typing) => {
  let typingTimeOut;

  if(!typing){
    typing = true;
    result.classList.add('paused');
  }
  clearTimeout(typingTimeOut);
  typingTimeout = setTimeout(() => {
    typing = false;
    result.classList.remove('paused');
  }, 1000);
}

const operatorHandler = () => {
  let operatorCounts = result.innerText.match(/[÷×−+]/g);

  console.log(operatorCounts);

  if(operatorCounts && operatorCounts.length > 40){
    invalidHandler.innerText = `Can't Enter More than 40 Operators`

    invalidHandler.classList.add('show');
    setTimeout(() => {
      invalidHandler.classList.remove('show');
    }, 2000);
    return true;
  }

  return false;
}

// Input and Calculation Calls
calc.addEventListener('click', (e) => {
  const target = e.target.closest('.btn');
  e.preventDefault();
  let typing = false;
  
  if(target){

    typingEffect(typing);

    let part = result.innerText.split(/[÷/×/−/+]/);
    let latest = part[part.length - 1];
    
    // Numbers
    if(target.closest('.numbers')){
      if(target.closest('#clear')){
        result.innerText = '';
      }else if(target.id === 'delete'){
        result.innerText = result.innerText.slice(0, -1);
      }else if(target.closest('#point')){
        if(!latest.includes('.')){
          if(result.textContent.endsWith(')')){
            result.innerText += '×0'
          }else if(charactersCheck()){
            result.innerText += '0';
          }
          result.innerText += target.dataset.value;
        }
      }else if(target.closest('#plus-minus')){
        if(charactersCheck()){
          result.innerText += '(-';
        }else if(result.textContent.endsWith(')')){
          result.innerText += '×(-';
        }
        else{
          let length = latest.length;
          if(latest.endsWith('-')){
            result.innerText = result.innerText.slice(result.length, -2);
          }else if(latest.includes('(-')){
            latest = latest.substring(2);
            result.innerText = result.innerText.slice(result.length, -length);
            
            result.innerText += latest;
          }else{
            result.innerText = result.innerText.slice(result.length, -length);
            latest = '(-' + latest;
            result.innerText += latest;
          }
        }
      }else if(target.closest('#brackets')){
        if(charactersCheck() || result.innerText.endsWith('-')){
          result.textContent += '(';
        }else{
          let {open, close} = checkBrackets(result.innerText);
          if(open > close){
            result.textContent += ')';
            return;
          }else{
            result.textContent += '×(';
          }
        }
      }
      else{
        numberInput(result.innerText, part);
        switch(target.id){
          case 'number-1':
            result.innerText += target.dataset.value;
            break;
          case 'number-2':
            result.innerText += target.dataset.value;
            break;
          case 'number-3':
            result.innerText += target.dataset.value;
            break;
          case 'number-4':
            result.innerText += target.dataset.value;
            break;
          case 'number-5':
            result.innerText += target.dataset.value;
            break;
          case 'number-6':
            result.innerText += target.dataset.value;
            break;
          case 'number-7':
            result.innerText += target.dataset.value;
            break;
          case 'number-8':
            result.innerText += target.dataset.value;
            break;
          case 'number-9':
            result.innerText += target.dataset.value;
            break;
          case 'number-0':
            result.innerText += target.dataset.value;
            break;
          default:
            break;
        }
      }
    // Operators
    }else if(target.closest('.operator')){
      if(charactersCheck() || result.innerText.endsWith('-')){
        invalidHandler.innerText = `Invalid Format Used`
        invalidHandler.classList.add('show');
        setTimeout(() => {
          invalidHandler.classList.remove('show');
        }, 2000);
        return;
      }else{
        if(operatorHandler()){
          return;
        }
        
        if(target.id === 'equals'){
          operate();
        }else{
          result.innerText += target.dataset.value;
        }
      }
    }
  }else{
    return;
  }
})

document.addEventListener('keydown', (e) => {
  const button = e.key;

  let part = result.innerText.split(/[÷/×/−/+]/);
  let latest = part[part.length - 1];

  if(button === 'Delete'){
    result.innerText = ''
  }else if(button === 'Backspace'){
    result.innerText = result.innerText.slice(0, -1);
  }else if(button === '.'){
    if(!latest.includes('.')){
      if(result.textContent.endsWith(')')){
        result.innerText += '×0'
      }else if(charactersCheck()){
        result.innerText += '0';
      }
      result.innerText += '.';
    }
  }else if(button === '(' || button === ')'){
    if(charactersCheck() || result.innerText.endsWith('-')){
      result.textContent += '(';
    }else{
      let {open, close} = checkBrackets(result.innerText);
      if(open > close){
        result.textContent += ')';
        return;
      }else{
        result.textContent += '×(';
      }
    }
  }else if(button === 'F9'){
    if(charactersCheck()){
      result.innerText += '(-';
    }else if(result.textContent.endsWith(')')){
      result.innerText += '×(-';
    }
    else{
      let length = latest.length;
      if(latest.endsWith('-')){
        result.innerText = result.innerText.slice(result.length, -2);
      }else if(latest.includes('(-')){
        latest = latest.substring(2);
        result.innerText = result.innerText.slice(result.length, -length);
        
        result.innerText += latest;
      }else{
        result.innerText = result.innerText.slice(result.length, -length);
        latest = '(-' + latest;
        result.innerText += latest;
      }
    }
  }else{
    switch(button) {
      case '1':
        numberInput(result.innerText, part);
        result.innerText += 1;
        break;
      case '2':
        numberInput(result.innerText, part);
        result.innerText += 2;
        break;
      case '3':
        numberInput(result.innerText, part);
        result.innerText += 3;
        break;
      case '4':
        numberInput(result.innerText, part);
        result.innerText += 4;
        break;
      case '5':
        numberInput(result.innerText, part);
        result.innerText += 5;
        break;
      case '6':
        numberInput(result.innerText, part);
        result.innerText += 6;
        break;
      case '7':
        numberInput(result.innerText, part);
        result.innerText += 7;
        break;
      case '8':
        numberInput(result.innerText, part);
        result.innerText += 8;
        break;
      case '9':
        numberInput(result.innerText, part);
        result.innerText += 9;
        break;
      case '0':
        numberInput(result.innerText, part);
        result.innerText += 0;
        break;
      case '+':
        if(invalid() || operatorHandler()){
          return;
        }
        result.innerText += '+';
        break;
      case '-':
        if(invalid() || operatorHandler()){
          return;
        }
        result.innerText += '−';
        break;
      case '*':
        if(invalid() || operatorHandler()){
          return;
        }
        result.innerText += '×';
        break;
      case '/':
        if(invalid() || operatorHandler()){
          return;
        }
        result.innerText += '÷';
        break;
      case '=':
        if(invalid() || operatorHandler()){
          return;
        }
        operate();
        break;
      case 'Enter':
        if(invalid() || operatorHandler()){
          return;
        }
        operate();
        break;
      default:
        return
    }
  }
})

const operate = () => {
  let {open, close} = checkBrackets(result.innerText);

  // Adding Closed Brackets if its less than opens
  setClosedBrackets(result.innerText, open, close);

  // Calculation
  const finalResult = calculation(result.innerText);

  // Adding Equations and result to History
  addingHistory(result.innerText, finalResult);
  
  result.innerText = finalResult;
}

// Invalid Handler
const invalid = () => {
  if(charactersCheck() || result.innerText.endsWith('-')){
    invalidHandler.innerText = `Invalid Format Used`
    invalidHandler.classList.add('show');
    setTimeout(() => {
      invalidHandler.classList.remove('show');
    }, 2000);
    return true;
  }

  return false;
}

// Checking if current equations ends with certain characters
const charactersCheck = () => {
  if(result.textContent.endsWith('÷') || result.textContent.endsWith('×') || result.textContent.endsWith('−') || result.textContent.endsWith('+') || result.textContent.endsWith('(') || result.innerText === ''){
    return true;
  }else{
    return false;
  }
}

// Checking if current equations ends with ')' or its just '0'
const numberInput = (resultText, part) => {
  if(resultText.endsWith(')')){
    result.innerText += '×';  
  }else if(part[part.length - 1] === '0'){
    result.innerText = result.innerText.slice(0, -1);
  }
}

// Counting open and closed brackets
const checkBrackets = (equation) => {
  let temp = equation;
  let open = 0;
  let close = 0;
  for(let i = 0; i < temp.length; i++){
    const char = temp.charAt(i);

    if(char.includes('(')){
      open++;
    }else if(char.includes(')')){
      close++;
    }
  }

  return {open, close};
}

// Adding Closed Brackets if less than opens
const setClosedBrackets = (equation, open, close) => {
  let temp = equation;
  if(close === 0){
    for(let i = 0; i<open; i++){
      temp += ')';
    }
  }

  result.innerText = temp;
}

// Adding Equations to history-inner class
const addingHistory = (equation, result) => {
  const oldEq = historyWrapper.querySelector('#eq-latest');
  const oldRes = historyWrapper.querySelector('#res-latest');

  if(oldEq && oldRes){
    console.log(equation);
    console.log(result);
    if(oldEq.innerText === equation && oldRes.innerText == result){
      return;
    }
  }

  const equationHistory = document.createElement("div");
  const resultHistory = document.createElement("div");

  equationHistory.classList.add('calculations-history', 'btn');
  resultHistory.classList.add('results-history', 'btn');
  
  equationHistory.textContent = equation;
  resultHistory.textContent = result;

  setLatestHistory(equationHistory, resultHistory, oldEq, oldRes);
  
  historyWrapper.appendChild(equationHistory);
  historyWrapper.appendChild(resultHistory);
}

// Set Latest History
const setLatestHistory = (equation, result, oldEq, oldRes) => {
  if(oldEq && oldRes){
    oldEq.removeAttribute('id');
    oldRes.removeAttribute('id');
  }

  equation.setAttribute('id', 'eq-latest');
  result.setAttribute('id', 'res-latest');
}

// History Button
history.addEventListener('click', (e) => {
  const target = e.target;

  if(target.closest('#history-btn')){
    history.classList.toggle('history');
  }else if(target.closest('#remove-history-btn')){
    history.querySelector('.history-inner').textContent = '';
  }else if(target.closest('#clear-button')){
    result.innerText = '';
  }else if(target.closest('#delete-button')){
    result.innerText = result.innerText.slice(0, -1);
  }
})

// Adding equations on history to current equations
historyWrapper.addEventListener('click', (e) => {
  const history = e.target.closest('.btn');
  if(history){
    if(result.innerText.endsWith('÷') || result.innerText.endsWith('×') || result.innerText.endsWith('−') || result.innerText.endsWith('+')){
      result.innerText += history.innerText;
    }else{
      result.innerText = history.innerText;
    }
  }else{
    return;
  }
})

// Text Splitter, Cleaning and Calculations Caller
const calculation = (equation) => {
  const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-'];
  const operators = ['÷', '×', '−', '+', '(', ')'];

  let output = [];
  let equations = [];
  let temp = '';
  for(let i = 0; i < equation.length; i++){
    const char = equation.charAt(i);

    if(number.includes(char)){
      temp = temp + char;
    }else if(operators.includes(char)){
      if(temp !== ''){
        output.push(temp);
        temp = ''; 
      }
      equations.push(char);
    }
  }

  if(temp !== ''){
    output.push(temp);
  }

  // If theres - (minus) and followed with char but numbers set that to -1 and adding × to equations with index after it
  let cleanNegative = handleNegativeSigns(output, equations);

  output = cleanNegative.output;
  equations = cleanNegative.equations;

  let start = 0;
  let end = equations.length;

  execute(equations, output, start, end);

  return output;
}

const handleNegativeSigns = (output, equations) => {
  let indices = [];
  output = output.map((item, index) => {
      if (item === '-') {
        indices.push(index);
        return -1;
      }
      return item;
  });


  indices.forEach(index => {
    let insertTimes = index + 1;
    equations.splice(insertTimes, 0, '×');
  })

  return {output, equations};
}

// Calculation Caller
const execute = (equations, output, start, end) => {
  let prior = 0;
  while(prior <= 5){
    let noMatch = true;
    if(priorityCheck(equations, output, prior, noMatch, start, end)){
      prior++;
    }
  }
}

// Calculation
const priorityCheck = (equations, output, prior, noMatch, bracketsStart, bracketsEnd) => {
  for(let index = bracketsStart; index < bracketsEnd; index++){
    let operator = equations[index];
    let closedBrackets = false;
    let insideBrackets = false;
    if(priority[operator] === prior){
      let a = parseFloat(output[index]);
      let b = parseFloat(output[index + 1]);
      let result = a;
      switch(priority[operator]){
        case 0:

          let {startBrackets, endBrackets} = findBracketsPos(equations, index)

          equations.splice(startBrackets, 1);

          if(equations.slice(startBrackets, endBrackets - 1) == ''){
            equations.splice(index, 1);
            return noMatch;
          }

          execute(equations, output, startBrackets, endBrackets - 1);
          
          insideBrackets = true;
          break;
        case 1:
          result = Math.ceil((a / b) * 100) / 100;
          break;
        case 2:
          result = a * b;
          break;
        case 3:
          result = a - b;
          break;
        case 4:
          result = a + b;
          break;
        case 5:
          closedBrackets = true;
          break;
        default:
          break;
      }
      if(closedBrackets){
        equations.splice(index, 1);
        return noMatch;
      }
      else if(!insideBrackets){
        output.splice(index, 2, result);
        equations.splice(index, 1);
      }
      noMatch = false;
      break;
    }else if(priority[operator] === 5){
      return noMatch;
    }
  }

  return noMatch;
}

// Finding Brackets Positions
const findBracketsPos = (equations, index) => {
  let startBrackets = index;
  let endBrackets = index + 1;

  while(endBrackets < equations.length){
    if(equations[endBrackets] === ')'){
      return {startBrackets, endBrackets};
    }
    endBrackets++;
  }

  return null;
}

// Priority
const priority = {
  '÷': 1,
  '×': 2, 
  '−': 3, 
  '+': 4, 
  '(': 0,
  ')': 5
}