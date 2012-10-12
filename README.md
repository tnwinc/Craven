Craven
======

A web interface which provides a way to translate simple SQL statements into Raven HTTP API calls over curl.

http://labs.tnwinc.com/Craven

So far, only pretty basic SQL Select statements are supported. Examples of the supported statements are below.

```
// Selecting entire documents from a collection
SELECT * FROM SomeCollection

// Where clauses
SELECT * FROM SomeCollection WHERE SomeField='some_val' OR AnotherField='another_val'
SELECT * FROM SomeCollection WHERE SomeField='some_val' OR AnotherField='another_val'
SELECT * FROM SomeCollection WHERE OneField=2 AND (SomeField='some_val' OR AnotherField='another_val')

// Specifying fields to show in the results
SELECT Id,Name,Dob FROM SomeCollection WHERE SomeField="some_val"
```
