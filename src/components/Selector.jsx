import { createSignal } from "solid-js";

export default(props) => {
    const [option, setOption] = createSignal(1);
    const onSelection = (data, e) => {
        setOption(e.currentTarget.value);
        props.setOption(option());
    }

    return <div>
        <select class="colorpick-ctn flex flex-row" name={props.name}
            onChange={[onSelection, props]}>
            <For each={props.options} fallback={"Not options to print"}>
            {(option,i) =>
                <option value={option.value}>{option.value}</option>
            }</For>
        </select>
    </div>
}