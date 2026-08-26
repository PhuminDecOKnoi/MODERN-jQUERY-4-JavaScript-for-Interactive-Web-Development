# Lesson 18 — jQuery vs Vanilla JavaScript

> Module type: Comparison / Refactoring / Modernization

## Learning Objectives

By the end of this lesson, learners will be able to:

1. Explain when jQuery is still useful in modern web development.
2. Rewrite common jQuery patterns into Vanilla JavaScript.
3. Compare readability, dependency cost, compatibility, and maintainability.
4. Decide whether to use jQuery, Vanilla JS, or a modern framework based on project context.
5. Maintain legacy jQuery code while gradually modernizing it.

## Core Question

jQuery is no longer required for every web project, but it remains useful when maintaining existing systems, building small interactive pages, supporting legacy templates, or teaching DOM concepts in a practical way.

The professional skill is not simply knowing jQuery. The professional skill is knowing **when to use it, when not to use it, and how to migrate from it safely**.

## Comparison Table

| Task | jQuery | Vanilla JavaScript |
|---|---|---|
| Select one element | `$("#app")` | `document.querySelector("#app")` |
| Select many elements | `$(".item")` | `document.querySelectorAll(".item")` |
| Add class | `.addClass("active")` | `.classList.add("active")` |
| Remove class | `.removeClass("active")` | `.classList.remove("active")` |
| Toggle class | `.toggleClass("active")` | `.classList.toggle("active")` |
| Read text | `.text()` | `.textContent` |
| Set HTML | `.html("...")` | `.innerHTML = "..."` |
| Event binding | `.on("click", handler)` | `.addEventListener("click", handler)` |
| AJAX | `$.ajax()` | `fetch()` |

## Example 1 — Selecting Elements

### jQuery

```javascript
// เลือก element จาก id="courseTitle"
const title = $("#courseTitle");

// เปลี่ยนข้อความของ element
// .text() ใช้ใส่ข้อความแบบปลอดภัยกว่า .html() เมื่อไม่ต้องการ render HTML
title.text("Modern jQuery 4 Course");
```

### Vanilla JavaScript

```javascript
// เลือก element จาก id="courseTitle"
const title = document.querySelector("#courseTitle");

// เปลี่ยนข้อความของ element
// textContent ใช้ใส่ข้อความโดยไม่ตีความเป็น HTML
title.textContent = "Modern jQuery 4 Course";
```

## Example 2 — Event Handling

### jQuery

```javascript
// รอให้เอกสารโหลดพร้อมใช้งานก่อน
$(function () {
  // ผูก event click กับปุ่ม
  $("#saveButton").on("click", function () {
    $("#status").text("Saved successfully");
  });
});
```

### Vanilla JavaScript

```javascript
// รอให้ DOM โหลดเสร็จ
window.addEventListener("DOMContentLoaded", () => {
  // เลือกปุ่มและผูก event click
  document.querySelector("#saveButton").addEventListener("click", () => {
    document.querySelector("#status").textContent = "Saved successfully";
  });
});
```

## Example 3 — Event Delegation

### jQuery

```javascript
// ใช้ event delegation เมื่อรายการถูกสร้างแบบ dynamic
$("#employeeTable").on("click", ".btn-delete", function () {
  // หาแถวที่อยู่ใกล้ปุ่มที่สุดแล้วลบออก
  $(this).closest("tr").remove();
});
```

### Vanilla JavaScript

```javascript
document.querySelector("#employeeTable").addEventListener("click", (event) => {
  // ตรวจว่าจุดที่คลิกเป็นปุ่มลบหรือไม่
  if (event.target.matches(".btn-delete")) {
    event.target.closest("tr").remove();
  }
});
```

## Decision Guide

Use jQuery when:

- You maintain existing jQuery-based systems.
- The project is a small interactive website, admin page, or dashboard.
- The team already understands jQuery.
- The cost of adding React/Vue is not justified.
- You need fast DOM manipulation without a build step.

Use Vanilla JavaScript when:

- You are building a modern lightweight site.
- Browser support is modern.
- You want fewer dependencies.
- You need better long-term maintainability.

Use a framework when:

- The application has complex state.
- Many components update frequently.
- Team workflows rely on component-based architecture.
- You need routing, state management, and build tooling.

## Common Refactoring Strategy

1. Identify repeated jQuery patterns.
2. Replace simple selectors and class operations first.
3. Replace event handlers with `addEventListener`.
4. Replace `$.ajax()` with `fetch()` only after confirming API behavior.
5. Test every change manually and with regression scenarios.
6. Keep jQuery where replacement creates more risk than value.

## Common Mistakes

- Rewriting everything only because jQuery looks old.
- Mixing jQuery and Vanilla JS without clear team standards.
- Replacing `$.ajax()` without handling error states.
- Using `.html()` or `innerHTML` with untrusted input.
- Ignoring legacy plugin dependencies.

## Hands-on Lab

Convert the following jQuery features into Vanilla JavaScript:

1. Toggle a sidebar.
2. Filter table rows.
3. Display form validation error messages.
4. Load JSON data with `fetch()`.
5. Render cards from an array.

## Mini Project

Create a comparison page named **jQuery vs Vanilla JS Playground** with two columns:

- Left column: jQuery implementation.
- Right column: Vanilla JS implementation.

Each feature should include:

- Code sample.
- Output preview.
- Thai explanation.
- Maintainability note.

## Review Questions

1. Why is jQuery still relevant for legacy systems?
2. What is the Vanilla JS equivalent of `.addClass()`?
3. What is the risk of using `.html()` with user input?
4. When should a team choose a framework instead of jQuery?
5. Why is event delegation important for dynamic elements?

## Key Takeaway

> Modern web developers should understand both jQuery and Vanilla JavaScript. The goal is not to defend one tool, but to choose the right tool for the right system.
