const fs = require('fs');
const path = require('path');

// Создаю новую папку

fs.mkdir('.06-build-page/project-dist', { recursive: true }, (err) => {
 if (err) throw err;
});

// Заменяю теги шаблона

let templateHtml = '';
fs.readFile('./06-build-page/template.html', 'utf-8', (err, data) => {
 if (err) throw err;
 templateHtml = data;
});

let componentsHtml = {};
fs.readdir('./06-build-page/components', (err, files) => {
 if (err) throw err;
 files.forEach((file) => {
    if (path.extname(file) === '.html') {
      let componentName = path.basename(file, '.html');
      fs.readFile(`./06-build-page/components/${file}`, 'utf-8', (err, data) => {
        if (err) throw err;
        componentsHtml[componentName] = data;
        templateHtml = templateHtml.replace(`{{${componentName}}}`, componentsHtml[componentName]);
        fs.writeFile('./06-build-page/project-dist/index.html', templateHtml, 'utf-8', (err) => {
          if (err) throw err;
        });
      });
    }
 });
});

// Компиляция стилей
let cssContent = '';
fs.readdir('./06-build-page/styles', (err, files) => {
 if (err) throw err;
 files.forEach((file) => {
    if (path.extname(file) === '.css') {
      fs.readFile(`./06-build-page/styles/${file}`, 'utf-8', (err, data) => {
        if (err) throw err;
        cssContent += data;
        fs.writeFile('./06-build-page/project-dist/style.css', cssContent, 'utf-8', (err) => {
          if (err) throw err;
        });
      });
    }
 });
});

// Копирую папку assets

const sourceDir = path.join(__dirname, 'assets');
const destDir = path.join(__dirname, 'project-dist', 'assets');

function copyDirectory(source, destination) {
    if (!fs.existsSync(destination)) {
       fs.mkdirSync(destination);
    }
   
    const files = fs.readdirSync(source);
   
    for (let file of files) {
       let currentFile = fs.lstatSync(path.join(source, file));
   
       if (currentFile.isDirectory()) {
         copyDirectory(path.join(source, file), path.join(destination, file));
       } else {
         fs.copyFileSync(path.join(source, file), path.join(destination, file));
       }
    }
   }
   
   copyDirectory(sourceDir, destDir);
   


