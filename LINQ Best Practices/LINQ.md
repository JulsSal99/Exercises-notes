# [LINQ Best Practices](https://app.pluralsight.com/library/courses/linq-best-practices/table-of-contents)

## Discovering the power of LINQ
### Thinking in patterns
```cs
foreach (var costumer in
    from c in costumers
    where !String.IsNullOrEmpty(c.Email)
    select c)
```

`First` o `FirstOrDefault`? Se devo riferirmi a un valore ritornato, conviene First in modo che l'errore venga segnalato prima.
eg.
```cs
Order orderToRefund = orders.First(...);
Console.WriteLine($"{orderToRefund.Amount}");
```


```cs
bool found = orders.Any(0 => o.Status == "Refunded");
```

Oltre a `.ToList()` abbiamo anche `.ToDisctionary(p => p.Name, p => p.Length)`

- `.Count(o => o.Status == "Refunded")` conta tutti gli elementi
- `.Sum(o => o.Status)` li somma
    - Nota: `.Sum(o => o.Status).Dump();` Dump è un metodo di LINQPad per visualizzare rapidamente i risultati delle espressioni
- `.GroupBy(o => o.Id).ToDictionary(g => g.Key, g => g.ToList())`: raggruppa per Id sotto .Key
- `.Split(,).Select(int.Parse).OrderBy(n => n).Skip(3)` divide per un carattere in array e select lo mette in int e order lo ordina.
    - `.OrderByDescending()`.
- `.Sort()` fa la stessa cosa di Order By, ma non genera una nuova variabile.

### unleashing the power of Pipelines

Creare la somma di più orari/timestamps.
```cs
"2:54,3,48"
.Split(',')
.Select(t => TimeSpan.Parse("0:" + t))
.Agregate(TimeSpan.Zero, (t1,t2) => t1 + t2)
```

```cs
"2:54,3,48"
.Split(',')
.Select(t => TimeSpan.Parse("0:" + t))
.Agregate((t1,t2) => t1 + t2)
```

```cs
"2:54,3,48"
.Split(',')
.Select(x => x.Split('-'))
.Select(p => new { First = int.Parse(p[0]), Last = int.Parse(p.Last())})
.SelectMany(r => Enumerable.Range(r.First, r.Last - r.First + 1))
.OrderBy(r => r)
.Distinct()
```

```cs
.SelectMany(file => File.ReadAllLines(file)
    .Select((line,index) => new
    {
        File = file,
        Text = line,
        LineNumber = index+1
    }
    ))
    .Where(file => Regex.IsMatch(line.Text, searchTerm))
```
il corrispettivo sarebbe:
```sql
    SELECT 
        fl.FileId,
        fl.LineNumber,
        fl.LineText,
        ROW_NUMBER() OVER (PARTITION BY fl.FileId ORDER BY fl.LineNumber) AS AdjustedLineNumber
    FROM 
        FileLines fl
    JOIN 
        Files f ON f.FileId = fl.FileId
```
https://app.pluralsight.com/ilx/video-courses/b78ef9a8-e1a0-4dcc-9fb9-c7b352e37daf/0a3439c9-b7ad-4ff5-8fe7-0ecfb77e9789/f2dddbd7-af18-4bd4-9da4-328fe67251fb

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
