import { VnodeProps } from "@mr/types";

function createTextNode(nodeValue: string | number): VnodeProps {
    return {
        type: 'TEXT_ELMEMNT',
        props: {
            nodeValue,
            children: [], 
        }
    }
}

export default createTextNode;
