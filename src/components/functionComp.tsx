import React from '@mr/render';



function FunctionComp({ num }) {
    return (
        <div>
            <div>FunctionComp2: { num }</div>
            <div>FunctionComp3: { num }</div>
            <div>FunctionComp2: { num + 1 }</div>
        </div>
    )
}

export default FunctionComp;