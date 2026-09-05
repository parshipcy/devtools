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

![ReferenceError showing task is not defined at script.js:15](assets/Screenshot%202026-08-26%20230958.png)

This indicates that `task` was referenced even though it was not defined.

## Sources:

The **Sources** tab in Chrome DevTools is used to debug JavaScript by pausing code execution, inspecting variables, and stepping through the code.

### 1. Breakpoints

A **breakpoint** pauses JavaScript execution at a specific line.

![Breakpoint set on the line number next to taskInput.value.trim()](assets/Screenshot%202026-09-01%20184822.png)

While paused, the **Scope** section on the right shows the variables available at that point in the program.

![Debugger paused at breakpoint with Scope and Call Stack visible](assets/Screenshot%202026-09-01%20184939.png)

#### Conditional Breakpoint

A **conditional breakpoint** pauses execution only when a specified condition is `true`. It is useful when a line executes many times but you only want to debug a specific case.

![Conditional Breakpoint](assets/Screenshot%202026-09-01%20212357.png)

> **Normal breakpoint:** pauses every time the line executes.

> **Conditional breakpoint:** pauses only when the condition is `true`.

---

### 2. Step Over

**Step Over** executes the current line and moves to the next line without entering a function.

![Step Over paused at console.log with title visible in Scope](assets/Screenshot%202026-09-01%20185223.png)

> **Step Over = execute the current line and move to the next line.**

---

### 3. Step Into

**Step Into** enters a function so that its internal code can be debugged line by line.

![Step Into entering renderTasks with Call Stack showing the caller](assets/Screenshot%202026-09-01%20185649.png)

> **Step Into = enter the function being called and debug it.**

---

### 4. Step Out

**Step Out** finishes the current function and returns to the code that called it.

> **Step Out = leave the current function and return to its caller.**

---

### 5. Call Stack

The **Call Stack** shows the sequence of function calls that led to the current point of execution. It represents the execution flow from the user action through event handlers and into the function where execution is currently paused.

![Call Stack showing anonymous handler at script.js:9](assets/Screenshot%202026-09-01%20185109.png)

> **Call Stack = how did the program get here?**

---

### 6. Inspect Variables

While the debugger is paused, variables can be inspected from **Scope** or by hovering over them in the source code. The **Scope** panel organizes variables into **Local**, **Script**, and **Global** scopes.

![Hovering over title shows its current value inline](assets/Screenshot%202026-09-01%20185442.png)

---

### 7. Watch Expressions

**Watch** allows you to continuously monitor specific expressions while debugging. You can track values such as variables, array lengths, or indexed elements as you step through the program.

> **Watch = keep an eye on a value while stepping through the program.**

---

### 8. Step Over vs Step Into vs Step Out

| Action        | What it does                                         |
| ------------- | ---------------------------------------------------- |
| **Step Over** | Execute the current line without entering a function |
| **Step Into** | Enter the function being called                      |
| **Step Out**  | Finish the current function and return to its caller |

**Step Into** goes deeper into a function. **Step Over** stays at the current level. **Step Out** goes back up one function level.

## Network - Part 1:

The **Network** tab in Chrome DevTools is used to inspect HTTP requests made by the browser. It becomes especially important when debugging frontend ↔ backend communication with **React + Node.js**.

### 1. Filter API requests

The Network tab provides filters such as **All**, **Fetch/XHR**, **Doc**, **CSS**, **JS**, and **Img**. The **Fetch/XHR** filter shows only API-related requests.

---

### 2. Understand the request

In the request details under **Headers → General**:

**Request URL** - where the request was sent.

**Request Method** - the HTTP verb used (e.g. **GET** retrieves data from the server).

**Status Code** - whether the request succeeded. Common examples:

* **200** - the request succeeded
* **304** - the resource has not changed since the last request, so the cached version is used

![Network tab with Fetch/XHR filter showing todos/1 request headers](assets/Screenshot%202026-09-04%20220329.png)

---

### 3. Inspect Response

The **Response** tab shows the actual data returned by the server, typically in JSON format. JavaScript can parse this into an object using `response.json()`.

![Response tab showing JSON from todos/1](assets/Screenshot%202026-09-04%20220609.png)

---

### 4. Inspect Headers

The **Headers** tab includes **General**, **Request Headers**, and **Response Headers**.

**General** includes the request URL, request method, status code, and remote address.

**Request Headers** are sent from the browser to the server.

**Response Headers** are sent from the server back to the browser.

You do not need to memorize every header. The flow is: browser sends request headers to the server, the server sends response headers back to the browser.

---

### 5. Inspect Timing

The **Timing** tab shows a breakdown of how long different parts of the request took, including queueing, request sent, waiting for server response, and content download. This is useful when an API feels slow.

> **Network → Timing** helps determine where time was spent during a request.

![Timing tab showing request duration breakdown](assets/Screenshot%202026-09-04%20220626.png)

---

### 6. Important HTTP status codes

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

### 7. Preserve log

