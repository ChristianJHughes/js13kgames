const FILE_SYSTEM = require('fs');
const ARCHIVER = require('archiver');

const MAX_SIZE = 13 * 1024; // 13kb

FILE_SYSTEM.unlinkSync('./dist/main.js');
FILE_SYSTEM.unlinkSync('./dist/main.css');

let output = FILE_SYSTEM.createWriteStream('./dist/build.zip');
let archive = ARCHIVER('zip', {
  zlib: { level: 9 } // set compression to best
});

output.on('close', function() {
  const bytes = archive.pointer();
  const percent = ((bytes / MAX_SIZE) * 100).toFixed(2);

  if (bytes > MAX_SIZE) {
    console.error(`Size overflow: ${bytes} bytes (${percent}%)`);
  } else {
    console.log(`Size: ${bytes} bytes (${percent}%)`);
  }
});

archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);
archive.append(FILE_SYSTEM.createReadStream('./dist/index.html'), {
  name: 'index.html'
});

archive.finalize();
