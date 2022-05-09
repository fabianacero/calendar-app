import { debug } from "webpack";

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
        return  [
            {"name": "8:00", "value": "8:00"},
            {"name": "9:00", "value": "9:00"},
            {"name": "10:00", "value": "10:00"},
            {"name": "11:00", "value": "11:00"},
        ];
    }

    static getDays = () => {
        return  [
            {"name": "1", "value": "1"},
            {"name": "2", "value": "2"},
            {"name": "3", "value": "3"},
            {"name": "4", "value": "4"},
        ];
    }

    static getCities = () => {
        return  [
            {"name": "Bogota", "value": "Bogota"},
            {"name": "Rio", "value": "Rio"},
            {"name": "New York", "value": "New York"},
            {"name": "Miami", "value": "Miami"},
        ];
    }
}

export default Utilities;