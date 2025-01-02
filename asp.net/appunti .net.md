
dotnet new console -o ./CsharpProjects/TestProject
dotnet build
.Contains .ToLower
Console.WriteLine(value1.Trim().ToLower() == value2.Trim().ToLower());
Random coin = new Random();
int flip = coin.Next(0, 2);

```csharp
Console.WriteLine($"sbyte  : {sbyte.MinValue} to {sbyte.MaxValue}");
Console.WriteLine($"short  : {short.MinValue} to {short.MaxValue}");
Console.WriteLine($"int    : {int.MinValue} to {int.MaxValue}");
Console.WriteLine($"long   : {long.MinValue} to {long.MaxValue}");
```

```csharp
Random random = new Random();
Console.Write($"{random.Next(1, 100)} ");
foreach (int x in a){}
```

```csharp
int currentGMT = Convert.ToInt32(Console.ReadLine());
```

```csharp
time = time.Insert(0, "0:0");
```

```csharp
diff = 100 * (Math.Abs(newGMT) - Math.Abs(currentGMT));
```

```csharp
string[] address = ipv4Input.Split(".");
```

```csharp
number.StartsWith("0")) 
```

```csharp
int value = int.Parse(number);
```

```csharp
address = ip.Split(".", StringSplitOptions.RemoveEmptyEntries);
```

```csharp

```








------------------ JS:

'use strict';


.light-theme {
  --bg: var(--green);
  --fontColor: var(--black);
  --btnBg: var(--black);
  --btnFontColor: var(--white);
}

.dark-theme {
  --bg: var(--black);
  --fontColor: var(--green);
  --btnBg: var(--white);
  --btnFontColor: var(--black);
}
.btn {
  position: absolute;
  top: 20px;
  left: 250px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: none;
  color: var(--btnFontColor);
  background-color: var(--btnBg);
}
switcher.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
});

https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA


dotnet new page --name PizzaList --namespace ContosoPizza.Pages --output Pages
dotnet watch


_ViewImports.cshtml	Imports namespaces and classes that are used across multiple pages.
_ViewStart.cshtml	Specifies the default layout for all Razor pages.
Pages/Shared/_Layout.cshtml	This is the layout specified by the _ViewStart.cshtml file. Implements common layout elements across multiple pages.
Pages/Shared/_ValidationScriptsPartial.cshtml	Provides validation functionality to all pages.


<partial name="_ValidationScriptsPartial" />
<label asp-for="Foo.Id" class="control-label"></label>
<input asp-for="Foo.Id" class="form-control" />
<div asp-validation-summary="All"></div>
number.Length

GET: Retrieve data from the web service.
POST: Create a new item of data on the web service.
PUT: Update an item of data on the web service.
PATCH: Update an item of data on the web service by describing a set of instructions about how the item should be modified. The sample application in this module doesn't use this verb.
DELETE: Delete an item of data on the web service.

IN nUGET TERMINAL
add-migration initial
get-help entityframework
Install-Package Microsoft.EntityFrameworkCore.Design
UPDATE-DATABASE -verbose
script-migration
script-migration -idempotent

Scaffold-DbContext "Data Source = (localdb)\MSSQLLocalDB; Initial Catalog = PubDatabase"
Microsoft.EntityFrameworkCore.SqlServer


// 
PubContext.cs

protected override void OnModelCreating(ModelBuilder modelBuilder) { 
	modelBuilder.Entity<Author>() 
	.HasMany<Book>() 
	.WithOne()
	.HasForeignKey(b=>b.AuthorId);
	.IsRequired(false);
} 
protected override void OnModelCreating(ModelBuilder modelBuilder) { 
	modelBuilder.Entity<Author>() 
	.HasMany<Book>() 
	.WithOne()
	.HasForeignKey("AuthorId");
	.IsRequired(false);
} 


protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.UseSqlServer(
      "Data Source = (localdb)\\MSSQLLocalDB; Initial Catalog = PubDatabase"
    ).LogTo(Console.WriteLine), new[] {DbLoggerCategory.Database.Command.Name},
                LogLevel.Information)
         .EnableSensitiveDataLogging();
}

