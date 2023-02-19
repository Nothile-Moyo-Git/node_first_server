# Node First Server

## This app is for reference only so this readme is designed for that

*REPL is a representation of a computer environment. In this case, it's a JavaScript runtime environment*

*A runtime environment is a server where a program is evaluated, whether that's a node.js server or the browsers runtime environment. React uses node for its environments*

*REPL meaning*
`Read`
`Eval (evaluate)`
`Print (usually to console)`
`Loop (as long as listeners exist)`

The "event loop" is a concept in JavaScript which refers to the stack.

The Stack is data allocated in memory which has a `heap` inside of it. A `heap` refers to a large collection of memory which is mostly unstructured.

As the code is parsed (read), each function call to be executed is is placed onto the stack as a frame. Once there are no more frames to stack, the runtime will then execute the functions, popping each frame in the stack. Once the stack is empty, the event loop is complete.

However, is an active listener is running, then this triggers the event loop each time an event occurs. This could be a get request for example.

*Node has key in-built modules used to create a server*

`http` : The HTTP module. Used to spin up insecure servers.
`https` : The HTTPS module. Used to spin up servers with SSL Encryption.
`fs` : The File System module. Used to create and edit files in node.
`path` : The FilePath module. This module provides utilities for working with file and directory paths.
`os` : The Operating System module. Returns information about the computers operating system.