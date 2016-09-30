## Hello World (2/2)

### Shell script
    #!/usr/bin/env jjs
    print('Hello world');

### Java
    ScriptEngineManager scriptEngineManager = new ScriptEngineManager();
    ScriptEngine nashorn = scriptEngineManager.getEngineByName("nashorn");
    nashorn.eval("print('Hello World')");