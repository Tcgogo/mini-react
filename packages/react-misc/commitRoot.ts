import { FiberProps } from "@mr/types";

// 递归插入所有节点
function commitRoot(fiber?: FiberProps | null) {
    if(!fiber) return;

    const parentDom = fiber?.parent?.stateNode as HTMLElement;

    parentDom?.append(fiber.stateNode);

    commitRoot(fiber?.child);

    commitRoot(fiber?.sibling);
}

export default commitRoot;
