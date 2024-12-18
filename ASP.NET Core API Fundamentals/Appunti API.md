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
Eseguono nel controller
```cs
if (!ModelState.IsValid)
{
    return BadRequest();
}
```


[Demo: Updating a Resource](https://app.pluralsight.com/ilx/video-courses/a18c29bd-8b02-4643-b2a1-15aebdc571f1/3aff53f4-4da8-430c-8370-94b41bc71844/c9e511ec-7c6a-48fc-b4fb-be6a9c3184e0)

```cs
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

```cs
```

```cs
```

```cs
```

```cs
```