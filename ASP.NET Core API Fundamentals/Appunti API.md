# [ASP.NET Core Web API Fundamentals](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/a8d510a4-2e75-4d9a-b2de-9d1d717104e3/summary)
[Gutbug Repos](https://github.com/KevinDockx/AspNetCore6WebAPIFundamentals)

## Quick Start
Crea un nuovo progetto Asp.net. Core.API

[Comandi da terminale](https://learn.microsoft.com/en-us/dotnet/core/tools/)

`CityInfo.API.http` serve per testare l'API

## [Demo: Returning Resources (Part 1)](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/23c10c6c-4054-4416-bb00-f5df5887ea4c/659c8af0-5cf7-4780-b939-61d6f56c8bde)
Crea una classe `CitiesController.cs` nella cartella `Controllers`

```cs
using Microsoft.AspNetCore.Mvc;

namespace CityInfo.API.Controllers
{
    [ApiController]
    //[Route("api/[controller]")]
    public class CitiesController : ControllerBase
    {
        //[HttpGet("api/cities")] -> per definire l'azione per ogni 
        public JsonResult GetCities()
        {
            return new JsonResult(
                new List<object> {
                    new { id = 1, Name = "New York City" },
                    new { id = 2, Name = "Antwerp" }
                    });
        }
    }
}
```

In `Program.cs`

```cs
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
```

In `Models/CityDto.cs`
```cs
namespace CityInfo.API.Models
{
    public class CityDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; } 
        public int NumberOfPointsOfInterest { get; set; }
    }
}
```

CitiesDataStore.cs
```cs
using CityInfo.API.Models;

namespace CityInfo.API.Models
{
    public class CitiesDataStore
    {
        public List<CityDto> Cities { get; set; }
        public static CitiesDataStore Current { get; } = new CitiesDataStore();

        public CitiesDataStore() {
            Cities = new List<CityDto>()
            {
                new CityDto()
                {
                    Id = 1,
                    Name = "New York City",
                    Description = "The one with that big park."
                }
            };
        }
    }
}
```

```cs
namespace CityInfo.API.Controllers
{
    [ApiController]
    //[Route("api/cities")]
    [Route("api/[controller]")]
    public class CitiesController : ControllerBase
    {
        [HttpGet]
        public JsonResult GetCities()
        {
            return new JsonResult(CitiesDataStore.Current.Cities);
        }
        [HttpGet("{id}")]
        public JsonResult GetCity(int id)
        {
            return new JsonResult(
                CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == id));
        }
    }
}
```

## [Demo: Returning Correct Status Codes](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/23c10c6c-4054-4416-bb00-f5df5887ea4c/11ba25df-4fcd-4563-ba4d-25c671fcdec1)

```cs
using CityInfo.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace CityInfo.API.Controllers
{
    [ApiController]
    //[Route("api/cities")]
    [Route("api/[controller]")]
    public class CitiesController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<CityDto>> GetCities()
        {
            return Ok(CitiesDataStore.Current.Cities);
        }
        [HttpGet("{id}")]
        public ActionResult<CityDto> GetCity(int id)
        {
            var cityToReturn = CitiesDataStore.Current.Cities
                .FirstOrDefault(c => c.Id == id);

            if (cityToReturn == null)
            {
                return NotFound();
            }

            return Ok(cityToReturn);
        }
    }
}
```

## [Demo: Returning Child Resources](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/23c10c6c-4054-4416-bb00-f5df5887ea4c/23536c64-21fa-46b7-8d6d-5ee65c308b51)

```cs
//PointOfInterestDto.cs
namespace CityInfo.API.Models
{
    public class PointOfInterestDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }

    }
}
```

```cs
//CityDto.cs
namespace CityInfo.API.Models
{
    public class CityDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int NumberOfPointsOfInterest
        {
            get
            {
                return PointsOfInterest.Count;
            }
        }

        public ICollection<PointOfInterestDto> PointsOfInterest { get; set; }
            = new List<PointOfInterestDto>();
    }
}
```

```cs
//CitiesController.cs
using CityInfo.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace CityInfo.API.Controllers
{
    [ApiController]
    //[Route("api/cities")]
    [Route("api/[controller]")]
    public class CitiesController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<CityDto>> GetCities()
        {
            return Ok(CitiesDataStore.Current.Cities);
        }
        [HttpGet("{id}")]
        public ActionResult<CityDto> GetCity(int id)
        {
            var cityToReturn = CitiesDataStore.Current.Cities
                .FirstOrDefault(c => c.Id == id);

            if (cityToReturn == null)
            {
                return NotFound();
            }

            return Ok(cityToReturn);
        }
    }
}
```

```cs
//CitiesDataController.cs
using CityInfo.API.Models;

namespace CityInfo.API
{
    public class CitiesDataStore
    {
        public List<CityDto> Cities { get; set; }
        public static CitiesDataStore Current { get; } = new CitiesDataStore();

        public CitiesDataStore() {
            Cities = new List<CityDto>()
            {
                new CityDto()
                {
                    Id = 1,
                    Name = "New York City",
                    Description = "The one with that big park.",
                    PointsOfInterest = new List<PointOfInterestDto>()
                    {
                        new PointOfInterestDto()
                        {
                            Id = 1,
                            Name = "Central Park",
                            Description = "A 102-story Skyscraper"
                        }
                    }
                },
                new CityDto()
                {
                    Id = 1,
                    Name = "New York City",
                    Description = "The one with that big park."
                }
            };
        }
    }
}
```

## [Demo: Manipulating ProblemDetails Responses](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/23c10c6c-4054-4416-bb00-f5df5887ea4c/f7f9c965-abc3-4884-aff8-bdaf5b65b607)

```cs
// Per segnalare gli errori:
builder.Services.AddProblemDetails(options =>
    options.CustomizeProblemDetails = ctx =>
    {
        ctx.ProblemDetails.Extensions.Add("AdditionalInfo", "Addiional info example");
        ctx.ProblemDetails.Extensions.Add("server", Environment.MachineName);
    });
```

## [Demo: Formatters and Content Negotiation](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/23c10c6c-4054-4416-bb00-f5df5887ea4c/10494343-7964-4fec-9451-138475b9852a)

```cs
builder.Services.AddControllers(options =>
{
    options.ReturnHttpNotAcceptable = true; //per gli errori, ritorna solo lo status code
}
).AddXmlDataContractSerializerFormatters(); //ritorna JSON solo se richiesto, altrimenti XML
```

## [Demo: Getting a File](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/23c10c6c-4054-4416-bb00-f5df5887ea4c/194fc49d-827b-4732-ba18-21399cc8ad5b)

Un servizio può essere registrato come:
- `transient` : Nuovo oggetto creato per ogni richiesta. Ogni volta che viene richiesto, è un'istanza distinta, che non conserva alcun stato tra le richieste.
- `lifetime` : Oggetti condivisi all'interno di uno stesso ciclo di vita. Riutilizzato per tutte le dipendenze che ne fanno richiesta durante lo stesso ciclo di vita, ma non tra richieste diverse.
- `singleton` : Unico per tutta la durata dell'applicazione. La stessa istanza è utilizzata ogni volta che viene richiesta, quindi viene condivisa tra tutte le dipendenze che ne fanno uso.

```cs
//FilesController.cs
using Microsoft.AspNetCore.Mvc;

namespace CityInfo.API.Controllers
{
    [Route("api/files")]
    [ApiController]
    public class FilesController : Controller
    {
        [HttpGet("{fileId}")]
        public IActionResult GetFile(string fileId)
        {
            var pathToFile = "Tracking.png";

            if (!System.IO.File.Exists(pathToFile))
            {
                return NotFound();
            }
            var bytes = System.IO.File.ReadAllBytes(pathToFile);
            return File(bytes, "text/plain", Path.GetFileName(pathToFile));
        }
    }
}
```

Alternativa:

```cs
//Program.cs
builder.Services.AddSingleton<FileExtensionContentTypeProvider>();
```

```cs
//FilesController.cs
    public class FilesController : Controller
    {

        private readonly FileExtensionContentTypeProvider _fileExtensionContentTypeProvider;

        public FilesController(FileExtensionContentTypeProvider fileExtensionContentTypeProvider)
        {
            _fileExtensionContentTypeProvider = fileExtensionContentTypeProvider
                ?? throw new System.ArgumentNullException(
                    nameof(fileExtensionContentTypeProvider));
        }
        [HttpGet("{fileId}")]
        public IActionResult GetFile(string fileId)
        {
            var pathToFile = "Tracking.png";

            if (!System.IO.File.Exists(pathToFile))
            {
                return NotFound();
            }

            if (!_fileExtensionContentTypeProvider.TryGetContentType(
                pathToFile, out var contentType))
            {
                contentType = "application/octet-stream";
            }

            var bytes = System.IO.File.ReadAllBytes(pathToFile);
            return File(bytes, "text/plain", Path.GetFileName(pathToFile));
        }
    }
}
```

 - `[FromQuery]` - Query string parameters

 - `[FromRoute|` - Route data from the current request

 - `[FromServices]` - The service(s) injected as action parameter

 - `[AsParameters]` - Method parameters


## [Demo: Creating a Resource](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/3aff53f4-4da8-430c-8370-94b41bc71844/d790ce89-f9b4-453b-87e7-2af982bd96f9)

Esempio di Post:

```cs
[HttpPost]
public ActionResult<PointOfInterestDto> GetPointsOfInterests(
    int cityId,
    PointOfInterestForCreationDto pointOfInterest)
    {
    var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);
    if (city == null)
    {
    return NotFound();
    }

    var maxPointOfInterestId = CitiesDataStore.Current.Cities.SelectMany(
        c => c.PointsOfInterest).Max(c => c.Id);

    var finalPointOfInterest = new PointOfInterestDto()
    {
        Id = ++maxPointOfInterestId,
        Name = pointOfInterest.Name,
        Description = pointOfInterest.Description
    };

    city.PointsOfInterest.Add(finalPointOfInterest);

    return CreatedAtRoute("GetPointOfInterest",
        new
        {
            cityId = cityId,
            pointOfInterestId = finalPointOfInterest.Id
        },
        finalPointOfInterest);
}
```

## [Demo: Validating Input](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/3aff53f4-4da8-430c-8370-94b41bc71844/5eecfc11-6e03-4e8f-9a3a-3491f7cada67)

```cs
//PointOfInterestForCreationDto.cs
public class PointOfInterestForCreationDto
{
    [Required(ErrorMessage = "You should provide a name value")]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;
    [MaxLength(100)]
    public string? Description {  get; set; } 
}
```

```cs
//PointsOfInterestController.cs
if (!ModelState.IsValid)
{
    return BadRequest();
}
```


## [Demo: Updating a Resource](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/3aff53f4-4da8-430c-8370-94b41bc71844/c9e511ec-7c6a-48fc-b4fb-be6a9c3184e0)

```cs
//PointsOfInterestController.cs
[Route("api/cities/{cityid}/pointsofinterest")]
...
[HttpPut("{pointofinterestid}")]
public ActionResult UpdatePointOfInterest(int cityId, int pointofinterestid, PointOfInterestForUpdateDto pointOfInterestForUpdateDto)
{
    var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);
    if (city == null)
    {
        return NotFound();
    }

    var pointOfInterestFromStore = city.PointsOfInterest.FirstOrDefault(c => c.Id == pointofinterestid);
    if (pointOfInterestFromStore == null)
    {
        return NotFound();
    }

    pointOfInterestFromStore.Name = pointOfInterestForUpdateDto.Name;
    pointOfInterestFromStore.Description = pointOfInterestForUpdateDto.Description;

    return NoContent();

}
```


## [Demo: Adding Support for JsonPatchDocument](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/3aff53f4-4da8-430c-8370-94b41bc71844/130450f3-22ed-438e-86c4-002235377a00)

Installa NuGet `JsonPatch` e `Mvc.NewtonsoftJson`
```cs
//Program.cs
builder.Services.AddControllers(options =>
{
    options.ReturnHttpNotAcceptable = true;
}).AddNewtonsoftJson().AddXmlDataContractSerializerFormatters();
```

**CONTROLLA CHE PATCH NON CERCHI DI CAMBIARE l'ID**

```cs
//PointsOfInterestController.cs
[HttpPatch("{pointofinterestid}")]
public ActionResult PartiallyUpdatePointOfInterest(int cityId, int pointofinterestid, JsonPatchDocument<PointOfInterestForUpdateDto> patchDocument)
{
    var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);
    if (city == null)
    {
        return NotFound();
    }

    var pointOfInterestFromStore = city.PointsOfInterest.FirstOrDefault(c => c.Id == pointofinterestid);
    if (pointOfInterestFromStore == null)
    {
        return NotFound();
    }

    var pointOfInterestToPatch =
        new PointOfInterestForUpdateDto()
        {
            Name = pointOfInterestFromStore.Name,
            Description = pointOfInterestFromStore.Description,
        };

    patchDocument.ApplyTo(pointOfInterestToPatch, ModelState);

    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    if (!TryValidateModel(pointOfInterestToPatch))
    {
        return BadRequest(ModelState);
    }

    pointOfInterestFromStore.Name = pointOfInterestToPatch.Name;
    pointOfInterestFromStore.Description = pointOfInterestToPatch.Description;

    return NoContent();
}
```


## [Demo: Deleting a Resource](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/3aff53f4-4da8-430c-8370-94b41bc71844/b6e2372a-129b-41da-8c40-030cfb9b23fb)

```cs
//PointsOfInterestController.cs
[HttpDelete("{pointofinterestid}")]
public ActionResult DeletePointOfInterest(int cityId, int pointofinterestid)
{
    var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);
    if (city == null)
    {
        return NotFound();
    }

    var pointOfInterestFromStore = city.PointsOfInterest.FirstOrDefault(c => c.Id == pointofinterestid);
    if (pointOfInterestFromStore == null)
    {
        return NotFound();
    }

    city.PointsOfInterest.Remove(pointOfInterestFromStore);
    return NoContent();
}
```

## [Demo: Creating a File](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/3aff53f4-4da8-430c-8370-94b41bc71844/f974f82f-da7f-4074-bba5-9054c320f74c)

```cs
//PointsOfInterestController.cs
[HttpPost]
public async Task<ActionResult> CreateFile (IFormFile file)
{
    if (file.Length == 0 
        || file.Length > 20971520 
        || file.ContentType != "application/pdf")
    {
        return BadRequest("No file or an invalid one has been inputted");
    }

    var path = Path.Combine(
        Directory.GetCurrentDirectory(),
        "Uploaded/",
        $"uploaded_file_{Guid.NewGuid()}.pdf");

    using (var stream = new FileStream(path, FileMode.Create))
    {
        await file.CopyToAsync(stream);
    }

    return Ok("Your file has been uploaded successfully");
}
```

## [Demo: Injecting and Using a Logger](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/86b07a93-ba70-4da9-829d-06677ad3d4f1/9ff8ceb9-b381-425a-b71e-da32e078b75c)

Per dichiarare un **logger**:
```cs
//PointsOfInterestController.cs
public class PointsOfInterestController : ControllerBase
{
    private readonly ILogger<PointsOfInterestController> _logger;

    public PointsOfInterestController(ILogger<PointsOfInterestController> logger)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [HttpGet]
    public ActionResult<IEnumerable<PointOfInterestDto>> GetPointsOfInterest(int cityid)
    {
        try
        {
            var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityid);
            if (city == null)
            {
                _logger.LogInformation($"City with id {cityid} wasn't found when accessing");
                return NotFound();
            }
            else
            {
                return Ok(city.PointsOfInterest);
            }
        }
        catch (Exception ex)
        {
            _logger.LogCritical($"Exception while gettin id {cityid}");
            return StatusCode(500, "A problem happened while handling your request");
        }
    }
```
```cs
//appsettings.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```
**ATTENZIONE: il log è visibile all'utente. **

Per stampare solo i messaggi di errore come errorcode, cambia:
```cs
//launchsettings.json
  "profiles": {
    "CityInfo.API": {
      "commandName": "Project",
      "launchUrl": "swagger",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Production"
      }
    },
```

e `Program.cs`
```cs
builder.Services.AddProblemDetails();

...

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseExceptionHandler();
}
```

## [Demo: Replacing the Default Logger and Logging to a File](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/86b07a93-ba70-4da9-829d-06677ad3d4f1/fcb70223-100f-4916-b811-e1f6646b33ab)
**SALVARE I LOG in un FILE**

## [Demo: Implementing and Using a Custom Service](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/86b07a93-ba70-4da9-829d-06677ad3d4f1/97bfee68-7225-440e-afa2-a6af7074e98b)

```cs
//Program.cs
builder.Services.AddTransient<LocalMailService>();
```
AddTransient indica che ogni volta che viene richiesto il servizio LocalMailService, verrà creata una nuova istanza di LocalMailService. Questo è utile quando il servizio non mantiene stato tra le richieste e può essere creato e distrutto rapidamente.

```cs
public class PointsOfInterestController : Controller
{
    private readonly LocalMailService _mailservice;

    public PointsOfInterestController(LocalMailService mailservice) 
    { 
        _mailservice = mailservice ?? throw new ArgumentNullException(nameof(mailservice));
    }

    public IActionResult SendEmail()
    {
        // Usa il servizio per inviare un'email
        _mailservice.SendMail("recipient@example.com", "Subject", "Body of the email");
        return Ok("Email sent successfully");
    }
}
```
ASP.NET Core crea un'istanza del controller PointsOfInterestController per soddisfare una richiesta, il framework rileva il costruttore e vede che ha bisogno di un'istanza di LocalMailService.

## [Demo: Registering a Service by Interface](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/86b07a93-ba70-4da9-829d-06677ad3d4f1/760015bb-f6a0-4461-bd3a-437adc888b8f)

`AddSingleton<T>()` indica che verrà creata una sola istanza del servizio durante tutta la durata dell'applicazione e questa stessa istanza verrà utilizzata ogni volta che il servizio viene richiesto. In altre parole, il servizio sarà condiviso tra tutte le richieste e gli oggetti che lo richiedono.
```cs
//Program.cs
builder.Services.AddSingleton<CitiesDataStore>();
```

### Esempio di direttive e condizioni di compilazione
```cs
#region CONFIG1
Console.WriteLine($"Mail from {_mailFrom} to {_mailTo}, with {nameof(CloudMailService)}.");
#endregion 

#if DEBUG
            Console.WriteLine($"Subject: {subject}");
#else
            Console.WriteLine($"Message: {message}");
#endif
```

Proprietà -> Debug -> General per cambiare da Production a Development

## [Demo: Working with Configuration Files](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/86b07a93-ba70-4da9-829d-06677ad3d4f1/898c1890-2b7b-4061-9fe7-f223cd34f77b)

Posso definire variabili appsettings.json
```cs
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "mailSettings": {
    "mailToAdress": "admin@mycompany.com",
    "mailFromAdress":  "notreply@mycompany.com"
  },
  "AllowedHosts": "*"
}
```

e lo implemento così:
```cs
        private string _mailTo = string.Empty;
        private string _mailFrom = string.Empty;

        public LocalMailService(IConfiguration configuration)
        {
            _mailTo = configuration["mailSettings:mailToAddress"];
            _mailFrom = configuration["mailSettings:mailFromAddress"];
        }
```

## [Demo: Scoping Configuration to Environments](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/86b07a93-ba70-4da9-829d-06677ad3d4f1/72d861f5-3ecf-4ac8-83e7-544759cb6b49)
Dichiarando un nuovo `appsettings.production`, posso dichiarare le variabili che verranno utilizzate quando in modalità produzione


## [Demo: Creating Entity Classes](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/95f7c814-bf34-4882-a504-de151772c25d/f5bab20f-f318-4ada-9f8f-1dbc1c27f72e)
```cs
//Entities/City.cs
using CityInfo.API.Models;

namespace CityInfo.API.Entities
{
    public class City
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public ICollection<PointOfInterestDto> PointOfInterests { get; set; } = new List<PointOfInterestDto>();

        //poiché Name potrebbe essere nullo. E' come dichiarare = string.null;
        public City(string name)
        {
            Name = name;
        }
    }
}
```

```cs
//Entities/City.cs
namespace CityInfo.API.Entities
{
    public class City
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [MaxLength(200)]
        public string? Description { get; set; }
        public ICollection<PointOfInterestDto> PointOfInterests { get; set; } = new List<PointOfInterestDto>();

        //poiché Name potrebbe essere nullo
        public City(string name)
        {
            Name = name;
        }
    }
}

```

```cs
//Entities/PointOfInterest.cs
namespace CityInfo.API.Entities
{
    public class PointOfInterest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        [ForeignKey("CityId")]
        public City? City { get; set; }
        public int CityId { get; set; }
        public PointOfInterest(string name)
        {
            Name = name;
        }
    }
}
```

## [Demo: Creating a DbContext](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/95f7c814-bf34-4882-a504-de151772c25d/0ddd2ba1-9787-4d93-88c0-ae3523682050)

```cs
//DbContexts/CityInfoDbContext.cs
using CityInfo.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace CityInfo.API.DbContexts
{
    public class CityInfoContext : DbContext
    {
        public  DbSet<City> Cities {  get; set; }
        public DbSet<PointOfInterest> PointOfInterests { get; set; }

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        // {
        //     optionsBuilder.UseSqlServer("connectionstring");

        //     base.OnConfiguring(optionsBuilder);
        // }
    }
}
```

```cs
//Program.cs
builder.Services.AddDbContext<CityInfoContext>();
builder.Services.AddDbContext<CityInfoContext>(dbContextOptions => dbContextOptions.UseSqlite("Data source=CityInfo.db"));
```

[Demo: Working with Migrations](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/95f7c814-bf34-4882-a504-de151772c25d/ac4bf732-ac10-4991-9638-fb9a150263bb)
*Necessario*: `EntityFrameworkCore.Tools` e `Sqlite` -> In Package Manager Console `add-migration CityInfoDBInitialMigration` `update-migration`

[Demo: Safely Storing Sensitive Configuration Data](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/95f7c814-bf34-4882-a504-de151772c25d/3aec5663-1891-4c20-ac99-6d0c96c53f3e)

```cs
//appsettings.Development.json
...
    },
    "ConnectionStrings": {
    "CityInfoDBConnectionString": "Data Source=CityInfo.db"
    }
}
```

```cs
//Program.cs
builder.Services.AddDbContext<CityInfoContext>(
    dbContextOptions => dbContextOptions.UseSqlite(
        builder.Configuration["ConnectionStrings:CityInfoDbConnectionString"]));
``` 

[Demo: Introducing the Repository Pattern (Part 1)](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/b287b744-11fc-4af7-9e08-c9356499c71f/3520dccc-cbe0-4bc8-9a9e-d5f3675ecbca)
I file in `Services` contengono il codice che implementa la **logica di business** dell'applicazione. Ad esempio, un servizio può occuparsi di operazioni come il recupero di dati da un database, la gestione di utenti, o altre attività legate al funzionamento centrale dell'applicazione.

```cs
IQueryable<City> GetCities(); // permette di eseguire ulteriori query sul dato in uscita dall'API
IEnumerable<City> GetCities(); // esporta un dato in cui non viene esposta la struttura della repo
Task<IEnumerable<City>> GetCitiesAsync() //per una chiamata asincrona
```

```cs
//Services/ICityInfoRepository.cs
using CityInfo.API.Entities;

namespace CityInfo.API.Services
{
    public interface ICityInfoRepository
    {
        Task<IEnumerable<City>> GetCitiesAsync();

        Task<City?> GetCityAsync(int cityId);

        Task<IEnumerable<PointOfInterest>> GetPointsOfInterestForCityAsync(int cityId);
        Task<PointOfInterest?> GetPointOfInterestForCityAsync(int cityId, int pointOfInterestId);
    }
}
```

[DA CONTINUARE](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/b287b744-11fc-4af7-9e08-c9356499c71f/4d259b9d-2a52-4e47-9dbd-b8dcf17f0935)

Esempio di comando **'OrderBy'**:
```cs
public CityInfoRepository(CityInfoContext context)
{
    _context = context ?? throw new ArgumentNullException(nameof(context));
}
public async Task<IEnumerable<City>> GetCitiesAsync()
{
    return await _context.Cities.OrderBy(c => c.Name).ToListAsync();
}
```

```cs
//CityInfoRepository.cs
using CityInfo.API.DbContexts;
using CityInfo.API.Entities;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace CityInfo.API.Services
{
    public class CityInfoRepository : ICityInfoRepository
    {
        private readonly CityInfoContext _context;
        public CityInfoRepository(CityInfoContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }
        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await _context.Cities.OrderBy(c => c.Name).ToListAsync();
        }

        public async Task<City?> GetCityAsync(int cityId, bool includePointsOfInterest)
        {
            if (includePointsOfInterest)
            {
                return await _context.Cities.Include(c => c.PointOfInterests)
                    .Where(c => c.Id == cityId).FirstOrDefaultAsync();
            }

            return await _context.Cities
                .Where(c => c.Id == cityId).FirstOrDefaultAsync();
        }

        public async Task<PointOfInterest?> GetPointsOfInterestForCityAsync(int cityId, int pointOfInterestId)
        {
            return await _context.PointOfInterests
                    .Where(p => p.Id == cityId && p.Id == pointOfInterestId).FirstOrDefaultAsync();
        }
        public async Task<IEnumerable<PointOfInterest?>> GetPointOfInterestForCityAsync(int cityId, int pointOfInterestId)
        {
            return await _context.PointOfInterests
                    .Where(p => p.CityId == cityId).ToListAsync();
        }
    }
}
```

```cs
//ICityInfoRepository.cs
using CityInfo.API.Entities;

namespace CityInfo.API.Services
{
    public interface ICityInfoRepository
    {
        Task<IEnumerable<City>> GetCitiesAsync();

        Task<City?> GetCityAsync(int cityId, bool includePointsOfInterest);

        Task<PointOfInterest?> GetPointsOfInterestForCityAsync(int cityId, int pointOfInterestId);
        Task<IEnumerable<PointOfInterest>> GetPointOfInterestForCityAsync(int cityId, int pointOfInterestId);
    }
}
```

**?? RIGUARDA QUESTA E PRECEDENTE**

## [Demo: Using AutoMapper to Map Between Entities and DTOs](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/b287b744-11fc-4af7-9e08-c9356499c71f/c436759a-c47a-491c-8c80-0e12f6f21017)

Uso di Mapper:

```cs
//CitiesController.cs
namespace CityInfo.API.Controllers
{
    [ApiController]
    [Route("api/cities")]
    public class CitiesController : ControllerBase
    {
        private readonly ICityInfoRepository _cityInfoRepository;
        private readonly IMapper _mapper;

        public CitiesController(ICityInfoRepository cityInfoRepository,
            IMapper mapper)
        {
            _cityInfoRepository = cityInfoRepository ??
                throw new ArgumentNullException(nameof(cityInfoRepository));
            _mapper = mapper ??
                throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CityWithoutPointsOfInterestDto>>> GetCities()
        {
            var cityEntities = await _cityInfoRepository.GetCitiesAsync();
            return Ok(_mapper.Map<IEnumerable<CityWithoutPointsOfInterestDto>>(cityEntities));

        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCity(
            int id, bool includePointsOfInterest = false)
        {
            var city = await _cityInfoRepository.GetCityAsync(id, includePointsOfInterest);
            if (city == null)
            {
                return NotFound();
            }

            if (includePointsOfInterest)
            {
                return Ok(_mapper.Map<CityDto>(city));
            }

            return Ok(_mapper.Map<CityWithoutPointsOfInterestDto>(city));
        }
```

```cs
//Profiles/CityProfile.cs
namespace CityInfo.API.Profiles
{
    public class CityProfile : Profile
    {
        public CityProfile()
        {
            CreateMap<Entities.City, Models.CityWithoutPointsOfInterestDto>();
            CreateMap<Entities.City, Models.CityDto>();
            
        }
    }
}
```

```cs
//Models/CityDto.cs
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
```

```cs
    public class CityDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int NumberOfPointsOfInterest
        {
            get
            {
                return PointsOfInterest.Count;
            }
        }

        public ICollection<PointOfInterestDto> PointsOfInterest { get; set; }
            = new List<PointOfInterestDto>();
    }
```
**Count permette di ritornare la conta degli elementi.**

## [Demo: Creating a Resource](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/b287b744-11fc-4af7-9e08-c9356499c71f/86937211-7cc6-4ab6-907f-fb41954c3aa8)

```cs
//Services/CityInfoRepository.cs
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync() >= 0);
        }
```

```cs
//Controllers/PointsOfInterestController.cs
await _cityInfoRepository.SaveChangesAsync();
var createdPointOfInterestToReturn =
                _mapper.Map<Models.PointOfInterestDto>(finalPointOfInterest);
```

## [Demo: Updating a Resource](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/b287b744-11fc-4af7-9e08-c9356499c71f/b009717f-6aa8-44ec-bb02-e44c5292a255)

## [Demo: Partially Updating a Resource](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/b287b744-11fc-4af7-9e08-c9356499c71f/851914e4-e052-44d6-a35d-819f7dbb5482)
```cs
//Controllers/PointsOfInterestController.cs
[HttpPatch("{pointofinterestid}")]
        public async Task<ActionResult> PartiallyUpdatePointOfInterest(
           int cityId, int pointOfInterestId,
           JsonPatchDocument<PointOfInterestForUpdateDto> patchDocument)
        {
            if (!await _cityInfoRepository.CityExistsAsync(cityId))
            {
                return NotFound();
            }

            var pointOfInterestEntity = await _cityInfoRepository
                .GetPointOfInterestForCityAsync(cityId, pointOfInterestId);
            if (pointOfInterestEntity == null)
            {
                return NotFound();
            }

            var pointOfInterestToPatch = _mapper.Map<PointOfInterestForUpdateDto>(
                pointOfInterestEntity);

            patchDocument.ApplyTo(pointOfInterestToPatch, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!TryValidateModel(pointOfInterestToPatch))
            {
                return BadRequest(ModelState);
            }

            _mapper.Map(pointOfInterestToPatch, pointOfInterestEntity);
            await _cityInfoRepository.SaveChangesAsync();

            return NoContent();
        }
```

E nella chiamata PAtCH in formato RAW/JSON verso cities/1/pointsofinterest/1
```cs
[
    {
        "op": "replace",
        "path": "/name",
        "value": "Updated again - Central Park"
    }
]
```

## [Demo: Deleting a Resource](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/b287b744-11fc-4af7-9e08-c9356499c71f/61758f1f-edbc-4c55-aced-390b81b3fa6e)

```cs
[HttpDelete("{pointOfInterestId}")]
public async Task<ActionResult> DeletePointOfInterest(
    int cityId, int pointOfInterestId)
{
    if (!await _cityInfoRepository.CityExistsAsync(cityId))
    {
        return NotFound();
    }

    var pointOfInterestEntity = await _cityInfoRepository
        .GetPointOfInterestForCityAsync(cityId, pointOfInterestId);
    if (pointOfInterestEntity == null)
    {
        return NotFound();
    }

    _cityInfoRepository.DeletePointOfInterest(pointOfInterestEntity);
    await _cityInfoRepository.SaveChangesAsync();

    _mailService.Send(
        "Point of interest deleted.",
        $"Point of interest {pointOfInterestEntity.Name} with id {pointOfInterestEntity.Id} was deleted.");

    return NoContent();
}
```

```cs
//Services/ICityInfoRepository.cs
void DeletePointOfInterest(PointOfInterest pointOfInterest); //non è un metodo I/O, quindi non è ASYNC
```

```cs
//Services/CityInfoRepository.cs
public void DeletePointOfInterest(PointOfInterest pointOfInterest)
        {
            _context.PointsOfInterest.Remove(pointOfInterest);
        }
```

## [Demo: Filtering Resources](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/c512c7f7-61a7-4e08-bbc2-2ccb85956e7c/946913c3-bc9c-4bdc-9618-ab1764886d11)


## [Demo: Filtering Resources](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/c512c7f7-61a7-4e08-bbc2-2ccb85956e7c/946913c3-bc9c-4bdc-9618-ab1764886d11)
```cs
//appsetings.Development.json
"Microsoft.EntityFrameworkCore.Database.Command": "Information"
```
Questo comando mostra informazioni non necessarie di query nel log solo in stato Development


## [Demo: Searching Through Resources](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/c512c7f7-61a7-4e08-bbc2-2ccb85956e7c/2f3df1e9-c351-43f2-8b8b-eb69170ff99b)

## [Demo: Paging Through Resources](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/c512c7f7-61a7-4e08-bbc2-2ccb85956e7c/69674a94-a552-4faf-b8fb-ec7d142b6d35)
Il "paging" (o paginazione) è una tecnica che viene utilizzata per suddividere una grande quantità di dati in "pagine" più piccole e gestibili, così che possano essere recuperati e visualizzati in modo più efficiente.
```cs
public async Task<(IEnumerable<City>, PaginationMetadata)> GetCitiesAsync(
            string? name, string? searchQuery, int pageNumber, int pageSize)
        {
            // collection to start from
            var collection = _context.Cities as IQueryable<City>;

            if (!string.IsNullOrWhiteSpace(name))
            {
                name = name.Trim();
                collection = collection.Where(c => c.Name == name);
            }

            if (!string.IsNullOrWhiteSpace(searchQuery))
            {
                searchQuery = searchQuery.Trim();
                collection = collection.Where(a => a.Name.Contains(searchQuery)
                    || (a.Description != null && a.Description.Contains(searchQuery)));
            }

            var totalItemCount = await collection.CountAsync();

            var paginationMetadata = new PaginationMetadata(
                totalItemCount, pageSize, pageNumber);

            var collectionToReturn = await collection.OrderBy(c => c.Name)
                .Skip(pageSize * (pageNumber - 1))
                .Take(pageSize)
                .ToListAsync();

            return (collectionToReturn, paginationMetadata);
        }
```
 - `Skip(pageSize * (pageNumber - 1))`: questa istruzione salta (o esclude) un certo numero di città. In particolare, calcola il numero di elementi da saltare in base al numero di pagina corrente. Ad esempio, se pageNumber è 3 e pageSize è 10, salterà i primi 20 risultati (10 per pagina, quindi le prime 2 pagine) e inizierà a restituire i risultati dalla pagina 3.
 - `Take(pageSize)` : questa istruzione prende solo il numero di città corrispondenti alla dimensione della pagina (pageSize). Ad esempio, se pageSize è 10, verranno prese solo 10 città per la pagina corrente.

## [Demo: Returning Pagination Metadata](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/c512c7f7-61a7-4e08-bbc2-2ccb85956e7c/d6839ea5-2277-4052-92ad-9981f774af9b)

```cs
//Services/PaginationMetadata.cs
public class PaginationMetadata
    {
        public int TotalItemCount { get; set; }
        public int TotalPageCount { get; set; }
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }

        public PaginationMetadata(int totalItemCount, int pageSize, int currentPage)
        {
            TotalItemCount = totalItemCount;
            PageSize = pageSize;
            CurrentPage = currentPage;
            TotalPageCount = (int)Math.Ceiling(totalItemCount / (double)pageSize);
        }
    }
```


```cs
//Services/CityInfoRepository.cs
public async Task<(IEnumerable<City>, PaginationMetadata)> GetCitiesAsync(
    string? name, string? searchQuery, int pageNumber, int pageSize)
{
    // collection to start from
    var collection = _context.Cities as IQueryable<City>;

    if (!string.IsNullOrWhiteSpace(name))
    {
        name = name.Trim();
        collection = collection.Where(c => c.Name == name);
    }

    if (!string.IsNullOrWhiteSpace(searchQuery))
    {
        searchQuery = searchQuery.Trim();
        collection = collection.Where(a => a.Name.Contains(searchQuery)
            || (a.Description != null && a.Description.Contains(searchQuery)));
    }

    var totalItemCount = await collection.CountAsync();

    var paginationMetadata = new PaginationMetadata(
        totalItemCount, pageSize, pageNumber);

    var collectionToReturn = await collection.OrderBy(c => c.Name)
        .Skip(pageSize * (pageNumber - 1))
        .Take(pageSize)
        .ToListAsync();

    return (collectionToReturn, paginationMetadata);
}
```
`CountAsync` è una funzione di EntityFramework 


```cs
//Controllers/CitiesController.cs
[HttpGet]
public async Task<ActionResult<IEnumerable<CityWithoutPointsOfInterestDto>>> GetCities(
            string? name, string? searchQuery, int pageNumber = 1, int pageSize = 10)
{
    if (pageSize > maxCitiesPageSize)
    {
        pageSize = maxCitiesPageSize;
    }

    var (cityEntities, paginationMetadata) = await _cityInfoRepository
        .GetCitiesAsync(name, searchQuery, pageNumber, pageSize);

    Response.Headers.Add("X-Pagination",
        JsonSerializer.Serialize(paginationMetadata));

    return Ok(_mapper.Map<IEnumerable<CityWithoutPointsOfInterestDto>>(cityEntities));
}
```

https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/64eb2eda-8937-4921-b840-9d58d17931f2/c3449838-76d1-4949-8df4-423ac64ea29f

## [Demo: Creating a Token](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/64eb2eda-8937-4921-b840-9d58d17931f2/efe6c29c-8d59-4b02-94fc-20e3485d33ba)

```cs
//Controllers/AuthenticationController.cs
[Route("api/authentication")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IConfiguration _configuration;

    // we won't use this outside of this class, so we can scope it to this namespace
    public class AuthenticationRequestBody
    {
        public string? UserName { get; set; }
        public string? Password { get; set; }
    }

    private class CityInfoUser
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }

        public CityInfoUser(
            int userId, 
            string userName, 
            string firstName, 
            string lastName, 
            string city)
        {
            UserId = userId;
            UserName = userName;
            FirstName = firstName;
            LastName = lastName;
            City = city;
        }
    }

    public AuthenticationController(IConfiguration configuration)
    {
        _configuration = configuration ?? 
            throw new ArgumentNullException(nameof(configuration));
    }

    [HttpPost("authenticate")]
    public ActionResult<string> Authenticate(
        AuthenticationRequestBody authenticationRequestBody)
    {  
        // Step 1: validate the username/password
        var user = ValidateUserCredentials(
            authenticationRequestBody.UserName,
            authenticationRequestBody.Password);

        if (user == null)
        {
            return Unauthorized();
        }

        // Step 2: create a token
        var securityKey = new SymmetricSecurityKey(
            Convert.FromBase64String(_configuration["Authentication:SecretForKey"]));
        var signingCredentials = new SigningCredentials(
            securityKey, SecurityAlgorithms.HmacSha256);
            
        var claimsForToken = new List<Claim>();
        claimsForToken.Add(new Claim("sub", user.UserId.ToString()));
        claimsForToken.Add(new Claim("given_name", user.FirstName));
        claimsForToken.Add(new Claim("family_name", user.LastName));
        claimsForToken.Add(new Claim("city", user.City));
            
        var jwtSecurityToken = new JwtSecurityToken(
            _configuration["Authentication:Issuer"],
            _configuration["Authentication:Audience"],
            claimsForToken,
            DateTime.UtcNow,
            DateTime.UtcNow.AddHours(1),
            signingCredentials);

        var tokenToReturn = new JwtSecurityTokenHandler()
            .WriteToken(jwtSecurityToken);

        return Ok(tokenToReturn);
    }

    private CityInfoUser ValidateUserCredentials(string? userName, string? password)
    {
        // we don't have a user DB or table.  If you have, check the passed-through
        // username/password against what's stored in the database.
        //
        // For demo purposes, we assume the credentials are valid

        // return a new CityInfoUser (values would normally come from your user DB/table)
        return new CityInfoUser(
            1,
            userName ?? "",
            "Kevin",
            "Dockx",
            "Antwerp");

    }
}
```
Le credenziali di firma sono credenziali usate per firmare il token. Il token contiene informazioni su chi sia l'utente: le **claim**.

La chiave in
```cs
//appsettings.Development.json
"ConnectionStrings": {
    "CityInfoDBConnectionString": "Data Source=CityInfo.db"
  },
  "Authentication": {
    "SecretForKey": "i3DOjO5RGYnUibLEhUokFmeA38hj0sokMF7OjiiUJ0s=",
    "Issuer": "https://localhost:7169",
    "Audience": "cityinfoapi"  
  }
}
```


## [Demo: Requiring and Validating a Token](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/64eb2eda-8937-4921-b840-9d58d17931f2/06b6e87f-691e-47f0-9798-ddbdcfec815e)
Per convalidare i token in arrivo ossiamo usare authentication.JwtBearer
```cs
//Program.cs
builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new(){
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigninKey = true,
            ValidIssuer = builder.Configuration["Authentication:Issuer"],
            ValidAudience = builder.Configuration["Authentication:Audience"],
            IssuerSigninKey = new SymmetricSecurityKey(
                Convert.FromBase64String(builder.Configuration["Authentication:SecretForKey"])
            )
        }
    })

...

app.UseAuthentication();
```

A tutti i controller va aggiunto:
```cs
[Authorize]
```
Tranne per l'AuthenticationController.cs

## [Demo: Using Information from the Token in Your Controller](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/64eb2eda-8937-4921-b840-9d58d17931f2/22fa91f7-a94f-419d-943b-97777cb25831)
Il Token da Postman va in Authorization -> Bearer


ControllerBase ha un public ClaimsPrincipal User
```cs
//Controllers/PointsOfInterestController.cs
[HttpGet]
public async Task<ActionResult<IEnumerable<PointOfInterestDto>>> GetPointsOfInterest(
    var citName = User.Claims.FirstOrDefault(c => c.Type == "city")?.Value;
    if (!await _cityInfoRepository.CityExistsAsync(cityId))
    {
        _logger.LogInformation(
            $"City with id {cityId} wasn't found when accessing points of interest.");
        return NotFound();
    }
```

La prima riga può essere definita in una funzione separata in CityInfoRepository.cs
```cs
public async Task<IEnumerable<City>> GetCitiesAsync()
{
    return await _context.Cities.OrderBy(c => c.Name).ToListAsync();
}
```

Che diventa
```cs
//Controllers/PointsOfInterestController.cs
var citName = User.Claims.FirstOrDefault(c => c.Type == "city")?.Value;
if (!await _cityInfoRepository.CityNameMatchesCityId(cityName,cityId))
    {
        _logger.LogInformation(
            $"City with id {cityId} wasn't found when accessing points of interest.");
        return NotFound();
    }
    if (!await _cityInfoRepository.CityExistsAsync(cityId))
    {
        _logger.LogInformation(
            $"City with id {cityId} wasn't found when accessing points of interest.");
        return NotFound();
    }
```



```cs
//Program.cs
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("MustBeFromAntwerp", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireClaim("city", "Antwerp");
    });
});
```

```cs
//PointsOfInterestController.cs
[Authorize(Policy = "MustBeFromAntwerp")]
```


[Demo: Generating a Token with dotnet user-jwts](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/64eb2eda-8937-4921-b840-9d58d17931f2/5ab23f7e-67d3-4870-a6f6-8b9474d173dd)

```console
cotnet user-jwts create --help
```

```cs
```

```cs
```

```cs
```

```cs
```

```cs
```