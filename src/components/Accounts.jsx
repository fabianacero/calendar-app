import { render } from 'solid-js/web';
import { createSignal, For } from 'solid-js';

function Accounnts() {
    const [account, setAccount] = createSignal([
        { id: '1', number: '491511345678' },
        { id: '2', number: '491511443322' },
        { id: '3', number: '491511312211' }
    ]);

    return (
        <For each={account()}>{(acct, i) =>
            <li>
                <a target="_self" href={`#${acct.id}`}>
                    {i() + 1}: {acct.number}
                </a>
            </li>
        }</For>
    );
}   

render(() => <Accounnts />, document.getElementById('app'))
