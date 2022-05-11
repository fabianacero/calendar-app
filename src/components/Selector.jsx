import { createSignal, onMount } from "solid-js";

export default(props) => {
    const [option, setOption] = createSignal(1);
    const onSelection = (data, e) => {
        setOption(e.currentTarget.value);
        props.setOption(option());
    }
    
    onMount(() => {
        if(props?.options){
            for(var option of props.options) {
                if(!('selected' in option)) { break; }
                if(option.selected) { props.setOption(option.value); }
            }
        }
    });

    return <div class="px-3 inline-block align-middle">
        <select class="h-12 min-h-full" name={props.name}
            onChange={[onSelection, props]} >
            <option value="" selected disabled hidden>{props.placeholder || 'Choose option'}</option>
            <For each={props.options} fallback={"Not options to print"}>
            {(opt,i) =>
                <option value={opt.value} selected={opt.selected}>{opt.name}</option>
            }</For>
        </select>
    </div>
}