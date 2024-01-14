import { FiberProps, TaskProps, VnodeProps } from "@mr/types";




/** 创建任务队列 */
function createTaskQueue() {
    const taskQueue: TaskProps[] = [];

    return {
        push: (task: TaskProps) => taskQueue.push(task),
        pop: () => taskQueue.shift(),
        isEmpty: () => !taskQueue.length
    }
}

export default createTaskQueue;