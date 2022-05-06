import { render } from 'solid-js/web';
import { Index, createMemo, createEffect } from 'solid-js';
import DaySquare from "./DaySquare";
import WeekName from "./WeekName";
import Utilities from '../utilities/Utilities';

function Calendar() {
    const maxGridPixelWidth = 380;
    const weekNames = Utilities.getWeekNames(true);
    const calendar = Utilities.getCalendarArray(new Date());
    const gridTemplateString = createMemo(() =>
        `repeat(${7}, ${maxGridPixelWidth / 5}px)`
    );

    return (
        <div  style={{
            display: "grid",
            "grid-template-rows": gridTemplateString(),
            "grid-template-columns": gridTemplateString(),
          }}>
            <For each={weekNames} fallback={"Not week names to print"}>
                {(n,i) =>
                <WeekName name={n}/>
            }</For>
            <For each={calendar} fallback={"Not weeks to print"}>
                {(w,i) =>
                <For each={w} fallback={"Not days to print"}>
                    {(d,j) =>
                    <DaySquare day={d.getDate()}/>
                }</For>
            }</For>
        </div>
    );
}   

render(() => <Calendar />, document.getElementById('app'))
