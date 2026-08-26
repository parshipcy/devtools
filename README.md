## Why this repository?

This repo is my personal learning archive for exploring developer tools when working with **JavaScript, React, and Node.js**.

I am using small projects and debugging scenarios to learn how to inspect and troubleshoot.

I hope it can also be useful to others who are starting to learn debugging and developer tools :)

## JavaScript

### Console:

#### 1. `console.table()`

This displays array data in a table format, making it easier to inspect values and indexes.

![console.table() output showing tasks array in table format](assets/Screenshot%202026-08-26%20230551.png)

#### 2. `console.error()` & `console.warn()`

These display error and warning messages in the Console with indicators.

![console.error and console.warn output with error and warning indicators](assets/Screenshot%202026-08-26%20230907.png)

#### 3. Reading JavaScript errors

A `ReferenceError` can tell you:

* The type of error
* The variable that caused it
* The file where it occurred
* The line and column where it occurred
* The function/call context

Example from the debugging session:

![ReferenceError showing task is not defined at script.js:15](assets/Screenshot%202026-08-26%20230958.png)

This indicates that `task` was referenced even though it was not defined.
