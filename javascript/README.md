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

#### Conditional Breakpoint

A **conditional breakpoint** pauses execution only when a specified condition is `true`. It is useful when a line executes many times but you only want to debug a specific case.

**How to use:**

1. Right-click the line number where you want the breakpoint.
2. Select **Add conditional breakpoint**.
3. Enter a condition, for example:

```js
task === "999"
```

4. Run the code.

If the line runs for multiple tasks:

```text
Learn JavaScript  → continue
Learn DevTools    → continue
999    → pause
Learn Node.js     → continue
```

![Conditional Breakpoint](assets/Screenshot%202026-09-01%20212357.png)

> **Normal breakpoint:** pauses every time the line executes.

> **Conditional breakpoint:** pauses only when the condition is `true`.

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

## Network - Part 1:

The **Network** tab in Chrome DevTools is used to inspect HTTP requests made by the browser. It becomes especially important when debugging frontend ↔ backend communication with **React + Node.js**.

### 1. Add an API request

Add a **Load API Data** button and a result container below the task list in `index.html`:

```html
<ul id="task-list"></ul>

<button id="load-data">
    Load API Data
</button>

<div id="api-result"></div>
```

In `script.js`, add references at the top:

```js
const loadDataButton = document.getElementById("load-data");
const apiResult = document.getElementById("api-result");
```

Then add a click handler at the bottom:

```js
loadDataButton.addEventListener("click", async () => {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
    );

    const data = await response.json();

    apiResult.textContent = data.title;
});
```

**Flow:**

```text
Click "Load API Data"
        ↓
fetch()
        ↓
HTTP request
        ↓
JSONPlaceholder server
        ↓
HTTP response
        ↓
response.json()
        ↓
Display data
```

---

### 2. Open Network

1. Open the page in Chrome.
2. Press `F12` to open DevTools.
3. Go to the **Network** tab.
4. Refresh the page.

You should see requests for resources such as:

```text
index.html
style.css
script.js
```

---

### 3. Filter API requests

At the top of Network, use filters such as:

```text
All
Fetch/XHR
Doc
CSS
JS
Img
```

Click **Fetch/XHR** to show only API-related requests.

Then click **Load API Data**.

You should see a request similar to:

```text
todos/1
```

Click that request to inspect it.

---

### 4. Understand the request

In the request details, check the following under **Headers → General**:

**Request URL**

```text
https://jsonplaceholder.typicode.com/todos/1
```

This tells you **where the request was sent**.

**Request Method**

```text
GET
```

We're retrieving data, so we're using GET.

**Status Code**

```text
200 (This means the request succeeded.)
```

and maybe

```text
304 (The resource hasn't changed since the last time you requested it, so use your cached version.)
```

![Network tab with Fetch/XHR filter showing todos/1 request headers](assets/Screenshot%202026-09-04%20220329.png)

---

### 5. Inspect Response

Click the **Response** tab.

You should see JSON similar to:

```json
{
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
}
```

This is the actual data returned by the server.

Your JavaScript then does:

```js
const data = await response.json();
```

and gets that JSON as a JavaScript object.

![Response tab showing JSON from todos/1](assets/Screenshot%202026-09-04%20220609.png)

---

### 6. Inspect Headers

Click the **Headers** tab.

You'll see sections such as:

```text
General
Request Headers
Response Headers
```

**General** includes:

```text
Request URL
Request Method
Status Code
Remote Address
```

**Request Headers** are sent **from your browser to the server**.

**Response Headers** are sent **from the server back to your browser**.

You don't need to memorize every header. For now, understand:

```text
Browser
   ↓
Request Headers
   ↓
Server
   ↓
Response Headers
   ↓
Browser
```

---

### 7. Inspect Timing

Click the **Timing** tab.

You'll see a breakdown of how long different parts of the request took:

```text
Queueing
Request sent
Waiting for server response
Content download
```

This becomes useful when an API feels slow.

> **Network → Timing** helps determine where time was spent during a request.

![Timing tab showing request duration breakdown](assets/Screenshot%202026-09-04%20220626.png)

---

### 8. Debug a 404 error

Deliberately break the API by changing the URL:

```js
"https://jsonplaceholder.typicode.com/todos/1"
```

to:

```js
"https://jsonplaceholder.typicode.com/todos/999999"
```

Save and click **Load API Data**.

In Network, you may see:

```text
404
```

Click the failed request and check:

**Request URL**

```text
/todos/999999
```

Is the URL correct?

**Status Code**

```text
404 Not Found
```

**Response**

Look at what the server returned.

You've diagnosed the problem **without touching the debugger**.

![Network tab showing 404 for todos/999999 request](assets/Screenshot%202026-09-04%20221612.png)

Change the URL back when done:

```js
"https://jsonplaceholder.typicode.com/todos/1"
```

---

### 9. Important HTTP status codes

| Status | Meaning             |
| ------ | ------------------- |
| `200`  | Success             |
| `201`  | Created             |
| `204`  | Success, no content |
| `304`  | Not Modified        |
| `400`  | Bad request         |
| `401`  | Not authenticated   |
| `403`  | Forbidden           |
| `404`  | Not found           |
| `500`  | Server error        |

These become extremely important when working with **Node.js/Express APIs**.

---

### 10. Preserve log

In Network, enable **Preserve log**.

Then reload the page.

Normally, refreshing clears previous requests. **Preserve log** keeps requests in the Network panel across page navigations and reloads.

This is useful when debugging redirects, authentication, or requests that happen during page navigation.

---

### 11. Network debugging workflow

When an API isn't working:

```text
API not working
      ↓
Open Network
      ↓
Filter Fetch/XHR
      ↓
Find request
      ↓
Check URL
      ↓
Check Method
      ↓
Check Status Code
      ↓
Check Request Headers / Payload
      ↓
Check Response
      ↓
Check Timing
```
