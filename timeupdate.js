setInterval(updateTime, 1000);

updateTime();

function updateTime() {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDate();
    let year = date.getFullYear();
    let month = "";
    let monthNumber = date.getMonth() + 1;

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let displayHour = (hour + 11) % 12 + 1;
    let period = hour < 12 ? "AM" : "PM";
    time.innerHTML = displayHour + ":" + minutes + period;
    time1.innerHTML = displayHour + ":" + minutes + period;
    
    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    const weekday = [
        "Sunday", "Monday", "Tuesday", 
        "Wednesday", "Thursday", "Friday", "Saturday"
    ]

    month = months[monthNumber-1];
    dateDisplay.innerHTML = weekday[date.getDay()] + ", " + month + " " + day + ", " + year;
    dateDisplay1.innerHTML = weekday[date.getDay()] + ", " + month + " " + day + ", " + year;
    document.getElementById('wholeDate').innerHTML = weekday[date.getDay()] + ", " + month + " " + day + ", " + year;
    document.getElementById('monthDisplay').innerHTML = month.toUpperCase();

    if (!updateTime.updatedDate) {
        updateCalendar(day, monthNumber-1, year, date.getDay());
        updateTime.updatedDate = true;
    }
}

function checkDayChange() {
    var currentDate = new Date();
    var currentDay = currentDate.getDate();

    if (currentDay !== checkDayChange.previousDay) {
        updateCalendar(day, monthNumber-1, year, date.getDay());
        checkDayChange.previousDay = currentDay;
    }
}

checkDayChange.previousDay = new Date().getDate();

setInterval(checkDayChange, 60000);