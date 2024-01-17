export enum ELEMENT_TYPE_VALUE {
    "div",
    "TEXT_ELMEMNT"
}

export type ELEMENT_TYPE = keyof typeof ELEMENT_TYPE_VALUE;

export interface VnodeProps {
    type: ELEMENT_TYPE | Function;
    props?: Record<string, any>;
    children?: VnodeProps[];
}

export interface TaskProps extends VnodeProps {
    dom: any;
}

// fiber 结构
export interface FiberProps {
    // 节点类型
    type: ELEMENT_TYPE | Function;
    // 节点的 dom 对象
    stateNode: HTMLElement | Text;
    // 对于 props
    props: any;
    // 节点标记
    tag: 'host_root' | 'host_component' | 'class_component' | 'function_component'
    // 需要更改的 fiber 对象
    effects: FiberProps[] | null;
    // 当前 fiber 对象要被执行的操作
    effectTag?: 'Placement' | 'Update' | 'ChildDeletion' | 'ContentReset' | 'Ref' | 'Hydrating' | 'Visibility';
    // 当前 fiber 父级 fiber
    parent: FiberProps | null;
    // 当前 fiber 子级 fiber
    child: FiberProps | null;
    // 当前 fiber 的下一个兄弟 fiber
    sibling: FiberProps | null;
    // old fiber
    alternate?: FiberProps | null;
}