const START_DAY = {
    SUN: 'SUN',
    MON: 'MON',
}

function cloneDate(date) {
    return new Date(date.getTime())
}

function newDate(y, m, d) {
    return new Date(y, m, d)
}

function calcWeekCount(monthFirstDayDate, weekStartsOn) {
    const monthFirstDay = calcMonthFirstDay(monthFirstDayDate, weekStartsOn);
    const lastDayOfMonthDate = new Date(monthFirstDayDate.getFullYear(), monthFirstDayDate.getMonth() + 1, 0);
    const numberOfDaysInMonth = lastDayOfMonthDate.getDate();

    const used = monthFirstDay + numberOfDaysInMonth;

    return Math.ceil(used / 7);
}

function calcMonthFirstDay(weekFirstDayDate, weekStartsOn) {
    return (weekFirstDayDate.getDay() + 7 - weekStartsOn) % 7;
}

function calcWeekFirstDayDate(monthFirstDayDate, weekStartsOn) {
    const weekFirstDayDate = cloneDate(monthFirstDayDate);
    const monthFirstDay = calcMonthFirstDay(weekFirstDayDate, weekStartsOn);
    weekFirstDayDate.setDate(weekFirstDayDate.getDate() - monthFirstDay);
    return weekFirstDayDate
}

function generateDayInMonthView(iterDate, curMonthDate, curDay) {
    const iterMonth = iterDate.getMonth();
    const iterDay = iterDate.getDate();
    const renderMonth = curMonthDate.getMonth();
    let ret = {
        month: iterMonth,
        day: iterDay,
    };
    if (iterMonth < renderMonth) {
        Object.assign(ret, {
            prevMonth: true,
            curMonth: false,
            nextMonth: false,
            curDay: false,
        })
    } else if (iterMonth === renderMonth) {
        Object.assign(ret, {
            prevMonth: false,
            curMonth: true,
            nextMonth: false,
            curDay: curDay && curDay === iterDay,
        })
    } else {
        Object.assign(ret, {
            prevMonth: false,
            curMonth: false,
            nextMonth: true,
            curDay: false,
        })
    }
    return ret
}

function generateWeekInMonthView(inIterDate, curMonthDate, curDay) {
    const iterDate = cloneDate(inIterDate);
    const arrWeek = [];
    for (let i = 0; i < 7; i++) {
        arrWeek.push(generateDayInMonthView(iterDate, curMonthDate, curDay));
        iterDate.setDate(iterDate.getDate() + 1);
    }
    return arrWeek
}

function generateMonthArray(weekFirstDayDate, monthFirstDayDate, curMonthDate, weekStartsOn, curDay) {
    const iterWeekDate = cloneDate(weekFirstDayDate);
    const arrMonth = [];
    const weekCount = calcWeekCount(monthFirstDayDate, weekStartsOn);
    for (let i = 0; i < weekCount; i++) {
        arrMonth.push(generateWeekInMonthView(iterWeekDate, curMonthDate, curDay));
        iterWeekDate.setDate(iterWeekDate.getDate() + 7);
    }
    return arrMonth
}

function generateDayNumber(sd) {
    const dayInNumber = []
    for (let i = 0; i < 7; i++) {
        dayInNumber.push((sd + i) % 7)
    }
    return dayInNumber
}

function calcCalendarData(monthOffset, config = {}) {
    const curMonthDate = new Date();
    if (typeof monthOffset === 'number') {
        curMonthDate.setMonth(curMonthDate.getMonth() + monthOffset);
    }
    const curMonthDay = !monthOffset && curMonthDate.getDate();
    let weekStartsOn = 1;

    switch (config.weekStartsOn) {
        case START_DAY.SUN:
            weekStartsOn = 0;
            break;
        case START_DAY.MON:
            weekStartsOn = 1;
            break;
    }

    const monthFirstDayDate = new Date(curMonthDate.getFullYear(), curMonthDate.getMonth(), 1);
    const weekFirstDayDate = calcWeekFirstDayDate(monthFirstDayDate, weekStartsOn);
    return {
        data: generateMonthArray(weekFirstDayDate, monthFirstDayDate, curMonthDate, weekStartsOn, curMonthDay),
        month: curMonthDate.getMonth(),
        year: curMonthDate.getFullYear(),
        startDay: weekStartsOn,
        dayNumber: generateDayNumber(weekStartsOn)
    }
}

