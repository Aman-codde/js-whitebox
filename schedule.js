import {daysOfWeek, months, daysInMonth, schedule,timeSlot, weekDates, firstAndLastDate} from './data.js';
let calendar_div = document.getElementById('calendar');
const dateSpan = document.getElementById('date');

const todayDate = new Date();
const currentMonth = todayDate.getMonth();
const currentYear = todayDate.getFullYear();
const currentDay = todayDate.getDay();
// console.log(days[currentDay]);

// display month,date,year
console.log(months[currentMonth],currentYear,currentDay);


dateSpan.textContent = firstAndLastDate +", "+ currentYear;

function convertTo12Hours(time){
    let v ;
    let t = time.length === 4 ? time.substring(0,1) : time.substring(0,2);
    if(t > 12){
       t = t - 12
       v = 'pm'
    }
    else if(t == 12){
        v = 'pm'
    }
    else {
        v = 'am'
    }
    return t+v;
}

// create dynamic table
function generateTable(){
    const tbl = document.createElement('table');
    //style
    tbl.classList.add('tbl');
    
    let timeSlots = timeSlot;
    
    console.log("times:",timeSlots)
    //create week days as table headings 
    for(let i=0; i<timeSlots.length; i++){        
        const row = document.createElement('tr');
        if(i===0){
            const tblHead = document.createElement('thead');
            tbl.appendChild(tblHead);
            tblHead.appendChild(row);
        }
        
        for(let j=schedule.startDay; j<=schedule.endDay+1; j++){
            if(i === 0){
                const th = document.createElement('th');
                if(j==0){
                    th.textContent = "";
                }
                else 
                    th.textContent = weekDates[j-1];
                th.classList.add('th');
                row.appendChild(th);
            }
            else {
                const col = document.createElement('td');
                if(j ===0){
                    col.textContent = convertTo12Hours(timeSlots[i-1]);
                }
                else {
                    col.textContent = '';
                }
                col.classList.add('col');
                row.appendChild(col);
            }
            tbl.appendChild(row);
        }    
    }
    calendar_div.appendChild(tbl);
}

generateTable();