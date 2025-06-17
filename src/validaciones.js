document.addEventListener('DOMContentLoaded', function() {
    const inscriptionForm = document.querySelector('.inscription-form');
    const contactForm = document.querySelector('.contact-form'); // Asumiendo que también tienes un formulario de contacto


    const inscriptionFormMessageDiv = document.getElementById('formMessage');

    // --- Función de Validación Genérica ---
    function validateForm(form, messageDiv) {
        let isValid = true;

        // Limpiar mensajes y clases de validación previas
        if (messageDiv) {
            messageDiv.style.display = 'none';
            messageDiv.innerHTML = '';
        }
        form.querySelectorAll('.is-invalid, .is-valid').forEach(el => {
            el.classList.remove('is-invalid', 'is-valid');
        });

        // Validar campos de texto e email requeridos
        form.querySelectorAll('input[required], textarea[required]').forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else if (input.type === 'email' && !isValidEmail(input.value.trim())) { // Validación de email más robusta
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.add('is-valid');
            }
        });

        // Validar selects requeridos
        form.querySelectorAll('select[required]').forEach(select => {
            // Si el valor es una cadena vacía, significa que la opción "disabled selected" está aún seleccionada
            if (!select.value || select.value === "") {
                select.classList.add('is-invalid');
                isValid = false;
            } else {
                select.classList.add('is-valid');
            }
        });

        // Validar comentarios si fuera requerido (en tu HTML actual no lo es, pero lo dejo por si acaso)
        const comentariosTextarea = form.querySelector('#comentariosTextarea');
        if (comentariosTextarea && comentariosTextarea.hasAttribute('required') && !comentariosTextarea.value.trim()) {
            comentariosTextarea.classList.add('is-invalid');
            isValid = false;
        } else if (comentariosTextarea && comentariosTextarea.hasAttribute('required')) { // Solo añadir is-valid si es requerido y lleno
            comentariosTextarea.classList.add('is-valid');
        }


        return isValid;
    }

    // --- Función para mostrar el mensaje de Bootstrap ---
    function showBootstrapMessage(messageDiv, type, message) {
        if (!messageDiv) return; // Salir si no hay div para mensajes

        messageDiv.style.display = 'block'; // Hace visible el div
        messageDiv.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        // Opcional: Ocultar el mensaje después de unos segundos
        setTimeout(() => {
            const currentAlert = messageDiv.querySelector('.alert');
            if (currentAlert) {
                // Iniciar la animación de desvanecimiento
                currentAlert.classList.remove('show');
                // currentAlert.classList.add('fade'); // 'fade' ya debería estar si es 'alert alert-dismissible fade show'
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                    messageDiv.innerHTML = ''; // Limpia el contenido
                }, 200); // Tiempo para la transición de fade de Bootstrap
            }
        }, 5000); // 5 segundos
    }

    function isValidEmail(email) {
        // Expresión regular básica para validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }



    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir el envío por defecto

            if (validateForm(this, inscriptionFormMessageDiv)) {
                showBootstrapMessage(inscriptionFormMessageDiv, 'success', '¡Inscripción enviada correctamente! Te contactaremos pronto.');
                this.reset(); // Limpiar el formulario

                // Remover clases 'is-valid' después del reset para que no queden marcados
                this.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
                // Asegúrate también de remover 'is-invalid' si algún campo quedó así por alguna razón
                this.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

            } else {
                showBootstrapMessage(inscriptionFormMessageDiv, 'danger', 'Por favor, corrige los errores en el formulario para inscribirte.');
            }
        });
    }


    const contactFormMessageDiv = document.getElementById('contactFormMessage'); // Asumiendo este ID
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (validateForm(this, contactFormMessageDiv)) { // Pasa el div de mensaje para el formulario de contacto
                showBootstrapMessage(contactFormMessageDiv, 'success', '¡Tu mensaje ha sido enviado correctamente! Te responderemos a la brevedad.');
                this.reset();
                this.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
                this.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
            } else {
                showBootstrapMessage(contactFormMessageDiv, 'danger', 'Por favor, revisa los campos marcados y vuelve a intentarlo.');
            }
        });
    }



});