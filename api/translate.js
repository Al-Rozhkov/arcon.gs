const fs = require("fs");
const readline = require('readline');
const glob = require("glob");

/**
 * Reads file and change it.
 */
function changeFile(fileName, i18map) {
  console.log('Processing '.fileName);

  const fileContent = JSON.parse(fs.readFileSync(fileName));
  const id = fileContent.id;
  const originBody = fileContent.body;

  const fileData = JSON.stringify({
    ...fileContent,
    "i18n": {
      "ru-ru": {
        body: originBody
      },
      "en-en": {
        body: i18map[id]
      }
    }
  }, null, 2);

  fs.writeFile(fileName, fileData, function (err) {
    if (err) console.log(err);
  });
}

/**
 * Process text file line by line.
 */
async function processLineByLine() {
  const fileStream = fs.createReadStream('./api/result-translated.txt');
  const i18map = {};

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    if (line.length > 0) {
      const [id, body] = line.split(' | ')
      i18map[id] = body;
    }
  }

  glob("/Users/al/work/sites/arcon.gs/products/series/**/*.json", {}, function (er, files) {
    for (fileName of files) {
      changeFile(fileName, i18map);
    }
  });
}

processLineByLine();
