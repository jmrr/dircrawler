const fs = require("fs");
const path = require("path");
const yargs = require("yargs");

// Build the CLI:
const argv = yargs
  .usage(
    "Usage $0 --photosdir='/home/johnsmith/myphotos' --output='photo_paths.txt'"
  )
  .describe("photosdir", "Absolute path for your photo collection.")
  .describe("output", "File where to write the photo dirs.")
  .default("output", "output.txt")
  .demandOption("photosdir").argv;

const entrypoint = argv.photosdir;

const walk = async (dir, dirlist = []) => {
  const files = await fs.promises.readdir(dir);

  for (file of files) {
    const filepath = path.join(dir, file);
    const stat = await fs.promises.stat(filepath);

    if (stat.isDirectory()) {
      dirlist.push(file);
      const absPath = path.join(dir, file);
      const retrievedDir = absPath.split(entrypoint).pop();
      fs.promises.appendFile(argv.output, `${retrievedDir}\n`);
      console.log(retrievedDir);
      dirlist = await walk(filepath, dirlist);
    }
  }

  return dirlist;
};

// Retrieve tree structure
walk(entrypoint).then(resultDirList => {
  // Save file list
  console.log(`Retrieved ${resultDirList.length} directories`);
});
