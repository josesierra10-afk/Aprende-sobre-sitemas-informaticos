document.addEventListener('DOMContentLoaded', (event) => {
    const eventCards = document.querySelectorAll('.event-card');
    const timelineSlots = document.querySelectorAll('.timeline-slot');
    let draggedEvent = null;

    eventCards.forEach(card => {
        card.addEventListener('dragstart', (e) => {
            draggedEvent = card;
            e.dataTransfer.setData('text/plain', card.id);
            setTimeout(() => {
                card.style.opacity = '0.4';
            }, 0);
        });

        card.addEventListener('dragend', () => {
            if (draggedEvent) {
                draggedEvent.style.opacity = '1';
                draggedEvent = null;
            }
        });
    });

    timelineSlots.forEach(slot => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
            slot.classList.add('hover');
        });

        slot.addEventListener('dragleave', () => {
            slot.classList.remove('hover');
        });

        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            slot.classList.remove('hover');

            if (draggedEvent && !slot.contains(draggedEvent)) {
                // Check if the slot already has an event
                const existingCard = slot.querySelector('.event-card');
                if (existingCard) {
                    // Move existing card back to the events pool
                    document.querySelector('.events-pool').appendChild(existingCard);
                }
                slot.appendChild(draggedEvent);
            }
        });
    });
});

function checkTimeline() {
    let score = 0;
    const feedbackDiv = document.getElementById('timeline-feedback');
    feedbackDiv.innerHTML = '';
    const totalEvents = document.querySelectorAll('.event-card').length;

    document.querySelectorAll('.event-card').forEach(card => {
        const parentSlot = card.parentElement;
        card.classList.remove('correct', 'incorrect'); // Clear previous feedback

        // Get the correct year from data-year attribute
        const cardYear = parseInt(card.dataset.year);
        const slotYearRange = parentSlot.dataset.slotYear; // e.g., "1940s", "1960s"

        let isCorrect = false;

        if (slotYearRange) {
            const rangeStart = parseInt(slotYearRange.replace('s', '')); // e.g., 1940 from "1940s"
            const rangeEnd = rangeStart + 9; // e.g., 1949 for "1940s"

            if (cardYear >= rangeStart && cardYear <= rangeEnd) {
                isCorrect = true;
            } else if (slotYearRange === '1400s' && cardYear >= 1400 && cardYear <= 1499) { // Handle 1400s specifically
                isCorrect = true;
            }
            // Add more specific rules if needed for centuries vs decades
        }

        if (isCorrect) {
            card.classList.add('correct');
            score++;
        } else {
            card.classList.add('incorrect');
        }
    });

    if (score === totalEvents) {
        feedbackDiv.textContent = "¡Excelente! Has organizado la línea de tiempo perfectamente.";
        feedbackDiv.className = 'feedback correct';
    } else {
        feedbackDiv.textContent = `Has acertado ${score} de ${totalEvents} eventos. Revisa los que están en rojo.`;
        feedbackDiv.className = 'feedback incorrect';
    }
}

function resetTimeline() {
    const eventsPool = document.querySelector('.events-pool');
    const eventCards = document.querySelectorAll('.event-card');
    const feedbackDiv = document.getElementById('timeline-feedback');

    eventCards.forEach(card => {
        card.classList.remove('correct', 'incorrect');
        card.style.opacity = '1';
        eventsPool.appendChild(card); // Move all cards back to the initial pool
    });

    feedbackDiv.textContent = '';
    feedbackDiv.className = 'feedback';
    document.querySelectorAll('.timeline-slot').forEach(slot => {
        slot.classList.remove('hover'); // Remove any lingering hover states
    });
}