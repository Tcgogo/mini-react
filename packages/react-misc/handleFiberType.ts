import { VnodeProps } from "@mr/types";

// 是否为函数组件
const isFunctionComp = (type: VnodeProps['type']): type is Function => typeof type === 'function';

function handleFiberType(child: VnodeProps | Function) {
    const type = typeof child === 'function' ? child : child.type;
    const props = typeof child === 'function' ? {} : child.props;

    if(isFunctionComp(type)) {
        // 执行函数组件，获取函数组件的 child
        child = { ...child, ...type(props) }
    }

    return child as VnodeProps
}

export default handleFiberType;