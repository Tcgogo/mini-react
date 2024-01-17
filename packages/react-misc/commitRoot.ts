import { FiberProps } from "@mr/types";
import { updatedDom } from "./createDom";

// 递归插入所有节点
function commitRoot(fiber?: FiberProps | null) {
    if(!fiber) return;

    const parentDom = fiber?.parent?.stateNode as HTMLElement;

    if(fiber.effectTag === 'Update') {
        updatedDom(fiber.stateNode, fiber.props, fiber.alternate?.props)
    } else if(fiber.effectTag === 'Placement') {
        parentDom?.append(fiber.stateNode);
    }

    commitRoot(fiber?.child);

    commitRoot(fiber?.sibling);
}

export default commitRoot;
