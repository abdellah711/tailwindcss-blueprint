import { BlueprintOptions } from "./types";

export const DEFAULT_BLUEPRINT_OPTIONS: BlueprintOptions = {
    main: {
        breakouts: {
            'content': {
                min: ['100% - 2rem', '64rem'],
            },
            'breakout': {
                min: '0',
                max: '1fr',
            },
            'full-w': {
                min: '1rem',
                max: '1fr',
            },
        },
        default: 'content'
    }
}