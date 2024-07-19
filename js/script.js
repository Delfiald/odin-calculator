const history = document.querySelector('.calc-header');

history.addEventListener('click', (e) => {
  const target = e.target;

  if(target.closest('#history-btn')){
    history.classList.toggle('history');
  }
})

const calc = document.querySelector('.calc-container');
const result = document.getElementById('result');
const list = [];

calc.addEventListener('click', (e) => {
  const target = e.target;

  if(target.closest('.numbers')){
    let part = result.innerText.split(/[÷/×/−/+]/);
    if(target.id === 'clear'){
      result.innerText = 0;
    }else if(target.id === 'point'){
      if(!part[part.length - 1].includes('.')){
        if(result.textContent.endsWith('÷') || result.textContent.endsWith('×') || result.textContent.endsWith('−') || result.textContent.endsWith('+')){
          return;
        }
        result.innerText += target.dataset.value;
      }
    }else if(target.id === 'delete'){
      result.innerText = result.innerText.slice(0, -1);
      if(result.innerText === ''){
        result.innerText = 0;
      }
    }
    else{
      if(target.id && result.innerText === '0'){
        console.log('run');
        result.innerText = '';
      }
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
          let length = part[part.length - 1].length
          if(part[part.length - 1].includes('(-')){
            part[part.length - 1] = part[part.length - 1].substring(2);
          }else{
            part[part.length - 1] = '(-' + part[part.length - 1];
          }
          console.log(result.innerText);
          if(length === 0 || result.innerText === ''){
            result.innerText += '(-';
          }else{
            console.log(length);
            result.innerText = result.innerText.slice(0, -length)
            result.innerText += part[part.length-1];
          }
          break;
        case 'brackets':
          if(result.textContent.endsWith('÷') || result.textContent.endsWith('×') || result.textContent.endsWith('−') || result.textContent.endsWith('+') || result.textContent.endsWith('(')){
            result.textContent += '(';
          }else if(result.textContent === ''){
            result.textContent += '0×(';
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
        alert("Invalid Format");
        return;
      }else if(part.endsWith('.')){
        return;
      }
      checkBrackets(result.innerText);
      calculation(result.innerText);
    }else{
      if(part.endsWith('÷') || part.endsWith('×') || part.endsWith('−') || part.endsWith('+') || part.endsWith('.') || part.endsWith('-') || part.endsWith('(')){
        return;
      }
      result.innerText += target.dataset.value;
    }
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

  const output = [];
  const equations = [];
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

  console.log(output);
  console.log(equations);

  let prior = 0;
  let startIndex = 0;
  let endIndex = equations.length;
  while(prior <= 5){
    let noMatch = true;
    if(priorityCheck(equations, prior, output, noMatch, startIndex, endIndex)){
      console.log("Prior di tambah");
      prior++;
    }
  }
  console.log(output);
}

const priorityCheck = (equations, prior, output, noMatch, startIndex, endIndex) => {
  equations.slice(startIndex, endIndex).forEach((op, index) => {
    console.log("operator: "+op);
    console.log(`if(${priority[op]} === ${prior})`);
    if(priority[op] === prior){
      let here;
      let there;
      console.log("startIndex: "+startIndex);
      console.log("index: "+index);
      if(startIndex !== 0){
        here = startIndex - 1;
        there = startIndex;
        console.log("here: "+here);
      }else{
        here = startIndex;
        there = startIndex + 1;
      }
      console.log(`kalkulasi untuk bilangan ${output[here]} ${op} ${output[there]}`);
      let tempResult = parseFloat(output[here]);
      let a = parseFloat(output[here]);
      let b = parseFloat(output[there]);
      if(op === '('){
        console.log("ketemu brackets buka");
        
        let start = 0;
        let bracketPosition = index+1;
        let closeBracketPosition = checkClosedBrackets(equations);

        console.log(`Start ${bracketPosition}, end ${closeBracketPosition}`);

        while(start <= 5){
          console.log("Cek lagi di dalam brackets");
          if(priorityCheck(equations, start, output, noMatch, bracketPosition, closeBracketPosition)){
            start++;
          }
        }
        console.log("brackets buka dihapus");
        console.log(`hapus ${equations[index]}`);
        equations.splice(index, 2);
        console.log("equations: "+ equations)
        return noMatch;
      }
      else if(op === '÷'){
        tempResult = a / b;
        tempResult = Math.ceil(tempResult * 100);
        tempResult = tempResult / 100;
      }else if(op === '×'){
        tempResult = a * b;
      }else if(op === '−'){
        tempResult = a - b;
      }else if(op === '+'){
        tempResult = a + b;
      }else if(op === ')'){
        return;
      }
      console.log('hasil: '+tempResult);
      console.log(`hapus ${equations[startIndex]}`);
      equations.splice(startIndex, 1);
      console.log("equations: "+ equations);
      output.splice(here, 2, tempResult);
      console.log("output: "+ output);
      noMatch = false;
    }
  })

  return noMatch;
}

const checkClosedBrackets = (equations)=> {
  let closeBrackets;
  equations.forEach((op, index) => {
    console.log(op + " index: "+index);
    if(op === ')'){
      closeBrackets = index;
    }
  })

  return closeBrackets;
}

const priority = {
  '÷': 1,
  '×': 2, 
  '−': 3, 
  '+': 4, 
  '(': 0,
  ')': 5
}