# Lesson 19 — Security, Performance, and Accessibility

> Module type: Professional Practice / Production Readiness

## Learning Objectives

By the end of this lesson, learners will be able to:

1. Identify common security risks in jQuery-based UI code.
2. Avoid unsafe DOM injection patterns.
3. Improve selector performance and event handling efficiency.
4. Apply accessibility principles to interactive components.
5. Prepare jQuery code for production-level review.

## Why This Lesson Matters

Interactive web pages are not only about making buttons work. Professional frontend code must also be secure, fast, readable, maintainable, and accessible.

A small jQuery script can create large operational risk if it injects unsafe HTML, leaks data, blocks the UI, or excludes users who rely on keyboards or screen readers.

## 1. Security Principles

### Avoid unsafe `.html()` with user input

Unsafe example:

```javascript
// อันตราย: ถ้า userInput มี script หรือ HTML แปลกปลอม อาจเกิด XSS ได้
$("#preview").html(userInput);
```

Safer example:

```javascript
// ปลอดภัยกว่า: .text() แสดงเป็นข้อความ ไม่ตีความเป็น HTML
$("#preview").text(userInput);
```

### Vanilla JavaScript equivalent

```javascript
// ปลอดภัยกว่า innerHTML เมื่อแสดงข้อมูลจากผู้ใช้
preview.textContent = userInput;
```

## 2. XSS Risk Checklist

Before rendering data into the DOM, ask:

- Is the data from user input?
- Is the data from external API?
- Is the data from database content that users can modify?
- Does the code use `.html()` or `innerHTML`?
- Is escaping or sanitization applied?

If any answer indicates risk, prefer `.text()` or `textContent`.

## 3. Performance Principles

### Cache repeated selectors

Less efficient:

```javascript
// เลือก element ซ้ำหลายครั้ง ทำให้โค้ดอ่านยากและไม่จำเป็น
$("#status").text("Loading...");
$("#status").addClass("loading");
$("#status").show();
```

Better:

```javascript
// เก็บ selector ไว้ในตัวแปรเพื่อใช้งานซ้ำ
const $status = $("#status");

$status
  .text("Loading...")
  .addClass("loading")
  .show();
```

### Use event delegation for dynamic lists

```javascript
// เหมาะกับปุ่มที่ถูกสร้างภายหลังจาก AJAX หรือ render table
$("#auditTable").on("click", ".btn-view", function () {
  const id = $(this).data("id");
  console.log("View finding:", id);
});
```

## 4. Accessibility Principles

Interactive components should support:

- Keyboard navigation.
- Visible focus state.
- Proper labels.
- Meaningful button text.
- ARIA only when native HTML is not enough.
- Sufficient color contrast.

## Accessible Button Example

```html
<button type="button" id="togglePanel" aria-expanded="false" aria-controls="auditPanel">
  Toggle audit panel
</button>

<section id="auditPanel" hidden>
  Audit details will appear here.
</section>
```

```javascript
$("#togglePanel").on("click", function () {
  const $button = $(this);
  const $panel = $("#auditPanel");
  const isOpen = $button.attr("aria-expanded") === "true";

  // สลับสถานะการแสดงผลของ panel
  $panel.prop("hidden", isOpen);

  // อัปเดต aria-expanded เพื่อให้ screen reader เข้าใจสถานะปัจจุบัน
  $button.attr("aria-expanded", String(!isOpen));
});
```

## 5. Production Review Checklist

Use this checklist before committing frontend code:

- [ ] No unsafe `.html()` with untrusted data.
- [ ] Selectors are clear and not unnecessarily repeated.
- [ ] Event delegation is used for dynamic elements.
- [ ] AJAX/fetch error states are handled.
- [ ] Loading, empty, success, and error states are visible.
- [ ] Buttons and forms have accessible labels.
- [ ] Keyboard interaction is supported.
- [ ] Code has Thai comments where useful for learners.
- [ ] Code is readable enough for future maintainers.

## 6. Performance Anti-patterns

Avoid:

- Binding events inside loops without need.
- Re-rendering the entire table for one small update when not necessary.
- Using very broad selectors such as `$("div")` in large pages.
- Running DOM-heavy code repeatedly on scroll or resize without throttling.
- Loading large plugins for a tiny interaction.

## 7. Security Anti-patterns

Avoid:

- Trusting API data automatically.
- Rendering user-generated content through `.html()`.
- Mixing templates with raw input.
- Exposing sensitive IDs or tokens in frontend code.
- Assuming hidden inputs are secure.

## Hands-on Lab

Improve a small dashboard script by applying:

1. Safe text rendering.
2. Cached selectors.
3. Event delegation.
4. Accessible toggle panel.
5. Clear loading and error states.

## Mini Project

Create a **Secure Interactive Audit Table** with:

- JSON data rendering.
- Safe escaping.
- Search filter.
- Status badges.
- Keyboard-friendly buttons.
- Empty state.
- Error state.

## Review Questions

1. Why can `.html()` be dangerous?
2. When should `.text()` be preferred?
3. Why is event delegation useful for AJAX-rendered content?
4. What does `aria-expanded` communicate?
5. What should be checked before committing frontend code?

## Key Takeaway

> A professional jQuery developer does not only make UI work. A professional developer makes UI safe, maintainable, performant, and accessible.
