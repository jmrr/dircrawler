const fs = require("fs").promises;
const path = require("path");
const yargs = require("yargs");

// Build the command:

const argv = yargs
  .usage("Usage $0 --photosdir='/home/johnsmith/myphotos'")
  .describe("photosdir", "Absolute path for your photo collection")
  .demandOption("photosdir").argv;

const entrypoint = argv.photosdir;

const walk = async (dir, filelist = []) => {
  const files = await fs.readdir(dir);

  for (file of files) {
    const filepath = path.join(dir, file);
    const stat = await fs.stat(filepath);

    if (stat.isDirectory()) {
      filelist.push(file);
      const absPath = path.join(dir, file);
      console.log(absPath.split(entrypoint).pop());
      filelist = await walk(filepath, filelist);
    }
  }

  return filelist;
};

const filelist = walk(entrypoint);

console.log(filelist);
