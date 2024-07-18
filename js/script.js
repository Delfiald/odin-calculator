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
        default:
          break;
      }
    }
  }else if(target.closest('.operator .btn')){
    let part = result.textContent;
    if(target.id === 'equals'){
      if(part.endsWith('÷') || part.endsWith('×') || part.endsWith('−') || part.endsWith('+') || part.endsWith('-')){
        alert("Invalid Format");
        return;
      }else if(part.endsWith('.')){
        return;
      }
      calculation(result.innerText);
    }else{
      if(part.endsWith('÷') || part.endsWith('×') || part.endsWith('−') || part.endsWith('+') || part.endsWith('.') || part.endsWith('-')){
        return;
      }
      result.innerText += target.dataset.value;
    }
  }
})

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
  while(prior <= 4){
    let noMatch = true;
    if(priorityCheck(equations, prior, output, noMatch)){
      console.log("Prior di tambah");
      prior++;
    }
  }
  console.log(output);
}

const priorityCheck = (equations, prior, output, noMatch) => {
  equations.forEach((op, index) => {
    console.log("operator: "+op);
    console.log(`if(${priority[op]} === ${prior})`);
    if(priority[op] === prior){
      console.log(`kalkulasi untuk bilangan ${output[index]} ${op} ${output[index+1]}`);
      let tempResult;
      let a = parseFloat(output[index]);
      let b = parseFloat(output[index + 1]);
      if(op === '÷'){
        tempResult = a / b;
        tempResult = Math.ceil(tempResult * 100);
        tempResult = tempResult / 100;
      }else if(op === '×'){
        tempResult = a * b;
      }else if(op === '−'){
        tempResult = a - b;
      }else if(op === '+'){
        tempResult = a + b;
      }
      console.log('hasil: '+tempResult);
      equations.splice(index, 1);
      output.splice(index, 2, tempResult);
      noMatch = false;
    }
  })

  return noMatch;
}

const priority = {
  '÷': 1,
  '×': 2, 
  '−': 3, 
  '+': 4, 
  '(': 0
}