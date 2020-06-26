{{ template:logo }}
{{ template:badges }}
{{ template:description }}
{{ bullets }}
{{ template:toc }}

## Demo

Go [here]({{ demo }}) to try the demo.

## Installation

```
$ npm i {{ ids.npm }}
```

If you want to get started super quickly you can use the CLI.

```
$ npm init web-config new my-project --lit
```

If you want to use formsey in your static website you can import `https://cdn.formsey.com/formsey-native-0.2.109.min.js`. Keep in mind that this imports all elements, so it is recommended that you only use it for test purposes.

```html
<script src="https://cdn.formsey.com/formsey-native-0.2.109.min.js"></script>
```

## Elements

{{ elements }}

## Roadmap

Fixes, probably tests

## Contributing guide

You are more than welcome to contribute to this repository! Below are some instructions on how to setup the project for development.

1. Clone this repository by running `git clone https://github.com/floreysoft/formsey.git`.
2. Run `yarn` to install all dependencies.
3. Spin up the development server with `yarn start`. The browser should automatically be opened at the correct url. If not, you can open your browser and go to `http://localhost:8080`.
4. Compile the documentation by running `yarn docs`.

The elements are written in [Typescript](https://www.typescriptlang.org/). All of the web components uses [lit-element](https://lit-element.polymer-project.org/).

If you want to know more about how you can help you should definitely check out the [CONTRIBUTING.md](/CONTRIBUTING.md) file. All contributors will be added to the contributors section below.

To publish packages, don't forget to set the scope:
npm login --scope=formsey

{{ template:contributors }}
{{ template:license }}