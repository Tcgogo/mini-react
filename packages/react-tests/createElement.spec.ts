import React from '@mr/render';
import { it, expect, describe } from 'vitest'

describe('createElement', () => {
    const el = React.createElement('div', {}, 'mini react')

    it('should return vdom for element', () => {
        expect(el).toEqual({
            type: 'div',
            props: {
                children: [{
                    type: 'TEXT_ELMEMNT',
                    props: {
                        nodeValue: 'mini react',
                        children: []
                    },
                }]
            }
        })
    })
})