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
    };

    const canPrintReminder = (reminder) => {
        return (reminder.day == props.day.getDate()) && props.day.isTheSameMonth(parseInt(reminder.month));
    };

    return <div onClick={[handler, props]} class="calendar-container bg-gray-50 box-border h-32">
        <div class={getStyleDay(props)}>
            {props.day.getDate()}
        </div>
        <For each={props.remi}>
            {(reminder) => {
                const { id, rem } = reminder;
                if(canPrintReminder(rem)) {
                    return <div style={{ "background-color": rem.color}} class="reminder-container flex flex-row text-sm">
                        <div class="px-2">
                            <input type="checkbox" checked={reminder.completed} />
                        </div>
                        <div class="reminder-desc" style={{ "text-decoration": reminder.completed ? "line-through" : "none" }}>
                            {rem.subject}
                        </div>
                    </div>
                }
            }}
        </For>
    </div>
}