.EnableSensitiveDataLogging(); mostra le variabili nel log


Per salvare in un file _writer.WriteLine

public override void Dispose()
{
    _writer.Dispose();  
    base.Dispose();
}

public class PubContextStreamWriter : DbContext
{
    private StreamWriter _writer = new StreamWriter("EFCoreLog.txt", append: true);
[...]

protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // Configura la connessione al database (ad esempio, usando SQL Server)
        optionsBuilder.UseSqlServer("your_connection_string");

        // Configura il logging delle query SQL nell'output di debug
        optionsBuilder
            .LogTo(log => Debug.WriteLine(log));  // Scrive i log delle query SQL in Debug output
    }


.select(a => new
{
	a.AuthorId,
	Name = a.FirstName.First() + "" + a.LastName,
	Books = a.Books.Where(b => b.PublishDate.Year < 2000).Count()
})
.ToList();
FirstOrDefault().Include(a=> a.Books)
First(1).Include(a=> a.Books).ThenInclude(b => b.BookJackets).ToList();
First(1).Include(a=> a.Books).Include(a => a.ContactInfo).ToList();
First(1).Include(a=> a.Books.BookJackets).ToList();
.Include(a=> a.Books).First(1)

void ExplicitLoadCollection()
{
    var author = _context.Authors.FirstOrDefault(a => a.LastName == "Howey");
    if (author != null)
    { 
        _context.Entry(author).Collection(a => a.Books).Load(); 
    }
}
/*
	- _context.Entry(author): Ottieni l'oggetto EntityEntry per l'entità author, che ti permette di accedere e modificare lo stato di quell'entità nel contesto.
	- .Collection(a => a.Books): Specifica che vuoi lavorare con la collezione Books dell'autore, ossia la relazione tra Author e Books.
	- .Load(): Carica esplicitamente la collezione Books (se non è già stata caricata), effettuando una query separata per recuperare i libri associati all'autore.
Questo è utile quando vuoi evitare il caricamento automatico (lazy loading) e preferisci caricare i dati correlati solo quando necessario, per ottimizzare le performance e ridurre il numero di query.
*/

// any (WHERE EXISTS) da bool, Where da i campi
// selezionare qualsiasi libro che
void FilterUsingRelatedData()
{
    var recentAuthors = _context.Authors
        .Where(a => a.Books.Any(b => b.PublishDate.Year >= 2015))
        .ToList();
}


modelBuilder.Entity("PublisherDomain.Book", b =>
    {
        b.HasOne("PublisherDomain.Author", "Author")
            .WithMany("Books")
            .HasForeignKey("AuthorId")
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        b.Navigation("Author");
    });

constraints.table =>
{
	table.ForeignKey( 
		name: "FK_ArtistCover_Artists_ArtistsArtistId", 
		column: x => x.ArtistsArtistId, 
		principalTable: "Artists", 
		principalColumn: "ArtistId", 
		onDelete: ReferentialAction.Cascade); 
};
migrationBuilder.CreateIndex(
	name: [...],
	table: [...],
	column: [...]);


void ConnectExistingArtistAndCoverObjects()
{
    var artistA = _context.Artists.Find(1);
    var artistB = _context.Artists.Find(2);
    var coverA = _context.Covers.Find(1);
    coverA.Artists.Add(artistA);
    coverA.Artists.Add(artistB);
    _context.SaveChanges();
}

void CreateNewCoverWithExistingArtist()
{
    var artistA = _context.Artists.Find(1);
    var cover = new Cover { DesignIdeas = "Author has provided a photo" };
    cover.Artists.Add(artistA);
    _context.ChangeTracker.DetectChanges(); 
    _context.Covers.Add(cover);
    _context.SaveChanges();
}


remove-migration
dotnet ef migrations remove

No Tracking
var authorGraph = _context.Authors.AsNoTracking()
    .Include(a => a.Books)
    .ThenInclude(b => b.Cover)
    .ThenInclude(c => c.Artists)
    .FirstOrDefault(a => a.AuthorId == 4);



