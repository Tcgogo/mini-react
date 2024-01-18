import React from '@mr/render';

let count = 1;
let isShow = false;

function onclick() {
    count++;
    isShow = !isShow
    React.upadte()
}



function FunctionComp({ num }) {
    const c1 = <div>c1111</div>;
    const c2 = function() {
        return (
            <div>
                c222
                <div>child</div>
                <div>child</div>
            </div>
        )
    }
    
    return (
        <div>
            <div>FunctionComp2: { num + count }</div>
            <button onClick={onclick}>点击</button>
            <div>{ isShow ? c1 : c2 }</div>
        </div>
    )
}

export default FunctionComp;