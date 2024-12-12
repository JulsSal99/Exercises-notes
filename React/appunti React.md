[text](https://react.dev/learn)

ALTER TABLE [dbo].[Curve] ADD CONSTRAINT UQ_Curve_Tickets UNIQUE ([IdGara], [CurvaN]);

SELECT *
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE TABLE_NAME = 'Curve';

ALTER TABLE Curve
DROP CONSTRAINT UQ_Prezzi_ID_gara_ID_Curva;

# Quick Start
## Creare e annidare componenti 
I componenti React iniziano con la maiuscola
```jsx
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
```

App.js
```jsx
function MyButton() {
  return (
    <button>
      I'm a button creayed by {user.name}
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

Il contenitore non può ritornare più tag html. Per questo si usano `<>...</>`
```jsx
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```

React non stabilisce come aggiungi i file CSS. Nel caso più semplice, aggiungerai un tag `<link>` al tuo HTML. 
```jsx
<img className="avatar"
src={user.imageUrl} />
```
```css
/* Nel tuo CSS */
.avatar {
  border-radius: 50%;
}
```

```jsx
return (
  <img
    className="avatar"
    src={user.imageUrl}
  />
);
```

```jsx
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```


## Rendering condizionale 
Ciclo If:
```jsx
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```

```jsx
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);
```
Compatto:
```jsx
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
```

## Renderizzare liste 
```jsx
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
```

## Rispondere agli eventi 
```jsx
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

## Aggiornare lo schermo (React Hooks API)
Le funzioni che iniziano con use sono chiamate **Hook**. 
Per ricordare un valore precedentemente definito:
`useState` ottiene lo state attuale (count) e la funzione che ti consente di aggiornarlo (setCount).
```jsx
import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```
Ogni volta che crei un'istanza del componente MyButton, viene creata una nuova e separata "copia" dello stato.

## Condividere dati tra componenti 

```jsx
export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```

# tic-tac-toe
[React online editor](https://codesandbox.io/p/sandbox/j67kkz)

```jsx
export default function Square() {
  return <button className="square">X</button>;
}
```
La keyword di JavaScript `export` rende questa funzione accessibile dall'esterno di questo file. 
La keyword `default` dice agli altri file che stanno usando il tuo codice che è la funzione principale nel tuo file.

In Index.css

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App';
```




```jsx
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = 'X';
    setSquares(nextSquares);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

```
squares.slice(); crea una porzione di array con gli stessi elementi e valori.
Nota la nuova sintassi () =>. Qui, () => handleClick(0) è un’arrow function, che è un modo più breve per definire le funzioni. Quando si fa click sul quadrato, il codice dopo la => “freccia” verrà eseguito, chiamando handleClick(0).

```jsx
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
```

## Dichiarare un vincitore 
```jsx
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(Squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [p1, p2, p3] = lines[i];
      if (squares[p2] == Squares[p1] && squares[p3] == Squares[p1]) {
        return Squares[p1];
      }
    }
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
```

## Aggiungere il viaggio nel tempo 

```csharp
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

```

# Pensare in React
![s_thinking-in-react_ui_outline.png](/img/s_thinking-in-react_ui_outline.png)
In questa schermata ci sono cinque componenti:
1. *`FilterableProductTable` (grigio)* contiene l’intera app.
    1. *`SearchBar` (blu)* riceve l’input dell’utente.
    2. *`ProductTable` (lavanda)* mostra e filtra la lista in relazione all’input dell’utente.
        1. *`ProductCategoryRow` (verde)* mostra un titolo per ogni categoria.
        2. *`ProductRow` (giallo)* mostra una riga per ogni prodotto.


```jsx
const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
      <label>
        <input type="checkbox" /> Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

```

Per costruire una versione statica della tua app che renderizza il tuo modello di dati, vorrai costruire componenti che riutilizzano altri componenti e passano dati usando props. Le Props sono un modo per passare dati da genitore a figlio. (Se hai familiarità con il concetto di state, non usare lo state per costruire questa versione statica. Lo state è riservato solo all’interattività, ovvero i dati che cambiano nel tempo. 

```jsx
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase()
      .indexOf(filterText.toLowerCase() ) === -1 ) {
      return; // non ritorna nulla. Quindi va al prossimo prodotto
    }
    if (inStockOnly && !product.stocked) {
      return; // non ritorna nulla. Quindi va al prossimo prodotto
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      ); // serve a stampare il titolo della categoria
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    ); 
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText} placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

```

# Using TypeScript ([link](https://it.react.dev/learn/typescript))
```jsx
import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark" | "system";
const ThemeContext = createContext<Theme>("system");

const useGetTheme = () => useContext(ThemeContext);

export default function MyApp() {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={theme}>
      <MyComponent />
      <button onClick={toggleTheme}>Toggle Theme</button>
    </ThemeContext.Provider>
  );
}

