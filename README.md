# dircrawler

Simple tool to obtain all the directories names under a parent one. It can be used
in conjunction with [Google Photos uploader CLI](https://github.com/nmrshll/gphotos-uploader-cli)
to upload backup a bunch of dirs containing photos to Google Photos.

## Usage

```
dircrawler.js --photosdir='/home/johnsmith/myphotos' --output='photo_paths.txt'
```

```
Options:
  --help       Show help                                               [boolean]
  --version    Show version number                                     [boolean]
  --photosdir  Absolute path for your photo collection.               [required]
  --output     File where to write the photo dirs.       [default: "output.txt"]
```
