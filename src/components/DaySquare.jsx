function getStyleDay(props) {
    const commonStyle = "float-left text-center md:text-2xl sm:text-lg text-xs";
    let dayStyle = 'calendar-day';
    if(!props.day.isCurrentMonth(props.month)) {
        dayStyle = 'calendar-day__disabled';
    } else if(props.day.isWeekend()) {
        dayStyle = 'calendar-day__weekend';
    }
    return `${commonStyle} ${dayStyle}`;
}
export default(props) => {

    return <div class="calendar-container bg-gray-50 box-border h-32">
        <div class={getStyleDay(props)}>
            {props.day.getDate()}
        </div>
    </div>
}