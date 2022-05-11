import { createStore } from "solid-js/store";
import ColorPicker from "./ColorPicker";
import Selector from "./Selector";
import Utilities from "../utilities/Utilities";
import { createSignal } from "solid-js";

const Reminder = (props) => {
    let remiderId = 0;
    const [reminders, setReminders] = createStore({ reminders: [] });
    const [color, setColor] = createSignal("#2a67d1");
    const [subject, setSubject] = createSignal("");
    const [month, setMonth] = createSignal("0");
    const [day, setDay] = createSignal(1);
    const [hour, setHour] = createSignal("");
    const [city, setCity] = createSignal("");
    const addReminder = (rem) => {
        setReminders("reminders", reminders => [...reminders, { id: ++remiderId, rem, completed: false }]);
        props.setReminders(reminders);
    }
    const updateReminder = (id) => {
        setReminders("reminders", reminders => reminders.id === id, "completed", completed => !completed);
    }
    const fn = (form) => {      
        let reminderSubject = document.getElementById("reminderSubject").value;
        if(color() && day() && hour() && city() 
        && reminderSubject != "" && month()) {
            setSubject(reminderSubject);
            addReminder({
                "color": color(), 
                "month": month(), 
                "day": day(),
                "hour": hour(), 
                "city": city(),
                "subject": subject()
            });
        }
    };
    const formSubmit = (ref, accessor) => {
        const callback = accessor() || (() => {});
        ref.onsubmit = async (e) => {
          e.preventDefault();
          callback(ref);
        }
    }

    return (
        <div class="remider-container">
            <form use:formSubmit={fn}>
            <div class="flex flex-row">
                <span class="px-3 inline-block align-middle">Tag</span>
                <ColorPicker color={color()} setColor={setColor} />
            </div>
            <div class="flex flex-row">
                <span class="px-3 inline-block align-middle">Date</span>
                <Selector name="remiderMonth" options={Utilities.getMonths(props.month)} 
                    setOption={setMonth} placeholder="Month" />
                <Selector name="remiderDay" options={Utilities.getDays(props.month)}
                    setOption={setDay} placeholder="Day" />
                <Selector name="remiderHour" options={Utilities.getDayHours()} 
                    setOption={setHour} placeholder="Hour" />
            </div>
            <div class="flex flex-row">
                <span class="px-3 inline-block align-middle">City</span>
                <Selector name="remiderCity" options={Utilities.getCities()} 
                setOption={setCity} placeholder="Select a city"/>
            </div>
            <div class="flex flex-row py-2">
            <textarea
                class="form-control block w-full px-3 py-1.5
                    text-base font-normaltext-gray-700bg-white bg-clip-padding
                    border border-solid border-gray-300 rounded transition ease-in-out
                    m-0focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="reminderSubject" rows="1" maxlength="30" placeholder="Subject"></textarea>
            </div>
            <button class="rounded-full px-8 py-2 bg-indigo-500 hover:bg-indigo-700" type="submit">Set Reminder!</button>
            </form>
        </div>
  );
};

export default Reminder;
