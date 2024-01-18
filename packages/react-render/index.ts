import { FiberProps, TaskProps, VnodeProps } from '@mr/types'
import { commitRoot, createDom, createElement, createTaskQueue, createTextNode, handleFiberType } from '@mr/misc';

// 任务队列
const taskQueue = createTaskQueue();

// 当前执行的任务
let curTask: FiberProps | null = null;

// root 任务
let rootTask: FiberProps | null = null;

let currentRootTask: FiberProps | null = null;

let deletions: FiberProps[] = [];


function deleteOldDom(oldFiber: FiberProps[]) {
    oldFiber.forEach((fiber) => {
        let f: FiberProps['child'] = fiber;
        while (f) {
            f.stateNode.remove();
            f = f.child;
            console.log('%c [ f ]-24', 'font-size:13px; background:pink; color:#bf2c9f;', f)
        }
    });

    deletions = [];
}


function workLoop(deadline: IdleDeadline) {
    // 初始化第一次任务
    if (!curTask) {
        curTask = createFirstTask()
    }

    while (curTask && deadline.timeRemaining() > 1) {
        curTask = executeTask(curTask!);
    }


    if (!curTask && rootTask) {
        // 统一 append dom
        commitRoot(rootTask);
        deleteOldDom(deletions);
        currentRootTask = rootTask;
        rootTask = null;
    }

    if (curTask || !taskQueue.isEmpty()) {
        requestIdleCallback(workLoop)
    }
}


function executeTask(fiber: FiberProps) {
    let children: VnodeProps[] = fiber.props?.children?.filter(Boolean);
    let newFiber: FiberProps | null = null;
    let prevChild: FiberProps | null = null;
    let oldFiber: FiberProps | null = fiber?.alternate?.child || null;

    children?.forEach((child, index) => {
        child = handleFiberType(child);

        const isSameType = oldFiber?.type === child.type;

        if (isSameType) {
            newFiber = {
                type: child.type,
                props: child.props,
                child: null,
                parent: fiber,
                sibling: null,
                effects: [],
                tag: 'host_component',
                stateNode: oldFiber?.stateNode as FiberProps['stateNode'],
                effectTag: 'Update',
                alternate: oldFiber,
            }
        } else {
            // 创建dom
            const dom = createDom(child);

            // 不中途添加，最后统一添加
            // fiber.stateNode.append(dom);

            // 创建 Fiber 对象
            newFiber = {
                type: child.type,
                props: child.props,
                child: null,
                parent: curTask,
                sibling: null,
                effects: [],
                tag: 'host_component',
                stateNode: dom,
                effectTag: 'Placement',
            }

            if (oldFiber) {
                // 移除旧节点
                deletions.push(oldFiber);

            }
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }

        // 构建指针
        if (index === 0) {
            fiber.child = newFiber;
        } else {
            prevChild!.sibling = newFiber;
        }

        // 记录上次 fiber
        prevChild = newFiber;
    });

    // 删除多余的节点
    while(oldFiber) {
        deletions.push(oldFiber);
        oldFiber = oldFiber.sibling;
    }


    // 规则：先遍历子节点，然后是兄弟节点，最后是叔叔节点
    if (fiber.child) return fiber.child;

    // 需要多次回退，直到找到最近的兄弟节点
    let nextFiber: FiberProps | null = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) return nextFiber.sibling;
        nextFiber = nextFiber.parent;
    }

    return null;
}


/** 取任务队列的第一个任务 */
function createFirstTask(): FiberProps {
    const task = taskQueue.pop() as TaskProps;

    rootTask = {
        type: task.type,
        stateNode: task.dom,
        props: task.props,
        effects: [],
        tag: 'host_root',
        child: null,
        parent: null,
        sibling: null,
        effectTag: 'Update',
        alternate: currentRootTask
    };

    return rootTask;
}

function performWorkOfUnit() {
    requestIdleCallback(workLoop)
}

export function render(node: VnodeProps, container?: any) {
    // 创建任务
    taskQueue.push({
        ...node,
        dom: container,
    });

    performWorkOfUnit();
};

export function upadte() {
    if (!currentRootTask) return;

    // 创建任务
    taskQueue.push({
        ...currentRootTask,
        dom: currentRootTask.stateNode,
    });

    performWorkOfUnit();
};



export default {
    createElement,
    createTextNode,
    render,
    upadte
}