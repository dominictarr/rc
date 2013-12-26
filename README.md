# rc

The non-configurable configuration loader for lazy people.

## Usage

The only option is to pass rc the name of your app, and your default configuration.

```javascript
var rc = require('rc')(appname, {
  //defaults go here.
  port: 2468,

  //defaults which are objects will be merged, not replaced
  views: {
    engine: 'jade'
  }
})

// Your configuration options => the `rc` object.

```

## Standards

Given your application name (`appname`), rc will look in all the obvious places for configuration.

  * command line arguments (parsed by optimist)
  * environment variables prefixed with `${appname}_`
  * if you passed an option `--config file` then from that file
  * a local `.${appname}rc` or the first found looking in `./ ../ ../../ ../../../` etc.
  * `$HOME/.${appname}rc`
  * `$HOME/.${appname}/config`
  * `$HOME/.config/${appname}`
  * `$HOME/.config/${appname}/config`
  * `/etc/${appname}rc`
  * `/etc/${appname}/config`
  * the defaults object you passed in.

All configuration sources that were found will be flattened into one object,
so that sources **earlier** in this list override later ones.


## Configuration File Formats

Configuration files (e.g. `.appnamerc`) may be in either [json](http://json.org/example) or [ini](http://en.wikipedia.org/wiki/INI_file) format.  rc ignores file extensions of configuration files.  The example configurations below are equivalent:


#### Formatted as `ini`

```ini
; You can include comments if you want.

port=3000

; `rc` has built-in support for ini sections, see?
[views]
  engine=jade

; But only one-level deep.  So in this example, you can't do a sub-object inside of 'views'.
; (More deeply nested objects ARE supported using the JSON format.)
```

#### Formatted as `json`

```json
{
  "views": {
    "engine": "jade"
  },
  "port": 3000
}
```


> Since ini, and env variables do not have a standard for types, your application needs be prepared for strings.



## Advanced Usage

#### Pass in your own `argv`

You may pass in your own `argv` as the third argument to `rc`.  This may be useful for writing tests.

```javascript
require('rc', appname, { /* defaults */}, argvFixture);
```


## License

BSD / MIT / Apache2