**Preserve log** keeps requests in the Network panel across page navigations and reloads. Normally, refreshing clears previous requests. This is useful when debugging redirects, authentication, or requests that happen during page navigation.

## Network - Part 2:

This part focuses on **sending data, authentication, browser behavior, and debugging network requests**.

---

### 1. Query Parameters

Query parameters are values added to the URL to provide additional information to the server. They follow the format `/api/tasks?key=value`, and multiple parameters can be combined with `&`, such as `/api/tasks?userId=1&completed=true`.

In DevTools, find them under **Network → Request → Headers** in the **Request URL**. You can also inspect query parameters under the URL/query-parameter section, depending on the browser version.

Common uses include filtering by category, pagination, search terms, and filtering by user ID.

> **Query parameters are data sent through the URL.**

![Network Headers showing GET request with userId=1 query parameter](assets/Screenshot%202026-09-05%20233805.png)

---

### 2. POST Request

`POST` is an HTTP method commonly used when the client wants to **send data to the server**, often to create something.

**GET** sends a request to retrieve data. **POST** sends a request along with data in the body. A typical use is creating a resource on the server by sending a JSON body with fields such as a title.

A successful POST often returns status code **201 Created**.

> **`GET` is commonly used to retrieve data.**
> **`POST` is commonly used to send/create data.**

![Network Headers showing POST request with 201 Created status](assets/Screenshot%202026-09-05%20233850.png)

---

### 3. Request Payload / Body

The **request body** (also called the **request payload**) contains data sent from the client to the server, typically as JSON for API requests.

In DevTools, inspect it under **Network → Request → Payload**.

**Important distinction:** query parameters travel in the URL (e.g. `/api/tasks?userId=1`), while the request payload travels in the request body.

> **Query parameters → URL**
> **Payload → Request body**

---

### 4. Form Data

**Form Data** is another way of sending data, particularly when working with HTML forms and file uploads. In DevTools, inspect it under **Network → Request → Payload → Form Data**.

**Form Data vs JSON:** JSON sends structured data as a stringified object in the request body. Form Data sends key-value pairs, and is the standard approach for HTML forms and file uploads (e.g. name, email, and profile image fields).

> **Form Data is commonly used for HTML forms and file uploads.**

---

### 5. Response Preview vs Response

After sending a request, the server sends a response.

The **Response** tab shows the response body as received from the server.

The **Preview** tab provides a more convenient, structured way to inspect the same data (e.g. as an expandable object tree for JSON).

> **Response = response body**
> **Preview = convenient structured view of the response**

![Preview tab showing structured JSON object](assets/Screenshot%202026-09-05%20234934.png)

![Response tab showing raw JSON response body](assets/Screenshot%202026-09-05%20234948.png)

---

### 6. Cookies

Cookies are small pieces of data stored by the browser for a website. They are commonly used for sessions, authentication, and user preferences.

**Set-Cookie** — the server tells the browser to store a cookie.

**Cookie** — on later requests, the browser sends the stored cookie back to the server.

In DevTools, inspect cookies under **Application → Cookies**. You can also see cookies associated with requests under **Network → Request → Headers**.

> **`Set-Cookie` → server tells browser to store a cookie.**
> **`Cookie` → browser sends the cookie to the server.**

---

### 7. Authentication Headers / Bearer Token

When an API requires authentication, the client often sends an authentication token in the **Authorization** header, commonly as `Authorization: Bearer <token>`.

A typical flow: the user logs in, the server verifies credentials and returns a token, the frontend stores the token, and subsequent API requests include it in the Authorization header for the backend to verify.

In DevTools, inspect it under **Network → Request → Headers → Request Headers**.

Common related status codes:

* **401** — authentication missing or invalid
* **403** — authenticated but not allowed

> **`Authorization: Bearer <token>` is a common way to send an access token to an API.**

---

### 8. Network Throttling

Network throttling lets you **simulate a slow or unreliable network**. In the Network tab, the **Throttling** dropdown offers options such as **No throttling**, **Fast 4G**, **Slow 4G**, and **Offline**.

On a slow network, API requests take longer, which helps test loading states and how the UI behaves while waiting for data.

> **Throttling is used to simulate different network conditions.**

---

### 9. Disable Cache

Browsers cache resources such as HTML, CSS, JavaScript, and images to make websites load faster. During development, you may change a file and still see an older cached version because the browser serves it from cache instead of fetching a fresh copy.

**Disable cache** in the Network tab forces the browser to fetch resources from the network rather than cache. This option applies while DevTools is open.

> **Disable cache is useful when debugging whether the browser is serving an old resource.**

---

### 10. Request Blocking / Replaying

**Request Blocking** lets you deliberately block a network request to see how your application behaves when that resource or API is unavailable.

**Replay Request** lets you resend a previous request from DevTools. This is useful for checking whether a request consistently fails, whether the server returns the same response, or whether changing request data changes the result.

> **Request blocking helps you simulate failures.**
> **Request replaying helps you reproduce a request.**

![Network toolbar with throttling, Disable cache, and request blocking options](assets/Screenshot%202026-09-06%20000046.png)
