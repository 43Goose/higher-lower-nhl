Main();

function Main() {
    const prompt = require('prompt-sync')();
    console.log(
        '      WELCOME!    \n',
        '*******************\n',
        '\n',
        '1. Add Player   \n',
        '2. Update Player\n',
        '3. Update All   \n'
    );

    const input = prompt('Choose an option: ');
    console.log(input);
}