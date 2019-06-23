const fs = require("fs").promises;
const path = require("path");
const argv = require("yargs").argv;

const entrypoint = "ABS_PATH";

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
