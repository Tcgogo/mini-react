import { VnodeProps } from "@mr/types";

// 是否为函数组件
const isFunctionComp = (type: VnodeProps['type']): type is Function => typeof type === 'function';

function handleFiberType(child: VnodeProps) {
    const type = child.type;

    if(isFunctionComp(type)) {
        // 执行函数组件，获取函数组件的 child
        child = { ...child, ...type(child.props) }
        console.log('%c [ child ]-12', 'font-size:13px; background:pink; color:#bf2c9f;', child)
    }

    return child
}

export default handleFiberType;