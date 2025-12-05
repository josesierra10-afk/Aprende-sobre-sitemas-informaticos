document.addEventListener('DOMContentLoaded', (event) => {
    const techItems = document.querySelectorAll('.tech-item');
    const categoryZones = document.querySelectorAll('.category-zone');
    let draggedTechItem = null;

    techItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            draggedTechItem = item;
            e.dataTransfer.setData('text/plain', item.id);
            setTimeout(() => {
                item.style.opacity = '0.4';
            }, 0);
        });

        item.addEventListener('dragend', () => {
            if (draggedTechItem) {
                draggedTechItem.style.opacity = '1';
                draggedTechItem = null;
            }
        });
    });

    categoryZones.forEach(zone => {
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

            if (draggedTechItem && !zone.contains(draggedTechItem)) {
                // Optional: prevent multiple items in one zone or move existing
                // For simplicity, this version allows multiple drops.
                zone.appendChild(draggedTechItem);
            }
        });
    });
});

function checkClassifier() {
    let score = 0;
    const feedbackDiv = document.getElementById('classifier-feedback');
    feedbackDiv.innerHTML = '';
    const totalItems = document.querySelectorAll('.tech-item').length;

    document.querySelectorAll('.tech-item').forEach(item => {
        const parentZoneId = item.parentElement.id; // e.g., "zone-salud"
        const correctCategory = item.dataset.category; // e.g., "salud"

        item.classList.remove('correct', 'incorrect'); // Clear previous feedback

        if (`zone-${correctCategory}` === parentZoneId) {
            item.classList.add('correct');
            score++;
        } else {
            item.classList.add('incorrect');
        }
    });

    if (score === totalItems) {
        feedbackDiv.textContent = "¡Magnífico! Has clasificado todas las tecnologías correctamente.";
        feedbackDiv.className = 'feedback correct';
    } else {
        feedbackDiv.textContent = `Has acertado ${score} de ${totalItems} clasificaciones. Revisa los elementos marcados en rojo.`;
        feedbackDiv.className = 'feedback incorrect';
    }
}

function resetClassifier() {
    const techItemsPool = document.querySelector('.tech-items-pool');
    const techItems = document.querySelectorAll('.tech-item');
    const feedbackDiv = document.getElementById('classifier-feedback');

    techItems.forEach(item => {
        item.classList.remove('correct', 'incorrect');
        item.style.opacity = '1';
        techItemsPool.appendChild(item); // Move all items back to the initial pool
    });

    feedbackDiv.textContent = '';
    feedbackDiv.className = 'feedback';
    document.querySelectorAll('.category-zone').forEach(zone => {
        zone.classList.remove('hover'); // Remove any lingering hover states
    });
}