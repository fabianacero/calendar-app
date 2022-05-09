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
    
    const handler = (data, event) => {
        // By the way this is intentional
        // console.log("Here we will call the reminder form!");
    }

    return <div onClick={[handler, props]} class="calendar-container bg-gray-50 box-border h-32">
        <div class={getStyleDay(props)}>
            {props.day.getDate()}
        </div>
    </div>
}