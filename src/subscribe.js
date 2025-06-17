document.addEventListener('DOMContentLoaded', function() {
    const subscribeEmailInput = document.getElementById('subscribeEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const subscribeMessageDiv = document.getElementById('subscribeMessage');

    // Función para validar el formato del email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Función para mostrar mensajes de Bootstrap (éxito/error)
    function showSubscriptionMessage(type, message) {
        subscribeMessageDiv.style.display = 'block';
        subscribeMessageDiv.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        // Ocultar el mensaje después de unos segundos
        setTimeout(() => {
            const currentAlert = subscribeMessageDiv.querySelector('.alert');
            if (currentAlert) {
                currentAlert.classList.remove('show');
                setTimeout(() => {
                    subscribeMessageDiv.style.display = 'none';
                    subscribeMessageDiv.innerHTML = '';
                }, 200);
            }
        }, 5000); // 5 segundos
    }

    subscribeBtn.addEventListener('click', function() {
        const email = subscribeEmailInput.value.trim();

        // Limpiar estilos de validación previos
        subscribeEmailInput.classList.remove('is-invalid', 'is-valid');
        subscribeMessageDiv.style.display = 'none';
        subscribeMessageDiv.innerHTML = ''; // Limpiar mensaje previo

        if (email === '') {
            subscribeEmailInput.classList.add('is-invalid');
            showSubscriptionMessage('danger', 'Por favor, introduce tu correo electrónico.');
        } else if (!isValidEmail(email)) {
            subscribeEmailInput.classList.add('is-invalid');
            showSubscriptionMessage('danger', 'Por favor, introduce un formato de correo electrónico válido.');
        } else {
            console.log(`Email '${email}' suscrito al calendario.`);
            subscribeEmailInput.classList.add('is-valid');
            showSubscriptionMessage('success', `¡Gracias por suscribirte! Te avisaremos al email <strong>${email}</strong> sobre las próximas ferias.`);
            subscribeEmailInput.value = ''; // Limpiar el campo de email
            subscribeEmailInput.classList.remove('is-valid'); // Quitar el estilo verde después de limpiar
        }
    });
});