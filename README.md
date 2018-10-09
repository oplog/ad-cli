# ad
ad is a cli tool to generate application structure & components using typescript, redux, enzyme and more.

The following guide is strictly followed for creation of application strucuture;
https://github.com/Microsoft/TypeScript-React-Starter

## Features
- Atomic design application structure
- Typescript
- Generate atom, molecule, organism, template & pages
- Redux is enabled by default
- Generate container components
- Generate store

## Default app template
The default app template of ad cli is the following;
```
.
.
├── ad-cli.config.default.json
├── ad-cli.config.json
├── config
│   ├── aliases.js
│   ├── env.js
│   ├── jest
│   │   ├── cssTransform.js
│   │   ├── fileTransform.js
│   │   └── typescriptTransform.js
│   ├── paths.js
│   ├── polyfills.js
│   ├── webpack.config.dev.js
│   ├── webpack.config.prod.js
│   └── webpackDevServer.config.js
├── images.d.ts
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── README.md
├── scripts
│   ├── build.js
│   ├── start.js
│   └── test.js
├── src
│   ├── components
│   │   ├── App.test.tsx
│   │   ├── App.tsx
│   │   ├── atoms
│   │   │   ├── Button
│   │   │   │   ├── Button.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   ├── molecules
│   │   ├── organisms
│   │   ├── pages
│   │   └── templates
│   ├── containers
│   │   └── ButtonContainer
│   │       ├── ButtonContainer.tsx
│   │       └── index.ts
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── registerServiceWorker.ts
│   └── store
│       ├── index.ts
│       └── utils.ts
├── __tests__
│   ├── components
│   │   └── atoms
│   │       └── Button.test.tsx
│   ├── containers
│   │   └── ButtonContainer.test.tsx
│   ├── setupTests.js
│   └── utils.ts
├── tree.md
├── tsconfig.json
├── tsconfig.prod.json
├── tsconfig.test.json
└── tslint.json

19 directories, 45 files
```
The template is basically an ejected create react app with a few folders created

## Getting started
Install ad-cli package globally
`$ npm install -g ad-cli`

You can also clone and link locally
```
$ git clone git@github.com:aacanakin/ad-cli.git
$ cd ad-cli
$ npm install
$ npm run build
$ npm link
```


Create a new app
`$ ad new <appName>`

## What is atomic design
Atomic design is a new frontend app structure which scales specifically for larger projects. You can read the following learn more;
http://bradfrost.com/blog/post/atomic-web-design/

### Atom
- Atoms are the basic building blocks of any app. Applied to web interfaces, atoms are our HTML tags, such as a form label, an input or a button.
- To generate an atom;
```
$ ad generate:atom Button
or
$ ad g:atom Button
```
This command would generate an atom component in your application atom folder


### Molecule
- Molecules are groups of atoms bonded together and are the smallest fundamental units of a compound
- For example, a form label, input or button aren’t too useful by themselves, but combine them together as a form and now they can actually do something together.
- To generate a molecule;
```
$ ad generate:molecule FormInput
or
$ ad g:molecule FormInput
```

### Organism
- Molecules give us some building blocks to work with, and we can now combine them together to form organisms.
- Organisms are groups of molecules joined together to form a relatively complex, distinct section of an interface.
- Organisms can consist of similar and/or different molecule types. For example, a masthead organism might consist of diverse components like a logo, primary navigation, search form, and list of social media channels
- To generate an organism;
```
$ ad generate:organism LoginForm
or
$ ad g:organism LoginForm
```
### Template
- Templates consist mostly of groups of organisms stitched together to form pages
- To generate a template;
```
$ ad generate:template GuestPageTemplate
or
$ ad g:template GuestPageTemplate
```
### Page
- Pages are simply instances of templates
- They are the highest level of fidelity and because they’re the most tangible, it’s typically where most people in the process spend most of their time and what most reviews revolve around.
- To generate a page;
```
$ ad generate:page Login
or 
$ ad g:page Login
```

## Store
- Store folder resides in `src/store`. It is for redux store items namely constants, actions, selectors, types, reducer & saga
- To generate a store folder;
```
$ ad generate:store user
or
$ ad g:store user
```
NOTE: Currently, store generation is mostly code with comments. It is planned to generate stores better in the upcoming releases

## Containers
- Containers are the bridge between redux store & pure components. They are meant to connect pure components into redux stores
- To generate a container folder;
```
$ ad generate:container User
or 
$ ad g:container User
``` 
NOTE: Currently, container generation is mostly code with comments. It is planned to generate containers better in the upcoming releases

