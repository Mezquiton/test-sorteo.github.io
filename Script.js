document.addEventListener("DOMContentLoaded", function() {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(gridItem => {
        const index = gridItem.dataset.index;
        const isSelected = localStorage.getItem(`gridItem-${index}`);
        if (isSelected === 'selected') {
            gridItem.classList.add('selected');
        }

        // Aplicar estilos de selección
        if (gridItem.classList.contains('selected')) {
            gridItem.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            gridItem.style.color = '#fff';
        }

        gridItem.addEventListener('click', function() {
            gridItem.classList.toggle('selected');
            const index = gridItem.dataset.index;
            const isSelected = gridItem.classList.contains('selected');
            if (isSelected) {
                localStorage.setItem(`gridItem-${index}`, 'selected');
                gridItem.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                gridItem.style.color = '#fff';
            } else {
                localStorage.removeItem(`gridItem-${index}`);
                gridItem.style.backgroundColor = '';
                gridItem.style.color = '';
            }
        });
    });
});
