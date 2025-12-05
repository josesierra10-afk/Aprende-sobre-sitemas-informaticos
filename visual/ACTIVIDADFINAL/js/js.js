const allQuestions = [
    // Unidad 1: Sistemas Tecnológicos
    {
        question: "¿Qué son los sistemas tecnológicos y cuál es su principal objetivo?",
        answer: "Los sistemas tecnológicos son conjuntos de elementos organizados que interactúan para cumplir un objetivo, transformando insumos en productos o servicios.",
        unit: 1
    },
    {
        question: "¿Menciona dos características principales de un sistema tecnológico.",
        answer: "Dos características son: interacción entre componentes y transformación de insumos en productos o servicios. También puede ser el cumplimiento de una función/necesidad o la retroalimentación.",
        unit: 1
    },
    {
        question: "¿Cuáles son los cuatro componentes básicos de un sistema tecnológico?",
        answer: "Los componentes son: entrada, proceso, salida y retroalimentación (o control).",
        unit: 1
    },
    {
        question: "¿Cuál es la función de la 'retroalimentación' en un sistema tecnológico?",
        answer: "La retroalimentación es la información que permite corregir, regular o mejorar el funcionamiento del sistema.",
        unit: 1
    },
    // Unidad 2: Evolución y Tendencias
    {
        question: "¿Qué impacto tuvo la invención de la imprenta de Gutenberg en la sociedad?",
        answer: "Permitió la producción masiva de libros, democratizando el acceso al conocimiento y acelerando la difusión de ideas.",
        unit: 2
    },
    {
        question: "¿Qué tecnología emergente se enfoca en la conexión de objetos cotidianos a internet para intercambiar datos?",
        answer: "El Internet de las Cosas (IoT).",
        unit: 2
    },
    {
        question: "¿Menciona una aplicación de la Inteligencia Artificial en la vida diaria.",
        answer: "Asistentes virtuales (Alexa, Siri, Google Assistant), reconocimiento facial, sistemas de recomendación (Netflix, Spotify), vehículos autónomos, etc.",
        unit: 2
    },
    {
        question: "¿Para qué se utiliza la tecnología Blockchain más allá de las criptomonedas?",
        answer: "Para asegurar transacciones, gestionar cadenas de suministro, verificar identidad digital o como base para contratos inteligentes (smart contracts).",
        unit: 2
    },
    {
        question: "¿Qué permite la Impresión 3D en la fabricación de productos?",
        answer: "Permite crear objetos tridimensionales a partir de un diseño digital, con producción personalizada, rápida y eficiente de prototipos o piezas complejas.",
        unit: 2
    },
    // Unidad 3: Impacto y Futuro
    {
        question: "¿Menciona un beneficio clave de los sistemas tecnológicos en la educación.",
        answer: "Acceso a educación accesible y personalizada, recursos de aprendizaje globales, plataformas de e-learning, etc.",
        unit: 3
    },
    {
        question: "¿Cuál es uno de los principales desafíos o riesgos asociados a la dependencia tecnológica?",
        answer: "Adicción a dispositivos, impacto en la salud mental (ansiedad, depresión), aislamiento social, etc.",
        unit: 3
    },
    {
        question: "¿Qué significa la 'brecha digital' como desafío tecnológico?",
        answer: "Se refiere a la desigualdad en el acceso, uso y apropiación de las tecnologías de la información y comunicación entre diferentes grupos de personas o regiones.",
        unit: 3
    },
    {
        question: "¿Qué es la 'prospectiva tecnológica'?",
        answer: "Es el estudio sistemático de posibles futuros de la tecnología, para anticipar tendencias y prepararse para los cambios venideros.",
        unit: 3
    },
    {
        question: "¿Cómo contribuye la 'tecnología verde' al medio ambiente?",
        answer: "Desarrollando energías limpias, sistemas de gestión de residuos eficientes, vehículos eléctricos o edificios inteligentes que reducen el impacto ambiental.",
        unit: 3
    }
];

let currentQuestionIndex = -1; // To store the index of the current question displayed

function generateQuestion() {
    const questionTextElement = document.getElementById('challenge-question-text');
    const userAnswerTextarea = document.getElementById('user-answer');
    const checkButton = document.getElementById('check-btn');
    const feedbackDiv = document.getElementById('challenge-feedback');
    const correctAnswerDisplay = document.getElementById('challenge-correct-answer');
    const resetButton = document.querySelector('.reset-button');

    // Clear previous states
    userAnswerTextarea.value = '';
    feedbackDiv.innerHTML = '';
    feedbackDiv.className = 'feedback';
    correctAnswerDisplay.style.display = 'none';
    resetButton.style.display = 'none';
    checkButton.disabled = false; // Enable check button for new question
    userAnswerTextarea.disabled = false; // Enable textarea

    // Get a random question index
    currentQuestionIndex = Math.floor(Math.random() * allQuestions.length);
    const questionData = allQuestions[currentQuestionIndex];

    questionTextElement.textContent = `[Unidad ${questionData.unit}] ${questionData.question}`;
}

function checkAnswer() {
    const userAnswerTextarea = document.getElementById('user-answer');
    const feedbackDiv = document.getElementById('challenge-feedback');
    const correctAnswerDisplay = document.getElementById('challenge-correct-answer');
    const checkButton = document.getElementById('check-btn');
    const resetButton = document.querySelector('.reset-button');

    if (currentQuestionIndex === -1) {
        feedbackDiv.textContent = "Por favor, genera una pregunta primero.";
        feedbackDiv.className = 'feedback incorrect';
        return;
    }

    const userAnswer = userAnswerTextarea.value.trim().toLowerCase();
    const correctAnswer = allQuestions[currentQuestionIndex].answer.toLowerCase();

    // Simple comparison for now, could be improved with keyword matching or AI
    if (userAnswer.length === 0) {
        feedbackDiv.textContent = "Por favor, escribe una respuesta antes de verificar.";
        feedbackDiv.className = 'feedback incorrect';
    } else if (userAnswer.includes(correctAnswer) || correctAnswer.includes(userAnswer)) { // Basic keyword check
        feedbackDiv.textContent = "¡Respuesta muy buena! Sigue así.";
        feedbackDiv.className = 'feedback correct';
    } else {
        feedbackDiv.textContent = "Tu respuesta no es exactamente la esperada. Revisa el contenido.";
        feedbackDiv.className = 'feedback incorrect';
    }

    correctAnswerDisplay.textContent = `Respuesta esperada: ${allQuestions[currentQuestionIndex].answer}`;
    correctAnswerDisplay.style.display = 'block';
    checkButton.disabled = true; // Disable check button after checking
    userAnswerTextarea.disabled = true; // Disable textarea after checking
    resetButton.style.display = 'block'; // Show reset button
}

function resetChallenge() {
    generateQuestion(); // Generate a new question to effectively "reset"
}

// Initial state
document.addEventListener('DOMContentLoaded', generateQuestion); // Generate a question on load