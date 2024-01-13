import ReactDOM from '@mr/dom'
import React from '@mr/render'

const textNode = React.createTextNode('hi mini React');

const node2 = React.createElement('div', { id: 'app' }, ['test2']);
const node = React.createElement('div', { id: 'app' }, [textNode, node2, 'test3']);

ReactDOM.createRoot(document.getElementById('root')).render(node);