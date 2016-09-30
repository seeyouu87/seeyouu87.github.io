## Hello World (1/2)

### Node.js
     console.log('Hello World');

### Nashorn
     print('Hello World');

### Universal
    if (!console) {
       load('console.js');
    }
    console.log('Hello world');
