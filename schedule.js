import {getDatesOfWeek, schedule,timeSlot, weekDates, firstAndLastDate, events, formatDate, colorBook} from './data.js';
let calendar_div = document.getElementById('calendar');
const dateSpan = document.getElementById('date');
const prevBtn = document.getElementById('round-border-left');
const nextBtn = document.getElementById('round-border-right');

const todayDate = new Date();
const currentYear = todayDate.getFullYear();

// display month,date,year
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

let weekDatesList = weekDates;

prevBtn.addEventListener('click', () => {
    weekDatesList = getDatesOfWeek(-1)

    console.log('...prev clicked',weekDatesList)
    generateTable(weekDatesList);
})

nextBtn.addEventListener('click', () => {
    weekDatesList = getDatesOfWeek(1)
    console.log('...next clicked',weekDatesList)
    generateTable(weekDatesList);
})
// create dynamic table
function generateTable(weekDatesList){
    console.log(weekDatesList,"./././ inside generate list")
    const tbl = document.createElement('table');
    //style
    tbl.classList.add('tbl');
    //create week days as table headings 
    for(let i=0; i<timeSlot.length; i++){        
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
                    th.textContent = weekDatesList[j-1];
                    th.classList.add('th');
                    row.appendChild(th);
            }
            else {
                const col = document.createElement('td');
                if(j ===0){
                    col.textContent = convertTo12Hours(timeSlot[i-1]);
                }
                else {
                    for(let k=0; k<events.length; k++){
                        if(events[k].startTime === timeSlot[i-1] && weekDatesList[j-1] === formatDate(events[k].date)){
                            let rowSpanNum = (parseInt(events[k].endTime)-parseInt(events[k].startTime));
                            if(rowSpanNum > 1){
                                col.rowSpan = rowSpanNum;
                            }
                            let color = colorBook();
                            col.style.backgroundColor = '#' + color;
                            col.innerHTML = events[k].startTime + "-" + events[k].endTime + "<br />" + events[k].event;
                        }
                    }
                    // col.textContent = '';
                }
                col.classList.add('col');
                row.appendChild(col);
            }
            tbl.appendChild(row);
        }    
    }
    calendar_div.appendChild(tbl);
}
document.addEventListener('DOMContentLoaded',() => generateTable(weekDatesList));

// generateTable(weekDatesList);