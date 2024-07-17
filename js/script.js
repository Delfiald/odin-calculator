const result = document.querySelector('.calc-header');

result.addEventListener('click', (e) => {
  const target = e.target;

  if(target.closest('#history-btn')){
    result.classList.toggle('history');
  }
})