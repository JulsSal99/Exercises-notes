[ASP.NET Core Web API Fundamentals](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/a8d510a4-2e75-4d9a-b2de-9d1d717104e3/summary)
[Gutbug Repos](https://github.com/KevinDockx/AspNetCore6WebAPIFundamentals)

# Quick Start
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

[Demo: Returning Child Resources](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/23c10c6c-4054-4416-bb00-f5df5887ea4c/23536c64-21fa-46b7-8d6d-5ee65c308b51)

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

[Demo: Manipulating ProblemDetails Responses](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/23c10c6c-4054-4416-bb00-f5df5887ea4c/f7f9c965-abc3-4884-aff8-bdaf5b65b607)

```cs
// Per segnalare gli errori:
builder.Services.AddProblemDetails(options =>
    options.CustomizeProblemDetails = ctx =>
    {
        ctx.ProblemDetails.Extensions.Add("AdditionalInfo", "Addiional info example");
        ctx.ProblemDetails.Extensions.Add("server", Environment.MachineName);
    });
```

[Demo: Formatters and Content Negotiation](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/23c10c6c-4054-4416-bb00-f5df5887ea4c/10494343-7964-4fec-9451-138475b9852a)

```cs
builder.Services.AddControllers(options =>
{
    options.ReturnHttpNotAcceptable = true; //per gli errori, ritorna solo lo status code
}
).AddXmlDataContractSerializerFormatters(); //ritorna JSON solo se richiesto, altrimenti XML
```

[Demo: Getting a File](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/23c10c6c-4054-4416-bb00-f5df5887ea4c/194fc49d-827b-4732-ba18-21399cc8ad5b)

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


[Demo: Creating a Resource](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/3aff53f4-4da8-430c-8370-94b41bc71844/d790ce89-f9b4-453b-87e7-2af982bd96f9)

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

[Demo: Validating Input](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/3aff53f4-4da8-430c-8370-94b41bc71844/5eecfc11-6e03-4e8f-9a3a-3491f7cada67)

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


[Demo: Updating a Resource](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/3aff53f4-4da8-430c-8370-94b41bc71844/c9e511ec-7c6a-48fc-b4fb-be6a9c3184e0)

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


[Demo: Adding Support for JsonPatchDocument](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/3aff53f4-4da8-430c-8370-94b41bc71844/130450f3-22ed-438e-86c4-002235377a00)

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


[Demo: Deleting a Resource](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/3aff53f4-4da8-430c-8370-94b41bc71844/b6e2372a-129b-41da-8c40-030cfb9b23fb)

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

[Demo: Creating a File](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/3aff53f4-4da8-430c-8370-94b41bc71844/f974f82f-da7f-4074-bba5-9054c320f74c)

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

[Demo: Injecting and Using a Logger](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/86b07a93-ba70-4da9-829d-06677ad3d4f1/9ff8ceb9-b381-425a-b71e-da32e078b75c)

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

[Demo: Replacing the Default Logger and Logging to a File](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/86b07a93-ba70-4da9-829d-06677ad3d4f1/fcb70223-100f-4916-b811-e1f6646b33ab)
**SALVARE I LOG in un FILE**

[Demo: Implementing and Using a Custom Service](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/86b07a93-ba70-4da9-829d-06677ad3d4f1/97bfee68-7225-440e-afa2-a6af7074e98b)

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

[Demo: Registering a Service by Interface](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/86b07a93-ba70-4da9-829d-06677ad3d4f1/760015bb-f6a0-4461-bd3a-437adc888b8f)

`AddSingleton<T>()` indica che verrà creata una sola istanza del servizio durante tutta la durata dell'applicazione e questa stessa istanza verrà utilizzata ogni volta che il servizio viene richiesto. In altre parole, il servizio sarà condiviso tra tutte le richieste e gli oggetti che lo richiedono.
```cs
//Program.cs
builder.Services.AddSingleton<CitiesDataStore>();
```

## Esempio di direttive e condizioni di compilazione
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

[Demo: Working with Configuration Files](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/86b07a93-ba70-4da9-829d-06677ad3d4f1/898c1890-2b7b-4061-9fe7-f223cd34f77b)

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

[Demo: Scoping Configuration to Environments](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/86b07a93-ba70-4da9-829d-06677ad3d4f1/72d861f5-3ecf-4ac8-83e7-544759cb6b49)
Dichiarando un nuovo `appsettings.production`, posso dichiarare le variabili che verranno utilizzate quando in modalità produzione



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

```cs
```