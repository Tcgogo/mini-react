import { VnodeProps } from "@mr/types";
import { createTextNode } from ".";

function createElement(type: VnodeProps['type'], props: VnodeProps['props'], ...children): VnodeProps {
    return {
        type,
        props: {
            ...props,
            children: children.map((c) => {
                const isTextNode = typeof c === 'string' || typeof c === 'number';
                return isTextNode ? createTextNode(c) : c
            }),
        }
    }
}

export default createElement;