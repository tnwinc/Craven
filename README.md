Craven
======
http://labs.tnwinc.com/Craven

A web interface which provides a way to translate simple SQL-like
statements into Raven HTTP API calls over curl.

**The SQL-like language is not really SQL**. There are some tweaks that are
needed in order to allow the query to refer to a rich data structure as
opposed to a flat row structure.

So far, only pretty basic SQL-like Select statements are supported. Examples of the supported statements are below.

```
// Selecting entire documents from a collection
SELECT * FROM SomeCollection

// Where clauses
SELECT * FROM SomeCollection WHERE SomeField='some_val' OR AnotherField='another_val'
SELECT * FROM SomeCollection WHERE SomeField='some_val' OR AnotherField='another_val'
SELECT * FROM SomeCollection WHERE OneField=2 AND (SomeField='some_val' OR AnotherField='another_val')

// Specifying fields to show in the results
SELECT Id,Name,Dob FROM SomeCollection WHERE SomeField="some_val"

// Using Nested Fields
SELECT Id,[Parent.Id],Dob FROM SomeCollection WHERE [Nested.Property]="some_val"
SELECT Id,[List,Property],Dob FROM SomeCollection WHERE [List,AnotherProperty]="some_val"
```

Licensed under the MIT License. See the LICENSE file for details.
