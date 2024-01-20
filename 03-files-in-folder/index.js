const fs = require('fs');
const path = require('path');

let files = fs.readdirSync(path.join(__dirname, 'secret-folder'), { withFileTypes: true });

files.forEach((file) => {
    if (file.isFile()) {
        let extension = path.extname(file.name);
        let size = fs.statSync(path.join(__dirname, 'secret-folder', file.name)).size / 1024 / 1024;
        console.log(`${file.name}-${extension}-${size}kb`);
    }
});