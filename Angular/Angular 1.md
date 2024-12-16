[Angular](https://angular.dev/tutorials/learn-angular/)

# [Components in Angular](https://angular.dev/tutorials/learn-angular/1-components-in-angular)
I componenti sono i blocchi fondamentali per qualsiasi applicazione Angular. Ogni componente è composto da tre parti:
- Classe TypeScript
- Template HTML
- Stili CSS

```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    Hello Universe
  `,
  styles: `
    :host {
      color: #a144eb;
    }
  `,
})
export class AppComponent {}
```

# [Updating the Component Class](https://angular.dev/tutorials/learn-angular/2-updating-the-component-class)
In Angular, la logica e il comportamento del componente sono definiti nella classe TypeScript del componente.

Nella classe `appComponent` è possibile definire una proprietà `city` e può essere riferita nel template del componente.

Per utilizzare una proprietà della classe in un template, bisogna usare la sintassi `{{ }}`.
```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `Hello {{ city }}, {{ 1 + 1 }}`,
})
export class AppComponent {
  city = 'San Francisco';
}
```

La proprietà `selector` della configurazione del componente ti fornisce un nome da utilizzare quando fai riferimento al componente in un altro template. 
Il `selector` si comporta come un tag HTML, ad esempio `app-user` sarà `<app-user />` nel template.

In questo esempio, il componente `AppComponent` utilizza il selector `<app-user />` per inserire il componente `UserComponent` nel suo template:
Il selector `app-root` importa il componente `app-user` tramite  `<app-user />` che usa il valore `username` definito nella classe `UserComponent`.
```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    Username: {{ username }}
  `,
})
export class UserComponent {
  username = 'youngTech';
}

@Component({
  selector: 'app-root',
  template: `<section><app-user /></section>`,
  imports: [UserComponent]
})
export class AppComponent {}
```

# [Control Flow in Components - `@if`](https://angular.dev/tutorials/learn-angular/4-control-flow-if)
Per esprimere visualizzazioni condizionali nei template, Angular utilizza la sintassi `@if` nel template.
```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    @if (isLoggedIn) {
      <p>Welcome back, Friend!</p>
    }
  `,
})
export class AppComponent {
  isLoggedIn = true;
}
```

```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    @if (isLoggedIn) {
      <p>Welcome back, Friend!</p>
    }
    @if (isServerRunning){
      <h1>Yes, the server is running</h1>
    } @else {
      <h1>No, the server is not running :( </h1>
    }
  `,
})
export class AppComponent {
  isLoggedIn = true;
  isServerRunning = true;
}
```

# [Control Flow in Components - `@for`](https://angular.dev/tutorials/learn-angular/5-control-flow-for)
In un ciclo `@for`, l'attributo `track` viene utilizzato per indicare una chiave unica per ogni elemento, in modo che Angular possa identificare, aggiungere, rimuovere o aggiornare gli elementi in modo ottimale durante i cambiamenti dello stato.
```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    @for (os of operatingSystems; track os.id) {
      {{ os.name }}
    }
    @for (user of users; track user.id) {
      <p>{{ user.name }}</p>
    }
  `,
})
export class AppComponent {
  operatingSystems = [{id: 'win', name: 'Windows'}, {id: 'osx', name: 'MacOS'}, {id: 'linux', name: 'Linux'}];
  users = [{id: 0, name: 'Sarah'}, {id: 1, name: 'Amy'}, {id: 2, name: 'Rachel'}, {id: 3, name: 'Jessica'}, {id: 4, name: 'Poornima'}];
}
```
In questo modo, quando l'elenco di users cambia (ad esempio, un utente viene aggiunto o rimosso), Angular può aggiornare solo gli elementi modificati, piuttosto che ricreare l'intero elenco, migliorando le prestazioni.

# [Property Binding in Angular](https://angular.dev/tutorials/learn-angular/6-property-binding)

Il binding delle proprietà in Angular ti consente di impostare valori per le proprietà degli elementi HTML, dei componenti Angular e altro ancora.

Usa il binding delle proprietà per impostare dinamicamente i valori delle proprietà e degli attributi.

```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.css'],
  template: `
    <div contentEditable="false">NOT editable content</div>
    <div [contentEditable]="isEditable">editable content</div>
  `,
})
export class AppComponent {
    isEditable = true;
}
```

# [Event handling](https://angular.dev/tutorials/learn-angular/7-event-handling)
In Angular, puoi associare gli eventi utilizzando la sintassi delle parentesi `()`. Su un dato elemento, racchiudi l'evento a cui vuoi associare un gestore con le parentesi e imposta un gestore dell'evento.
```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <section (mouseover)="onMouseOver()" (mouseout)="onMouseOut()">
      There's a secret message for you, hover to reveal 👀
      {{ message }}
    </section>
  `,
})
export class AppComponent {
  message = '';

  onMouseOver() {
    this.message = 'Way to go 🚀';
  }
  onMouseOut() {
    this.message = '';
  }
}
```

# [Component Communication with `@Input`](https://angular.dev/tutorials/learn-angular/8-input)

```ts

```


```ts

```


```ts

```


```ts

```

```ts

```


```ts

```


```ts

```


```ts

```