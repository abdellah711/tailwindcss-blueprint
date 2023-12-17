# Tailwind CSS BluePrint Plugin

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/your-username/your-repo/blob/main/LICENSE)
[![npm version](https://badge.fury.io/js/tailwindcss-blueprint.svg)](https://badge.fury.io/js/tailwindcss-blueprint)
[![npm downloads](https://img.shields.io/npm/dt/tailwindcss-blueprint.svg)](https://www.npmjs.com/package/tailwindcss-blueprint)

a Tailwind CSS plugin to help you build layouts without creating a bunch of containers and wrappers, by leveraging the power of CSS Grid.

to understand the concept behind this plugin, please check out this video by Kevin Powell: [https://www.youtube.com/watch?v=c13gpBrnGEw](https://www.youtube.com/watch?v=c13gpBrnGEw) 


## Installation

You can install this plugin via npm:

```bash
 npm install -D tailwindcss-blueprint
```
Or via yarn:
```bash
 yarn add -D tailwindcss-blueprint
```
Or via pnpm:
```bash
pnpm add -D tailwindcss-blueprint
```

## Usage

```js
// tailwind.config.js
module.exports = {
    theme: {
        // ...
    },
    plugins: [
        require('tailwindcss-blueprint'),
        // ...
    ],
}
```

to use the plugin, you need to add the `blueprint-main` class to the parent element of the layout you want to build, this will create a grid container with the three sections: full-width, breakout, and content.
by default, all the children will be placed in the content section, but you can use the `size-full-w` class to make an element span the full width of the grid container, or the `size-breakout` class to make an element take more than one 


## Examples

### Basic Usage

```html
<div class="blueprint-main">
    <nav class="size-full-w">
        ...
    </nav>
    <section>
        ...
    </section>
    <section class="size-full-w">
        ...
    </section>
    <section>
        ...
    </section>
    <footer class="size-full-w">
        ...
    </footer>
</div>
```
### Blog article content
![blog article content](https://github.com/abdellah711/refinenative/assets/47274364/fe42c1ee-b4a4-4b92-b44b-a8bdf73a4db1)

without the plugin, you would have to wrap the content of the article in a container to achieve the desired layout. 
```html
<div class="flex flex-col">
    <div class="max-w-5xl mx-auto">
        <p>...</p>
    </div>
    <div class="bg-blue-500 text-white ">
        <div class="max-w-5xl mx-auto">
            <h2 class="text-xl">This is a title</h2>
            <p>...</p>
        </div>
    </div>
    <div class="max-w-5xl mx-auto">
        <p>...</p>
    </div>
</div>
```

with the plugin, you can achieve the same result without wrapping the content in a container.

```html
    <div class="blueprint-main">
        <p>...</p>
        <div class="bg-blue-500 text-white size-full-w blueprint-main">
            <h2 class="text-xl">This is a title</h2>
            <p>...</p>
        </div>
        <p>...</p>
    </div>
```

### Customizing the breakouts

by default, the plugin has the following breakouts:
```js
{
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
```
you can customize the breakouts or create new blueprints by passing a configuration object to the plugin.

```js
// tailwind.config.js
module.exports = {
    theme: {
        // ...
    },
    plugins: [
        require('tailwindcss-blueprint')({
            card: {
                breakouts: {
                    'content': '1fr',
                    'full-w': '2rem',
                },
                default: 'content'
            },
            main: {
                breakouts: {
                    'content': {
                        min: ['100% - 2rem', '64rem'],
                        max: undefined,
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
            },
        }),
        // ...
    ],
}
```

and now you can use the `blueprint-card` class to create a grid container with a different set of breakouts

```html
<div class="blueprint-card">
    <div class="size-full-w">
        <input type="radio" name="radio">
        <label>Radio</label>
    </div>
    <img src="..." alt="..." class="size-e-full-w">
    <p class="size-e-full-w">...</p>
    <div class="size-full-w">
        <button>Button</button>
    </div>
</div>
```

![custom card](https://github.com/abdellah711/refinenative/assets/47274364/f3df406f-7c85-4a6e-ac79-ea34f4e76312)

#### `default`

you can also change the default section that the children will be placed in by passing the `default` property to the configuration object.