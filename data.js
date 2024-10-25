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

function formatDate(date){
    
    const d = new Date(date);
    const formattedDate = d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'numeric',
        day: 'numeric'
      });
      return formattedDate.replace(',','');
}

function getDatesOfWeek(weekOffset = 0, startDay = 0) {
    const today = new Date();
    const currentDay = today.getDay();
    const daysToStartOfWeek = (currentDay - startDay + 7) % 7;
    const startOfWeek = new Date(today);

    startOfWeek.setDate(today.getDate() - daysToStartOfWeek + weekOffset * 7);

    const weekDates = [];
    // Generate dates for the entire week
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'numeric',
        day: 'numeric'
      });
      weekDates.push(formattedDate.replace(",",""));
    }
    return weekDates;
  }

  const weekDates = getDatesOfWeek(0);

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
        startTime: '10:00', 
        endTime: '12:00',
        event: 'August Batch: Deep Learning Online class by Syed@10:00 AM'
    },
    {
        date: '10/22/2024',
        startTime: '11:00', 
        endTime: '12:00',
        event: 'August Batch: Deep Learning Online class by Ameer@11:00 AM'
    },
    {
        date: '10/25/2024',
        startTime: '13:00', 
        endTime: '15:00',
        event: 'August Batch: Deep Learning Online class by Ameer@11:00 AM'
    },
    
];

function colorBook(){
    const colors = ['c6dbda','fee1e8','fed7c3','f6eac2','ecd5e3'];
    const random = Math.floor(Math.random() * (colors.length-1));
    return colors[random];
}

export {daysOfWeek, months, daysInMonth, schedule, timeSlot, 
    weekDates, firstAndLastDate, events, formatDate, colorBook, getDatesOfWeek};