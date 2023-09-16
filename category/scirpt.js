const categoryCard = document.querySelectorAll('#cat');
const startBtn = document.getElementById('btn');

categoryCard.forEach(element => {
    element.addEventListener('click', () => {
        console.log(element);
        element.style.border = '5px solid black';
        const categoryName = element.childNodes[3].innerHTML;
        console.log(categoryName);
        localStorage.setItem('Category', categoryName);
    });
});

startBtn.onclick = () => {
    location.href = "../Start/index.html";
}