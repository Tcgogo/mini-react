import { VnodeProps } from "@mr/types";

function createDom(noee: VnodeProps) {
    const dom = noee.type === 'TEXT_ELMEMNT' ?  document.createTextNode(noee.props?.nodeValue) : document.createElement(noee.type as string);
    
    Object.keys(noee.props || {}).forEach((n) => {
        // 过滤 children 字段
        if(n === 'children') return;

        dom[n] = noee.props![n];
    });

    return dom;
}

export default createDom;