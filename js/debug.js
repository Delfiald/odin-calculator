// Pre-cleaning Code for debugging and testing new logic

const calc = document.querySelector('.calc-container');
const history = document.querySelector('.calc-header');
const result = document.getElementById('result');
const historyWrapper = document.querySelector('.history-inner');
const invalidHandler = document.getElementById('invalid');
const socials = document.querySelector('.socials');
const socialsBtn = document.querySelector('.socials-button');

socialsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  socials.classList.toggle('show');
})

calc.addEventListener('click', (e) => {
  const target = e.target.closest('.btn');
  e.preventDefault();
  let typing = false;
  let typingTimeOut;
  
  if(target){
    if(!typing){
      typing = true;
      result.classList.add('paused');
    }
    clearTimeout(typingTimeOut);
    typingTimeout = setTimeout(() => {
      typing = false;
      result.classList.remove('paused');
    }, 1000);

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
        switch(target.id){
          case 'number-1':
            numberInput(result.innerText, part);
            result.innerText += target.dataset.value;
            break;
          case 'number-2':
            numberInput(result.innerText, part);
            result.innerText += target.dataset.value;
            break;
          case 'number-3':
            numberInput(result.innerText, part);
            result.innerText += target.dataset.value;
            break;
          case 'number-4':
            numberInput(result.innerText, part);
            result.innerText += target.dataset.value;
            break;
          case 'number-5':
            numberInput(result.innerText, part);
            result.innerText += target.dataset.value;
            break;
          case 'number-6':
            numberInput(result.innerText, part);
            result.innerText += target.dataset.value;
            break;
          case 'number-7':
            numberInput(result.innerText, part);
            result.innerText += target.dataset.value;
            break;
          case 'number-8':
            numberInput(result.innerText, part);
            result.innerText += target.dataset.value;
            break;
          case 'number-9':
            numberInput(result.innerText, part);
            result.innerText += target.dataset.value;
            break;
          case 'number-0':
            numberInput(result.innerText, part);
            result.innerText += target.dataset.value;
            break;
          default:
            break;
        }
      }
    // Operators
    }else if(target.closest('.operator')){
      if(charactersCheck() || result.innerText.endsWith('-')){
        invalidHandler.classList.add('show');
        setTimeout(() => {
          invalidHandler.classList.remove('show');
        }, 2000);
        return;
      }else{
        if(target.id === 'equals'){
          // Count Brackets
          let {open, close} = checkBrackets(result.innerText);

          // Adding Closed Brackets if its less than opens
          setClosedBrackets(result.innerText, open, close);

          // Calculation
          const finalResult = calculation(result.innerText);

          // Adding Equations and result to History
          addingHistory(result.innerText, finalResult);
          
          result.innerText = finalResult;
        }else{
          result.innerText += target.dataset.value;
        }
      }
    }
  }else{
    return;
  }
})

const charactersCheck = () => {
  if(result.textContent.endsWith('÷') || result.textContent.endsWith('×') || result.textContent.endsWith('−') || result.textContent.endsWith('+') || result.textContent.endsWith('(') || result.innerText === ''){
    return true;
  }else{
    return false;
  }
}

const numberInput = (resultText, part) => {
  if(resultText.endsWith(')')){
    result.innerText += '×';  
  }else if(part[part.length - 1] === '0'){
    result.innerText = result.innerText.slice(0, -1);
  }
}

const addingHistory = (equation, result) =>{
  const equationHistory = document.createElement("div");
  const resultHistory = document.createElement("div");

  equationHistory.classList.add('calculations-history', 'btn');
  resultHistory.classList.add('results-history', 'btn');

  equationHistory.textContent = equation;
  resultHistory.textContent = result;

  historyWrapper.appendChild(equationHistory);
  historyWrapper.appendChild(resultHistory);
}

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

const setClosedBrackets = (equation, open, close) => {
  let temp = equation;
  if(close === 0){
    for(let i = 0; i<open; i++){
      temp += ')';
    }
  }

  result.innerText = temp;
}

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

  let indices = [];
  output = output.map((item, index) => {
      if (item === '-') {
          indices.push(index);
          return -1;
      }
      return item;
  });

  console.log(indices);

  indices.forEach(index => {
    let insertTimes = index + 1;
    equations.splice(insertTimes, 0, '×');
  })

  console.log(output);
  console.log(equations);

  let start = 0;
  let end = equations.length;

  execute(equations, output, start, end);

  console.log(output);

  return output;
}

