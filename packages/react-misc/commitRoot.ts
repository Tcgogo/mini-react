import { FiberProps } from "@mr/types";
import { updateProps } from "@mr/misc";

// 递归插入所有节点
function commitRoot(fiber?: FiberProps | null) {
    if(!fiber) return;

    const parentDom = fiber?.parent?.stateNode as HTMLElement;

    if(fiber.effectTag === 'Update') {
        updateProps(fiber.stateNode, fiber.props, fiber.alternate?.props)
    } else if(fiber.effectTag === 'Placement') {
        parentDom?.append(fiber.stateNode);
    }

    commitRoot(fiber?.child);

    commitRoot(fiber?.sibling);
}

export default commitRoot;
