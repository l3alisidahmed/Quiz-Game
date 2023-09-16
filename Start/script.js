const categoryType = document.querySelector(".category-type");
const nbr = document.querySelector(".nbr");
const myQuestion = document.querySelector(".question");
const choice = document.querySelector(".choice-card");

const addChoice = (prop) => {
    return `
        <div>
            <input type="radio" name="prop" class="prop">
            <label for="" id="value">${prop}</label>
        </div> 
    `
}

const getQuestion = (i, data) => {
    const { _id, question, category, correct_answer, incorrect_answers } = data.question[i];
    
    localStorage.setItem('id', _id);
    categoryType.innerHTML = category;
    nbr.innerHTML = `${i+1}/5`;
    myQuestion.innerHTML = question;
    choice.innerHTML = addChoice(correct_answer);
    incorrect_answers.forEach(element => {
        choice.innerHTML += addChoice(element);
    });

}

const category = localStorage.getItem('Category');
console.log(category);
fetch(`http://localhost:3000/match/${category}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let i = 0;
        let rank = 0
        getQuestion(i, data);
        const btn = document.getElementById('btn');
        const radioInp = document.querySelectorAll('.prop');
        radioInp.forEach(element => {
            element.addEventListener('change', () => {
                    const label = element.parentElement.lastElementChild;
                    label.style.color = 'blue';
                    label.parentElement.style.border = '2px solid black';
                    const id = localStorage.getItem('id');
                    fetch(`http://localhost:3000/api/v1/questions/${id}`)
                        .then(res => res.json())
                        .then(data => {
                        console.log(data.result);
                        if (label.innerHTML === data.result.correct_answer) {
                                rank = 3;
                                console.log(rank);
                            }
        
                        })
                        .catch(err => err.message);
                });
            });
        btn.onclick = () => {
            if (i < 5) {
                i++;
                getQuestion(i, data);
                const btn = document.getElementById('btn');
                const radioInp = document.querySelectorAll('.prop');
                radioInp.forEach(element => {
                    element.addEventListener('change', () => {
                        const label = element.parentElement.lastElementChild;
                        label.style.color = 'blue';
                        label.parentElement.style.border = '2px solid black';
                        const id = localStorage.getItem('id');
                        fetch(`http://localhost:3000/api/v1/questions/${id}`)
                            .then(res => res.json())
                            .then(data => {
                                console.log(data.result);
                                if (label.innerHTML === data.result.correct_answer) {
                                    rank += 3;
                                    console.log(rank);
                                }
                                
                                if (i === 4) {
                                    localStorage.setItem('score', rank);
                                    location.href = "../quiz game/game.html";
                                }
                            })
                            .catch(err => err.message);
                    });
                });
            }
        }
    })
    .catch(err => console.log(err.message));