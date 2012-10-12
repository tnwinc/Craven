Craven
======

A web interface which provides a way to translate simple SQL statements into Raven HTTP API calls over curl.

http://labs.tnwinc.com/Craven

So far, only pretty basic SQL Select statements are supported. Examples of the supported statements are below.

```
SELECT * FROM SomeCollection WHERE SomeField='some_val' AND AnotherField='another_val'

SELECT Id,Name,Dob FROM SomeCollection WHERE SomeField='some_val'
```