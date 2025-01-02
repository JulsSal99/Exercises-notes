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
  // o alternativamente 
  // templateUrl: './notes-list.component.html',
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
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p>
    
    @for (item of items; track $index) {
      {{ item }}
    }
    </p>
  `,
})
export class AppComponent {
  items = [1, 2, 3, 4];
}
```



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

# Listing Notes

E' possibile definire elementi esterni:
```ts
//notes.ts
export interface Note {
  id: number;
  title: string;
  text: string;
}
export const NOTES: Note[] = [
  {
    id: 1,
    title: 'Lorem ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    title: 'Shakespeare',
    text: 'To be, or not to be: that is the question.',
  },
];
```

```ts
//notes-list/notes-list.component.ts
import { Component } from '@angular/core';
import { NOTES } from '../notes';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  template: `
  @for (note of notes; track $index) {
  <span class="note-title">{{ note.title }}</span>
  <span class="note-text">{{ note.text }}</span>
  }
  `,
  styleUrl: './notes-list.component.css',
})
export class NotesListComponent {
  notes = NOTES;

  show(title: string) {
    alert(title);
  }
}
```

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

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p [class.red]="isRed">some text for our page</p>
    <button (click)="change()">
      Switch Background Color
    </button>
  `,
})
export class AppComponent {
  isRed = false;

  change() {
    this.isRed = !this.isRed;
  }
}
```

# [Component Communication with `@Input`](https://angular.dev/tutorials/learn-angular/8-input)
Per l'invio di dati a un componente angular usa l'`@Input()`. 
Questi dati possono essere utilizzati per inviare informazioni da un componente genitore a un componente figlio.

Per creare una proprietà Input, aggiungi il decoratore `@Input` a una proprietà della classe del componente:

```ts
user.component.ts
class UserComponent {
  @Input() occupation = '';
}
```
e per passare i valori:

```ts
@Component({
  ...
  template: `<app-user occupation="Angular Developer"></app-user>`
})
class AppComponent {}
```

# [Component Communication with `@Output`](https://angular.dev/tutorials/learn-angular/9-output)

Angular usa `@Output` per notificare altri componenti che qualcosa è cambiato.

```ts
import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-child',
  styles: `.btn { padding: 5px; }`,
  template: `
    <button class="btn" (click)="addItem()" >Add Item</button>
  `,
})
export class ChildComponent {
  addItem() {
    this.addItemEvent.emit('🐢');
  };
  @Output() addItemEvent = new EventEmitter<string>();
  
}
```

```ts
import {Component} from '@angular/core';
import {ChildComponent} from './child.component';

@Component({
  selector: 'app-root',
  template: `
    <app-child (addItemEvent)="addItem($event)" />
    <p>🐢 all the way down {{ items.length }}</p>
  `,
  imports: [ChildComponent],
})
export class AppComponent {
  items = new Array();

  addItem(item: string) {
    this.items.push(item);
  }
}
```

# [Deferrable Views](https://angular.dev/tutorials/learn-angular/10-deferrable-views)


