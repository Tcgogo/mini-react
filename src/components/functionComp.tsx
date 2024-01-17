import React from '@mr/render';

let count = 1;

function onclick() {
    count++;
    React.upadte()
}


function FunctionComp({ num }) {
    return (
        <div>
            <div>FunctionComp2: { num + count }</div>
            <button onClick={onclick}>点击</button>
        </div>
    )
}

export default FunctionComp;