//FA in modo che, tracciando, lui capisca che deve rimuovere e POI aggiungere un elemento
void AddCoverToExistingBookWithTrackedCover()
{
    var book = _context.Books.Include(b => b.Cover)
                             .FirstOrDefault(b => b.BookId == 5); //The Never
    book.Cover = new Cover { DesignIdeas = "A spiral" };
    _context.ChangeTracker.DetectChanges(); 
    var debugview = _context.ChangeTracker.DebugView.ShortView;
}

ProtectingFromUniqueFKSideEffects();
void ProtectingFromUniqueFKSideEffects()
{
    var TheNeverDesignIdeas = "A spirally spiral";
    var book = _context.Books.Include(b => b.Cover)
                             .FirstOrDefault(b => b.BookId == 5); //The Never
    if (book.Cover != null)
    {
        book.Cover.DesignIdeas = TheNeverDesignIdeas;
    }
    else
    {
        book.Cover = new Cover { DesignIdeas = TheNeverDesignIdeas };
    }
    _context.SaveChanges();
}


void SimpleRawSQL()
{
    var authors = _context.Authors.FromSqlRaw("select * from authors").ToList();
}


var sql = String.Format("SELECT * FROM authors WHERE lastname LIKE '{0}%'", lastnameStart);
var authors = _context.Authors.FromSqlRaw(sql)
    .OrderBy(a => a.LastName).TagWith("Formatted_Unsafe").ToList();
// Non è sicura perché viene messa in una variabile.

var authors = _context.Authors
    .FromSqlRaw("SELECT * FROM authors WHERE lastname LIKE '{0}%'", lastnameStart)
    .OrderBy(a => a.LastName).TagWith("Formatted_Safe").ToList();