- `@defer (on viewport) { <comments /> }` : carica il componente quando il browser è in idle.
Questa parte indica che i commenti devono essere caricati solo quando sono visibili nel viewport (ovvero quando l'utente scorre e i commenti appaiono sullo schermo). 
- `@placeholder { <p>Future comments</p> }` : definisce un segnaposto (placeholder) che viene mostrato prima che i commenti veri e propri siano caricati.
- `@loading (minimum 2s) { <p>Loading comments...</p> }` : quando i commenti sono in fase di caricamento, viene mostrato un messaggio di caricamento. 

# [Optimizing images](https://angular.dev/tutorials/learn-angular/11-optimizing-images)
Per gestire l'ottimizzazione delle immagini:

```ts
import { NgOptimizedImage } from '@angular/common';
@Component({
    template: `
  ...
    <img ngSrc="www.example.com/image.png" height="600" width="800" priority />
    <img ngSrc="www.example.com/image.png" fill /> `
  ...
    imports: [NgOptimizedImage],
  ...
})
```

# [Routing Overview](https://angular.dev/tutorials/learn-angular/12-enable-routing)

```ts
//app.routes.ts
import {Routes} from '@angular/router';

export const routes: Routes = [];
```

```ts
//app.component.ts
import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a href="/">Home</a>
      |
      <a href="/user">User</a>
    </nav>
    <router-outlet />
  `,
  imports: [RouterOutlet],
})
export class AppComponent {}
```

```ts
//app.config.ts
import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```


# [Define a Route](https://angular.dev/tutorials/learn-angular/13-define-a-route)

Per definire delle routes, dichiarare in app.routes.ts nei due import le due pagine usate.

```ts
//app.routes.ts
import {Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';

export const routes: Routes = [
  {
    path: '',
    title: 'App Home Page',
    component: HomeComponent,
  },
  {
    path: 'user',
    title: 'App User Page',
    component: UserComponent,
  },
];
```

```ts
import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div>Home Page</div>
  `,
})
export class HomeComponent {}
```


## [Use RouterLink for Navigation](https://angular.dev/tutorials/learn-angular/14-routerLink)

RouterLink viene usato per specificare la rotta a cui navigare. È simile all'attributo href di un tag <a>, ma invece di causare un ricaricamento completo della pagina, sfrutta la logica di routing interna di Angular per aggiornare solo la vista.

```ts
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  ...
  template: `
    ...
    <a routerLink="/">Home</a>
    <a routerLink="/user">User</a>
    ...
  `,
  imports: [RouterLink, RouterOutlet],
})
```

# [Forms Overview](https://angular.dev/tutorials/learn-angular/15-forms)

Per creare un form di input

```ts
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user',
  template: `
    <label for="framework">
      Favorite Framework:
      <input id="framework" type="text" [(ngModel)]="favoriteFramework" />
    </label>
  `,
  imports: [FormsModule],
})
export class UserComponent {
  favoriteFramework = '';
}

```

# [Getting form control value](https://angular.dev/tutorials/learn-angular/16-form-control-values)

Quando hai bisogno di fare riferimento al valore del campo di input nella classe del componente, puoi farlo accedendo alla proprietà della classe con la sintassi this.

```ts
<button (click)="showFramework()">Show Framework</button>
[...]
showFramework() {
    alert(this.favoriteFramework);
  }
```

# [Reactive Forms](https://angular.dev/tutorials/learn-angular/17-reactive-forms)

```ts
import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
      <input type="text" formControlName="name" />
      <input type="email" formControlName="email" />
      <button type="submit">Submit</button>
    </form>

    <h2>Profile Form</h2>
    <p>Name: {{ profileForm.value.name }}</p>
    <p>Email: {{ profileForm.value.email }}</p>
  `,
  imports: [ReactiveFormsModule],
})
export class AppComponent {
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });

  handleSubmit() {
    alert(this.profileForm.value.name + ' | ' + this.profileForm.value.email);
  }
}
```

# [Validating forms](https://angular.dev/tutorials/learn-angular/18-forms-validation)

```ts
import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="profileForm">
      <input type="text" formControlName="name" name="name" />
      <input type="email" formControlName="email" name="email" />
      <button type="submit" [disabled]="!profileForm.valid" (ngSubmit)="login()">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class AppComponent {
  profileForm = new FormGroup({
    name: new FormControl('Juls', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  login() {
    alert(
      this.profileForm.value.name +
      ' | ' + 
      this.profileForm.value.email
    );
  }
}

```

Esiste anche il tasto **reset**:
```ts
<form [formGroup]="myForm">
...
<input type="button"
value="Reset"
(click) = "myForm.reset()" />
```


Un'altro metodo è usare :

```ts
<form (ngSubmit)="showName()" #myForm="ngForm">
  <input type="text" [(ngModel)]="name" name="name" required />
  <input type="submit" value="Submit" [disabled]="!myForm.form.valid" />
</form>
```

Angular ha delle specifiche classi per gli input validi e invalidi:

```ts
/* Add application styles & imports to this file! */
input.ng-valid {
  background-color: #79ba6a;
}
input.ng-invalid {
  background-color: #f58c84;
}
```



Esempio di validazione con risposta visiva:

```ts
import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="profileForm">
      <input type="text" formControlName="name" name="name" />
      <input type="email" formControlName="email" name="email" (blur)="onBlur()"/>
      
      <button type="submit" [disabled]="!profileForm.valid">Submit</button>
      <div *ngIf="profileForm.controls['email'].touched && profileForm.controls['email'].invalid">
          <small style="color: red;">Email errata</small>
        </div>
    </form>
  `,
  imports: [ReactiveFormsModule, CommonModule],
})
export class AppComponent {
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  onBlur() {
    // Forza il controllo a essere "touched" quando l'utente esce dal campo
    this.profileForm.get('email')?.markAsTouched();
  }
}
```


# [Creating an injectable service](https://angular.dev/tutorials/learn-angular/19-creating-an-injectable-service)

L'iniezione delle dipendenze (Dependency Injection, DI) è un design pattern che consente di ottenere le risorse di cui un componente o servizio ha bisogno senza che questi debbano crearsele da soli. 
Considera l'iniezione delle dipendenze come la capacità di Angular di fornire le risorse di cui hai bisogno per la tua applicazione durante l'esecuzione. Una dipendenza potrebbe essere un servizio o altre risorse (una get, una post, etc.).
Un modo per utilizzare un servizio è farlo agire come un mezzo per interagire con i dati e le API.

```ts
//car.service.ts
@Injectable({
  providedIn: 'root',
})
export class CarService {
  cars = ['Sunflower GT', 'Flexus Sport', 'Sprout Mach One'];

  getCars(): string[] {
    return this.cars;
  }

  getCar(id: number) {
    return this.cars[id];
  }
}
```
`@Injectable Decorator`: Il decoratore `@Injectable` segnala a Angular che questa classe è un servizio che può essere iniettato in altri componenti o servizi. L'opzione `providedIn: 'root'` significa che il servizio è disponibile a livello di applicazione, cioè è istanziato una sola volta e condiviso in tutto il progetto.


```ts
import {Component, inject} from '@angular/core';
import {CarService} from './car.service';

@Component({
  selector: 'app-root',
  template: '<p> {{ carService.getCars() }} </p>',
})
export class AppComponent {
  carService = inject(CarService);  // Iniezione del servizio
}
```


# [Inject-based dependency injection](https://angular.dev/tutorials/learn-angular/20-inject-based-di)

```ts
import {Component, inject} from '@angular/core';
import {CarService} from './car.service';

@Component({
  selector: 'app-root',
  template: `<p>Car Listing: {{ display }}</p>`,
})
export class AppComponent {
  display = '';
  carService = inject(CarService);
  
  constructor() {
    this.display = this.carService.getCars().join(' ⭐️ ');
  }
}
```

`inject()` permette di iniettare un servizio dentro un componente per poterlo richiamare tramite le sue varie funzioni.

```ts
import {Component, inject} from '@angular/core';
import {CarService} from './car.service';

@Component({
  selector: 'app-root',
  template: `<p>Car Listing: {{ display }}</p>`,
})
export class AppComponent {
  
  carService = inject(CarService);
  display = this.carService.getCars().join(' ⭐️ ');;
  
}
```


# [Constructor-based dependency injection](https://angular.dev/tutorials/learn-angular/21-constructor-based-di)

Per iniettare un servizio o altre risorse nel componente, puoi usare un costruttore.
Il costruttore è il punto di ingresso in cui Angular inietta le dipendenze. Quando un componente viene creato, Angular analizza i parametri del costruttore e si occupa di passare automaticamente le dipendenze necessarie (in questo caso, il servizio PetCareService) al costruttore del componente.
L'iniezione delle dipendenze nel costruttore permette a Angular di gestire la creazione e la durata degli oggetti (servizi, componenti, etc.). Angular fa uso del suo iniettore di dipendenze per gestire in modo automatico l'istanza di PetCareService.

```ts
@Component({
  selector: 'app-pet-car-dashboard',
  templateUrl: './pet-car-dashboard.component.html',
  styleUrls: ['./pet-car-dashboard.component.css']
})
export class PetCarDashboardComponent {
  // Il servizio è iniettato tramite il costruttore
  constructor(private petCareService: PetCareService) {
    // Inizializzazione del componente
  }
}
```
 - `private`: è utilizzata per dichiarare e inizializzare una proprietà della classe in modo automatico. `petCareService` sarà accessibile solo all'interno della classe PetCarDashboardComponent.
 - Il petCareService diventa una proprietà che puoi utilizzare nella tua classe
 - La classe PetCareService è la classe iniettata

# [Pipes](https://angular.dev/tutorials/learn-angular/22-pipes)
I pipe vengono utilizzati per modificare e formattare i dati in modo che vengano visualizzati nel formato desiderato, senza doverli modificare direttamente nel codice della logica del componente, ma solo tramite il pipe `|`.

```ts
import {Component} from '@angular/core';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `{{username | lowercase }}`,
  imports: [LowerCasePipe],
})
export class AppComponent {
  username = 'yOunGTECh';
}
```


# [Formatting data with pipes](https://angular.dev/tutorials/learn-angular/23-pipes-format-data)

Esempio di formattazione con pipes:
```ts
import {Component} from '@angular/core';
import {DecimalPipe, DatePipe, CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li>Number with "decimal" {{ num | number:"3.2-2" }}</li> // {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
      <li>Date with "date" {{ birthday | date: 'medium' }}</li>
      <li>Currency with "currency" {{ cost | currency }}</li>
    </ul>
  `,
  imports: [DecimalPipe, DatePipe, CurrencyPipe],
})
export class AppComponent {
  num = 103.1234;
  birthday = new Date(2023, 3, 2);
  cost = 4560.34;
}
```

# [Create a custom pipe](https://angular.dev/tutorials/learn-angular/24-create-a-pipe)

un pipe è semplicemente una classe TypeScript con il decoratore `@Pipe`:
```ts
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'star',
})
export class StarPipe implements PipeTransform {
  transform(value: string): string {
    return `⭐️ ${value} ⭐️`;
  }
}
```

```ts
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'reverse'
})

export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    let reverse = '';

    for (let i = 1; i <= value.length; i++){
      reverse += value[value.length-i];
    }
    return reverse;
  }
}
```


```ts
// app.component
  template: `
    Reverse Machine: {{ word | reverse }}
  `,
  imports: [ReversePipe],
```
