import { VnodeProps } from "@mr/types";

function createDom(noee: VnodeProps) {
    const dom = noee.type === 'TEXT_ELMEMNT' ?  document.createTextNode(noee.props?.nodeValue) : document.createElement(noee.type);
    
    Object.keys(noee.props || {}).forEach((n) => {
        if(n === 'children') return;
        dom[n] = noee.props![n];
    });

    return dom;
}

export default createDom;