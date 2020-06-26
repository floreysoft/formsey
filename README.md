<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️--><p align="center">
  <img src="https://www.formsey.com/assets/images/Formsey_Icon_256x256.png" alt="Logo" width="128" height="auto" />
</p>
<p align="center">
		<a href="https://npmcharts.com/compare/@formsey/core?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@formsey/core.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/@formsey/core"><img alt="NPM Version" src="https://img.shields.io/npm/v/@formsey/core.svg" height="20"/></a>
<a href="https://david-dm.org/floreysoft/formsey-components"><img alt="Dependencies" src="https://img.shields.io/david/floreysoft/formsey-components.svg" height="20"/></a>
<a href="https://github.com/floreysoft/formsey-components/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/floreysoft/formsey-components.svg" height="20"/></a>
<a href="https://www.webcomponents.org/element/formsey"><img alt="Published on webcomponents.org" src="https://img.shields.io/badge/webcomponents.org-published-blue.svg" height="20"/></a>
	</p>

<p align="center">
  <b>A new approach to create responsive forms using Web Components</b></br>
  <sub>Thank you so much for showing interest in this project! Formsey has been built to simplify the tedious task of creating good looking responsive forms. Go here to see a demo <a href="https://www.formsey.com">https://www.formsey.com</a>.<sub>
</p>

<br />

* **High-quality:** Centered around the best practices.
* **Testable:** Hundreds of test-cases makes sure the library is stable.
* **Easy-to-use:** But with a simple and understandable API.
* **Accessible:** All components has been build with accessibility in mind.
* **Single-responsibility:** Each component does one thing really well. This makes them really easy to extend and compose.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

## ➤ Table of Contents

* [➤ Demo](#-demo)
* [➤ Installation](#-installation)
* [➤ Elements](#-elements)
* [➤ Roadmap](#-roadmap)
* [➤ Contributing guide](#-contributing-guide)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#demo)

## ➤ Demo

Go [here](https://www.formsey.com) to try the demo.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#installation)

## ➤ Installation

```
$ npm i @formsey/core
```

If you want to get started super quickly you can use the CLI.

```
$ npm init web-config new my-project --lit
```

If you want to use formsey in your static website you can import `https://cdn.formsey.com/formsey-native-0.2.109.min.js`. Keep in mind that this imports all elements, so it is recommended that you only use it for test purposes.

```html
<script src="https://cdn.formsey.com/formsey-native-0.2.109.min.js"></script>
```


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#elements)

## ➤ Elements


| Name | Tag | Description | Documentation | Demo |
|------|-----|-------------|---------------|------|




[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#roadmap)

## ➤ Roadmap

Fixes, probably tests


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#contributing-guide)

## ➤ Contributing guide

You are more than welcome to contribute to this repository! Below are some instructions on how to setup the project for development.

1. Clone this repository by running `git clone https://github.com/andreasbm/weightless.git`.
2. Run `npm i` to install all dependencies.
3. Spin up the development server with `npm run s`. The browser should automatically be opened at the correct url. If not, you can open your browser and go to `http://localhost:1350`.
4. Run tests with `npm run test`.
5. Lint the files with `npm run lint`.
6. Compile the documentation by running `npm run docs`.

The elements are written in [Typescript](https://www.typescriptlang.org/). All of the web components uses [lit-element](https://lit-element.polymer-project.org/).

If you want to know more about how you can help you should definitely check out the [CONTRIBUTING.md](/CONTRIBUTING.md) file. All contributors will be added to the contributors section below.

To publish packages, don't forget to set the scope:
npm login --scope=formsey

{{ template:contributors }}
{{ template:license }}