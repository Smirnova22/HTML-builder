
    const readline = require('readline');
    const fs = require('fs');
    
    function captureUserInput(filename) {
        let fileStream = fs.createWriteStream("consoleInput.txt");
        console.log("Введите пожалуйста текст:");
        
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        rl.on('line', (input) => {
            if (input === 'exit') {
                console.log('До свидания!');
                rl.close();
            } else {
                fileStream.write(input + '\n');
            }
        });
        
        process.on('SIGINT', () => {
            console.log("До свидания!");
            process.exit();
        });
    }

    captureUserInput("consoleInput.txt");

