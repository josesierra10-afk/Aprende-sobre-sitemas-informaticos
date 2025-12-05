const correctAnswersQuiz = {
    q1: "c",
    q2: "b",
    q3: "b",
    q4: "b"
};

function checkQuiz() {
    let score = 0;
    const quizSummaryFeedback = document.getElementById('quiz-summary-feedback');
    quizSummaryFeedback.innerHTML = '';
    const totalQuestions = Object.keys(correctAnswersQuiz).length;

    for (const questionId in correctAnswersQuiz) {
        const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
        const feedbackDiv = document.getElementById(`feedback-${questionId}`);
        feedbackDiv.innerHTML = '';

        if (selectedOption) {
            if (selectedOption.value === correctAnswersQuiz[questionId]) {
                feedbackDiv.textContent = "¡Correcto!";
                feedbackDiv.className = 'feedback-q correct';
                score++;
            } else {
                feedbackDiv.textContent = `Incorrecto. La respuesta correcta es "${correctAnswersQuiz[questionId].toUpperCase()}".`;
                feedbackDiv.className = 'feedback-q incorrect';
            }
            // Disable all radio buttons for this question
            document.querySelectorAll(`input[name="${questionId}"]`).forEach(radio => {
                radio.disabled = true;
            });
        } else {
            feedbackDiv.textContent = "Por favor, selecciona una opción.";
            feedbackDiv.className = 'feedback-q incorrect';
        }
    }

    if (score === totalQuestions) {
        quizSummaryFeedback.textContent = `¡Felicidades! Has respondido correctamente a todas las preguntas (${score}/${totalQuestions}).`;
        quizSummaryFeedback.className = 'feedback correct';
    } else {
        quizSummaryFeedback.textContent = `Has respondido correctamente a ${score} de ${totalQuestions} preguntas.`;
        quizSummaryFeedback.className = 'feedback incorrect';
    }
}

function resetQuiz() {
    const quizSummaryFeedback = document.getElementById('quiz-summary-feedback');

    for (const questionId in correctAnswersQuiz) {
        const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
        const feedbackDiv = document.getElementById(`feedback-${questionId}`);

        if (selectedOption) {
            selectedOption.checked = false; // Uncheck selected option
        }
        feedbackDiv.innerHTML = '';
        feedbackDiv.className = 'feedback-q'; // Reset class

        // Enable all radio buttons for this question
        document.querySelectorAll(`input[name="${questionId}"]`).forEach(radio => {
            radio.disabled = false;
        });
    }
    quizSummaryFeedback.textContent = '';
    quizSummaryFeedback.className = 'feedback';
}