function MyComponent() {
  const theme = useGetTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
    </div>
  );
}

```
ThemeContext è creato tramite la funzione createContext, che inizializza il valore del contesto a "system". Questo contesto permetterà ai componenti di accedere e modificare il valore del tema senza dover passare esplicitamente le props.




```jsx
import { createContext, useContext, useState, useMemo } from 'react';

// This is a simpler example, but you can imagine a more complex object here
type ComplexObject = {
  kind: string
};

// Qui viene creato un contesto React chiamato Context
const Context = createContext<ComplexObject | null>(null);

// The `| null` will be removed via the check in the Hook.
const useGetComplexObject = () => {
  const object = useContext(Context); //  per ottenere il valore dal contesto Context.
  if (!object) { throw new Error("useGetComplexObject must be used within a Provider") }
  return object;
}

export default function MyApp() {
  const object = useMemo(() => ({ kind: "complex" }), []);

  return (
    <Context.Provider value={object}>
      <MyComponent />
    </Context.Provider>
  )
}

function MyComponent() {
  const object = useGetComplexObject(); // per ottenere il valore del contesto, che è l'oggetto con la proprietà kind.

  return (
    <div>
      <p>Current object: {object.kind}</p>
    </div>
  )
}
```

`useMemo` è utilizzato per evitare che l'oggetto venga ricreato in ogni render, creando così un valore stabile (che non cambia a meno che le sue dipendenze cambino, in questo caso vuote `[]`).

## useMemo
Il Hook `useMemo` crea/rivede un valore memorizzato da una chiamata di funzione, rieseguendo la funzione solo quando le dipendenze passate come secondo parametro vengono modificate. Il risultato della chiamata al Hook è dedotto dal valore di ritorno della funzione nel primo parametro. È possibile essere più espliciti fornendo un tipo come argomento del Hook.

```jsx
// Il tipo di visibleTodos è dedotto dal valore di ritorno di filterTodos
const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
```

`useMemo` restituisce un risultato memorizzato (**valore**), quindi si usa per evitare ricalcoli.

## useCallback
Il Hook `useCallback` fornisce un riferimento stabile a una funzione finché le dipendenze passate nel secondo parametro rimangono le stesse.

```jsx
const handleClick = useCallback(() => {
  // ...
}, [todos]);
```

`useCallback` restituisce un riferimento **funzione** memorizzato, quindi si usa per evitare la ricreazione della funzione stessa.

Esempio: 
```jsx
import { useState, useCallback } from 'react';

export default function Form() {
  const [value, setValue] = useState("Change me");

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    setValue(event.currentTarget.value);
  }, [setValue])
  
  return (
    <>
      <input value={value} onChange={handleChange} />
      <p>Value: {value}</p>
    </>
  );
}
```

```jsx
import { useState } from 'react';

export default function Form() {
  const [value, setValue] = useState("Change me");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  return (
    <>
      <input value={value} onChange={handleChange} />
      <p>Value: {value}</p>
    </>
  );
}

```

## React.ReactNode
React.ReactNode è un tipo che include qualsiasi cosa che React possa renderizzare, come:
- stringhe o numeri (per esempio, testo in un paragrafo).
- elementi React (come un altro componente).
- frammenti di JSX.
- array di questi elementi.

```jsx
interface ModalRendererProps {
  title: string;
  children: React.ReactNode;
}
```

## React.ReactElement
React.ReactElement è un tipo più specifico rispetto a React.ReactNode. 
Si tratta di un oggetto che rappresenta un elemento React vero e proprio:
- un componente, 
- un tag HTML 
- un altro tipo di elemento React.
A differenza di React.ReactNode, si riferisce solo a ciò che è un elemento React. 

```jsx
interface ModalRendererProps {
  title: string;
  children: React.ReactElement;
}
```

## React.CSSProperties
React.CSSProperties è un tipo che rappresenta uno stile in formato oggetto, simile a come viene definito un oggetto di stili in React. 
Questo tipo è utile per descrivere il tipo delle proprietà CSS passate tramite la prop style.

```jsx
interface MyComponentProps {
  style: React.CSSProperties;
}
```
Esempio:
```jsx
<div style={{ backgroundColor: 'red', fontSize: '16px' }}>Content</div>
```

# React Compiler 
```jsx
npm install -D babel-plugin-react-compiler@beta eslint-plugin-react-compiler@beta
```

# Descrivere la UI
In Gallery.js:
```jsx
import Profile from './Profile.js';

