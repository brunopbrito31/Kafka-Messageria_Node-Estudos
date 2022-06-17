const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'newOrderServiceJs',
    brokers:['localhost:9092']
})

const producer = kafka.producer()

const newOrder = {
    nameUser: 'Bruno2',
    total: 15.77,
    paymentMethod: 'credit-card'
}

const run = async ()=> {
    // Publicando
    await producer.connect()
    await producer.send({
        topic: 'ECOMMERCE_NEW_ORDER',
        messages: [
            { 
                key: `cliente-${newOrder.nameUser}`, 
                value: JSON.stringify(newOrder)
            },
        ]
    })
}

run().catch(console.error)