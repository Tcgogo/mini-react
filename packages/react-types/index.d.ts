export enum ELEMENT_TYPE_VALUE {
    "div",
    "TEXT_ELMEMNT"
}

export type ELEMENT_TYPE = keyof typeof ELEMENT_TYPE_VALUE;

export interface VnodeProps {
    type: ELEMENT_TYPE;
    props?: Record<string, any>;
    children?: VnodeProps[];
}