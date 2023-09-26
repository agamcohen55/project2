document.addEventListener("DOMContentLoaded", () => {
    const calendarEl = document.getElementById("calendar");

    const calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ["dayGrid"],
        events: [
            // כאן אתה יכול להוסיף את האירועים שלך בפורמט מתאים
        ]
    });

    calendar.render();
});
