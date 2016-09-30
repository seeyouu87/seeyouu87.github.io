##  Vertx EventBus

### Consumer
    var eventBus = vertx.eventBus();
    var consumer = eb.consumer(someAddress);

    consumer.handler(function (message) {
        var body = message.body();
        message.reply(someReply);
    });

### Sender
    eventBus.publish(someAddress, "Message to all");
    eventBus.send(someAddress, Object_to_first);