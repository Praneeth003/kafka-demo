const {kafka} = require('./client');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function init(){
    const producer = kafka.producer();
    console.log('Connecting...');
    await producer.connect();
    console.log('Connected!');

    console.log('Sending messages...');

    rl.setPrompt('> ');
    rl.prompt();

    rl.on('line', async line => {
        const [name, location] = line.split(',');
        await producer.send({
            topic: 'Rider-Updates',
            messages: [
                {
                    partition: location === 'north' ? 0 : 1,
                    key: 'rider-location',
                    value: JSON.stringify({
                        name,
                        location,
                    }),
                },
            ],
        });
        rl.prompt();
    }
    ).on('close', async () => {
        await producer.disconnect();
    });


    console.log('Messages sent successfully!');
    // console.log('Disconnecting...');
    // await producer.disconnect();
    // console.log('Disconnected!');  
}

init();