export default function Gallery() {
  return (
    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
```

In Profile.js
```jsx
export default function Profile() {
  return (
    <img
      src="https://i.imgur.com/QIrZWGIs.jpg"
      alt="Alan L. Hart"
    />
  );
}

```

```jsx
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src="https://i.imgur.com/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

### passare componenti a un figlio e rendering condizionale
App.js
```jsx
import { getImageUrl } from "./utils.js";

export default function Profile() {
  return (
    <Card>
      <Avatar
        isCorrect={true}
        size={100}
        person={{
          name: "Katsuko Saruhashi",
          imageId: "YfeOqp2",
        }}
      />
    </Card>
  );
}

function Avatar({ isCorrect, person, size }) {
  if (isCorrect) {
    return (
      <img
        className="avatar"
        src={getImageUrl(person)}
        alt={person.name}
        width={size}
        height={size}
      />
    );
  }
}

function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

In Utils.js
```jsx
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}
```

### Rendering di liste

```jsx
import { people } from './data.js';
import { getImageUrl } from './utils.js';

export default function List() {
  const listItems = people.map(person =>
    <li key={person.id}>
      <img
        src={getImageUrl(person)}
        alt={person.name}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>
  );
  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </article>
  );
}

```

**Cambiare variabili preesistenti è altamente sconsigliato. Meglio passare per parametro.**

```jsx
function Cup({ guestCup }) {
  return <h2>Tea cup for guest #{guestCup}</h2>;
}

export default function TeaSet() {
  const guests = 3;
  const cups = [];

  // Ciclo for per generare i componenti
  for (let guest = 0; guest < guests; guest++) {
    cups.push(<Cup key={guest} guestCup={guest} />);
  }

  // Restituzione dei componenti
  return <>{cups}</>;
}
```

Una soluzione è la seguente:
```jsx
function Cup({ guestCup }) {
  return <h2>Tea cup for guest #{guestCup}</h2>;
}

export default function TeaSet() {
  const guests = 3;
  const cups = [];

  // Ciclo for per generare i componenti
  for (let guest = 0; guest < guests; guest++) {
    cups.push(<Cup key={guest} guestCup={guest} />);
  }

  // Restituzione dei componenti
  return <>{cups}</>;
}
```

## Il Tuo Primo Componente ([link](https://it.react.dev/learn/your-first-component))

### Annidare i componenti ()
I componenti React sono normali funzioni JavaScript, ma il loro nome **deve iniziare con una lettera maiuscola** o non funzionano!

```jsx
<PageLayout>
  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">Documentazione</Link>
  </NavigationHeader>
  <Sidebar />
  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>
</PageLayout>
```

I componenti possono renderizzare altri componenti, ma non si devono mai annidare le loro definizioni:

```jsx
export default function Gallery() {
  // 🔴 Non definire mai un componente all'interno di un altro componente!
  function Profile() {
    // ...
  }
  // ...
}
```

Il codice qui sopra è molto lento e causa dei bug. Invece, definisci ogni componente al livello principale:
```jsx
export default function Gallery() {
  // ...
}

// ✅ Dichiara i componenti al livello principale
function Profile() {
  // ...
}
```

### Importazione ed Esportazione di Componenti
`import Gallery from './Gallery';` permette di importare una funzione `export default function Gallery()` da un altro .js React. 

Un file non può avere più di un’esportazione default, ma può avere tutte le esportazioni nominali che si vogliono.

| **Sintassi** 	| **Dichiarazione di esportazione**   	| **Dichiarazione di importazione**     	|
|--------------	|-------------------------------------	|---------------------------------------	|
| Predefinita  	| `export default function Button() {}`	| `import Button from './Button.js';`     |
| Nominale     	| `export function Button() {}`        	| `import { Button } from './Button.js';` |

### JavaScript in JSX con le Parentesi Graffe
```jsx
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}
```

**`<{tag}>Gregorio Y. Zara's To Do List</{tag}>` non funziona.**

```jsx
export default function TodoList() {
  return (
    <ul style={{
      backgroundColor: 'black',
      color: 'pink'
    }}>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

**Le proprietà inline `style` sono scritte in camelCase. Ad esempio, l'HTML `<ul style="background-color: black"><ul style={{ backgroundColor: 'black' }}>` verrebbe scritto come nel componente.**

Si possono anche combinare variabili:
```jsx
const baseUrl = 'https://i.imgur.com/';
const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  imageSize: 's',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style={person.theme}>
      <h1>{person.name}'s Todos</h1>
      <img
        className="avatar"
        src={baseUrl + person.imageId + person.imageSize + '.jpg'}
        alt={person.name}
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
```

### Passare Props ad un Componente
Questa sintassi è chiamata **“destructuring”** ed è equivalente a leggere le proprietà da un parametro di una funzione:

```jsx
export function getImageUrl(person, size = 's') {
  return (
    'https://i.imgur.com/' +
    person.imageId +
    size +
    '.jpg'
  );
}

function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <div>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma', 
          imageId: 'OKS67lh'
        }}
      />
      <Avatar
        size={50}
        person={{ 
          name: 'Lin Lanying',
          imageId: '1bX5QH6'
        }}
      />
    </div>
  );
}

