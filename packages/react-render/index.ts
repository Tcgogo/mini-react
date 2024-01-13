import { VnodeProps } from '@mr/types'

function createDom(node: VnodeProps) {
    
    return node.type === 'TEXT_ELMEMNT' ?  document.createTextNode(node.props?.nodeValue) : document.createElement(node.type);
}

export function createElement(type: VnodeProps['type'], props: VnodeProps['props'], ...children): VnodeProps {
    console.log('%c [ children ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', typeof children, children)

    // TODO: children 有多种数据结构需要兼容
    return {
        type,
        props: {
            ...props,
            children: children.map((c) => typeof c === 'string' ? createTextNode(c) : c),
        }
    }
}

export function createTextNode(nodeValue: string): VnodeProps {
    return {
        type: 'TEXT_ELMEMNT',
        props: {
            nodeValue,
        }
    }
}

export function render(node: VnodeProps, container?: any) {
    console.log('%c [ node ]-30', 'font-size:13px; background:pink; color:#bf2c9f;', node)
    
    const dom = createDom(node);

    Object.keys(node.props || {}).forEach((n) => {
        node[n] = node.props![n];
    });

    node.children?.forEach((childNode) => {
        render(childNode, dom);
    })

    container?.append(dom);
};


export default {
    createElement,
    createTextNode,
    render
}