const RU = {
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ],
  daysOfWeekFull: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  daysOfWeekShort: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
};

function renderMonthView(monthOffset, onlyCurMonth = true) {
  
  const calendarData = calcCalendarData(monthOffset, { weekStartsOn: START_DAY.MON });

  const table = document.createElement('table');
  table.classList.add('month-table');
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody');
  table.appendChild(tableHead);
  table.appendChild(tableBody);

  const monthTitle_th = document.createElement('th');
  monthTitle_th.setAttribute('colspan', 7);
  monthTitle_th.appendChild(
    document.createTextNode(`${RU.months[calendarData.month]} ${calendarData.year}`)
  )
  const monthTitle_tr = document.createElement('tr');
  monthTitle_tr.appendChild(monthTitle_th);
  tableHead.appendChild(monthTitle_tr);

  const daysOfWeek = RU.daysOfWeekShort.map(dofw => {
    const th = document.createElement('th');
    th.appendChild(document.createTextNode(dofw));
    return th
  });

  const weekDaysTitle_tr = document.createElement('tr');
  weekDaysTitle_tr.classList.add('week-days-title');
  for (const dofwEl of daysOfWeek) {
    weekDaysTitle_tr.appendChild(dofwEl);
  }
  tableHead.appendChild(weekDaysTitle_tr);

  let hasCurrentDay = false;
  for (const rowData of calendarData.data) {
    const days_tr = document.createElement('tr');
    for (const cellData of rowData) {
      let dayClass = cellData.curDay ? 'current-day' : '';
      if (cellData.curDay) {
        hasCurrentDay = true
      }
      const td = document.createElement('td');
      if (dayClass) {
        td.classList.add(dayClass);
      }
      if (cellData.curMonth) {
        td.classList.add('current-month-day');
      } else if (cellData.nextMonth) {
        td.classList.add('next-month-day');
      } else if (cellData.prevMonth) {
        td.classList.add('previous-month-day');
      }
      if (onlyCurMonth && cellData.curMonth) {
        td.appendChild(document.createTextNode(cellData.day));
      } else {
        td.appendChild(document.createTextNode(cellData.day));
      }
      days_tr.appendChild(td);
    }
    tableBody.appendChild(days_tr);
  }

  if (hasCurrentDay) {
    table.classList.add('current-month')
  }

  return table
}

document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.getElementById('app');
  if (appElement) {
    const prev3MonthView = renderMonthView(-3);
    const prev2MonthView = renderMonthView(-2);
    const prev1MonthView = renderMonthView(-1);
    const curMonthView = renderMonthView();
    const next1MonthView = renderMonthView(1);
    const next2MonthView = renderMonthView(2);
    const next3MonthView = renderMonthView(3);
    appElement.appendChild(prev3MonthView);
    appElement.appendChild(prev2MonthView);
    appElement.appendChild(prev1MonthView);
    appElement.appendChild(curMonthView);
    appElement.appendChild(next1MonthView);
    appElement.appendChild(next2MonthView);
    appElement.appendChild(next3MonthView);
  } else {
    throw new Error('Application root element not found!')
  }
})