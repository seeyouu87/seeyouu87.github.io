vertx.createHttpServer()
  .requestHandler(function (req) {
    req.response()
      .putHeader("content-type", "text/plain")
      .end("Hello to "+req.path()+ " from Vert.x!");
}).listen(8080);