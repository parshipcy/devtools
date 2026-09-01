## Console:

### 1. `console.table()`

This displays array data in a table format, making it easier to inspect values and indexes.

![console.table() output showing tasks array in table format](assets/Screenshot%202026-08-26%20230551.png)

### 2. `console.error()` & `console.warn()`

These display error and warning messages in the Console with indicators.

![console.error and console.warn output with error and warning indicators](assets/Screenshot%202026-08-26%20230907.png)

### 3. Reading JavaScript errors

A `ReferenceError` can tell you:

* The type of error
* The variable that caused it
* The file where it occurred
* The line and column where it occurred
* The function/call context

Example from the debugging session:

![ReferenceError showing task is not defined at script.js:15](assets/Screenshot%202026-08-26%20230958.png)

This indicates that `task` was referenced even though it was not defined.

## Sources:

The **Sources** tab in Chrome DevTools is used to debug JavaScript by pausing code execution, inspecting variables, and stepping through the code.

### 1. Open the JavaScript file

1. Open the project in Chrome.
2. Open DevTools using `F12` or `Ctrl + Shift + I`.
3. Go to the **Sources** tab.
4. In the left panel, open:

```text
Page
└── script.js
```

5. Click `script.js` to view the JavaScript source code.

![Sources tab open with script.js selected in the file tree](assets/Screenshot%202026-09-01%20184723.png)

---

### 2. Breakpoints

A **breakpoint** pauses JavaScript execution at a specific line.

**How to use it**

1. Open `script.js` in Sources.
2. Find:

```js
const title = taskInput.value.trim();
```

3. Click the **line number** next to it.
4. A breakpoint will appear.
5. Go back to the webpage.
6. Enter a task.
7. Click **Add Task**.

The JavaScript execution should pause at the breakpoint.

![Breakpoint set on the line number next to taskInput.value.trim()](assets/Screenshot%202026-09-01%20184822.png)

**What to inspect**

Look at the **Scope** section on the right.

You can inspect the variables available at that point in the program.

For example:

```text
title → "Learn Sources"
```

![Debugger paused at breakpoint with Scope and Call Stack visible](assets/Screenshot%202026-09-01%20184939.png)

**Key idea**

A breakpoint allows you to inspect the state of your program at a specific moment during execution.

---

### 3. Step Over

**Step Over** executes the current line and moves to the next line without entering a function.

**How to use it**

1. Set a breakpoint inside the submit handler.
2. Add a task.
3. When execution pauses, click **Step over**.
4. Continue clicking it to execute the code one line at a time.
5. Observe how the highlighted line moves.
6. Check the variables in **Scope** as their values change.

For example:

```js
const title = taskInput.value.trim();

tasks.push(title);

taskInput.value = "";

renderTasks();
```

Step Over lets you execute these statements one at a time.

![Step Over paused at console.log with title visible in Scope](assets/Screenshot%202026-09-01%20185223.png)


> **Step Over = execute the current line and move to the next line.**

---

### 4. Step Into

**Step Into** enters a function so that its internal code can be debugged line by line.

**How to use it**

1. Set a breakpoint at:

```js
renderTasks();
```

2. Add a task.
3. When execution pauses, click **Step into**.
4. DevTools will enter the `renderTasks()` function.
5. Continue using Step Over to execute the function line by line.

For example:

```js
renderTasks();

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        // ...
    });
}
```

![Step Into entering renderTasks with Call Stack showing the caller](assets/Screenshot%202026-09-01%20185649.png)

> **Step Into = enter the function being called and debug it.**

---

### 5. Step Out

**Step Out** finishes the current function and returns to the code that called it.

**How to use it**

1. Set a breakpoint somewhere inside:

```js
function renderTasks() {
```

2. Add a task.
3. The debugger should pause inside `renderTasks()`.
4. Look at the **Call Stack**.
5. Click **Step out**.
6. DevTools will finish the current function.
7. Execution will return to the function that called `renderTasks()`.

For example:

```text
submit event
    ↓
renderTasks()
    ↓
[currently debugging here]
```

After Step Out:

```text
submit event
    ↓
renderTasks()
    ↓
return to submit event
```


> **Step Out = leave the current function and return to its caller.**

---

### 6. Call Stack

The **Call Stack** shows the sequence of function calls that led to the current point of execution.

**How to use it**

1. Set a breakpoint inside `renderTasks()`.
2. Add a task.
3. When execution pauses, find **Call Stack** on the right.
4. Inspect the functions listed there.

You may see something similar to:

```text
renderTasks
anonymous
```

This represents the execution flow:

```text
User clicks Add Task
        ↓
submit event handler
        ↓
renderTasks()
        ↓
current execution point
```

![Call Stack showing anonymous handler at script.js:9](assets/Screenshot%202026-09-01%20185109.png)

> **Call Stack = how did the program get here?**

---

### 7. Inspect Variables

While the debugger is paused, variables can be inspected from **Scope** or by hovering over them in the source code.

For example:

```js
const title = taskInput.value.trim();
```

Hover over:

```js
title
```

You can see its current value.

You can also inspect variables under:

```text
Scope
├── Local
├── Script
└── Global
```

![Hovering over title shows its current value inline](assets/Screenshot%202026-09-01%20185442.png)

---

### 8. Watch Expressions

**Watch** allows you to continuously monitor specific expressions while debugging.

**How to use it**

1. Pause execution using a breakpoint.
2. Find the **Watch** section on the right.
3. Click `+`.
4. Add an expression such as:

```js
tasks
```

or:

```js
tasks.length
```

5. Step through the code.
6. Observe how the value changes.

You can also watch expressions such as:

```js
title
```

```js
tasks.length
```

```js
tasks[0]
```

> **Watch = keep an eye on a value while stepping through the program.**

---

### 9. Debug a ReferenceError

Intentionally change:

```js
tasks.push(title);
```

to:

```js
tasks.push(task);
```

Then:

1. Set a breakpoint on the incorrect line.
2. Add a task.
3. When execution pauses, inspect **Scope**.
4. Check whether `task` exists.
5. Check the value of `title`.
6. Check the **Call Stack**.
7. Click **Resume**.
8. Check the Console for the resulting error.

You should get an error similar to:

```text
ReferenceError: task is not defined
```

The problem is that `task` was never defined.

The correct code is:

```js
tasks.push(title);
```

**Debugging process**

```text
Bug
 ↓
Breakpoint
 ↓
Pause execution
 ↓
Inspect Scope
 ↓
Check variables
 ↓
Check Call Stack
 ↓
Identify the cause
 ↓
Fix the code
```

---

### 10. Step Over vs Step Into vs Step Out

| Action        | What it does                                         |
| ------------- | ---------------------------------------------------- |
| **Step Over** | Execute the current line without entering a function |
| **Step Into** | Enter the function being called                      |
| **Step Out**  | Finish the current function and return to its caller |

Think of it as:

```text
Step Into
    ↓
go deeper into a function

Step Over
    ↓
stay at the current level

Step Out
    ↓
go back up one function level
```
