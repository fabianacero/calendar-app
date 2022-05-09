Date.prototype.isCurrentMonth = function (d) { 
    return d.getMonth() == this.getMonth(); 
}; 

Date.prototype.isWeekend = function () { 
    return [0, 6].includes(this.getDay()); 
}; 

class Utilities {

    static WEEK_DAYS=6;

    static getDaysInMonth = (date) => {
        const curDate = typeof date !== 'undefined' ? date : new Date();
        return new Date(
            curDate.getFullYear(),
            curDate.getMonth() + 1,
            0
          ).getDate();
    };

    static getFirstAndLastDays = (date) => {
        const curDate = typeof date !== 'undefined' ? date : new Date();
        const lastDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth() + 1,
            0
          );
        const firstDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            1
          );
        const realFirstDay = this.getRealFirstDay(firstDay);
        return [realFirstDay, lastDay];
    };

    static getRealFirstDay = (firstDay) => {
        if(firstDay.getDay() > 0) {
            return this.getRealFirstDay(new Date(firstDay.setDate(firstDay.getDate() - 1)));
        }
        return firstDay;
    }

    static getCalendarArray = (date) => {
        const monthLimits = this.getFirstAndLastDays(date);
        return this.getAllWeeks(monthLimits[0], monthLimits[1], []);
    }

    static getAllWeeks = (firstDate, lastDate, calendar) => {
        if(firstDate.getTime() < lastDate.getTime()) {
            const week = this.getWeek(firstDate, []);
            const lastDayOfWeek = new Date(week.slice(-1)[0]);
            const nextDayOfNextWeek = new Date(lastDayOfWeek.setDate(lastDayOfWeek.getDate() +  1));
            calendar.push(week);
            return this.getAllWeeks(nextDayOfNextWeek, lastDate, calendar);
        }
        return calendar;
    }

    static getWeek = (date, week) => {
        week.push(new Date(date));
        if(date.getDay() < this.WEEK_DAYS) {
            return this.getWeek(new Date(date.setDate(date.getDate() +  1)), week);
        }
        return week;
    }

    static getWeekNames = (short = false) => {
        const longNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const shortNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return short ? shortNames : longNames
    }

    static getRemiderColors = () => {
        return  [
            {"name": "blue", "value": "#2a67d1"},
            {"name": "red", "value": "#b52222"},
            {"name": "green", "value": "#3dab35"},
            {"name": "yellow", "value": "#d6bf3a"},
        ];
    }

    static getDayHours = () => {
        const x = 30;
        const ap = ['AM', 'PM'];
        let times = [];
        let tt = 0;

        for (var i=0;tt<24*60; i++) {
            let hh = Math.floor(tt/60);
            let mm = (tt%60);
            let name = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ' ' + ap[Math.floor(hh/12)];
            let value = ("0" + hh ).slice(-2) + ':' + ("0" + mm).slice(-2);
            times[i] = {name, value};
            tt = tt + x;
        }

        return times;
    }

    static getDays = (month) => {
        const date = new Date(month.getFullYear(), month.getMonth(), 1);
        let dates = [];
        let day = new Date();
        while (date.getMonth() === month.getMonth()) {
            day = new Date(date);
            dates.push({"name": day.getDate(), "value": day.getDate()}) 
            date.setDate(date.getDate() + 1);
        }
        return dates;
    }

    static getCities = () => {
        return  [
            {"name": "Bogota", "value": "Bogota"},
            {"name": "Rio", "value": "Rio"},
            {"name": "New York", "value": "New York"},
            {"name": "Miami", "value": "Miami"},
        ];
    }

    static sortRemiders = (reminders) => {
        const baseDate = new Date();
        const baseYear = baseDate.getFullYear();
        let sortedReminders = [...reminders];
        let strStartDate, strEndDate, dtStartDate, dtEndDate = '';
        return sortedReminders.sort(
            (a, b) => {
                strStartDate = `${baseYear} ${a.rem.month}, ${a.rem.day}, ${a.rem.hour}`;
                strEndDate = `${baseYear} ${b.rem.month}, ${b.rem.day}, ${b.rem.hour}`;
                dtStartDate = new Date(strStartDate);
                dtEndDate = new Date(strEndDate);
                if (dtStartDate < dtEndDate) return -1;
                else if(strStartDate > dtEndDate) return  1;
                else return 0;
            });
    }
}

export default Utilities;