import { VnodeProps } from "@mr/types";
import { updateProps } from "@mr/misc";

function createDom(node: VnodeProps) {
    const dom = node.type === 'TEXT_ELMEMNT' ?  document.createTextNode(node.props?.nodeValue) : document.createElement(node.type as string);

    updateProps(dom, node.props);
    return dom;
}

export default createDom;