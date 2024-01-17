import { VnodeProps } from "@mr/types";

function updatedDom(node: VnodeProps, dom: Text | HTMLElement) {
    Object.keys(node.props || {}).forEach((n) => {
        // 过滤 children 字段
        if(n === 'children') return;

        if(n.startsWith('on')) {
            const eventType = n.split('on')[1].toLocaleLowerCase();
            dom.addEventListener(eventType, node.props![n]);
        } else {
            dom[n] = node.props![n];
        }
    });

}

function createDom(node: VnodeProps) {
    const dom = node.type === 'TEXT_ELMEMNT' ?  document.createTextNode(node.props?.nodeValue) : document.createElement(node.type as string);

    updatedDom(node, dom);
    return dom;
}

export default createDom;