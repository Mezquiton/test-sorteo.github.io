document.addEventListener("DOMContentLoaded", function() {
    const gridItems = document.querySelectorAll('.grid-item');
    const unlockInput = document.getElementById('unlock-input');
    const unlockButton = document.getElementById('unlock-button');
    const unlockErrorMessage = document.getElementById('unlock-error-message');

    let unlocked = false; // Variable para controlar si se ha desbloqueado con éxito

    unlockButton.addEventListener('click', function() {
        const password = unlockInput.value.trim();
        if (password === 'Gabriel feo') {
            unlockErrorMessage.style.display = 'none'; // Oculta el mensaje de error
            unlocked = true; // Marca el desbloqueo como exitoso
            unlockInput.disabled = true; // Deshabilita el campo de contraseña después del desbloqueo
            unlockButton.disabled = true; // Deshabilita el botón después del desbloqueo
        } else {
            unlockErrorMessage.style.display = 'block'; // Muestra el mensaje de error
            unlocked = false; // Marca el desbloqueo como fallido
        }
    });

    gridItems.forEach(gridItem => {
        const index = gridItem.dataset.index;
        const isSelected = getCookie(`gridItem-${index}`);
        if (isSelected === 'selected') {
            gridItem.classList.add('selected');
            gridItem.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            gridItem.style.color = '#fff';
        }

        gridItem.addEventListener('click', function() {
            if (unlocked) {
                if (gridItem.classList.contains('selected')) {
                    gridItem.classList.remove('selected');
                    setCookie(`gridItem-${index}`, '', -1); // Elimina la cookie
                    gridItem.style.backgroundColor = '';
                    gridItem.style.color = '';
                } else {
                    gridItem.classList.add('selected');
                    setCookie(`gridItem-${index}`, 'selected', 365); // Establece la cookie por un año
                    gridItem.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                    gridItem.style.color = '#fff';
                }
            } else {
                if (!gridItem.classList.contains('selected')) {
                    gridItem.classList.add('selected');
                    setCookie(`gridItem-${index}`, 'selected', 365); // Establece la cookie por un año
                    gridItem.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                    gridItem.style.color = '#fff';
                }
            }
        });
    });

    // Función para establecer una cookie
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
    }

    // Función para obtener el valor de una cookie
    function getCookie(name) {
        const cookieArr = document.cookie.split(';');
        for (let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split('=');
            if (name === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }
});
