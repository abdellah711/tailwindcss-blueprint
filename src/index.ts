import { BlueprintOptions } from './types'
import plugin from 'tailwindcss/plugin'
import { generateGridTemplateColumns, isTheEdgeBreakout } from './utils'
import { DEFAULT_BLUEPRINT_OPTIONS } from './default-options'

export * from './types'


export default plugin.withOptions<BlueprintOptions>((blueprintOptions = DEFAULT_BLUEPRINT_OPTIONS) => ({ matchComponents }) => {
    matchComponents({
        blueprint: (value) => {
            if (typeof value === 'string') return null;

            return {
                display: 'grid',
                gridTemplateColumns: generateGridTemplateColumns(value.breakouts),
                '& > *': {
                    gridColumn: value.default ?? Object.keys(value.breakouts)[0],
                },
            }
        }
    }, { values: blueprintOptions })

    const gridNames = Object.values(blueprintOptions).flatMap(v => Object.keys(v.breakouts))

    matchComponents({
        size: (value) => ({
            gridColumn: value,
        }),
        'size-s': (value) => ({
            gridColumnStart: value,
        }),
        'size-e': (value) => ({
            gridColumnEnd: value,
        }),
    }, { values: Object.fromEntries(gridNames.map(v => [v, v])) });
})
