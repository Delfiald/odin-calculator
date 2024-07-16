const result = document.querySelector('.calc-result');

result.addEventListener('click', (e) => {
  const target = e.target;

  switch(target.id){
    case 'history-btn':
      result.classList.toggle('history');
      break;
    default:
      console.log("nothing");
      break;
  }
})