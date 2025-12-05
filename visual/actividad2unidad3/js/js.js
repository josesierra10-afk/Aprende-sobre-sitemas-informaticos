document.addEventListener('DOMContentLoaded', (event) => {
    const argumentCards = document.querySelectorAll('.argument-card');
    const dropZones = document.querySelectorAll('.drop-zone');
    let draggedArgument = null;

    argumentCards.forEach(card => {
        card.addEventListener('dragstart', (e) => {
            draggedArgument = card;
            e.dataTransfer.setData('text/plain', card.id);
            setTimeout(() => {
                card.style.opacity = '0.4';
            }, 0);
        });

        card.addEventListener('dragend', () => {
            if (draggedArgument) {
                draggedArgument.style.opacity = '1';
                draggedArgument = null;
            }
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
            zone.classList.add('hover');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('hover');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('hover');

            if (draggedArgument) {
                // Check if the drop zone already contains the dragged item to prevent re-dropping
                if (!zone.contains(draggedArgument)) {
                    zone.appendChild(draggedArgument);
                }
            }
        });
    });
});

function checkDebate() {
    let score = 0;
    const feedbackDiv = document.getElementById('debate-feedback');
    feedbackDiv.innerHTML = '';
    const totalArguments = document.querySelectorAll('.argument-card').length;

    document.querySelectorAll('.argument-card').forEach(card => {
        const parentZoneId = card.parentElement.id; // e.g., "zone-beneficios"
        const correctType = card.dataset.type; // e.g., "beneficio"

        card.classList.remove('correct', 'incorrect'); // Clear previous feedback

        if (`zone-${correctType}` === parentZoneId) {
            card.classList.add('correct');
            score++;
        } else {
            card.classList.add('incorrect');
        }
    });

    if (score === totalArguments) {
        feedbackDiv.textContent = "¡Asombroso! Todos los argumentos están clasificados correctamente.";
        feedbackDiv.className = 'feedback correct';
    } else {
        feedbackDiv.textContent = `Has clasificado ${score} de ${totalArguments} argumentos correctamente. Revisa los que están en rojo.`;
        feedbackDiv.className = 'feedback incorrect';
    }
}

function resetDebate() {
    const argumentPool = document.querySelector('.argument-pool');
    const argumentCards = document.querySelectorAll('.argument-card');
    const feedbackDiv = document.getElementById('debate-feedback');

    argumentCards.forEach(card => {
        card.classList.remove('correct', 'incorrect');
        card.style.opacity = '1';
        argumentPool.appendChild(card); // Move all cards back to the initial pool
    });

    feedbackDiv.textContent = '';
    feedbackDiv.className = 'feedback';
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.classList.remove('hover'); // Remove any lingering hover states
    });
}