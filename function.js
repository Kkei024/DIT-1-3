let date = new Date();
let currTimeH = date.getHours();
let currTimeM = date.getMinutes();


function time() {
    date = new Date();
    currTimeH = date.getHours();
    currTimeM = date.getMinutes();
    console.log("refreshed")
    subjProg();
} setInterval(time, 60000);

let startTimesH = [
    //sun
    '08', 12, 13,
    //mon
    16, 18, 19,
    //wed
    '07', 10, 11,
    //thu
    '09', 12, 13, 16, 17,
    //fri
    13, 16, 18,
    //sat
    '07', '09', 10,
]

let startTimesM = [
    //sun
    '00', '00', '00',
    //mon
    30, 30, '00',
    //wed
    30, 30, '00',
    //thu
    30, '00', 30, 30, '00',
    //fri
    '00', '00', '00',
    //sat
    30, 30, '00',
]

let endTimesH = [
    //sun
    12, 13, 18,
    //mon
    18, 19, 21, 
    //wed
    10, 11, 14,
    //thu
    12, 13, 16, 17, 19,
    //fri
    16, 18, 21,
    //sat
    '09', 10, 12,
]

let endTimesM = [
    //sun
    '00', '00', '00',
    //mon
    30, '00', '00',
    //wed
    30, '00', '00',
    //thu
    '00', 30, 30, '00', 30,
    //fri
    '00', '00', '00',
    //sat
    30, '00', '00',
]

let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
]

let day;
function viewSched(view) {
    switch(view) {
        case 0:
            day = "Sun";
            break;
        
        case 1:
            day = "Mon";
            break;
        
        case 2:
            day = "Tue";
            break;
        
        case 3:
            day = "Wed";
            break;
        
        case 4:
            day = "Thu";
            break;
        
        case 5:
            day = "Fri";
            break;
        
        case 6:
            day = "Sat";
            break;
    }
} viewSched(date.getDay());

console.log(day);

document.querySelectorAll(".daysSelect *").forEach((element, index) => {
    element.addEventListener("click", () => {
        viewSched(index);
        console.log("clicked");
        console.log(day);
        showSched();
    })
})

function showSched() {
    if (document.querySelector(".daysSelect .active") !== null) {
        document.querySelector(".daysSelect .active").classList.remove("active")
    }

    document.querySelector(`.daysSelect .${day}`).classList.add("active");

    document.querySelectorAll(`.sched:not(.${day})`).forEach((element) => {
        element.style.display = "none"
    })

    document.querySelectorAll(`.sched.${day}`).forEach((element) => {
        element.style.display = "block"
    })
} showSched()

document.querySelectorAll('h4').forEach((element, index) => {
    element.innerText = `${startTimesH[index]}:${startTimesM[index]} - ${endTimesH[index]}:${endTimesM[index]}`
})



function subjProg() {
    let subjects = document.querySelectorAll('.subj');
    console.log(day)

    subjects.forEach((element, i) => {
        let tempStr = element.classList[0];

        let subjTimer = currTimeH * 60 + currTimeM;
        let subjStart = Number(startTimesH[i]) * 60 + Number(startTimesM[i]);
        let subjEnd = Number(endTimesH[i]) * 60 + Number(endTimesM[i]);

        let perc = (subjTimer - subjStart) / (subjEnd - subjStart) * 100

        //console.log(tempStr, subjStart/60, subjEnd/60, perc);
        let parentsDay = element.parentElement.parentElement.classList[0];

        if(parentsDay == day) {
            element.querySelector('.right').style.backgroundImage = `linear-gradient(90deg,
            var(--${tempStr}BG) 0%,
            var(--${tempStr}BG) ${perc}%,
            white ${perc}%,
            white 100%
            )`
        } else if (days.indexOf(parentsDay) < days.indexOf(day)) {
            element.querySelector('.right').style.backgroundColor = `var(--${tempStr}BG)`
            console.log(tempStr)
        }


    })
} subjProg()