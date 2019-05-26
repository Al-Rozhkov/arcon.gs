const glob = require("glob")
const fs = require('fs')

// options is optional
glob("./products/series/**/*.json", {}, function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.

  files.forEach(file => {
    // console.log(file);

    fs.readFile(file, ( err, json ) => {
      // Check for error
      if( err ) {
        console.log( err );
      }
      else {
        // Note that data is a Buffer, convert to string before parsing
        const data = JSON.parse( json.toString() )
        
        // Get new value
        const newScheme = data.scheme.map(v => {
          const key = Object.keys(v)[0]
          return {
            name: key,
            scheme: v[key]
          }
        })

        data.scheme = newScheme

        // Serialize result and write to file
        fs.writeFile(file, JSON.stringify( data, null, 4 ), ( err ) => {
          if( err ) {
            console.log( err );
          }
          else console.log(`Done: ${file}`)
        })
      }
    })
  })
})


/* const fs = require('fs');

fs.writeFile('test.json', JSON.stringify({ a:1, b:2, c:3 }, null, 4)); */
