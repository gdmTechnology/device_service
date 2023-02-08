import env from '@/main/config/env'
import { Consumer } from '@/data/protocols'
import { Kafka } from 'kafkajs'
import { Topics } from '@/main/config/kafka'
import { } from '@/main/factories'

export let consumer = null

export class KafkaConsumer implements Consumer {
    constructor(
        private readonly kafkaServer: Kafka
    ) { }

    async consumer(): Promise<void> {
        if (consumer) return consumer
        consumer = this.kafkaServer.consumer({ groupId: env.kafkaGroupId })
        await consumer.connect()
        // await consumer.subscribe({ topic: Topics.MEASURE, fromBeginning: true })
        // await consumer.run({
        //     eachMessage: async ({ topic, partition, message }) => {
        //         try {
        //             const data = JSON.parse(message.value.toString())
        //             console.log('DATA:: ', data)
        //         } catch (error) {
        //             console.error('Err:: ', error)
        //         }
        //     }
        // })
    }
}
