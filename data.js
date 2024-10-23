const daysOfWeek = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 
                'Friday', 'Saturday'];

const months = ['January','February','March','April','May',
                'June','July','August','September', 'October', 
                'November', 'December'];

function daysInMonth(month,year){
    const daysInMonths = [31, (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) ? 29 : 28  ,
        31,30,31,30,31,31,30,31,30,31]
    return daysInMonths[month-1];
}

const schedule = {
    type: 'week',
    startDay: 0,
    endDay: 6,
    startTime: 900,
    endTime: 2300,
    timeCellStep: 60,
}

let timeSlot = [];

function generateTimeSlot(timeCellstep,startTime,endTime){
    let addAmount;
    let val = startTime;
    if(timeCellstep === 60){
        addAmount = 100;
    }
    while(val<=endTime){
        let str = (''+val);
        let splitNum = str.length === 3 ? 1 : 2;
        let first = str.substring(0,splitNum)
        let second = str.substring(splitNum);

        timeSlot.push(first + ":"+ second);
         val += 100;
        
    }
}

generateTimeSlot(schedule.timeCellStep,schedule.startTime,schedule.endTime);

function getDatesOfWeek(date) {
    const currentDayIndex = date.getDay();
    const weekDates = [];
  
    // Calculate the date of the first day of the week (Sunday)
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - currentDayIndex); 
    // Generate dates for the entire week
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(firstDayOfWeek);
      currentDate.setDate(firstDayOfWeek.getDate() + i);
  
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'numeric',
        day: 'numeric'
      });
      weekDates.push(formattedDate.replace(",",""));
    }
    return weekDates;
  }
  const today = new Date();
  const weekDates = getDatesOfWeek(today);

  function firstLastDate(){
    const firstDateOfWeek = weekDates[0].split(" ")[1].split("/");
    const lastDateOfWeek = weekDates[weekDates.length-1].split(" ")[1].split("/");
    const firstDay = months[parseInt(firstDateOfWeek[0])-1].substring(0,3) + " " + firstDateOfWeek[1];
    const lastDay = months[parseInt(lastDateOfWeek[0])-1].substring(0,3) + " " + lastDateOfWeek[1];
    return firstDay + " - " + lastDay;
 }
 const firstAndLastDate = firstLastDate();

const events = [
    {
        date: '10/20/2024',
        startTime: '10am', 
        endTime: '12pm',
        event: 'August Batch: Deep Learning Online class by Syed@10:00 AM'
    },
    
];

// function isLeapYear(year){
//     if( ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
//         // it is a leap year
//         return 29;
//     }
//     else {
//         // it is not a leap year
//         return 28;
//     }
// }



export {daysOfWeek, months, daysInMonth, schedule, timeSlot, 
    weekDates, firstAndLastDate, events};