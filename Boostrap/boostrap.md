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

## Glyphicons
```html
<button type="button" class="btn btn-default">
  <span class="glyphicon glyphicon-search"></span> Search
</button>
```

## Badges
```html
  <a href="#">News <span class="badge">5</span></a><br>
```
```html
<ul class="list-group">
  <li class="list-group-item">New <span class="badge">12</span></li>
  <li class="list-group-item">Deleted <span class="badge">5</span></li>
  <li class="list-group-item">Warnings <span class="badge">3</span></li>
</ul>
```

## Progress bar
```html
<div class="container">
  <div class="progress">
    <div class="progress-bar progress-bar-striped active" role="progressbar"
    aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:40%">
      40%
    </div>
  </div>
</div>
```

## Pagination
```html
<ul class="pagination">
  <li><a href="#">1</a></li>
  <li class="active"><a href="#">2</a></li>
  <li><a href="#">3</a></li>
  <li><a href="#">4</a></li>
  <li><a href="#">5</a></li>
</ul>
```
```html
<ul class="pager">
  <li class="previous"><a href="#">Previous</a></li>
  <li class="next"><a href="#">Next</a></li>
</ul>
```

## Breadcrumbs
```html
<ul class="breadcrumb">
  <li><a href="#">Home</a></li>
  <li><a href="#">Private</a></li>
  <li><a href="#">Pictures</a></li>
  <li class="active">Vacation</li>
</ul>
```

## Panel
```html
<div class="panel-group">
  <div class="panel panel-default">
    <div class="panel-heading">Panel with panel-default class</div>
    <div class="panel-body">Panel Content</div>
  </div>

  <div class="panel panel-danger">
    <div class="panel-heading">Panel with panel-danger class</div>
    <div class="panel-body">Panel Content</div>
  </div>
</div>
```

## [Dropdowns](https://www.w3schools.com/bootstrap/bootstrap_dropdowns.asp)

## Collapse
```html
<div class="panel-group" id="accordion">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
        Collapsible Group 1</a>
      </h4>
    </div>
    <div id="collapse1" class="panel-collapse collapse in">
      <div class="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.</div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">
        Collapsible Group 2</a>
      </h4>
    </div>
    <div id="collapse2" class="panel-collapse collapse">
      <div class="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.</div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">
        Collapsible Group 3</a>
      </h4>
    </div>
    <div id="collapse3" class="panel-collapse collapse">
      <div class="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.</div>
    </div>
  </div>
</div>
```

## [Tabs e Pils](https://www.w3schools.com/bootstrap/bootstrap_tabs_pills.asp)

## [Navigation bar](https://www.w3schools.com/bootstrap/bootstrap_navbar.asp)

## [Form](https://www.w3schools.com/bootstrap/bootstrap_forms.asp)
## [Form2](https://www.w3schools.com/bootstrap/bootstrap_forms_inputs2.asp)

## [Textarea, Checkboxes and Buttons](https://www.w3schools.com/bootstrap/bootstrap_forms_inputs.asp)

## [Media object](https://www.w3schools.com/bootstrap/bootstrap_media_objects.asp)

## [Carousel](https://www.w3schools.com/bootstrap/bootstrap_carousel.asp)

## [Modal](https://www.w3schools.com/bootstrap/bootstrap_modal.asp)
```html
<!-- Trigger the modal with a button -->
<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>

<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Modal Header</h4>
      </div>
      <div class="modal-body">
        <p>Some text in the modal.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
```

## tooltip
```html
<a href="#" data-toggle="tooltip" data-placement="top" title="Hooray!">Hover</a>
```

## Popover
```html
<body>
  <div class="container">
    <h3>Popover Example</h3>
    <p>Questo è un messaggio
      <a href="#" title="Informazione:" data-toggle="popover" data-trigger="hover" data-content="Questo messaggio contiene un messaggio">ℹ️</a>
    </p>
  </div>

  <script>
    $(document).ready(function(){
      $('[data-toggle="popover"]').popover();   
    });
  </script>
</body>
```

## [Scrollspy](https://www.w3schools.com/bootstrap/bootstrap_scrollspy.asp)

## [Boostrap Filters](https://www.w3schools.com/bootstrap/bootstrap_filters.asp)
```html
<script>
$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
</script>
```

## [The band](https://www.w3schools.com/bootstrap/bootstrap_theme_band.asp)

## [Examples](https://www.w3schools.com/bootstrap/bootstrap_examples.asp)