C# 
[text](https://learn.microsoft.com/en-us/collections/yz26f8y64n7k07) 
ASP.NET 
[text](https://learn.microsoft.com/en-us/training/paths/aspnet-core-web-app/)

 - [text](https://app.pluralsight.com/library/courses/ef-core-8-fundamentals/table-of-contents)
     - [text](https://github.com/JulieLerman/EFCore8Fundamentals)

 - [text](https://app.pluralsight.com/library/courses/asp-dot-net-core-7-building-minimal-apis/table-of-contents)

 - [text](https://learn.microsoft.com/it-it/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-9.0&tabs=visual-studio)


M
 - MVC (Model View Controller):
    - *Model*: app data
    - *View*: Rappresentazione (json)
    - *Controller*: porta i dati dell'utente al data
 - Minimal API:
    - scenari leggeri

# Setup Minimal API primo progetto
 - `ASP.NET Core Web API`
 - "use controllers" è per il MVC
 - "Enable OpenAPI support" è per documentare l'api

NuGet usati:
 - `AutoMapper`
 - `Microsoft.EntityFrameworkCore.Sqlite`
 - `Microsoft.EntityFrameworkCore.Tools`
 - `Swashbuckle.AspNetCore.Swagger`
 - `Swashbuckle.AspNetCore.SwaggerGen`
 - `Swashbuckle.AspNetCore.SwaggerUI`
 - `MiniValidation`
 - `Microsoft.AspNetCore.Authentication.JwtBearer`
 - `AspNetCore.OpenApi`

## Program.cs
```csharp
var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();

[...]
app.Run(); // esegue
```


launchSettings.json -> 
```csharp
"launchBrowser": false,
```

# Adding the Data Layer
Aggiungere NuGET packages ->
`microsoft.entityframerowk tools` e `microsoft.entityframerowk sqlite`

Aggiungiamo il codice: `DbContexts` e `Entities`

`Required` dice al compilatore di inizializzare la variabile `Name` quando viene costruito il dish e che non sia `null`:
```csharp
public required string Name { get; set; }
```

`[SetsRequiredMembers]` controlla che il costruttore di questo controller, venga risolto.

## Aggiungere una connessione SQLLite
In `appsettings.json`
```csharp
[...]
  "ConnectionStrings": {
    "DishesDBConnectionString": "Data Source=Dishes.db"
  },
  "AllowedHosts": "*"
```

In `program.cs`
```csharp
builder.Services.AddDbContext<DishesDbContext>(o => o.UseSqlite(
    builder.Configuration["ConnectionStrings:DishesDBConnectionString"]));
```

## Aggiungiamo una migrazione
Una migrazione è un pezzo di dati che assicurerà la creazione di un database con dati fittizi.
In package-manager
```console
add-migration InitialMigration
```

Per assicurarsi che la migrazione sia stata eseguita. Viene creato `Dishes.db`:
```console
update-database
```

# Dependency Injection in Minimal APIs
inversion of Control (IoC)
Dipendency Injection (ID)

Passiamo il DB alla get:
In Program.cs
```csharp
app.MapGet("/dishes", Async (DishesDbContext dishesDbContext) =>
{
    return dishesDbContext.Dishes;
});
```
`Async` non bloccherà il thread principale dell'applicazione durante il suo completamento.
`await` è un operatore che permette di "attendere" che l'operazione asincrona (ToListAsync()) finisca e restituisca il risultato, senza bloccare il thread.

# Working with Routing Templates
Un *Guid* (Globally Unique Identifier) è una stringa di 128 bit (16 byte) che è praticamente garantita essere unica in tutto il mondo.
```csharp
app.MapGet("/dishes/{dishId}", async (DishesDbContext dishesDbContext, Guid dishId) =>
{
    return await dishesDbContext.Dishes.FirstOrDefaultAsync(d => d.Id == dishId);
});
```


Questo produrrà un **errore** perché è un'inclusione ricorsiva di tabelle:
```csharp
app.MapGet("/dishes/{dishId}/ingredients", async (DishesDbContext dishesDbContext, Guid dishId) =>
{
    return (await dishesDbContext.Dishes
    .Include(d => d.Ingredients)
    .FirstOrDefaultAsync(d => d.Id == dishId))?.Ingredients;
});
```

Aggiungere il tipo come parametro MapGet, aiuta le equivocazioni, ma **ASP.NET Core considera di default tutti i parametri di route come stringhe**. Quindi:

```csharp
app.MapGet("/dishes/{dishId:guid}"
[...]
app.MapGet("/dishes/{dishName}", async (DishesDbContext dishesDbContext, String dishName) =>
{
    return await dishesDbContext.Dishes.FirstOrDefaultAsync(d => d.Name == dishName);
});
```
# Adding the DTO Model and Using AutoMapper
AutoMapper, una libreria in C# che viene utilizzata per mappare (cioè copiare i dati) tra diversi tipi di oggetti.
I DTO, come DishDto, sono progettati per essere più semplici e contengono solo i dati necessari per l'operazione specifica (come inviare i dati a un client tramite una API). Separando i modelli di dominio dai DTO, puoi controllare con maggiore precisione quali dati vengono esposti all'esterno.

`DishesAPI` -> `Add` -> `new Folder`: Models
`Add` -> `Class...`: DishDto.cs
NuGET Packages -> `AutoMapper`
In Program.cs
```csharp
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
```

In `Models` -> IngredientDto.cs:
```csharp
namespace DishesAPI.Models
{
    public class IngredientDto
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public Guid DishId { get; set; }
    }
}
```

In *new* `Profiles` -> DishProfile.cs
```csharp
public class DishProfile : Profile
{
    public DishProfile() {
        CreateMap<Dish, DishDto>();
    }
}
```

In Program.cs
```csharp
return mapper.Map<IEnumerable<DishDto>>();
```
Indica che il metodo mapper deve mappare una collezione (o enumerazione) di oggetti di tipo Dish in una collezione di oggetti di tipo DishDto.

# Parameter Binding
Per permettere all'utente di fare query:
```csharp
app.MapGet("/dishes", async (DishesDbContext dishesDbContext,
    IMapper mapper,
    [FromQuery] string? name) =>
{
    return mapper.Map<IEnumerable<DishDto>>(await dishesDbContext.Dishes
        .Where(d => name == null || d.Name.Contains(name)).ToListAsync());
});
```
L'attributo `[FromQuery]` non è strettamente necessario perché la binding del parametro name a una query string avviene implicitamente in ASP.NET Core. 


Per gestire i login:
Le claim sono delle dichiarazioni che contengono informazioni sull'utente, come il suo nome, il suo ruolo, il suo ID, e altre proprietà, che sono utilizzate per determinare le autorizzazioni e l'accesso a determinati servizi o risorse.
```csharp
app.MapGet("/dishes", async (DishesDbContext dishesDbContext,
    ClaimsPrincipal claimsPrincipal,
    IMapper mapper,
    string? name) =>
{
    Console.WriteLine($"User authenticated? {claimsPrincipal.Identity?.IsAuthenticated}");
    [...]
```

# Status Codes and Creating Responses
 - 200 - Ok 
 - 201 - Created 
 - 204 - No Content 
 - 400 - Bad Request 
 - 401 - Unauthorized 
 - 403 - Forbidden 
 - 404 - Not Found 
 - 405 - Method Not Allowed 
 - 500 - Internal Server Error 

```csharp
dishesEndpoints.MapGet("", async Task<Ok<IEnumerable<DishDto>>> (DishesDbContext dishesDbContext,
    ClaimsPrincipal claimsPrincipal,
    IMapper mapper,
    string? name) =>
{
    Console.WriteLine($"User authenticated? {claimsPrincipal.Identity?.IsAuthenticated}");

    return TypedResults.Ok( mapper.Map<IEnumerable<DishDto>>(await dishesDbContext.Dishes
        .Where(d => name == null || d.Name.Contains(name)).ToListAsync()) );
});
```


# Migrazioni
In Program.cs
```csharp
using (var ServiceScope = app.Services.GetService<IServiceScopeFactory>
    ().CreateScope())
{
    var context = ServiceScope.ServiceProvider.GetRequiredService<DishesDbContext>();
    // viene ottenuto il DishesDbContext, che è un oggetto che rappresenta il contesto di Entity Framework per interagire con il database. 
    context.Database.EnsureDeleted(); // se il database esiste già, verrà rimosso.
    context.Database.Migrate(); // applica le migrazioni a un database, altrimenti crea il database con la struttura delle migrazioni. 
}
```



# MANCA MODULO 4 e 5 






```csharp
dishWithGuidEndpoints.MapGet("", async ([...]) =>
{    [...]
    if (dishEntity == null)
    {
        return Results.NotFound();
    }
    return TypedResults.Ok(mapper.Map<DishDto>(dishEntity) [...]
```
Diventa specificando l'output:
```csharp
dishWithGuidEndpoints.MapGet("", async Task<Results<NotFound, Ok<DishDto>>> ([...]) =>
{    [...]
    if (dishEntity == null)
    {
        return TypedResults.NotFound();
    }
```




# Extending IEndpointRouteBuilder to Structure Your Minimal API
```csharp
In EndPointHandlers > DishesHandlers.cs 
public static class DishesHandlers
{
    public static async Task<Ok<IEnumerable<DishDto>>> GetDishesAsync
        (DishesDbContext dishesDbContext,
        ClaimsPrincipal claimsPrincipal,
        IMapper mapper,
        string? name)
        {
            Console.WriteLine($"User authenticated? {claimsPrincipal.Identity?.IsAuthenticated}");

            return TypedResults.Ok(mapper.Map<IEnumerable<DishDto>>(await 
                dishesDbContext.Dishes.Where(d => name == null || d.Name.Contains(name)).ToListAsync()) );
        }
}

```

In Extensions > EndpointRouteBuilderExtensions.cs:
```csharp
namespace DishesAPI.Extensions;

public static class EndpointRouteBuilderExtensions
{
    public static void RegisterDishesEndpoints(
        this IEndpointRouteBuilder endpointRouteBuilder)
    {
        var dishesEndpoints = endpointRouteBuilder.MapGroup("/dishes");
        var dishWithGuidEndpoints = dishesEndpoints.MapGroup("/{dishId:guid}");
        var ingredientsEndpoints = dishWithGuidEndpoints.MapGroup("/ingredients");

        dishesEndpoints.MapGet("", DishesHandlers.GetDishesAsync);
        [...]
        dishesEndpoints.MapGet("/{dishName}", DishesHandlers.GetDishByNameAsync);
    }
}
```
DishesHandlers si riferirà alla classe nella cartella `EndPointHandlers` di `DishesHandlers.cs`

Il WithName verrà quindi dichiarato quà:
```csharp
public static void RegisterDishesEndpoints(
        this IEndpointRouteBuilder endpointRouteBuilder)
    { [...]
dishWithGuidEndpoints.MapGet("", DishesHandlers.GetDishByIdAsync).WithName("GetDish");
```

In Program.cs
```csharp
app.RegisterDishesEndpoints();
```

# Using the Developer Exception Page Middleware
Se non è stato ancora implementato:
```csharp
ingredientsEndpoints.MapPost("", () =>
{
    throw new NotImplementedException();
});
```

In launchSettings.json:
 - In testing usa:
```csharp
"ASPNETCORE_ENVIRONMENT": "Development"
```
 - In rilascio (per non esporre dati) usa:
```csharp
"ASPNETCORE_ENVIRONMENT": "Production"
```

# Using the Exception Handler Middleware
Per gestire gli errori:
```csharp
if (!app.Environment.IsDevelopment()) { 
    app.UseExceptionHandler(configureApplicationBuilder =>
    {
        configureApplicationBuilder.Run(
            async context =>
            {
                context.Response.StatusCode = (int)
                    HttpStatusCode.InternalServerError;
                context.Response.ContentType = "text/html";
                await context.Response.WriteAsync("An unexpected problem happened.");
            });
    });
}
[...]
app.UseHttpsRedirection();
```

# Improving Error Responses with Problem Details
Per evitare tutto il codice precedente:
```csharp
builder.Services.AddAutoMapper(
[...]
builder.Services.AddProblemDetails();
[...]
var app = builder.Build();
[...]
if (!app.Environment.IsDevelopment()) {
    app.UseExceptionHandler();
}
```

# Logging in Minimal APIs

```csharp
    public static async Task<Ok<IEnumerable<DishDto>>> GetDishesAsync(
        [...]
        ILogger<DishDto> logger,
        [...]
    {
        [...]
        logger.LogInformation("Getting the dishes...");
```

# Creating an Endpoint Filter

```csharp
dishWithGuidEndpoints.MapPut("", DishesHandlers.UpdateDishAsync)
    .AddEndpointFilter(async(context, next) => {
    var dishId = context.GetArgument<Guid>(2);
    var redangId = new Guid("fd630a57-2352-4731-b25c-db9cc7601b16");
    if (dishId == redangId) {
        return TypedResults.Problem(new()
        {
            Status = 400,
            Title = "Dish is perfect and cannot be changed.",
            Detail = "You cannot update perfection."
        });
    }
    var result = await next.Invoke(context);
    return result;
});
```

# Making the Endpoint Filter Reusable
```csharp
public interface IEndPointFilter
{
    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context, 
        EndpointFilterDelegate next)
    {
        throw new NotImplementedException();
    }
}
```

```csharp
public class RendangDishIsLockedFilter : IEndPointFilter
{
    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context, 
        EndpointFilterDelegate next)
    {
        var dishId = context.GetArgument<Guid>(2);
        var redangId = new Guid("fd630a57-2352-4731-b25c-db9cc7601b16");
        if (dishId == redangId)
        {
            return TypedResults.Problem(new()
            {
                Status = 400,
                Title = "Dish is perfect and cannot be changed.",
                Detail = "You cannot update perfection."
            });
        }
        var result = await next.Invoke(context);
        return result;
    }
}
```

In EndpointRouteExtensions
```csharp
        dishWithGuidEndpoints.MapPut("", DishesHandlers.UpdateDishAsync)
            .AddEndpointFilter<RendangDishIsLockedFilter>();
```

```csharp
public class RendangDishIsLockedFilter : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext context, 
        EndpointFilterDelegate next)
    {
        Guid dishId;
        if (context.HttpContext.Request.Method == "PUT")
        {
            dishId = context.GetArgument<Guid>(2);
        } else if {
            dishId = context.GetArgument<Guid>(1);
        } else {
            throw new NotSupportedException("This filter is not supported for this scenario.");
        }
        var redangId = new Guid("fd630a57-2352-4731-b25c-db9cc7601b16");
        if (dishId == redangId)
        {
```

# Chaining Endpoint Filters and Applying Them to a Group


# Applying Business Logic Depending on the Response
```csharp

```

# Demo: Handling Request Validation
```csharp
if (!MiniValidator.TryValidate(dishForCreationDto, out var validationErrors))
{
    return TypedResults.ValidationProblem(validationErrors);
}
```

# Requiring a Bearer Token
Per accessi non autenticati:
In EndpointRouteBuilderExtensions.cs
```csharp
dishesEndpoints.MapGet("/{dishName}", DishesHandlers.GetDishByNameAsync).AllowAnonymous();
```

In Program.cs
```csharp
builder.Services.AddAuthentication().AddJwtBearer();
```

In appsettings.json
```csharp
  "AllowedHosts": "*",

  "Authentication": {
    "DefaultScheme": "Bearer",
    "Schemes": {
      "Bearer": {
        "ValidationAudiences": [
          "menu-api"
        ],
        "ValidIssuer":  "the_component_that_created_the_token"
      }
    }
  }
}
```

```csharp
app.UseAuthentication();
```

In EndpointRouteBuilderExtensions.cs
```csharp
var dishesEndpoints = endpointRouteBuilder.MapGroup("/dishes")
    .RequireAuthorization();
```

# Generating a Token with dotnet-user-jwts
Usiamo: OAuth2 e OpenID
```console
dotnet user-jwts create --help
```

Per generare un token:
```console
dotnet user-jwts create --audience menu-api
```
jwt.io


# Creating and Applying an Authorization Policy
La generazione del token non andrebbe fatta nell'API
In Program.cs
```csharp
builder.Services.AddAuthorizationBuilder()
    .AddPolicy("RequireAdminFromBelgium", policy =>
        policy
            .RequireRole("admin")
            .RequireClaim("country", "belgium")
    );
```


```console
dotnet user-jwts create --audience menu-api --claim country=Belgium --role admin 
```

Copia l'id e incollalo in:
```console
dotnet user-jwts print 355f94a8
```

# Adding Support for OpenAPI with Swashbuckle
Aggiungiamo con NuGet Swashbuckle.AspNetCore

In Program.cs
```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
[...]
app.UseSwagger();
app.UseSwaggerUI();
```

```html
https://localhost:7077/swagger/index.html
```

# Adding Descriptions and Summaries
Va installato il pacchetto `Microsoft.AspNetCore.OpenApi`.

In EndpointRouteBuilderExtensions.cs
```csharp
dishWithGuidIdEndpoints.MapGet("", DishesHandlers.GetDishByIdAsync)
    .WithOpenApi()
    .WithName("GetDish")
    .WithSummary("Get a dish by providing an id.")
    .WithDescription("Dishes are identified by a URI containing a dish")
    .Produces();
```

# Describing Response Types and Status Codes
```csharp
dishesEndpoints.MapPost("", DishesHandlers.CreateDishAsync)
    .RequireAuthorization("RequireAdminFromBelgium")
    .AddEndpointFilter<ValidateAnnotationsFilter>()
        .ProducesValidationProblem(400);
```

# Describing Request Types
```csharp
dishesEndpoints.MapPost("", DishesHandlers.CreateDishAsync)
    .RequireAuthorization("RequireAdminFromBelgium")
    .AddEndpointFilter<ValidateAnnotationsFilter>()
    .ProducesValidationProblem(400)
    .Accepts<DishForCreationDto>(
        "application/json",
        "application/vnd.marvin.dishforcreation+json");
```

Per operazioni non più funzionanti:
```csharp
dishesEndpoints.MapGet("/{dishName}", DishesHandlers.GetDishByNameAsync)
    .AllowAnonymous()
    .WithOpenApi(operation =>
    {
        operation.Deprecated = true;
        return operation;
    });
```

# Describing API Security in Swagger
In program.cs

```csharp
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("TokenAuthNZ", new()
    {
        Name = "Authorization",
        Description = "Token-based authentication and authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header
    });
    options.AddSecurityRequirement(new() {
        {
            new ()
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "TokenAuthNZ" }
            }, new List<string>() }
    });
});
```


```csharp

```


```csharp

```
