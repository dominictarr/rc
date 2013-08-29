# rc

The non-configurable configuration loader for lazy people.

# Usage

The only option is to pass rc the name of your app, and your default configuration.

```
var rc = require('rc')(appname, {
  //defaults go here.
  port: 2468
})
```

# Standards

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
so that sources earlier in this list override later ones.

# Formats

Configuration files may be in either `json` or `ini` format.
Since ini, and env variables do not have a standard for types,
your application needs be prepared for strings.

# License

BSD / MIT / Apache2
