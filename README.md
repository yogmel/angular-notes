# Angular notes

## Install

- [Setup](https://angular.io/guide/setup-local)

Install the Angular CLI:

```
ng install -g @angular/cli
```

Create new project:

```
ng new my-app
```

Run:

```
cd my-app
ng serve --open
```

## Component

Components are the basic part of Angular anatomy project. Usually, each folder contains the files of this component.

`app.component` is the main component and it contains the `app.module.ts`.

To create a new component, create a folder and its files:

```
newcomponent/
  |-- newcomponent.component.css
  |-- newcomponent.component.html
  |-- newcomponent.component.ts
  |-- newcomponent.component.spec.ts
```

Its primary configuration are located in the `_.component.ts` file. In there, there should be the [Component decorator](https://angular.io/api/core/Component).

```typescript
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-newcomponent",
  templateUrl: "./newcomponent.component.html",
  styleUrl: "./newcomponent.component.css",
})
export class NewComponent implements OnInit {}
```

- `selector`: which custom html element will render this component. It can be class, attribute or any other valid selector.
- `template` or `templateUrl`: required. What will this component renders. A string of the path should be passed on `templateUrl` or the html elements on `template`.
- `styles` or `styleUrls`: what styles will this component has. A string of the path should be passed on `styleUrl` or the style rules on `styles`.

The other files:

- `_.component.css`: styles of this component.
- `_.component.html`: html of the component.
- `_.component.spec.ts`: it holds the testing script.

**Quick component creation**

Complete and short version:

```
ng generate component newcomponent
ng g c newcomponent
```
