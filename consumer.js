const {kafka} = require('./client');
const group = process.argv[2];

async function init(){
    const consumer = kafka.consumer({groupId: group});
    console.log('Connecting...');
    await consumer.connect();
    console.log('Connected!');

    await consumer.subscribe({
        topic: 'Rider-Updates',
        fromBeginning: true,
    });

    await consumer.run({
        eachMessage: async result => {
            console.log(`${group}: Received message: ${result.message.value} on partition ${result.partition} from topic ${result.topic} `);
        },
    });
    
    // await consumer.disconnect();
    // console.log('Disconnected!');

}

init();

