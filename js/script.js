const history = document.querySelector('.calc-header');
const historyWrapper = document.querySelector('.history-inner');

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

const calc = document.querySelector('.calc-container');
const result = document.getElementById('result');
const invalidHandler = document.getElementById('invalid');
const list = [];

const title = document.querySelector('.header');
const socials = document.querySelector('.socials');
const socialsBtn = document.querySelector('.socials-button');
const socialsWrapper = document.querySelector('.socials-wrapper');

let isClicked = false;

socialsBtn.addEventListener('click', (e) => {
  e.preventDefault();
  socials.classList.toggle('show');
})

// title.addEventListener('mouseover', (e) => {
//   if (!isClicked) {
//     socials.style.animation = "socials-show 1s ease forwards";
//     socials.classList.remove('hide');
//   }
// })

// title.addEventListener('mouseout', (e) => {
//   if (!isClicked) {
//     socials.style.animation = "socials-out 1s ease .5s forwards";
//   }
// })

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
    
    if(target.closest('.numbers')){
      let part = result.innerText.split(/[÷/×/−/+]/);
      if(target.closest('#clear')){
        result.innerText = '';
      }else if(target.closest('#point')){
        if(!part[part.length - 1].includes('.')){
          if(result.textContent.endsWith('÷') || result.textContent.endsWith('×') || result.textContent.endsWith('−') || result.textContent.endsWith('+')){
            return;
          }else if(result.innerText === '' || result.innerText.endsWith('-') || result.innerText.endsWith('(')){
            console.log("here");
            result.innerText += '0';
          }
          result.innerText += target.dataset.value;
        }
      }else if(target.id === 'delete'){
        result.innerText = result.innerText.slice(0, -1);
      }
      else{
        switch(target.id){
          case 'number-1':
            if(result.innerText.endsWith(')')){
              result.innerText += '×';  
            }
            result.innerText += target.dataset.value;
            break;
          case 'number-2':
            if(result.innerText.endsWith(')')){
              result.innerText += '×';  
            }
            result.innerText += target.dataset.value;
            break;
          case 'number-3':
            if(result.innerText.endsWith(')')){
              result.innerText += '×';  
            }
            result.innerText += target.dataset.value;
            break;
          case 'number-4':
            if(result.innerText.endsWith(')')){
              result.innerText += '×';  
            }
            result.innerText += target.dataset.value;
            break;
          case 'number-5':
            if(result.innerText.endsWith(')')){
              result.innerText += '×';  
            }
            result.innerText += target.dataset.value;
            break;
          case 'number-6':
            if(result.innerText.endsWith(')')){
              result.innerText += '×';  
            }
            result.innerText += target.dataset.value;
            break;
          case 'number-7':
            if(result.innerText.endsWith(')')){
              result.innerText += '×';  
            }
            result.innerText += target.dataset.value;
            break;
          case 'number-8':
            if(result.innerText.endsWith(')')){
              result.innerText += '×';  
            }
            result.innerText += target.dataset.value;
            break;
          case 'number-9':
            if(result.innerText.endsWith(')')){
              result.innerText += '×';  
            }
            result.innerText += target.dataset.value;
            break;
          case 'number-0':
            if(result.innerText.endsWith(')')){
              result.innerText += '×';  
            }
            if(!result.innerText.endsWith('0') || part[part.length - 1].includes('.')){
              result.innerText += target.dataset.value;
            }
            break;
          case 'plus-minus':
            if(result.textContent.endsWith('÷') || result.textContent.endsWith('×') || result.textContent.endsWith('−') || result.textContent.endsWith('+') || result.textContent.endsWith('(') || result.innerText === ''){
              result.innerText += '(-';
            }else if(result.textContent.endsWith(')')){
              result.innerText += '×(-';
            }
            else{
              let length = part[part.length - 1].length;
              if(part[part.length - 1].endsWith('-')){
                result.innerText = result.innerText.slice(result.length, -2);
              }
              else if(part[part.length - 1].includes('(-')){
                part[part.length - 1] = part[part.length - 1].substring(2);
                result.innerText = result.innerText.slice(result.length, -length);
                
                result.innerText += part[part.length - 1];
              }else{
                console.log("length "+length);
                console.log(part[part.length - 1]);
                result.innerText = result.innerText.slice(result.length, -length);
                part[part.length - 1] = '(-' + part[part.length - 1];
                result.innerText += part[part.length - 1];
              }
            }
            break;
          case 'brackets':
            console.log(result.innerText);
            if(result.textContent.endsWith('÷') || result.textContent.endsWith('×') || result.textContent.endsWith('−') || result.textContent.endsWith('+') || result.textContent.endsWith('(') || result.textContent.endsWith('-')){
              result.textContent += '(';
            }else if(result.innerText === ''){
              result.textContent = '(';
            }else{
              let open = 0;
              let close = 0;
              for(let i = result.innerText.length - 1; i >= 0; i--){
                if(result.innerText.charAt(i).includes('(')){
                  open++;
                }else if(result.innerText.charAt(i).includes(')')){
                  close++;
                }
              }
              if(open > close){
                result.textContent += ')';
                return;
              }else{
                result.textContent += '×(';
              }
            }
            break;
          default:
            break;
        }
      }
    }else if(target.closest('.operator .btn')){
      let part = result.textContent;
      if(target.id === 'equals'){
        if(part.endsWith('÷') || part.endsWith('×') || part.endsWith('−') || part.endsWith('+') || part.endsWith('-') || part.endsWith('(')){
          invalidHandler.classList.add('show');
          setTimeout(() => {
            invalidHandler.classList.remove('show');
        }, 2000);
          return;
        }else if(part.endsWith('.')){
          return;
        }
        checkBrackets(result.innerText);
        const finalResult = calculation(result.innerText);
        addingHistory(result.innerText, finalResult);
        result.innerText = finalResult;
      }else{
        if(result.innerText === '' || part.endsWith('÷') || part.endsWith('×') || part.endsWith('−') || part.endsWith('+') || part.endsWith('.') || part.endsWith('-') || part.endsWith('(')){
          return;
        }
        console.log("Here: "+target.dataset.value+" and the target is: "+target.id);
        result.innerText += target.dataset.value;
      }
    }
  }else{
    return;
  }
})

const addingHistory = (equation, result) =>{
  const equationHistory = document.createElement("div");
  const resultHistory = document.createElement("div");

  equationHistory.classList.add('calculations-history');
  equationHistory.classList.add('btn');
  resultHistory.classList.add('results-history');
  resultHistory.classList.add('btn');

  equationHistory.textContent = equation;
  resultHistory.textContent = result;

  historyWrapper.appendChild(equationHistory);
  historyWrapper.appendChild(resultHistory);
}

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
  let addEnd = false;
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

  if(close === 0){
    for(let i = 0; i<open; i++){
      temp += ')';
    }
  }

  console.log(open);
  console.log(close);
  console.log(temp);

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
    }
      else{
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