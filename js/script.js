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

  let start = 0;
  let end = equations.length;

  execute(equations, output, start, end);

  console.log(output);
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
          // equations.splice(endBrackets - 1, 1);

          console.log("Operator dalam Kurung: "+equations.slice(startBrackets, endBrackets - 1));
          console.log("Angka dalam Kurung: "+output.slice(startBrackets, endBrackets - 1));

          execute(equations, output, startBrackets, endBrackets - 1);
          // while(true){
          //   let brackets = findBrackets(equations, index);

          //   if(!brackets){
          //     break;
          //   }
            
          //   let {startBrackets, endBrackets} = brackets;

          //   // console.log("Operator dalam Kurung: "+equations.slice(startBrackets + 1, endBrackets));
          //   // console.log("Angka dalam Kurung: "+output.slice(startBrackets, endBrackets));

            
          //   let newPrior = 0;
          //   endBrackets = endBrackets - 1 - newPrior;
          //   equations.splice(startBrackets, 1);
          //   equations.splice(endBrackets, 1);

          //   while(newPrior <= 4){
          //     console.log("=================INSIDE BRACKETS================")
          //     console.log("Operator dalam Kurung: "+equations.slice(startBrackets, endBrackets));
          //     console.log("Angka dalam Kurung: "+output.slice(startBrackets, endBrackets));
          //     if(priorityCheck(equations, output, newPrior, noMatch, startBrackets, endBrackets)){
          //       if(newPrior === 0){
          //         console.log("There is no (");
          //       }else if(newPrior === 1){
          //         console.log("There is no /");
          //       }else if(newPrior === 2){
          //         console.log("There is no x");
          //       }else if(newPrior === 3){
          //         console.log("There is no -");
          //       }else if(newPrior === 4){
          //         console.log("There is no +");
          //       }else if(newPrior === 5){
          //         console.log("There is no )");
          //       }
          //       newPrior++;
          //       console.log("New Prior ditambah");
          //     }
          //   }

          //   console.log("Lokasi Kurung Buka: "+startBrackets);
          //   console.log("Lokasi Kurung Tutup: "+endBrackets);
          // }
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