/**
 * Eventbus sample 2
 */

var eventBus = vertx.eventBus();
var consumer = eventBus.consumer("com.notessensei.vertx");

consumer.handler(function(message) {
    var body = message.body();
    console.log("Request: " + body.request);
    var result = "APPROVED: " + body.request;
    if (!body.prettyPlease) {
        var decisionNumber = Math.floor(Math.random() * 10);
        if (decisionNumber <= 5) {
            result = "REJECT: " + body.request;
        }
    }
    console.log("Appover" + result);
    message.reply(result);
});

vertx.setPeriodic(10000, function(id) {
    // This handler will get called every 10 seconds
    var now = new Date();
    var want = {
        request: now.toString()
    };

    eventBus.send("com.notessensei.vertx", want, function(reply, err) {
        if (err == null) {
            console.log(reply.body());
        } else {
            console.log("Request failed:" + err);
        }
    });
    console.log("Requested:" + want.request);
});

vertx.createHttpServer().requestHandler(function(req) {
    var want = {
        request: (req) ? req.path() : "Webrequest",
        prettyPlease: true
    };
    eventBus.send("com.notessensei.vertx", want, function(reply, err) {
        if (err == null) {
            req.response()
                .putHeader("content-type", "text/plain")
                .end(reply.body());
        } else {
            req.response()
                .putHeader("content-type", "text/plain")
                .end(err);
        }
    })
}).listen(8080);
