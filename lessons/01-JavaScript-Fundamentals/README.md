# Module 01 — JavaScript Fundamentals

## 1. Module Position

This module builds the foundation for the whole course.

Before learning jQuery, learners must understand what JavaScript does in the browser, how it controls HTML elements, how events work, and how basic programming logic is written.

jQuery is not a replacement for JavaScript. jQuery is a JavaScript library that makes common browser tasks easier.

---

## 2. Learning Objectives

After completing this module, learners should be able to:

1. explain the role of JavaScript in web pages,
2. write variables using `let` and `const`,
3. use basic data types,
4. write functions,
5. use conditionals and loops,
6. select simple DOM elements,
7. attach basic event listeners,
8. understand why jQuery is built on top of JavaScript.

---

## 3. Core Concepts

### 3.1 JavaScript in the Browser

JavaScript runs in the browser and can change the behavior of a web page after the HTML and CSS have loaded.

Common tasks include:

- reading user input,
- changing text or styles,
- showing or hiding elements,
- validating forms,
- sending data to APIs,
- updating dashboards without reloading the page.

### 3.2 Variables

Use `const` when the value should not be reassigned.

```javascript
// กำหนดค่าคงที่สำหรับชื่อระบบ
const appName = "Modern jQuery Course";
```

Use `let` when the value may change.

```javascript
// กำหนดตัวแปรคะแนน ซึ่งสามารถเปลี่ยนค่าได้
let score = 0;
score = score + 10;
```

Avoid `var` in modern JavaScript lessons unless explaining legacy code.

---

## 4. Data Types

```javascript
// String: ข้อความ
const employeeName = "Somchai";

// Number: ตัวเลข
const workingHours = 8;

// Boolean: จริงหรือเท็จ
const isActive = true;

// Array: ชุดข้อมูลหลายค่า
const departments = ["HR", "Audit", "IT"];

// Object: ข้อมูลแบบมี key และ value
const employee = {
  id: 1,
  name: "Somchai",
  department: "HR"
};
```

---

## 5. Functions

Functions help organize reusable logic.

```javascript
// ฟังก์ชันสำหรับคำนวณจำนวนชั่วโมงทำงานรวม
function calculateTotalHours(normalHours, overtimeHours) {
  return normalHours + overtimeHours;
}

// เรียกใช้ฟังก์ชันและเก็บผลลัพธ์ไว้ในตัวแปร
const totalHours = calculateTotalHours(8, 2);
console.log(totalHours);
```

Modern JavaScript also supports arrow functions.

```javascript
// ฟังก์ชันแบบ arrow function สำหรับตรวจสอบสถานะ active
const isEmployeeActive = (status) => {
  return status === "active";
};
```

---

## 6. DOM Selection

DOM means Document Object Model. It is the browser's representation of HTML elements.

```html
<button id="saveButton">Save</button>
<p id="message">Waiting...</p>
```

```javascript
// เลือก element ที่มี id="saveButton"
const saveButton = document.querySelector("#saveButton");

// เลือก element ที่มี id="message"
const message = document.querySelector("#message");
```

---

## 7. Events

Events allow JavaScript to respond to user actions.

```javascript
// ตรวจสอบว่าพบปุ่มก่อนผูก event
if (saveButton) {
  // เมื่อผู้ใช้คลิกปุ่ม ให้เปลี่ยนข้อความในหน้าเว็บ
  saveButton.addEventListener("click", () => {
    message.textContent = "Data saved successfully.";
  });
}
```

---

## 8. jQuery Preview

The same behavior can be written with jQuery:

```javascript
// รอให้ DOM โหลดเสร็จก่อนเริ่มทำงาน
$(function () {
  // ผูกเหตุการณ์ click ให้กับปุ่ม saveButton
  $("#saveButton").on("click", function () {
    // เปลี่ยนข้อความของ element ที่มี id="message"
    $("#message").text("Data saved successfully.");
  });
});
```

The key idea:

```text
JavaScript DOM API  -> document.querySelector()
jQuery              -> $(selector)
```

---

## 9. Common Mistakes

### Mistake 1 — Running JavaScript before DOM is ready

If JavaScript runs before the HTML element exists, selection may return `null`.

Recommended fixes:

- put `<script>` before the closing `</body>` tag,
- or use `DOMContentLoaded`,
- or use jQuery document ready in jQuery modules.

### Mistake 2 — Using `innerHTML` for untrusted text

Prefer `textContent` for plain text.

```javascript
// ปลอดภัยกว่าสำหรับข้อความธรรมดา
message.textContent = userInput;
```

### Mistake 3 — Using `var` by default

Prefer `const` and `let` in modern JavaScript.

---

## 10. Hands-on Lab

Create a simple page with:

- one input field,
- one button,
- one output area.

When the user clicks the button, show the input value in the output area.

### Starter HTML

```html
<input id="employeeName" type="text" placeholder="Enter employee name">
<button id="showButton">Show</button>
<p id="output"></p>
```

### JavaScript Task

```javascript
// เลือก input, button และ output
const employeeName = document.querySelector("#employeeName");
const showButton = document.querySelector("#showButton");
const output = document.querySelector("#output");

// เมื่อคลิกปุ่ม ให้แสดงชื่อพนักงาน
showButton.addEventListener("click", () => {
  output.textContent = employeeName.value;
});
```

---

## 11. Exercise

Rewrite the lab with these improvements:

1. If the input is empty, show `Please enter employee name.`
2. If the input has a value, show `Employee: [name]`.
3. Add a CSS class when the output is successful.

---

## 12. Mini Project

Build a small **Employee Status Checker**.

Required features:

- input employee name,
- select status: active / inactive,
- button to check,
- output message,
- different CSS class for active and inactive.

---

## 13. Summary

This module provides the minimum JavaScript foundation needed before learning jQuery.

Learners should now understand:

- variables,
- functions,
- objects,
- arrays,
- DOM selection,
- events,
- basic relationship between JavaScript and jQuery.
