import { createSignal, For } from 'solid-js';
import Utilities from '../utilities/Utilities';

function createColorPicker(props) {

    const [color, setColor] = createSignal(props.color);
    const onColorClick = (data) => {
        setColor(data.value);
        props.setColor(data.value);
    };

    return <div class="colorpick-ctn flex flex-row" selected-color={color()} 
        classList={props.classList}>
        <For each={Utilities.getRemiderColors()} fallback={"Not week names to print"}>
        {(c,i) =>
            <div class="w-8 h-8 m-1 hover:border-blue-600" name={c.name}
            classList={{"border-blue-600": color() === c.value}}
            onClick={[onColorClick, c]} 
            style={{"background-color": c.value, "border-width": "1px"}}></div>
        }</For>
        </div>
}

export default createColorPicker;