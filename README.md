# **KNACK CODING CHALLENGE** #

## Requirements ##
Node V18.6.0 and npm 9.6.2

## DESCRIPTION ##
This coding challenge has been developed with NodeJS framework and Typescript language.


To run the app just download the code, execute in a command line:

```npm install ```

Then execute 

``` npm start ```

If everything works as expected the following message should be shown on the screen

```cleaning JSON success```

If there were an error the following message should be shown:

```Failed cleaning JSON```

Cleant JSON file could be found under /lib/contexts/shared/resources by the name of *application-clean.json*

## Testing ##
Tests have been developed with *jest*. To run tests suites just write in a console:

```npm run test``` 

To check code coverage is also possible to execute:

```npm run test:coverage``` 

## Disclaimer ##

Since this is a quick coding challenge it has several improvements to do.

For instance keeping huge json objects in memory is not optimal. In such a case it would be better to use a noSQL database such as MongoDB or PostgreSQL with noSQL features enabled.
