import { VnodeProps } from "@mr/types";

function updateProps(dom: Text | HTMLElement, nextProps: VnodeProps['props'] , prevProps?: VnodeProps['props']) {
    Object.keys(prevProps || {}).forEach((n) => {
        // 过滤 children 字段
        if(n === 'children') return;

        if(!(n in nextProps!)) {
            (dom as HTMLElement).removeAttribute(n);
        }
    });

    Object.keys(nextProps || {}).forEach((n) => {
        // 过滤 children 字段
        if(n === 'children') return;

        if(nextProps?.[n] !== prevProps?.[n]) {
            if(n.startsWith('on')) {
                const eventType = n.split('on')[1].toLocaleLowerCase();
                
                if(prevProps?.[n]) {
                    dom.removeEventListener(eventType, prevProps![n])
                }

                dom.addEventListener(eventType, nextProps![n]);
            } else {
                dom[n] = nextProps![n];
            }
        }
    });

}

export default updateProps;