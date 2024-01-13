import { render } from "@mr/render";


const ReactDOM = {
    createRoot: (el: HTMLElement | null) => {
        return {
            render: (node: Parameters<typeof render>[0]) => {
                render(node, el)
            },
        }
    }
}

export default ReactDOM;