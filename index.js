const fs = require("fs");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function checkIfFolderOrFileReturned(path, arr) {
  let data = []
  let message = "Your directory is empty"
  let status = false

  if (arr.length > 0) {
    message="Content found in your directory"
    status = true
    arr.map((content) => {
      var type = fs.statSync(`${path}/${content}`).isFile();
      var name = content;
      data.push({
        type: type ? "File" : "Folder",
        name: name,
        isFile: type,
      });
    });
  }
  return {
    message: message,
    data: data,
    status: status,
  };
}

function handleScanning(dir) {
  let data = [];
  if (fs.existsSync(dir)) {
    data = fs.readdirSync(dir);
  }
  return data;
}

function scanDirectory(name) {
  let files = [];
  if (name.length == 0) {
    name = __dirname;
    files = handleScanning(name);
    console.log("| Scan current dir", files);
  } else {
    files = handleScanning(name);
    // console.log("| Scan current dir",files)
  }
  const results = checkIfFolderOrFileReturned(name,files)
  console.log(results)
}

function getInput() {
  let directory = "";
  readline.question("| Directory name >> ", (name) => {
    console.log(
      `| Directory to scan: ${
        name.length == 0 ? "Scanning current directory" : "Scanning " + name
      }`
    );
    directory = name;
    scanDirectory(directory);
    readline.close();
  });
}

function init() {
  console.log(
    "+-----------------------------------------------------------------------------------"
  );
  console.log(
    "| Please enter a directory name or leave blank to scan the current directory"
  );
  getInput();
}

init();