```
### Inoltrare props con la sintassi di spread JSX 

```jsx
import React from 'react';

// Componente Avatar che riceve i props
function Avatar(props) {
  return (
    <img
      src={props.imgUrl}
      alt={props.name}
      className="avatar"
      style={{ width: '100px', borderRadius: '50%' }}
    />
  );
}

// Componente Profile che riceve i props e passa i props a Avatar
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
      <h2>{props.name}</h2>
      <p>{props.bio}</p>
    </div>
  );
}

// Utilizzo del componente Profile
function App() {
  const user = {
    name: 'John Doe',
    bio: 'Software Developer',
    imgUrl: 'https://example.com/avatar.jpg'
  };

  return (
    <div>
      <Profile {...user} />
    </div>
  );
}

export default App;
```


### Passare JSX come figlio
`{ children }` è il mio parametro che viene passato, cioè Avatar
```jsx
function Avatar({ person, size }) {
  return (
    <img
      className="avatar"
      src={'https://i.imgur.com/' + person.imageId + 's' + '.jpg'}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```

```jsx
import { getImageUrl } from "./utils.js";

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile
        imageId="szV5sdG"
        name="Maria Skłodowska-Curie"
        profession="physicist and chemist"
        discovery="polonium (chemical element)"
        awards={[
          "Nobel Prize in Physics",
          "Nobel Prize in Chemistry",
          "Davy Medal",
          "Matteucci Medal",
        ]}
      />
      <Profile
        imageId="YfeOqp2"
        name="Katsuko Saruhashi"
        profession="geochemist"
        discovery="a method for measuring carbon dioxide in seawater"
        awards={["Miyake Prize for geochemistry", "Tanaka Prize"]}
      />
    </div>
  );
}

function Profile({
  imageId,
  name,
  profession,
  awards,
  discovery,
  imageSize = 70,
}) {
  return (
    <section className="profile">
      <h2>{name}</h2>
      <img
        className="avatar"
        src={getImageUrl(imageId)}
        name={name}
        profession={profession}
        discovery={discovery}
        awards={awards}
      />
      <ul>
        <li>
          <b>Profession: </b>
          {profession}
        </li>
        <li>
          <b>Awards: {awards.length} </b>
          (Nawards)
        </li>
        <li>
          <b>Discovered: </b>
          {discovery}
        </li>
      </ul>
    </section>
  );
}
```



### I commenti

```jsx
import { useState, useEffect } from "react";

function Clock({ color, time }) {
  return (
    <h1 style={{ color: color }}>
      {time}
    </h1>
  );
}

