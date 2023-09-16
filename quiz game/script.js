const score = document.getElementById('score');

score.innerHTML = `${localStorage.getItem('score')/3}/5`