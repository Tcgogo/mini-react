import { VnodeProps } from "@mr/types";

export function updatedDom(dom: Text | HTMLElement, nextProps: VnodeProps['props'] , prevProps?: VnodeProps['props']) {
    Object.keys(prevProps || {}).forEach((n) => {
        // 过滤 children 字段
        if(n === 'children') return;

        if(!(n in nextProps!)) {
            (dom as HTMLElement).removeAttribute(n);
        }
    });

    Object.keys(nextProps || {}).forEach((n) => {
        // 过滤 children 字段
        if(n === 'children') return;

        if(nextProps?.[n] !== prevProps?.[n]) {
            if(n.startsWith('on')) {
                const eventType = n.split('on')[1].toLocaleLowerCase();
                
                if(prevProps?.[n]) {
                    dom.removeEventListener(eventType, prevProps![n])
                }

                dom.addEventListener(eventType, nextProps![n]);
            } else {
                dom[n] = nextProps![n];
            }
        }
    });

}

function createDom(node: VnodeProps) {
    const dom = node.type === 'TEXT_ELMEMNT' ?  document.createTextNode(node.props?.nodeValue) : document.createElement(node.type as string);

    updatedDom(dom, node.props);
    return dom;
}

export default createDom;