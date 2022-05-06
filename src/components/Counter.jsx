import {render} from "solid-js/web";
import {createEffect, createSignal} from "solid-js";

function Counter() {
    const [count, setCount] = createSignal(0);
    setInterval(() => setCount(count() + 1), 1000)
    createEffect(() => {
       console.log("LOG IS:", count());
    });
    return <div>Count: {count}<button onClick={() => setCount(count() + 1)}>Click Log!</button></div>
}

render(() => <Counter/>, document.getElementById('app'))
