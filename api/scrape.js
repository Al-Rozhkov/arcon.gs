const glob = require("glob");
const fs = require("fs");

const result = []

glob("/Users/al/work/sites/arcon.gs/products/series/**/*.json", {}, function (er, files) {
  for (fileName of files) {
    console.log(fileName);

    const fileContent = JSON.parse(fs.readFileSync(fileName));
    result.push(`${fileContent.id} | ${fileContent.body}`);
  }

  const data = result.join('\n\n');

  fs.writeFile('./result.txt', data, function (err) {
    console.log(err);
  });
});
