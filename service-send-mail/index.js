const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers:['localhost:9092']
})

const consumer = kafka.consumer({ groupId:'MessageReceptorService' })

// Ouvindo
const runApp = async () =>{
    await consumer.connect()
    await consumer.subscribe({ topic: 'ECOMMERCE_NEW_ORDER' , fromBeginning: true })


    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // console.log({
            //     partition,
            //     offset: message.offset,
            //     value: message.value.toString(),
            // })

            let order = JSON.parse(message.value);
            console.log(`Enviando email para o cliente = ${order.nameUser}`)
        }
    })
}

runApp().catch(console.error)