document.addEventListener('DOMContentLoaded', (event) => {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    let draggedItem = null;

    dragItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedItem = item;
            e.dataTransfer.setData('text/plain', item.id); // Set data for drag operation
            setTimeout(() => {
                item.style.opacity = '0.5'; // Make the dragged item semi-transparent
            }, 0);
        });

        item.addEventListener('dragend', () => {
            if (draggedItem) {
                draggedItem.style.opacity = '1'; // Reset opacity
                draggedItem = null;
            }
        });
    });

    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
            zone.classList.add('hover'); // Add hover effect
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('hover'); // Remove hover effect
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('hover'); // Remove hover effect

            if (draggedItem && !zone.contains(draggedItem)) { // Ensure item is not already in zone
                zone.appendChild(draggedItem);
            }
        });
    });
});

function checkActivity() {
    let score = 0;
    const totalItems = document.querySelectorAll('.drag-item').length;
    const feedbackDiv = document.getElementById('activity-feedback');
    feedbackDiv.innerHTML = ''; // Clear previous feedback

    document.querySelectorAll('.drag-item').forEach(item => {
        const parentZoneId = item.parentElement.id;
        const correctTargetId = `drop-${item.dataset.target}`;

        item.classList.remove('correct', 'incorrect'); // Clear previous visual feedback

        if (parentZoneId === correctTargetId) {
            item.classList.add('correct');
            score++;
        } else {
            item.classList.add('incorrect');
        }
    });

    if (score === totalItems) {
        feedbackDiv.textContent = "¡Felicidades! Todas las relaciones son correctas.";
        feedbackDiv.className = 'feedback correct';
    } else {
        feedbackDiv.textContent = `Has acertado ${score} de ${totalItems} relaciones. Revisa los elementos marcados en rojo.`;
        feedbackDiv.className = 'feedback incorrect';
    }
}

function resetActivity() {
    const dragItemsContainer = document.querySelector('.drag-items-container');
    const dragItems = document.querySelectorAll('.drag-item');
    const feedbackDiv = document.getElementById('activity-feedback');

    dragItems.forEach(item => {
        item.classList.remove('correct', 'incorrect');
        item.style.opacity = '1';
        dragItemsContainer.appendChild(item); // Move items back to the initial container
    });

    feedbackDiv.textContent = '';
    feedbackDiv.className = 'feedback';
}