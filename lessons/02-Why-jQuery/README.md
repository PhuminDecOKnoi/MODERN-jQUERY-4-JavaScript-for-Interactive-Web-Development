# Module 02 — Why jQuery Still Matters

## 1. Module Position

This module explains the practical role of jQuery in modern web development.

jQuery is no longer the only way to build interactive web pages, but it remains useful for:

- maintaining existing websites,
- understanding older codebases,
- building simple interactive pages quickly,
- working with legacy PHP / CMS / admin systems,
- teaching DOM manipulation and event concepts,
- using mature plugins in controlled situations.

The goal is not to teach learners that jQuery replaces modern JavaScript. The goal is to help learners understand where jQuery fits in today's ecosystem.

---

## 2. Learning Objectives

After completing this module, learners should be able to:

1. explain what jQuery is,
2. identify when jQuery is useful,
3. identify when jQuery is not necessary,
4. compare jQuery syntax with vanilla JavaScript,
5. understand the meaning of `$()` in jQuery,
6. explain jQuery chaining,
7. prepare a basic jQuery 4 page,
8. use jQuery responsibly in modern projects.

---

## 3. What Is jQuery?

jQuery is a JavaScript library that simplifies common browser tasks.

Common jQuery tasks include:

- selecting elements,
- changing text and HTML,
- changing CSS,
- adding and removing classes,
- handling events,
- showing and hiding elements,
- sending AJAX requests,
- traversing the DOM,
- using plugins.

---

## 4. Why jQuery Became Popular

jQuery became popular because it made browser scripting easier and more consistent.

Before modern browser APIs became strong and consistent, developers used jQuery to reduce cross-browser complexity.

Example:

```javascript
// jQuery selector
$("#message").text("Hello jQuery");
```

Compared with modern JavaScript:

```javascript
// Modern JavaScript selector
const message = document.querySelector("#message");
message.textContent = "Hello JavaScript";
```

---

## 5. When jQuery Is Still Useful

jQuery is still useful when:

1. the project already uses jQuery,
2. the team maintains legacy websites,
3. the page needs light interactivity without a full framework,
4. the website is PHP / CMS / admin-panel oriented,
5. the project uses trusted jQuery plugins,
6. learners need to understand DOM and event concepts quickly.

Practical examples:

- form validation,
- modal display,
- search filters,
- AJAX form submission,
- admin dashboard widgets,
- simple CRUD interfaces,
- dynamic tables.

---

## 6. When jQuery May Not Be Necessary

jQuery may not be necessary when:

- the project already uses React, Vue, Angular, Svelte, or another component framework,
- the task can be solved simply with modern JavaScript,
- performance and bundle size are critical,
- the project has no legacy dependency,
- the team wants a fully modular frontend architecture.

Modern JavaScript can now handle many tasks that previously required jQuery.

---

## 7. Basic jQuery Setup

### HTML

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>jQuery Starter</title>
</head>
<body>
  <button id="helloButton">Click Me</button>
  <p id="message">Waiting...</p>

  <!-- โหลด jQuery ก่อน script ของเรา -->
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

### JavaScript with jQuery

```javascript
// รอให้ DOM โหลดเสร็จก่อนเริ่มทำงาน
$(function () {
  // เลือกปุ่ม helloButton และผูกเหตุการณ์ click
  $("#helloButton").on("click", function () {
    // เปลี่ยนข้อความของ message
    $("#message").text("Hello jQuery 4");
  });
});
```

---

## 8. Understanding `$()`

In jQuery, `$()` is a shortcut for the jQuery function.

```javascript
$("#message")
```

means:

```text
Find the element that matches the selector #message and wrap it as a jQuery object.
```

A jQuery object has jQuery methods such as:

- `.text()`
- `.html()`
- `.val()`
- `.attr()`
- `.prop()`
- `.addClass()`
- `.removeClass()`
- `.on()`
- `.hide()`
- `.show()`

---

## 9. Chaining

jQuery supports chaining, which means calling multiple methods one after another.

```javascript
// เลือกกล่องข้อความ แล้วเปลี่ยนข้อความ เพิ่ม class และแสดงผล
$("#message")
  .text("Saved successfully")
  .addClass("success")
  .show();
```

This works because many jQuery methods return the jQuery object again.

---

## 10. jQuery vs Vanilla JavaScript Mapping

| Task | jQuery | Modern JavaScript |
|---|---|---|
| Select element | `$("#id")` | `document.querySelector("#id")` |
| Set text | `.text("Hi")` | `.textContent = "Hi"` |
| Set HTML | `.html("<b>Hi</b>")` | `.innerHTML = "<b>Hi</b>"` |
| Add class | `.addClass("active")` | `.classList.add("active")` |
| Remove class | `.removeClass("active")` | `.classList.remove("active")` |
| Toggle class | `.toggleClass("active")` | `.classList.toggle("active")` |
| Click event | `.on("click", fn)` | `.addEventListener("click", fn)` |

---

## 11. Common Mistakes

### Mistake 1 — Thinking jQuery is a different language

jQuery is JavaScript. It is a library written in JavaScript.

### Mistake 2 — Using jQuery for everything

Do not use jQuery when native JavaScript is simpler and clearer.

### Mistake 3 — Using abandoned plugins without review

Always check plugin maintenance, license, and security status.

### Mistake 4 — Using `.html()` for untrusted content

Prefer `.text()` for plain text.

```javascript
// ปลอดภัยกว่าสำหรับข้อความจากผู้ใช้
$("#output").text(userInput);
```

---

## 12. Hands-on Lab

Create a basic jQuery page with:

- one button,
- one message paragraph,
- one CSS class named `active`,
- click event that changes the text and toggles the class.

### Starter Code

```html
<button id="toggleButton">Toggle</button>
<p id="statusText">Inactive</p>
```

```javascript
// รอ DOM พร้อมก่อนเริ่มทำงาน
$(function () {
  // เมื่อคลิกปุ่ม ให้สลับสถานะข้อความ
  $("#toggleButton").on("click", function () {
    $("#statusText")
      .text("Active")
      .toggleClass("active");
  });
});
```

---

## 13. Exercise

Rewrite the lab using modern JavaScript only.

Expected APIs:

- `document.querySelector()`
- `addEventListener()`
- `textContent`
- `classList.toggle()`

---

## 14. Mini Project

Build a **Simple Training Status Card**.

Requirements:

- show learner name,
- show course status,
- click button to mark as completed,
- update text,
- add completed class,
- create both jQuery and modern JavaScript versions.

---

## 15. Summary

jQuery still matters when used with the right purpose.

Learners should understand:

- jQuery is a JavaScript library,
- jQuery is useful for legacy and practical web systems,
- modern JavaScript can replace many jQuery tasks,
- professional developers should understand both.
