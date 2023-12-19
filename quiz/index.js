const correctAnswers = ["A", "B", "C", "D", "A"];
const form = document.querySelector(".quiz-form");
const result = document.querySelector(".score");
const reloadBtn = document.querySelector(".reload");
const questions = document.querySelectorAll(".question");

reloadBtn.addEventListener("click", () => {
    window.location.reload(true);
});

form.addEventListener("submit", event => {
    event.preventDefault();
    
    let score = 0;
    const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value, form.q5.value];

    userAnswers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
            score += 1; 
            questions[index].classList.add("correct");
        } else {
            questions[index].classList.add("incorrect");
        }
    });
    
    scrollTo(0,0);
    result.querySelector("p").textContent = `Score: ${score}/${correctAnswers.length}`;
    result.classList.remove("hidden");
});