//migration
//@ multi line strings
protected override void Up(MigrationBuilder migrationBuilder)
{
    migrationBuilder.Sql(@"
        CREATE PROCEDURE dbo.AuthorsPublishedinYearRange
             @yearstart int,
             @yearend int
          AS
          SELECT Distinct Authors.* FROM authors
          LEFT JOIN Books ON Authors.Authorid = books.authorId
          WHERE Year(books.PublishDate) >= @yearstart 
           AND Year(books.PublishDate) <= @yearend");
}
protected override void Down(MigrationBuilder migrationBuilder)
{
    migrationBuilder.Sql(@"
        DROP PROCEDURE dbo.AuthorsPublishedinYearRange");
}

//per aggiornare il database
update-database

void RunSqlQueryScalarMethods()
{
    var ids = _context.Database
    .SqlQuery<int>($"SELECT AuthorId FROM Authors").ToList();

    var titles = _context.Database
    .SqlQuery<string>($"SELECT Title FROM Books").ToList();

    var sometitles = _context.Database
     .SqlQuery<string>($"SELECT Title as VALUE FROM Books")
     .Where(t => t.Contains("The")).ToList();

    //var longtitles=_context.Database
    //.SqlQuery<string>($"SELECT Title as VALUE FROM Books")
    //.Where(t => t.Length > 10).ToList();//EF can't evalueate t.Length into SQL

    var longtitles = _context.Database
    .SqlQuery<string>($"SELECT Title FROM Books WHERE LEN(title)>{10}").ToList();

    var rawLongTitles = _context.Database
    .SqlQueryRaw<string>($"SELECT Title FROM Books WHERE LEN(title)>{0}", 10).ToList();

}

void RunSqlQueryNonEntityMethods()
{
    var xyz = _context.Database
        .SqlQuery<AuthorName>($"select lastname, firstname from authors").ToList();
}

class AuthorName
{
	public string LastName { get;set; }
	public string FirstName { get;set; }
}

_context.Database.SqlQuery<int>($"SELECT Title as VALUE FROM Books")
	.Where(t => t.Length > 10).ToList();
_context.Database.SqlQuery<int>($"SELECT Title as VALUE FROM Books WHERE LEN(title)>"{10}).ToList();



# Keyless Entities to Map to Map to Views
```csharp
// PublisherDomain	-	AuthorByArtist.cs
public class AuthorByArtist
{
    public string Artist { get; set; }
    public string? Author { get; set; }
}

// PublisherData	-	PubContext.cs
public DbSet<AuthorByArtist> AuthorsByArtist { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AuthorByArtist>().HasNoKey()
            .ToView(nameof(AuthorsByArtist));  //o alternativamente .ToView("AuthorsByArtist")
    }

// PublisherConsole	-	Program.cs
GetAuthorsByArtist();
void GetAuthorsByArtist()
{
	var authorartists = _context.AuthorsByArtist.ToList();
}
// non serve HasNoKey
```

# Querying the Database Views
Nel caso delle keyless entities (entità senza chiave), non essendo associate a una chiave primaria, il ChangeTracker non è in grado di monitorare automaticamente le modifiche a tali entità. 
```csharp
_context.Database.ExecuteSqlRaw("some SQL string");
_context.Database.ExecuteSql($"some SQL string {variable}");
_context.Database.ExecuteSqlInterpolated($"some SQL string {var}");
```

# Executing Non-Query SQL Commands
PublisherData   -   20231204191538_addstoredproc.cs
```csharp
public partial class addstoredproc : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.Sql(@"
            CREATE PROCEDURE DeleteCover
                @coverid int
              AS
              BEGIN
                DELETE FROM Covers WHERE CoverId = @coverid
              END");
    }
    [...]
```
Facendo `update-database`, viene aggiunto al database sotto `Programmability`.
PublisherConsole    -   Program.cs
```csharp
DeleteCover(9);
void DeleteCover(int coverId)
{
    var rowCount = _context.Database.ExecuteSqlRaw("DeleteCover {0}",coverId);
    Console.WriteLine(rowCount);
}
```

# Mapping Insert, Update, and Delete Stored Procedures to Entities
PubDatabase - Programmability - StoredProcedures - dbo.Authorinsert
```csharp
CREATE PROCEDURE dbo.AuthorInsert
    @firstname nvarchar(100);
    @lastname nvarchar(100);
    AS
    BEGIN
        INSERT into [Authors] (FirstName, LastName)
            OUTPUT INSERTED.[AuthorId]
            Values(@firstname, @lastname)
    END
```

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
     modelBuilder.Entity<Author>()
     .InsertUsingStoredProcedure("AuthorInsert", spbuilder => 
        spbuilder.HasParameter(a => a.FirstName)
                 .HasParameter(a => a.LastName)
                 .HasResultColumn(a => a.AuthorId)
     );
}
```

PublisherConsole    -   Program.cs
```csharp
void InsertNewAuthor()
{
    var author = new Author { FirstName = "Madeline", LastName = "Miller" };
    _context.Authors.Add(author);
    _context.SaveChanges();
}
```


# Adding the ASP.NET Core Project
Apri progetto -> clicca su Solution -> Add -> Core Web API
PubAPI -> Add -> Project Reference
PubAPI -> Add -> New Scaffolded item -> API with read/write endpoints, using Entity Framework
Crea ASP.NET Core Web API
Metto `*` in PubAPI per dare retrocompatibilità 
```csharp
        <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.*" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.*">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
    <PackageReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="8.0.*" />
```

# Creating Author Endpoint for the API
In AuthorEndpoints.cs
```csharp
group.MapGet("/", async (PubContext db) =>
{
    return await db.Authors.AsNoTracking().ToListAsync();
})
```

Cambia:
```csharp
    group.MapGet("/{id}",
    [...]
    group.MapPut("/{id}",
    [...]
    group.MapDelete("/{id}"
```
in:
```csharp
    group.MapGet("/{authorid}",
    [...]
    group.MapPut("/{authorid}",
    [...]
    group.MapDelete("/{authorid}"
```


# Wiring up the ASP.NET Core App with the DbContext

Program.cs
```csharp
builder.Services.AddDbContext<PubContext>(
    opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("PubConnection"))
    .EnableSensitiveDataLogging()
    .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
);
```

appsettings.json
```csharp
{
  "Logging": {
    "LogLevel": {
    [...]
      "Microsoft.EntityFrameworkCore.Database.Command": "Information"
    }
  },
  "AllowedHosts": "*"
  "ConnectionStrings": {
    {
      "PubConnection": "Server = (localdb)\\MSSQLLocalDB; Initial Catalog = PubDatabase;"
    }
   }
```

PubContext.cs
```csharp
public PubContext(DbContextOptions<PubContext> options) : base (options)
    { }
```
e rimuovo

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    [...]
}
```


# Running the API to See the Output and Logs
Properties/launchSettings.json
```csharp
  "profiles": {
    "http": {
       [...]
      "launchUrl": "api/author",
```
Bisogna cancellare da `PubAPI`, `InvariantGlobalization`

In AuthorEndpoints.cs, modifico:
```csharp
return await db.Authors.Include(a=>a.Books).AsNoTracking().ToListAsync();
```

# Creating Your First Test and Using It Against the Database
Add -> MSTest Test Project

# Exploring and Debugging Insert, Update & Delete API Methods
```csharp
group.MapPost("/", async (Author author, PubContext db) =>
{
    var author = new Author { FirstName = authorDTO.Name, LastName = authorDTO.LastName};
    db.Authors.Add(author);
    await db.SaveChangesAsync();
    // $"/api/Author/{author.AuthorId}" -> response header
    return TypedResults.Created($"/api/Author/{author.AuthorId}",
        new AuthorDTO(author.AuthorId, author.FirstName, author.LastName));
})
```

# Testing with SQLite in Memory
```csharp
    var _connection = new SqliteConnection("Filename=:memory:");
    _connection.Open();
```
E uso in `DatabaseTests.cs` `.UseSqlServer` invece di `.SQLite`.
```csharp
```
# Refactoring and Testing Some Console App Logic
In `InMemoryTests.cs`
```csharp
    private static PubContext SetUpSQLiteMemoryContextWithOpenConnection()
    {
        var builder = new DbContextOptionsBuilder<PubContext>().UseSqlite("Filename=:memory:");
        var context = new PubContext(builder.Options);
        context.Database.OpenConnection();
        context.Database.EnsureCreated();
        return context;
    }
```


# Testing the ASP.NET Core API
```csharp
```

.ignore() ignora la colonna 

 - DateTime you don't need the time data adds complexity
 - DateOnly is quite often what you are looking for in your classes

.AutoInclude(a=>a.Books);

# Storing Sub-Types and Primitive Collections as JSON
```csharp
modelBuilder.Entity<Author>().OwnsOne(p=>p.Contact, navBuilder.ToJson();});
```

EF trasforma in JSON:
```csharp
public class Author
{   ...
    public ICollection<string> Nicknames { get;set; }
}
var author = new Author
{
    FirstName = "William", LastName = "Shakespeare",
    Nicknames = new List<string> { "The Bard", "The Bard Avon", "Swan of Avon"}
}
```



# Mapping “Unmappable” Property Types with Value Conversions

Color è un tipo complesso che non può essere direttamente memorizzato nel database (poiché non esiste un tipo di colonna Color nativo in SQL). Pertanto, devi specificare come convertire questo tipo in un formato che il database possa gestire (ad esempio, come stringa) e come riconvertirlo dal formato del database al tipo Color quando viene letto.

```csharp
public class Cover
{
    public int CoverId { get; set; } 
    public Color PrimaryColor { get; set; } 
}

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Book>().Property(b=>b.PrimaryColor).HasConversion(c=>c.ToString(),s=>Color.FromName(s));
}

Database: Books.PrimaryColor="Blue"
```



# Applying Bulk Configurations and Conversions
```csharp
    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<string>().HaveAnnotation("MaxLength", 100);

    }
```
```csharp
    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder) 
    {
        configurationBuilder.Properties<string>0.HaveColumnType("varchar(100)"); 
    } 
```



# Mapping Complex Types and DDD Value Objects
```csharp
    public class PersonName {
        public string First { get; set;} 
        public string Last { get; set; } 
        public string Full=4"{First} {Last}"; 
        public string Reverse=>$"{Last}, {First}";
    }
    public class Author{
        public int AuthorId { get;set; }
        public PersonName Name { get;set; }
        public List<Book> Books { get;set; }
    }
```
```csharp
    modelBuilder.Entity<author>().ComplexProperty(a => a.Name);
```


# EF Core’s Transaction Support and Concurrency Handling
```csharp
void CancelBookWithRawSQL(int bookid)
{
    //get a list of artists working on book covers for this book
    var artists = _context.Artists
        .Where(a => a.Covers.Any(cover => cover.BookId == bookid)).ToList();
    foreach (var artist in artists)
        artist.Notes +=
            Environment.NewLine +
            $"Assigned book { bookid} was cancelled on { DateTime.Today.Date} ";
    //by default, raw sql methods are not in transactions
    _context.Books.Where(b => b.BookId == bookid).ExecuteDelete();
    _context.SaveChanges();
}
```

Corretto:
```csharp
void CancelBookWithCustomTransaction(int bookid)
{
    using var transaction = _context.Database.BeginTransaction();
    try
    {
        //get a list of artists working on book covers for this book
        var artists = _context.Artists
            .Where(a => a.Covers.Any(cover => cover.BookId == bookid)).ToList();
        foreach (var artist in artists)
            artist.Notes +=
                Environment.NewLine +
                $"Assigned book { bookid} was cancelled on { DateTime.Today.Date} ";                                                                                                                         //by default, raw sql methods execute in their own transaction immediately

        _context.Books.Where(b => b.BookId == bookid).ExecuteDelete();
        _context.SaveChanges();
        transaction.Commit();
    }
    catch (Exception)
    {
        // TODO: Handle failure
    }
}
```




# Exploring ChangeTracker Entries for Overriding the SaveChanges Method
```csharp
public override int SaveChanges() { 
    int affected=base.SaveChanges(); 
    return affected; 
}
public override int SaveChanges() { 
    var entries = ChangeTracker.Entries().ToList();
    var firstEntity = entries.First().Entity;
    return 0;
    int affected=base.SaveChanges(); 
    return affected; 
}
```



# Updating Shadow Properties During SaveChanges
```csharp
modelBuilder.Entity<Author>().Property<DateTime>("LastUpdated");
```

ChangeTracker è una proprietà di DbContext che tiene traccia di tutte le modifiche apportate alle entità nel contesto. Il metodo Entries<>() restituirà tutte le entità Author che sono state modificate (aggiunte, modificate o eliminate).

```csharp
private void UpdateAuditData()
{
    foreach(var e in
        ChangeTracker.Entries<Author>())
    {
        entry.Property("LastUpdated")
            .CurrentlyValue =DateTime.now;
    }
}
```

```csharp
public override int SaveChanges()
{
    UpdateAuditData();
    return base.SaveChanges();
}
```



# Using EF Core Pipeline Events
```csharp
private void UpdateAuditData()
{
    foreach(var e in
        ChangeTracker.Entries<Author>())
    {
        entry.Property("LastUpdated")
            .CurrentlyValue =DateTime.now;
    }
}
```

```csharp
public PubContext(){
    SavingChanges += SavingChangesHandler;
}


private void SavingChangesHandler(object? sender; SavingChangesEventArgs e)
{
    UpdateAuditData();
}
```


# Using Interceptors to Inject Logic into EF Core’s Pipeline
Gli interceptor di questo tipo consentono di intercettare operazioni di lettura o scrittura (comandi SELECT, INSERT, UPDATE, DELETE).

```csharp
internal class Mylnterceptor : DbCommandInterceptor 
{ 
    public override InterceptionResult<DbDataReader> ReaderExecuting(DbCommand command, 
    CommandEventData eventData,
    InterceptionResult<DbDataReader> result) 
    {
        //do something e.g., edit command return result; }
    }
} 

optionsBuilder.UseSqlServer(connString)
.AddInterceptors(new MyInterceptor()); 

builder.Services.AddDbContext (
    options => options
    .AddInterceptors(new MyInterceptor()); 


```
