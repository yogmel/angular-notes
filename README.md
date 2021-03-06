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

Components are the basic part of Angular anatomy project - they present the layout.

Usually, each folder contains the files of this component.

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

<div [ngSwitch]="value">
  <p *ngSwitchCase="5">Value is 5</p>
  <p *ngSwitchCase="10">Value is 10</p>
  <p *ngSwitchDefault>Value is default</p>
</div>
```

**Attribute directives**
Change the appearance or behavior of an element.

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

** Custom Directives**

- [@Directive](https://angular.io/api/core/Directive)

The filename anatomy should be `name-of-directive.directive.ts`, and there should be a `@Directive` decorator.

```ts
import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appBasicHighlight]",
})
export class BasicHighlightDirective {
  constructor(private elementReference: ElementRef) {}
}
```

In the `app.module.ts`, there should be an import of the directive as well.

Some notes:

- It is not recommended to change DOM properties directly in the directive, as there can be a rendering issue. The best practice is to use `Renderer2`. It should be used on any DOM manipulation.

- [Renderer2](https://angular.io/api/core/Renderer2);

```ts
import { Directive, OnInit, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      "background-color",
      "blue"
    );
  }
}
```

- There is a way to create an event listener using the `@HostListener` decorator. And to bind a DOM property to the element, use the `@HostBinding`.

- [@HostListener](https://angular.io/api/core/HostListener);
- [@HostBinding](https://angular.io/api/core/HostBinding);

```ts
import {
  // ...
  HostBinding,
  HostListener,
} from "@angular/core";

export class CustomDirective {
  @HostBinding("style.backgroundColor") backgroundColor: string = "transparent";

  // ...

  @HostListener("click") onClick(eventData: Event) {
    // ...
  }
}
```

- To create structural directives, there are a couple of elements that can be used: `TemplateRef` to refer to the content in the DOM and `ViewContainerRef` to use its manipulation methods.

- [TemplateRef](https://angular.io/api/core/TemplateRef);
- [ViewContainerRef](https://angular.io/api/core/ViewContainerRef);

```ts
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appUnless]",
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
```

```html
<div *appUnless="onlyOdd">
  <li *ngFor="let even of evenNumbers">{{ even }}</li>
</div>
```

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

Note: the parameter has to be `$event` to get the data back from the child component.

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

- [Template reference variables](https://angular.io/guide/template-syntax#template-reference-variables-var)

You can reference an element and a directive, for example, within a template. To do that, you need to add a reference to that target element, as `#var`.

`cockpit.component.html`

```html
<input type="text" class="form-control" #serverContentInput />
<button (click)="onAddServer(serverNameInput)">Add Server</button>
```

In this example, the `input` element has a reference of `serverContentInput`. This is passed as a parameter in the callback in the button click event.

## ViewChild() and ContentChild()

- [ViewChild](https://angular.io/api/core/ViewChild);

`ViewChild` is a decorator that watches a specific query - if the view DOM is changed and a new child matches the selector, the property is updated.

Anatomy: `@ViewChild(selector, { static: true } )`. `static` defines the time of the query resolution, which can be before (`true`) or after (`false`, default) change detection run.

We can specify that what it receives is a `ElementRef`, an Angular type.

`cockpit.component.html`

```html
<input type="text" class="form-control" #serverContentInput />
```

`cockpit.component.ts`

```typescript
import { ViewChild, ElementRef, Component } from "@angular/core";

export class CockpitComponent {
  @ViewChild("serverContentInput", { static: true })
  serverContentInput: ElementRef;
  // ...
}
```

## ng-content directive and ContentChild()

- [ContentChild](https://angular.io/api/core/ContentChild#description);

Instead of using the same content in components, you can pass content between opening and closing tags of a component. This can be used calling `<ng-content></ng-content>` placeholder.

`app.component.html`

```html
<app-server-element
  *ngFor="let serverElement of serverElements"
  [srvElement]="serverElement"
>
  <p #contentParagraph>
    <strong *ngIf="element.type === 'server'" style="color: red"
      >{{ element.content }}</strong
    >
    <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
  </p>
</app-server-element>
```

`server-element.component.html`

```html
<div class="panel-body">
  <ng-content></ng-content>
</div>
```

Accessing the `#contentParagraph` local reference will not work, because it is not part of the `server-element` view.

Instead of referencing via `ViewChild`, `ContentChild` has to be used. It is set on the `ngAfterContentInit()` lifecycle hook.

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

## Services

- [Injectable](https://angular.io/api/core/Injectable);
- [Singleton services](https://angular.io/guide/singleton-services);

Services are classes that are used to save or fetch data, and can be used across components. They can be injected in the component, which can be used by its child components, or it can be injected in the `app.component.ts`, which makes this service available across all components.

`example.service.ts`
```ts
import { Injectable } from '@angular/core';

@Injectable()
export class ExampleService {}
```

If you want this service to be available **across all components**:

`app.module.ts`
```ts
import { ExampleService } from './services';

@NgModule({
  providers: [ExampleService]
})
```

`app.component.ts`
```ts
@Component({
  // ...
  providers: [AccountsService]
})
export class AppComponent implements OnInit {
  constructor(private accountServices: AccountsService){}
}
```

To **use the service in a component**, import the service, add to the `providers` array in the `@Component` decorator and initializes it into the `constructor()`:

`component-example.component.ts`
```ts
import { ExampleService } from './services';

@Component({
  // ...
  providers: [ExampleService] // this will need to be added in case the service is not in the app.module.ts
})
export class ExampleComponent {
  constructor(private exampleService: ExampleService) {}
}
```

It is important to know that if the service is providing data that you want to be accessible by other components, you should instanciate in the `app.component.ts` or in a parent component. If there are multiple instances, then the data would not be shared.

**Services in Angular 6+**

There is a way of adding a service class globally in the app, instead of adding it into the `providers[]` array, a parameter can be passed in `@Injectable()`:

`example.service.ts`
```ts
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ExampleService {}
```

Although the other methods are still supported, this way allows the service to be lazy loaded, to increase performance.

**Injecting services into services**

`another.service.ts`
```ts
import { ExampleService } from './example.service';

@Injectable()
export class AnotherService {
  constructor(private exampleService: ExampleService) {}
}
```
