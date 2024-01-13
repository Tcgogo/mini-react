import { VnodeProps } from '@mr/types'

function createDom(node: VnodeProps) {
    return node.type === 'div' ? document.createElement(node.type) : document.createTextNode(node.props?.nodeValue);
}

export function createElement(type: VnodeProps['type'], props: VnodeProps['props'], children?: (VnodeProps | string)[]): VnodeProps {
    return {
        type,
        props: {
            ...props,
            children: children?.map(c => typeof c === 'string' ? createTextNode(c) : c)
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