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
import { Component } from "@angular/core";

@Component({
  selector: "app-newcomponent",
  templateUrl: "./newcomponent.component.html",
  styleUrls: ["./newcomponent.component.css"],
})
export class NewComponent {}
```

- `selector`: which custom html element will render this component. It can be class, attribute or any other valid selector.
- `template` or `templateUrl`: required. What will this component renders. A string of the path should be passed on `templateUrl` or the html elements on `template`.
- `styles` or `styleUrls`: what styles will this component has. An array of strings of the paths should be passed on `styleUrls` or the style rules on `styles`.

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

## Data Binding

Properties created inside the class component can be referenced in `_.component.html`.

**String interpolation**

- [Showing components properties with interpolation](https://angular.io/guide/displaying-data#showing-component-properties-with-interpolation)

`servers.component.ts`:

```typescript
export class ServersComponent {
  serverName = "test";
}
```

`servers.component.html`:

```html
<p>{{ serverName }}</p>
```

**Property binding**

`servers.component.ts`:

```typescript
export class ServersComponent {
  allowNewServer = false;
}
```

`servers.component.html`:

```html
<button [disabled]="!allowNewServer">
  Add Server
</button>
```

**Event binding**

`servers.component.ts`:

```typescript
export class ServersComponent {
  // ...
  onCreateServer() {
    this.serverCreationStatus =
      "Server was created! Name is " + this.serverName;
  }
}
```

`servers.component.html`:

```html
<button (click)="onCreateServer()">
  Add Server
</button>

<p>{{ serverCreationStatus }}</p>
```

**Two-way-databinding**

`servers.component.html`:

```html
<input type="text" [(ngModel)]="serverName" />

<p>{{ serverName }}</p>
```

## Directives

- [Attribute directives](https://angular.io/guide/attribute-directives)

Directives are instructions in the DOM. There are custom and built-in directives.

**Structure directives**
They can add or remove elements.

```html
<p *ngIf="serverCreated">
  Server was created, server name: {{ serverCreationStatus }}
</p>

<app-server *ngFor="let server of servers"></app-server>
```

**Attribute directives**
Change the apperean or behavior of an element.

```html
<p
  [ngStyle]="{backgroundColor: getColor()}"
  [ngClass]="{online: serverStatus === 'online'}"
>
  Server with ID 10 is {{ status }}
</p>
```

In this example, both property values should receive a Javascript object. For `ngStyle`, the property is the style (it can be camel or snake case), and the value is the value of the style. It is important to know that expressions are allowed as well.

For `ngClass`, the property is the name of the class to be added and the value is the condition.

## Data binding between components

- Project: [01-databinding](./01-databinding)

By default, properties inside a component are not shared between other ones. But, there is a way to pass values between parent and child (nested) components.

**Passing values down to a child element**

- [Input decorator](https://angular.io/api/core/Input);

For example, if a `app-server-element` (child) is nested in `app.component` (parent), to pass info from parent to child:

`app.component.html`

```html
<app-server-element
  *ngFor="let serverElement of serverElements"
  [srvElement]="serverElement"
></app-server-element>
```

`[srvElement]="serverElement"` passes the `serverElement` object to the `app-server-element`.

In order to receive the value, the metadata file of the component must declare a `@Input` decorator. The string parameter inside `@Input()` is optional and refers to the alias of the element.

`server-element.component.ts`

```ts
import { Component, Input } from "@angular/core";

export class ServerElementComponent implements OnInit {
  @Input("srvElement") element: { type: string; name: string; content: string };
  // ...
}
```

**Passing values up to a parent element**

- [Output](https://angular.io/api/core/Output)
- [EventEmitter](https://angular.io/api/core/EventEmitter)

For example, if a `app-cockpit` (child) is nested in `app.component` (parent), and an event will be triggered in the child and pass information to its parent:

`app.component.html`

```html
<app-cockpit (serverCreated)="onServerAdded($event)"></app-cockpit>
```

`app.component.ts`

```typescript
export class AppComponent {
  serverElements = [];

  onServerAdded(serverData: { serverName: string; serverContent: string }) {
    this.serverElements.push({
      type: "server",
      name: serverData.serverName,
      content: serverData.serverContent,
    });
  }
}
```

`cockpit.component.ts`

```typescript
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();

  newServerName = "";
  newServerContent = "";

  onAddServer() {
    this.serverCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent,
    });
  }
}
```

## View Encapsulation

- [Encapsulation](https://angular.io/api/core/Component#encapsulation)

Angular has a feature similar to the **Shadow DOM**. While using it, we are sure that the element's style will not clash with other nodes of the DOM.

By default, `ViewEncapsulation` is set to `emulated`, which means Angular is encapsulating the components, but not using Shadow DOM, which is not supported by every browser.

To change its configuration, the `@Component()` decorator has to be changed:

```typescript
@Component({
  // ...
  encapsulation: ViewEncapsulation.None // it can be Emulated, None and ShadowDom
})
```

## Local References

## ViewChild()

## ng-content directive

## Lifecycle hooks

| Method                | When it's called                                        |
| --------------------- | ------------------------------------------------------- |
| ngOnChanges           | after input property changes                            |
| ngOnInit              | once, when initialized                                  |
| ngDoCheck             | during every change detection                           |
| ngAfterContentInit    | after content (ng-content) has been projected into view |
| ngAfterContentChecked | every time projected content has been checked           |
| ngAfterViewInit       | after component and child views initialized             |
| ngAfterViewChecked    | every time view and child view have been checked        |
| ngOnDestroy           | right before the component is destroyed                 |