function useTime() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const time = useTime();
  const [color, setColor] = useState("lightcoral");
  return (
    <div>
      <p>
        {/* Pick a color:{" "}
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="lightcoral">lightcoral</option>
          <option value="midnightblue">midnightblue</option>
          <option value="rebeccapurple">rebeccapurple</option>
        </select> */}
      </p>
      <Clock color={color} time={time.toLocaleTimeString()} />
    </div>
  );
}
```

## Renderizzazione Condizionale

Invece di questo:
```jsx
if (isPacked) {
  return <li className="item">{name} ✅</li>;
}
return <li className="item">{name}</li>;
```

Puoi scrivere questo:

```jsx
return (
  <li className="item">
    {isPacked ? name + ' ✅' : name}
  </li>
);
```

## Renderizzare Liste

```jsx
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
```

## Mantenere i Componenti Puri

**In questo caso il key={i} serve perché ad ogni figlio della lista deve essere assegnato un identificativo univoco.**
Quando React deve aggiornare o rimuovere un elemento in una lista, utilizza le key per determinare quale elemento modificare, eliminare o aggiungere.
```jsx
function Cup({ guest }) {
  return <h2>Tazza di tè per ospite #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```

# Aggiungere le Interazioni [link](https://it.react.dev/learn/adding-interactivity)

```jsx
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert('Playing!')}
      onUploadImage={() => alert('Uploading!')}
    />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <Button onClick={onPlayMovie}>
        Play Movie
      </Button>
      <Button onClick={onUploadImage}>
        Upload Image
      </Button>
    </div>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
```
### State: La memoria di un componente 

Lo **state** è la memoria di un componente: impostarlo non modifica la variabile state che già possiedi, ma triggera un *re-render*. 

Score continua a essere 0 subito dopo aver chiamato `setScore(score + 1)`.
Puoi risolvere questo problema passando una funzione updater quando imposti lo state. Con `setScore(s => s + 1)` aggiusta il pulsante.
```jsx
const [index, setIndex] = useState(0);
const [showMore, setShowMore] = useState(false);
```

```jsx
import { useState } from 'react';

export default function Counter() {
  const [score, setScore] = useState(0);

  function increment() {
    setScore(s => s + 1);
  }

  return (
    <>
      <button onClick={() => increment()}>+1</button>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <h1>Score: {score}</h1>
    </>
  )
}
```

### Aggiornare gli oggetti nello state 
Solitamente, userai la sintassi di spread `...` per copiare gli oggetti e gli array che desideri modificare.

```jsx
function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }
```

Un'altra soluzione è usare **Immer**:
```jsx
// package.json
{
  "dependencies": {
    "immer": "1.7.3",
    "react": "latest",
    "react-dom": "latest",
    "react-scripts": "latest",
    "use-immer": "0.5.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "devDependencies": {}
}
```


```jsx
// App.js
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  [...]
```

```jsx
export default function BucketList() {
  const [list, setList] = useState(
    initialList
  );

  function handleToggle(artworkId, nextSeen) {
    setList(list.map(artwork => {
      if (artwork.id === artworkId) {
        return { ...artwork, seen: nextSeen };
      } else {
        return artwork;
      }
    }));
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={list}
        onToggle={handleToggle} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

```jsx
import { useState } from 'react';
import { useImmer } from 'use-immer';

const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [list, updateList] = useImmer(initialList);

  function handleToggle(artworkId, nextSeen) {
    updateList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={list}
        onToggle={handleToggle} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

## Rispondere agli Eventi

| **passando una funzione (corretto)**    | **chiamando una funzione (incorretto)** |
| ------------------------------------    | --------------------------------------- |
| `<button onClick={handleClick}>`        | `<button onClick={handleClick()}>`      |
| ------------------------------------    | --------------------------------------- |
| `<button onClick={() => alert('...')}>` | `<button onClick={alert('...')}>`       |

La differenza è minima. Nel primo esempio, la funzione handleClick viene passata come gestore di eventi onClick. Questo dice a React di ricordarla e di chiamarla solo quando l’utente clicca sul bottone.
Nel secondo, invece, deve essere incapsulato in una funzione anonima.

Per convenzione, le props dei gestori di eventi dovrebbero iniziare con **on**, seguito da una **lettera maiuscola**.

Esempio:
```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`Playing ${movieName}!`);
  }

  return (
    <Button onClick={handlePlayClick}>
      Play "{movieName}"
    </Button>
  );
}

function UploadButton() {
  return (
    <Button onClick={() => alert('Uploading!')}>
      Upload Image
    </Button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="Kiki's Delivery Service" />
      <UploadButton />
    </div>
  );
}
```

Un ulteriore esempio:
```jsx
export default function App() {
  return (
    <Toolbar
      onPlayMovie={() => alert("Playing!")}
      onUploadImage={() => alert("Uploading!")}
    />
  );
}

function Toolbar({ onPlayMovie, onUploadImage }) {
  return (
    <div>
      <button onClick={onPlayMovie}>Play Movie</button>
      <button onClick={onUploadImage}>Upload Image</button>
    </div>
  );
}
```

In React, tutti gli eventi si propagano eccetto `onScroll`, che funziona soltanto sul tag JSX al quale lo attacchi.

Tutti i gestori di eventi ricevono un oggetto evento come loro unico argomento. Per convenzione `e`.
```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}
```


In rari casi, potresti aver bisogno di catturare tutti gli eventi sugli elementi figli, anche se la propagazione è stata fermata. 
```jsx
<div onClickCapture={() => { /* questo scatta per primo */ }}>
  <button onClick={e => e.stopPropagation()} />
  <button onClick={e => e.stopPropagation()} />
</div>
```

una **`form`** di default esegue il ricaricamento della pagina. Per prevenirlo si può usare **`e.preventDefault()`** 

- e.stopPropagation() interrompe l’attivazione dei gestori di eventi associati ai tag soprastanti.
- e.preventDefault() impedisce il comportamento di default del browser per i pochi eventi che lo hanno.

## State: La Memoria di un Componente
Perché non usare le variabili locali in React?
- Le variabili locali **non persistono tra le renderizzazioni**. Quando React renderizza questo componente una seconda volta, lo renderizza da zero e non considera eventuali modifiche alle variabili locali.
- Le modifiche alle variabili locali **non triggerano il render**. React non si accorge di dover renderizzare un’altra volta il componente con i dati nuovi.

Quindi usiamo **`useState`**:
```jsx
const [index, setIndex] = useState(0);
const [showMore, setShowMore] = useState(false);
```

Esempio:
```jsx
import { useState } from 'react';
import { sculptureList } from './data.js';

export default function Gallery() {
  const [index, setIndex] = useState(0);

  function handleClick() {
    setIndex(index + 1);
  }

  let sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <p>
        {sculpture.description}
      </p>
    </>
  );
}
```

`data` in questo caso ha senso che non sia in `useState`: non è dinamico. 
Lo State è **locale rispetto all’istanza** di un componente sullo schermo. In altre parole, se renderizzi lo stesso componente due volte, ogni copia avrà uno state completamente isolato! Modificare uno dei due non intaccherà l’altro.

## Renderizzare e Aggiornare
Le librerie e gli ambienti di sviluppo a volte nascondono questo codice, ma viene eseguita chiamando  createRoot con il nodo DOM di destinazione, e quindi chiamando il suo metodo render con il componente:
```jsx
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

Il comportamento predefinito di renderizzare tutti i componenti annidati all’interno del componente aggiornato non è ottimale in termini di prestazioni se il componente aggiornato è molto in alto nell’albero. Utilizza la scheda `Prestazioni`

In questo caso **`setIsSent(true)`** dice a React di ri-renderizzare la UI:
```jsx
return (
    <form onSubmit={(e) => {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
    }}>
      <textarea
```

## Queueing a Series of State Updates

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}
```

Usa invece:
```jsx
<button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
```

`setNumber(n => n + 1): n => n + 1` è una funzione di aggiornamento. React aggiunge quella funzione alla sua coda.
`setNumber(42);` assegna il numero.

```jsx
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);
```

```jsx
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <Counter isFancy={true} /> 
      ) : (
        <Counter isFancy={false} /> 
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}
```

## Aggiornare gli Oggetti nello State (**fare esercizi**)
```jsx
const [position, setPosition] = useState({ x: 0, y: 0 });

onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
```
In questo caso SetPosition è necessario per triggerare l'aggiornamento della renderizzazione

Può essere passato anche con l'input
```jsx
  function handleEmailChange(e) {
    person.email = e.target.value;
  }

  return (
    <>
      <label>
        First name:
        <input
          value={person.firstName}
          onChange={handleFirstNameChange}
        />
      </label>
```

Per cambiare esternamente un detwerminato parametro:
```jsx
  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <label>
        First name:
        <input
          name="firstName"
          value={person.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last name:
        <input
          name="lastName"
          value={person.lastName}
          onChange={handleChange}
        />
      </label>
```

```jsx
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});

const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
```
O alternativamente:
```jsx
setPerson({
  ...person, // Copia gli altri campi
  artwork: { // ma sostituisci artwork
    ...person.artwork, // con lo stesso
    city: 'New Delhi' // ma in New Delhi!
  }
});
```

### Oggetti nidificati
```jsx
let obj1 = {
  title: 'Blue Nana',
  city: 'Hamburg',
  image: 'https://i.imgur.com/Sd1AgUOm.jpg',
};

let obj3 = {
  name: 'Copycat',
  artwork: obj1
};
```

```jsx
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img
        src={person.artwork.image}
        alt={person.artwork.title}
      />
    </>
  );
}
```

## Aggiornare gli Array nello State

Per **aggiungere** all'**inizio**
```jsx
setArtists([ //sostituisce lo state on un nuovo array
  { id: nextId++, name: name },
  ...artists // Mette i vecchi elementi alla fine
]);
```
O alla **fine**:
```jsx
setArtists(
  [ ...artists,
    { id: nextId++, name: name } // e ne aggiunge uno nuovo alla fine
  ]
);
```

Per **eliminare**:
```jsx
setArtists(
  artists.filter(a => a.id !== artist.id)
);
```

Esempio:

```jsx
import { useState } from 'react';

let nextId = 0;

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={() => {
        setArtists([
          ...artists,
          { id: nextId++, name: name }
        ]);
      }}>Add</button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
```
**RICORDATI**: Ogni `<li>` deve avere una `key` diversa


Movimento di palle condizionale:
```jsx
import { useState } from 'react';

let initialShapes = [
  { id: 0, type: 'circle', x: 50, y: 100 },
  { id: 1, type: 'square', x: 150, y: 100 },
  { id: 2, type: 'circle', x: 250, y: 100 },
];

export default function ShapeEditor() {
  const [shapes, setShapes] = useState(
    initialShapes
  );

  function handleClick() {
    const nextShapes = shapes.map(shape => {
      if (shape.type === 'square') {
        // Nessun cambiamento
        return shape;
      } else {
        // Ritorna un nuovo cerchio in basso di 50px
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    // Ri-renderizza con il nuovo array
    setShapes(nextShapes);
  }

  return (
    <>
      <button onClick={handleClick}>
        Move circles down!
      </button>
      {shapes.map(shape => (
        <div
          key={shape.id}
          style={{
          background: 'purple',
          position: 'absolute',
          left: shape.x,
          top: shape.y,
          borderRadius:
            shape.type === 'circle'
              ? '50%' : '',
          width: 20,
          height: 20,
        }} />
      ))}
    </>
  );
}
```

incremento parallelo asincrono
```jsx
import { useState } from 'react';

let initialCounters = [
  0, 0, 0
];

export default function CounterList() {
  const [counters, setCounters] = useState(
    initialCounters
  );

  function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // Incrementa il contatore cliccato
        return c + 1;
      } else {
        // Il resto non è cambiato
        return c;
      }
    });
    setCounters(nextCounters);
  }

  return (
    <ul>
      {counters.map((counter, i) => (
        <li key={i}>
          {counter}
          <button onClick={() => {
            handleIncrementClick(i);
          }}>+1</button>
        </li>
      ))}
    </ul>
  );
}
```

### Inserimento in un array (con slice)
```jsx
function handleClick() {
    const insertAt = 1; // Può essere qualsiasi indice
    const nextArtists = [
      // Elementi prima del punto di inserzione:
      ...artists.slice(0, insertAt),
      // Nuovo elemento:
      { id: nextId++, name: name },
      // Elementi dopo il punto di inserzione:
      ...artists.slice(insertAt)
    ];
    setArtists(nextArtists);
    setName('');
  }
```

### Reverse
```jsx
function handleClick() {
    const nextList = [...list];
    nextList.reverse();
    setList(nextList);
  }
```

### Aggiornare oggetti dentro agli array 
Dall'esempio precedente: sebbene `nextList` e `list` siano due array differenti, `nextList[0]` e `list[0]` puntano allo stesso oggetto. 
Soluzione:
```jsx
setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    // Crea un *nuovo* oggetto con gli aggiornamenti
    return { ...artwork, seen: nextSeen };
  } else {
    // Nessun aggiornamento
    return artwork;
  }
}));
```

### Scrivi logica di aggiornamento coincisa con Immer
```jsx
function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }
```

# Gestione delo State ([link](https://it.react.dev/learn/managing-state))
## Reacting to Input with State (fare esercizi)
### Represent the state in memory with `useState`

```jsx
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'
```

```jsx
import { useState } from 'react';

export default function Form() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  if (status === 'success') {
    return <h1>That's right!</h1>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
    </>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}
```

## Choosing the State Structure (fare esercizi)
```jsx
const [x, setX] = useState(0);
const [y, setY] = useState(0);
```
Se due variabili di stato cambiano sempre insieme, potrebbe essere una buona idea unirle in un'unica variabile di stato.
```jsx
const [position, setPosition] = useState({ x: 0, y: 0 });
```

Per convenzione, inizia il nome della proprietà con "initial" o "default" per chiarire che i suoi nuovi valori vengono ignorati.


```jsx
import { useState } from "react";

const initialItems = [
  { title: "pretzels", id: 0 },
  { title: "crispy seaweed", id: 1 },
  { title: "granola bar", id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  const selectedItem = items.find((item) => item.id === selectedId);

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={(e) => {
                handleItemChange(item.id, e);
              }}
            />{" "}
            <button
              onClick={() => {
                setSelectedId(item.id);
              }}
            >
              Choose
            </button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );

  function handleItemChange(id, e) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title: e.target.value,
          };
        } else {
          return item;
        }
      })
    );
  }
}
```
- const in JavaScript significa che il riferimento alla variabile non può essere modificato. Ma questo non significa che l'oggetto o l'array a cui la variabile è assegnata non possa cambiare. Nel caso di selectedItem, si sta assegnando una nuova variabile che contiene il risultato della ricerca tramite find(). Quindi il riferimento a selectedItem non cambia, ma il valore di selectedItem può cambiare durante ogni render del componente.
- items.find(...): Ogni volta che il componente viene renderizzato, React esegue nuovamente questa funzione. Quindi, anche se selectedItem è una const, il valore che contiene (cioè l'elemento dell'array che corrisponde a selectedId) può cambiare, perché il valore dipende da selectedId, che può cambiare nel tempo.

## Sharing State Between Components (fare esercizi)

Per evitare che i figli restino in memoria:
```jsx
function handleComplete(parentId, childId) {
    updatePlan(draft => {
      // Remove from the parent place's child IDs.
      const parent = draft[parentId];
      parent.childIds = parent.childIds
        .filter(id => id !== childId);

      // Forget this place and all its subtree.
      deleteAllChildren(childId);
      function deleteAllChildren(id) {
        const place = draft[id];
        place.childIds.forEach(deleteAllChildren);
        delete draft[id];
      }
    });
```

isActive deve essere scritto così:
```jsx
return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          Show
        </button>
      )}
    </section>
  );
```

## Preserving and Resetting State (fare esercizi)

```jsx
function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

Questo accade perché entrambi i tag `<Counter />` vengono renderizzati nella stessa posizione. 
React non sa dove posizioni le condizioni nella tua funzione. Tutto ciò che "vede" è l'albero che restituisci.

In entrambi i casi, il componente App restituisce un `<div>` con `<Counter />` come primo figlio. 
Per React, questi due contatori hanno lo stesso "indirizzo": il primo figlio del primo figlio della radice.

Se l'elemento dovesse invece scomparire al prossimo render, il counter si resetterebbe
```jsx
import { useState } from 'react';

export default function App() {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div>
      {isPaused ? (
        <p>See you later!</p> 
      ) : (
        <Counter /> 
      )}
      <label>
        <input
          type="checkbox"
          checked={isPaused}
          onChange={e => {
            setIsPaused(e.target.checked)
          }}
        />
        Take a break
      </label>
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```

Osserva questi due codici:
- **Primo Codice:**
```jsx
import { useState } from "react";

export default function App() {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div>
      <div style={{ display: isPaused ? "none" : "block" }}>
        <Counter />
      </div>
      {isPaused && <p>See you later!</p>}
      <label>
        <input
          type="checkbox"
          checked={isPaused}
          onChange={(e) => {
            setIsPaused(e.target.checked);
          }}
        />
        Hide me!
      </label>
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = "counter";
  if (hover) {
    className += " hover";
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  );
}
```
Il componente Counter è sempre presente nel DOM, ma la sua visibilità è gestita tramite lo stile (display: none).
React non smonta il componente, lo rende solo invisibile. 
Quindi, lo stato del componente (score in questo caso) non viene resettato, perché il componente stesso non viene mai effettivamente rimosso dal DOM. 

- **Secondo Codice:**
```jsx
import { useState } from "react";

export default function App() {
  const [isDisplay, setDisplay] = useState("block");
  return (
    <div>
      {isDisplay ? (
        <div>
          <Counter display={true} />
        </div>
      ) : (
        <section>
          <Counter display={false} />
        </section>
      )}
      <label>
        <input
          type="checkbox"
          checked={isDisplay}
          onChange={(e) => {
            setDisplay(e.target.checked);
          }}
        />
        Hide me!
      </label>
    </div>
  );
}

function Counter({ display }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = "counter";
  if (hover) {
    className += " hover";
  }

  return (
    <div
      className={className}
      style={{ display: display ? "block" : "none" }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>Add one</button>
    </div>
  );
}
```
Quando isDisplay è false, il componente Counter viene smontato dal DOM (non è più presente nel rendering).
Quando isDisplay diventa true, il componente Counter viene rimontato. 
Ogni volta che il componente viene smontato e rimontato, React considera il componente come nuovo, e lo stato (come il punteggio) viene reimpostato a 0.

## Estrarre la Logica dello State in un Reducer (fare esercizi)
- `setTasks` è la funzione che aggiorna lo stato di un componente (presumibilmente creato con `useState`). 
Ogni volta che viene chiamata, si modifica direttamente lo stato in base alla logica specificata nelle funzioni (`handleAddTask`, `handleChangeTask`, `handleDeleteTask`).
- il **`dispatch`**, che suggerisce che lo stato dei task è gestito tramite un **`reducer`** (usando **`useReducer`**). 
In questo caso, lo stato non viene modificato direttamente, ma viene inviata un'azione (un oggetto con un tipo e i dati necessari) al reducer, che si occupa di calcolare il nuovo stato in base a quell'azione.

Esempio di un reducer:
```jsx
import React, { useReducer } from 'react';

const initialState = [];

function tasksReducer(state, action) {
  switch (action.type) {
    case 'added':
      return [
        ...state,
        { id: action.id, text: action.text, done: false },
      ];

    case 'changed':
      return state.map((task) =>
        task.id === action.task.id ? { ...task, ...action.task } : task
      );

    case 'deleted':
      return state.filter((task) => task.id !== action.id);

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialState);
  let nextId = tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <div>
      <button onClick={() => handleAddTask('New Task')}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => handleChangeTask({ id: task.id, text: 'Updated Task' })}>Change</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Un reducer può esistere in un file diverso:
```jsx
import tasksReducer from './tasksReducer.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```

O con **Immer**:
```jsx
import { useImmerReducer } from 'use-immer';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      });
      break;
    }
```

## Passare i Dati in Profondità con il Context (fare esercizi)

```jsx
// Heading.js
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
```

```jsx
// LevelContext.js
import { createContext } from 'react';
export const LevelContext = createContext(1);
```

```jsx
// Section.js
export default function Section({ children }) {
  return (
    <section className="section">
      <LevelContext.Provider value={level}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```

```jsx
// App.js
import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section level={1}>
      <Heading>Title</Heading>
      <Section level={2}>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
      </Section>
    </Section>
  );
}
```

In `Section.js` posso anche definire di più:
```jsx
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children, isFancy }) {
  const level = useContext(LevelContext);
  return (
    <section className={
      'section ' +
      (isFancy ? 'fancy' : '')
    }>
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```

Che verrà richiamato in `App.js` così:
```jsx
<Section isFancy={true}>
```

## Scaling Up with Reducer and Context
Exmple: [Combining a reducer with context 
](https://codesandbox.io/p/sandbox/lyqhts)
```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```

```jsx

```