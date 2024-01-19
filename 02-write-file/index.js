const readline = require('readline');
const fs = require('fs');

console.log("Введите Ваш текст сюда:");

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
newReadline.on('line', (input) => {
    if(input === 'exit') {
        console.log('До свидания!');
        newReadline.close();
    } else {
        writeToFile(input);
    }
});

process.on('SIGINT', () => {
    console.log("До свидания!");
    process.exit();
});