# [ASP.NET Core MVC](https://learn.microsoft.com/it-it/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-9.0&tabs=visual-studio)
## aggiungere un controller a un'app MVC core ASP.NET

In ASP.NET Core, View è una rappresentazione visiva (tipicamente una pagina HTML) che viene renderizzata e restituita al client come risposta a una richiesta HTTP. Quando un metodo del controller restituisce View(), il framework cerca una vista corrispondente nel progetto (di solito un file .cshtml) e la restituisce come contenuto HTML.

Crea `Controllers` > `HelloWorldController.cs`
```csharp
using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace F1TicketsWeb.Controllers;

public class HelloWorldController : Controller
{
    // 
    // GET: /HelloWorld/
    public IActionResult Index()
    {
        return View();
    }
    // 
    // GET: /HelloWorld/Welcome/ 
    public string Welcome(string name, int ID = 1)
    {
        return HtmlEncoder.Default.Encode($"Hello {name}, ID: {ID}");
    }
}
```

e in `Program.cs`

```csharp
app.MapControllerRoute(
    name: "helloWorld",
    pattern: "HelloWorld/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```
[Per stampare nome Rock e ID 4](https://localhost:7189/HelloWorld/Welcome?name=Rick&numtimes=4)

## Aggiungere una visualizzazione

In `Views` > `HelloWorld` > Add Item `Razor View (Empty)`
```csharp
@{
    ViewData["Title"] = "Index";
}

<h2>Index</h2>

<p>Hello from our View Template!</p>
```

Il Views/_ViewStart.cshtml file inserisce il Views/Shared/_Layout.cshtml file in ogni visualizzazione.

In HelloWorldController.cs
```csharp
public IActionResult Welcome(string name, int numTimes = 1)
    {
        ViewData["Message"] = "Hello " + name;
        ViewData["NumTimes"] = numTimes;
        return View();
    }
```
ViewData contiene i dati che verranno passati alla vista.

In Views > HelloWorld > Welcome.cshtml
```csharp
@{
    ViewData["Title"] = "Welcome";
}

<h2>Welcome</h2>

<ul>
    @for (int i = 0; i < (int)ViewData["NumTimes"]!; i++)
    {
        <li>@ViewData["Message"]</li>
    }
</ul>
```

## aggiungere un modello a un'app MVC core ASP.NET
In Controllers fai -> Add -> Scaffolded item -> Controller MVC con visualizzazioni usando Entity Framework

## metodi e visualizzazioni del controller in ASP.NET Core
I collegamenti Modifica, Dettagli ed Elimina vengono generati dall'helper tag di ancoraggio MVC principale nel Views/Movies/Index.cshtml file.

```csharp
<a asp-action="Edit" asp-route-id="@item.Id">Edit</a> |
        <a asp-action="Details" asp-route-id="@item.Id">Details</a> |
        <a asp-action="Delete" asp-route-id="@item.Id">Delete</a>
    </td>
</tr>
```

```csharp
<form action="/Movies/Edit/7" method="post">
    <div class="form-horizontal">
        <h4>Movie</h4>
        <hr />
        <div class="text-danger" />
        <input type="hidden" data-val="true" data-val-required="The ID field is required." id="ID" name="ID" value="7" />
        <div class="form-group">
            <label class="control-label col-md-2" for="Genre" />
            <div class="col-md-10">
                <input class="form-control" type="text" id="Genre" name="Genre" value="Western" />
                <span class="text-danger field-validation-valid" data-valmsg-for="Genre" data-valmsg-replace="true"></span>
            </div>
        </div>
        <div class="form-group">
            <label class="control-label col-md-2" for="Price" />
            <div class="col-md-10">
                <input class="form-control" type="text" data-val="true" data-val-number="The field Price must be a number." data-val-required="The Price field is required." id="Price" name="Price" value="3.99" />
                <span class="text-danger field-validation-valid" data-valmsg-for="Price" data-valmsg-replace="true"></span>
            </div>
        </div>
        <!-- Markup removed for brevity -->
        <div class="form-group">
            <div class="col-md-offset-2 col-md-10">
                <input type="submit" value="Save" class="btn btn-default" />
            </div>
        </div>
    </div>
    <input name="__RequestVerificationToken" type="hidden" value="CfDJ8Inyxgp63fRFqUePGvuI5jGZsloJu1L7X9le1gy7NCIlSduCRx9jDQClrV9pOTTmqUyXnJBXhmrjcUVDJyDUMm7-MF_9rK8aAZdRdlOri7FmKVkRe_2v5LIHGKFcTjPrWPYnc9AdSbomkiOSaTEg7RU" />
</form>
```

## aggiungere la ricerca a un'app MVC core ASP.NET


```csharp
@model IEnumerable<MvcMovie.Models.Movie>

@{
    ViewData["Title"] = "Index";
}

<h1>Index</h1>

<p>
    <a asp-action="Create">Create New</a>
</p>

<form asp-controller="Movies" asp-action="Index" method="get">
    <p>
        <label>Title: <input type="text" name="SearchString" /></label>
        <input type="submit" value="Filter" />
    </p>
</form>
<table class="table">
```



```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

```

```csharp
public async Task<IActionResult> Index(string searchString)
{
    if (_context.Movie == null)
    {
        return Problem("Entity set 'MvcMovieContext.Movie'  is null.");
    }

    var movies = from m in _context.Movie
                select m;

    if (!String.IsNullOrEmpty(searchString))
    {
        movies = movies.Where(s => s.Title!.ToUpper().Contains(searchString.ToUpper()));
    }

    return View(await movies.ToListAsync());
}
```

In `Views/Movies/Index.cshtml`
```csharp
@model IEnumerable<MvcMovie.Models.Movie>

@{
    ViewData["Title"] = "Index";
}

<h1>Index</h1>

<p>
    <a asp-action="Create">Create New</a>
</p>

<form asp-controller="Movies" asp-action="Index">
    <p>
        <label>Title: <input type="text" name="SearchString" /></label>
        <input type="submit" value="Filter" />
    </p>
</form>
<table class="table">
```

```csharp
[HttpPost]
public string Index(string searchString, bool notUsed)
{
    return "From [HttpPost]Index: filter on " + searchString;
}
```
In ASP.NET Core, se si ha un metodo come Index(string searchString) per gestire una richiesta GET e un altro con la stessa firma ma per POST, il sistema si aspetta di avere diverse versioni del metodo, ovvero degli overload. Tuttavia, il commento implica che non c'è un altro metodo Index (ad esempio, uno per GET) che corrisponde a questo specifico metodo POST.
Dato che il metodo POST non modifica lo stato dell'app, non è necessario un overload o un'altra versione del metodo per supportare una richiesta GET.

Le schede `Rete` e `Payload` sono selezionate per visualizzare i dati del modulo.


```csharp
@model IEnumerable<MvcMovie.Models.Movie>

@{
    ViewData["Title"] = "Index";
}

<h1>Index</h1>

<p>
    <a asp-action="Create">Create New</a>
</p>

<form asp-controller="Movies" asp-action="Index" method="get">
    <p>
        <label>Title: <input type="text" name="SearchString" /></label>
        <input type="submit" value="Filter" />
    </p>
</form>
<table class="table">
```



## Aggiungere la funzionalità di ricerca in base al genere
Aggiungere classe `MovieGenreViewModel` a `Models`.
```csharp
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace MvcMovie.Models;

public class MovieGenreViewModel
{
    public List<Movie>? Movies { get; set; }
    public SelectList? Genres { get; set; }
    public string? MovieGenre { get; set; }
    public string? SearchString { get; set; }
}
```



```csharp
// GET: Movies
public async Task<IActionResult> Index(string movieGenre, string searchString)
{
    if (_context.Movie == null) {
        return Problem("Entity set 'MvcMovieContext.Movie'  is null.");
    }

    // Use LINQ to get list of genres.
    IQueryable<string> genreQuery = from m in _context.Movie
                                    orderby m.Genre
                                    select m.Genre;
    var movies = from m in _context.Movie
                 select m;

    if (!string.IsNullOrEmpty(searchString)) {
        movies = movies.Where(s => s.Title!.ToUpper().Contains(searchString.ToUpper()));
    }

    if (!string.IsNullOrEmpty(movieGenre)) {
        movies = movies.Where(x => x.Genre == movieGenre);
    }

    var movieGenreVM = new MovieGenreViewModel {
        Genres = new SelectList(await genreQuery.Distinct().ToListAsync()),
        Movies = await movies.ToListAsync()
    };

    return View(movieGenreVM);
}
```


In `Views/Movies/Index.cshtml`

```csharp
@model MvcMovie.Models.MovieGenreViewModel

@{
    ViewData["Title"] = "Index";
}

<h1>Index</h1>

<p>
    <a asp-action="Create">Create New</a>
</p>
<form asp-controller="Movies" asp-action="Index" method="get">
    <p>

        <select asp-for="MovieGenre" asp-items="Model.Genres">
            <option value="">All</option>
        </select>

        <label>Title: <input type="text" asp-for="SearchString" /></label>
        <input type="submit" value="Filter" />
    </p>
</form>

<table class="table">
    <thead>
        <tr>
            <th>
                @Html.DisplayNameFor(model => model.Movies![0].Title)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Movies![0].ReleaseDate)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Movies![0].Genre)
            </th>
            <th>
                @Html.DisplayNameFor(model => model.Movies![0].Price)
            </th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        @foreach (var item in Model.Movies!)
        {
            <tr>
                <td>
                    @Html.DisplayFor(modelItem => item.Title)
                </td>
                <td>
                    @Html.DisplayFor(modelItem => item.ReleaseDate)
                </td>
                <td>
                    @Html.DisplayFor(modelItem => item.Genre)
                </td>
                <td>
                    @Html.DisplayFor(modelItem => item.Price)
                </td>
                <td>
                    <a asp-action="Edit" asp-route-id="@item.Id">Edit</a> |
                    <a asp-action="Details" asp-route-id="@item.Id">Details</a> |
                    <a asp-action="Delete" asp-route-id="@item.Id">Delete</a>
                </td>
            </tr>
        }
    </tbody>
</table>
```


Per far fare a un controller, chiamate HTTP:
 - Per la GET:
```csharp
[HttpPost, ActionName("Delete")]
[ValidateAntiForgeryToken]

[...]

if (id == null)
        {
            return NotFound();
        }

        // Fai la chiamata GET alla Minimal API
        var movie = await _httpClient.GetFromJsonAsync<Movie>($"https://localhost:5001/api/movies/{id}");
```

 - E per la POST:
```csharp
var response = await _httpClient.PostAsJsonAsync("https://localhost:5001/api/movies", newMovie);

            if (response.IsSuccessStatusCode)
            {
                // Se la richiesta ha avuto successo, puoi reindirizzare a una vista o visualizzare un messaggio di successo
                return RedirectToAction("Index"); // Ad esempio, dopo aver creato un film, reindirizza alla lista dei film
            }
            else
            {
                // Se la richiesta ha fallito, mostra un errore
                ModelState.AddModelError("", "Errore nella creazione del film.");
            }
```



In program.cs
```csharp
builder.Services.AddHttpClient<MoviesController>();
```
