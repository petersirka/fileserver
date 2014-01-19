# FileServer

![FileServer works](http://www.858project.com/img/fileserver.png)

> Download [total.js module FileServer](https://github.com/petersirka/total.js-modules/tree/master/fileserver)

- Download FileServer from GitHub
- Run on your server
- Connect from your total.js project via [FileServer module](https://github.com/petersirka/total.js-modules/tree/master/fileserver)
- Supports: multiple upload, multiple remove
- Path is configurable
- You will be happy

## Storing files

- files are stored in [project-name] directory
- each directory in [project-name] directory contains max 1000 files
- each file has a small header informations about file (contentType, filename, size/length, width, height)

## Run

#### Production

```
$ cd fileserver
$ node release.js
```

#### Debug

```
$ cd fileserver
$ node debugging.js
```

## Configure FileServer

```
$ sudo nano config-debug
$ # or
$ sudo nano config-release
```

## Using

FileServer can use in total.js projects. Easy implementation via module: [total.js - FileServer module](https://github.com/petersirka/total.js-modules/tree/master/fileserver).