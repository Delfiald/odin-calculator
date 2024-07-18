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
      if(result.innerText === '0'){
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
          result.innerText += target.dataset.value;
          break;
        case 'plus-minus':
          let length = part[part.length - 1].length
          if(part[part.length - 1].includes('(-')){
            part[part.length - 1] = part[part.length - 1].substring(2);
          }else{
            part[part.length - 1] = '(-' + part[part.length - 1];
          }
          if(length === 0){
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
      if(part.endsWith('÷') || part.endsWith('×') || part.endsWith('−') || part.endsWith('+')){
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
  const operators = ['÷', '×', '−', '+'];
  const delimiters = /[÷/×/−/+]/;
  let temp = equation.split(delimiters);
  console.log(temp);
}