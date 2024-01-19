const readline = require('readline');
const fs = require('fs');

const newReadline = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Функция для записи пользователльского сообщения в файл
function writeToFile(input) {
    fs.appendFile('./02-write-file/text.txt', `${input}\n`, (err) => {
        if(err) throw err;
        console.log("Ваше сообщение добавлено.");
    });
}