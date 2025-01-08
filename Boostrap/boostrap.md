# [Boostrap](https://www.w3schools.com/bootstrap)
```html
<div class="jumbotron text-center"></div>
```
```html
<div class="container"></div>
```

- The `.container` class provides a responsive fixed width container
- The `.container-fluid` class provides a full width container, spanning the entire width of the viewport

Bootstrap's grid system allows up to 12 columns across the page and they are the same as `span` classes.

The Bootstrap grid system has four classes:

- `xs` (for phones - screens less than 768px wide)
- `sm` (for tablets - screens equal to or greater than 768px wide)
- `md` (for small laptops - screens equal to or greater than 992px wide)
- `lg` (for laptops and desktops - screens equal to or greater than 1200px wide)

<br>

- `<abbr title="World Health Organization">WHO</abbr>` 
- `<small>` element is used to create a lighter, secondary text in any heading.
- `<mark>`
- `<blockquote>`
- `<div class="page-header">` adds a horizontal line under the heading (+ adds some extra space around the element)
- `<div class="well well-sm">` adds a rounded border around an element with a gray background color and some padding

<br>

Bootstrap also has some contextual classes that can be used to provide "meaning through colors".

The classes for text colors are:`.text-muted`, `.text-primary`, `.text-success`, `.text-info`, `.text-warning`, and `.text-danger`:

The classes for background colors are: `.bg-primary`, `.bg-success`, `.bg-info`, `.bg-warning`, and `.bg-danger`;

`.pre-scrollable` makes a `<pre>` element scrollable.

## Tables
```html
<div class="table-responsive">
```

Esempio tabella:
```html
    <tbody>
      <tr>
        <td>Default</td>
        <td>Defaultson</td>
        <td>def@somemail.com</td>
      </tr>      
      <tr class="success">
        <td>Success</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
      <tr class="danger">
        <td>Danger</td>
        <td>Moe</td>
        <td>mary@example.com</td>
      </tr>
      <tr class="info">
        <td>Info</td>
        <td>Dooley</td>
        <td>july@example.com</td>
      </tr>
      <tr class="warning">
        <td>Warning</td>
        <td>Refs</td>
        <td>bo@example.com</td>
      </tr>
      <tr class="active">
        <td>Active</td>
        <td>Activeson</td>
        <td>act@example.com</td>
      </tr>
    </tbody>
```

- `.table-striped`
- `.table-bordered`
- `.table-hover`
- `.table-condensed`


## Description List
```html
<dl>
    <dt>Coffee</dt>
    <dd>- black hot drink</dd>
    <dt>Milk</dt>
    <dd>- white cold drink</dd>
</dl>
```

## img

```html
<img src="cinqueterre.jpg" class="img-rounded" alt="Cinque Terre">
<img src="cinqueterre.jpg" class="img-thumbnail" alt="Cinque Terre">
```

```html
<!-- 16:9 aspect ratio -->
<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="..."></iframe>
</div>

<!-- 4:3 aspect ratio -->
<div class="embed-responsive embed-responsive-4by3">
  <iframe class="embed-responsive-item" src="..."></iframe>
</div>
```

## Jumbotron
A jumbotron indicates a big box for calling extra attention to some special content or information.

A jumbotron is displayed as a grey box with rounded corners. It also enlarges the font sizes of the text inside it.

```html
<div class="container">
  <div class="jumbotron">
    <h1>Bootstrap Tutorial</h1>
    <p>Bootstrap is the most popular HTML, CSS, and JS framework for developing
    responsive, mobile-first projects on the web.</p>
  </div>
  <p>This is some text.</p>
  <p>This is another text.</p>
</div>
```

## Alert links
- `alert-success`
- `alert-info`
- `alert-warning`
- `alert-danger`

```html
  <div class="alert alert-success alert-dismissible fade in">
	<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
    <strong>Success!</strong> You should <a href="#" class="alert-link">read this message</a>.
  </div>
```

## [Buttons](https://www.w3schools.com/bootstrap/bootstrap_glyphicons.asp)
Sizes:
- `.btn-lg`
- `.btn-sm`
- `.btn-xs`

<br>

Types:
- `.btn`
- `.btn-default`
- `.btn-primary`
- `.btn-success`
- `.btn-info`
- `.btn-warning`
- `.btn-danger`
- `.btn-link`
- `.btn-group` / `.btn-group-vertical` / `.btn-group-justified`
    - `.btn-group-lg` / `.btn-group-sm` / `.btn-group-xs`
- `.btn-primary active` / `.btn-primary disabled`
- `.btn-block` spans the entire width of the parent element.

Split Button Dropdowns:
```html
<div class="btn-group">
  <button type="button" class="btn btn-primary">Sony</button>
  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
    <span class="caret"></span>
  </button>
  <ul class="dropdown-menu" role="menu">
    <li><a href="#">Tablet</a></li>
    <li><a href="#">Smartphone</a></li>
  </ul>
</div>
```