# FileServer

![FileServer works](http://www.858project.com/img/fileserver.png)

> Download [partial.js module FileServer](https://github.com/petersirka/partial.js-modules/tree/master/fileserver)

- Download FileServer from GitHub
- Run on your server
- Connect from your partial.js project via [FileServer module](https://github.com/petersirka/partial.js-modules/tree/master/fileserver)
- You will be happy
- Supports: multiple upload, multiple remove

## Storing files

- files are stored in [project-name] directory
- each [project-name] directory contains max 1000 files
- each file has a small header informations about file (contentType, filename, size/length, width, height)

## Run

#### Production

```
$ cd fileserver
$ node production.js
```

#### Debug

```
$ cd fileserver
$ node index.js
```

## Configure FileServer

```
$ sudo nano config-debug
$ # or
$ sudo nano config-release
```

## Using

FileServer can use in partial.js projects. Easy implementation via module: [partial.js - FileServer module](https://github.com/petersirka/partial.js-modules/tree/master/fileserver).