const execute = (equations, output, start, end) => {
  let prior = 0;
  while(prior <= 5){
    let noMatch = true;
    console.log("Priority: "+prior);
    if(priorityCheck(equations, output, prior, noMatch, start, end)){
      if(prior === 0){
        console.log("There is no (");
      }else if(prior === 1){
        console.log("There is no /");
      }else if(prior === 2){
        console.log("There is no x");
      }else if(prior === 3){
        console.log("There is no -");
      }else if(prior === 4){
        console.log("There is no +");
      }else if(prior === 5){
        console.log("There is no )");
      }
      console.log("Prior ditambah");
      prior++;
    }
    console.log("========================================")
  }
}

const priorityCheck = (equations, output, prior, noMatch, bracketsStart, bracketsEnd) => {
  for(let index = bracketsStart; index < bracketsEnd; index++){
    console.log("Angka sekarang: "+output.slice(bracketsStart, bracketsEnd));
    console.log("Operator sekarang: "+equations.slice(bracketsStart, bracketsEnd));
    let operator = equations[index];
    let closedBrackets = false;
    let insideBrackets = false;
    if(priority[operator] === prior){
      let a = parseFloat(output[index]);
      let b = parseFloat(output[index + 1]);
      let result = a;
      console.log(`Lakukan ${a} ${operator} ${b}`);
      switch(priority[operator]){
        case 0:
          console.log('(');

          let {startBrackets, endBrackets} = findEndBrackets(equations, index)

          equations.splice(startBrackets, 1);

          console.log("Operator dalam Kurung: "+equations.slice(startBrackets, endBrackets - 1));

          if(equations.slice(startBrackets, endBrackets - 1) == ''){
            console.log("OP");
            equations.splice(index, 1);
            return noMatch;
          }
          
          console.log("Angka dalam Kurung: "+output.slice(startBrackets, endBrackets - 1));

          execute(equations, output, startBrackets, endBrackets - 1);
          
          insideBrackets = true;
          break;
        case 1:
          console.log('/');
          result = Math.ceil((a / b) * 100) / 100;
          break;
        case 2:
          console.log('x');
          result = a * b;
          break;
        case 3:
          console.log('-');
          result = a - b;
          break;
        case 4:
          console.log('+');
          result = a + b;
          break;
        case 5:
          console.log('Ketemu )');
          closedBrackets = true;
          break;
        default:
          console.log("Invalid Input");
          break;
      }
      if(closedBrackets){
        equations.splice(index, 1);
        return noMatch;
      }
      else if(!insideBrackets){
        console.log(`Hasil= `+result);
        output.splice(index, 2, result);
        equations.splice(index, 1);
      }
      noMatch = false;
      break;
    }else if(priority[operator] === 5){
      console.log('Ketemu ) tapi tidak sesuai');
      return noMatch;
    }else{
      console.log("Try Looking for higher priority");
      console.log(`${operator} not priority right now`);
    }
  }

  return noMatch;
}

const findEndBrackets = (equations, index) => {
  let startBrackets = index;
  let endBrackets = index + 1;

  while(endBrackets < equations.length){
    if(equations[endBrackets] === ')'){
      console.log(`Ketemu tutup kurung, kembalikan index ${startBrackets} dan ${endBrackets}`);
      return {startBrackets, endBrackets};
    }
    endBrackets++;
  }

  return null;
}

const findBrackets = (equations, index) => {
  console.log("Cari Posisi Brackets");
  let startBrackets = index;
  let endBrackets = index + 1;
  console.log("StartBrackets Pos: " + startBrackets);
  while (endBrackets < equations.length) {
    if (equations[endBrackets] === ')') {
      console.log(`Ketemu tutup kurung, kembalikan index ${startBrackets} dan ${endBrackets}`);
      return {startBrackets, endBrackets};
    } else if (equations[endBrackets] === '(') {
      console.log("Ketemu nested Brackets pada index: " + endBrackets);
      const innerBrackets = findBrackets(equations, endBrackets);

      if(innerBrackets){
        return innerBrackets;
      }
    }
    endBrackets++;
  }

  return null;
}

const priority = {
  '÷': 1,
  '×': 2, 
  '−': 3, 
  '+': 4, 
  '(': 0,
  ')': 5
}