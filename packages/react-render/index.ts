import { FiberProps, TaskProps, VnodeProps } from '@mr/types'
import { createDom, createElement, createTaskQueue, createTextNode } from '@mr/misc';

// 任务队列
const taskQueue = createTaskQueue();

// 当前执行的任务
let curTask: FiberProps | null = null;

function workLoop(deadline: IdleDeadline) {
    // 初始化第一次任务
    if(!curTask) {
        curTask = createFirstTask()
    }

    while(curTask && deadline.timeRemaining() > 1)  {
        curTask = executeTask(curTask!);
    }

    if(curTask || !taskQueue.isEmpty()) {
        requestIdleCallback(workLoop)
    }
}

function executeTask(fiber: FiberProps) {
    let children: VnodeProps[] = fiber.props.children;
    let newFiber: FiberProps | null = null;
    let prevChild: FiberProps | null = null;

    children.forEach((child, index) => {
        // 创建dom
        const dom = createDom(child);

        fiber.stateNode.append(dom);

        // 创建 Fiber 对象
        newFiber = {
            type: child.type,
            props: child.props,
            child: null,
            parent: curTask,
            sibling: null,
            effects: [],
            tag: 'host_component',
            stateNode: dom
        }

        // 构建指针
        if(index === 0) {
            fiber.child = newFiber;
        } else {
            prevChild!.sibling = newFiber;
        }

        prevChild = newFiber;
    });


    // 规则：先遍历子节点，然后是兄弟节点，最后是叔叔节点
    if(fiber.child) return fiber.child;

    if(fiber.sibling) return fiber.sibling;

    if(fiber.parent?.sibling) return fiber.parent?.sibling;

    return null;
}


/** 取任务队列的第一个任务 */
function createFirstTask(): FiberProps {
    const task = taskQueue.pop() as TaskProps;

    return {
        type: task.type,
        stateNode: task.dom,
        props: task.props,
        effects: [],
        tag: 'host_root',
        child: null,
        parent: null,
        sibling: null,
    };
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


export default {
    createElement,
    createTextNode,
    render
}