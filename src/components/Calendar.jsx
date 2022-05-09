import { render } from 'solid-js/web';
import DaySquare from "./DaySquare";
import WeekName from "./WeekName";
import Reminder from "./Reminder";
import Utilities from '../utilities/Utilities';
import { createStore } from 'solid-js/store';

function Calendar() {
    const weekNames = Utilities.getWeekNames(true);
    const currentMonth = new Date();
    const calendar = Utilities.getCalendarArray(currentMonth);
    const [reminders, setReminders] = createStore({ reminders: [] });

    const addReminder = (rem) => {
        setReminders(rem);
        console.log(reminders.reminders);
    }

    return (
        <div class="">
            <Reminder setReminders={addReminder}/>
            <For each={reminders.reminders}>
                {(reminder) => {
                const { id, rem } = reminder;
                console.log(`Creating ${rem}`)
                return <div style={{ "background-color": rem.color}}>
                    <div class="px-2">
                        <input type="checkbox" checked={reminder.completed} />
                    </div>
                    <span style={{ "text-decoration": reminder.completed ? "line-through" : "none" }}>
                        {rem.subject}
                    </span>
                </div>
                }}
            </For>
            <div class="grid grid-cols-7 p-5">
                <For each={weekNames} fallback={"Not week names to print"}>
                    {(n,i) =>
                    <WeekName name={n}/>
                }</For>
                <For each={calendar} fallback={"Not weeks to print"}>
                    {(w,i) =>
                    <For each={w} fallback={"Not days to print"}>
                        {(d,j) =>
                        <DaySquare day={d} month={currentMonth} remi={reminders.reminders}/>
                    }</For>
                }</For>
            </div>
        </div>
    );
}   

render(() => <Calendar />, document.getElementById('app'))
