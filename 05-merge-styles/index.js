const fs = require('fs');
const path = require('path');

const stylesFolderPath = path.join(__dirname, 'styles');
const filenames = fs.readdirSync(stylesFolderPath);

const cssFiles = filenames.filter(filename => filename.endsWith('.css'));

let stylesArray = [];
cssFiles.forEach(file => {
    const filePath = path.join(stylesFolderPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    stylesArray.push(fileContent);
});

const bundleCssPath = path.join(__dirname, 'project-dist', 'bundle.css');
const bundleCssContent = stylesArray.join('\n');
fs.writeFileSync(bundleCssPath, bundleCssContent, 'utf-8');
