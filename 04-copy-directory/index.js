const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
    let copyDir = path.join(__dirname, 'files-copy');
    try {
        await fs.access(copyDir);
    } catch (error) {
        await fs.mkdir(copyDir, { recursive: true });
    }

    let filesDir = path.join(__dirname, 'files');
    let files = await fs.readdir(filesDir);

    files.forEach(file => {
        let oldPath = path.join(filesDir, file);
        let newPath = path.join(copyDir, file);
        fs.copyFile(oldPath, newPath).catch((err) => console.error(err));
    });
}

copyDir().catch((err) => console.error(err));

       