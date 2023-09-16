const myP = document.querySelector('.question');
const choice = document.querySelector('.choice');
const answer = (element) => {
    return `
        <div>
            <p class="ans">${element}</p>
        </div>
    `
}

fetch(`http://localhost:3000/match`)
    .then(res => res.json())
    .then(question => {
        const correct_answer = question.question.correct_answer;
        const incorrect_answers = question.question.incorrect_answers;
        localStorage.setItem('id', question.question._id);
        myP.innerHTML = question.question.question;
        choice.innerHTML += answer(correct_answer);
        incorrect_answers.forEach(element => {
            choice.innerHTML += answer(element);
        });
    })
    .catch(error => console.log(error.message));

setTimeout(() => {
    const rank = document.querySelector('.Rank');
    const prop = document.querySelectorAll('.ans');

    console.log(prop);
    prop.forEach(element => {
        element.addEventListener('click', () => {
            console.log(element.innerHTML);
            const id = localStorage.getItem('id');
            fetch(`http://localhost:3000/api/v1/questions/${id}`)
            .then(res => res.json())
            .then(question => {
                    if (element.innerHTML === question.result.correct_answer) {
                        element.parentElement.style.background = 'green';
                    } else {
                        element.parentElement.style.background = 'red';
                    }
                    location.reload();
                })
        });
    });
}, 1000);
