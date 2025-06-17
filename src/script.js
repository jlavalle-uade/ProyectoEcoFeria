document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar-grid');
    const currentMonthYear = document.getElementById('current-month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date(2025, 5, 1); // Start with June 2025 (Month is 0-indexed)

    // Example event data (you can fetch this from an API or define it elsewhere)
    // Keys are 'YYYY-MM-DD'
    const events = {
        '2025-06-03': 'Taller de Compostaje',
        '2025-06-05': 'Charla de Reciclaje',
        '2025-06-12': 'Feria de Intercambio',
        '2025-06-19': 'Clase de Cocina Saludable',
        '2025-06-26': 'Concierto Eco-Friendly',
        '2025-07-08': 'Taller de Huertas Urbanas',
        '2025-07-15': 'Feria Semanal',
        '2025-07-22': 'Charla de Sustentabilidad',
    };

    function renderCalendar() {
        calendarContainer.innerHTML = ''; // Clear previous calendar
        currentMonthYear.textContent = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' }).toUpperCase();

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Adjust firstDayOfMonth for Monday start (as commonly seen in calendars)
        // If Sunday (0), make it 6 (last day of week). Otherwise, subtract 1.
        const startDayIndex = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

        // Add empty cells for days before the 1st
        for (let i = 0; i < startDayIndex; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-day', 'empty');
            calendarContainer.appendChild(emptyCell);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            dayCell.textContent = day;

            const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            if (events[fullDate]) {
                dayCell.classList.add('has-event');
                dayCell.setAttribute('data-event', events[fullDate]);
                dayCell.setAttribute('title', events[fullDate]); // Tooltip for event
                dayCell.addEventListener('click', function() {
                    alert(`Fecha: ${day}/${month + 1}/${year}\nActividad: ${events[fullDate]}`);
                });
            }

            calendarContainer.appendChild(dayCell);
        }
    }

    // Navigation functions
    prevMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    // Initial render
    renderCalendar();
});
