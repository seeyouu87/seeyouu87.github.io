/**
 * The Master Control program, it does or does not approve things
 */

var eventBus = vertx.eventBus();
var consumer = eventBus.consumer("com.notessensei.vertx");

consumer.handler(function (message) {
	var body = message.body();
	console.log("Request: " + body.request);
	var result = "APPROVED: " + body.request;
	if (!body.prettyPlease) {
		var decisionNumber = Math.floor(Math.random() *10);
		if (decisionNumber <= 5) {
			result = "REJECT: " + body.request;
		}
	}
	console.log(result)
	message.reply(result);
});

vertx.setPeriodic(10000, function (id) {
  // This handler will get called every 10 seconds
  var now = new Date();
  var want = {
	request : now.toString()
  };

  eventBus.send("com.notessensei.vertx" , want, function(reply, err) {
  if (err == null) {
    console.log("Approval: " + reply.body());
  } else {
	console.log("Request failed:"+err);
  }
});
  console.log("Request fired for "+want.request);
});