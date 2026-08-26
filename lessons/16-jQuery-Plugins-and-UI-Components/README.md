# Lesson 16 — jQuery Plugins and UI Components

> Module 16 of **MODERN jQUERY 4 & JavaScript for Interactive Web Development**

## Learning Objectives

By the end of this lesson, learners should be able to:

1. Explain what a jQuery plugin is.
2. Use third-party plugins safely and professionally.
3. Evaluate whether a plugin is still maintained.
4. Build reusable UI components with jQuery.
5. Understand basic plugin architecture.
6. Avoid common plugin dependency and compatibility problems.

## What Is a jQuery Plugin?

A jQuery plugin is reusable code that extends jQuery functionality. It normally attaches a new method to `$.fn`, allowing developers to call it on selected elements.

```javascript
// ตัวอย่าง plugin แบบพื้นฐาน
$.fn.highlightBox = function () {
    // this หมายถึง jQuery collection ที่เรียกใช้ plugin
    return this.each(function () {
        // แปลง DOM element แต่ละตัวให้เป็น jQuery object
        const $element = $(this);

        // เพิ่ม class สำหรับตกแต่ง UI
        $element.addClass('highlight-box');
    });
};

// เรียกใช้งาน plugin
$('.card').highlightBox();
```

## When Should You Use a Plugin?

Use a plugin when it saves time, is maintained, and solves a clear UI problem.

Examples:

- Data tables
- Date pickers
- Select boxes
- Modal dialogs
- Carousels
- Charts
- Notifications
- Drag and drop

## Plugin Evaluation Checklist

| Question | Why It Matters |
|---|---|
| Is it actively maintained? | Reduces security and compatibility risk |
| Does it support modern jQuery? | Avoids migration problems |
| Is it accessible? | Improves usability for all users |
| Is it lightweight? | Reduces page load cost |
| Does it have documentation? | Makes teaching and maintenance easier |
| Is the license clear? | Avoids legal uncertainty |

## Recommended Plugin Usage Pattern

```html
<!-- 1. Load jQuery first -->
<script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>

<!-- 2. Load plugin after jQuery -->
<script src="plugin.js"></script>

<!-- 3. Load application code last -->
<script src="app.js"></script>
```

## Basic UI Component Pattern

```javascript
function createStatusBadge(status) {
    // กำหนด class ตามสถานะของข้อมูล
    const className = status === 'Active' ? 'badge-success' : 'badge-muted';

    // คืนค่า HTML สำหรับแสดงผล badge
    return `<span class="badge ${className}">${status}</span>`;
}
```

## jQuery Component Example

```javascript
function renderCards(items) {
    // เลือก container สำหรับใส่ card
    const $container = $('#cardGrid');

    // ล้างข้อมูลเดิมก่อน render ใหม่
    $container.empty();

    // วนลูปข้อมูลและสร้าง card
    $.each(items, function (_, item) {
        const card = `
            <article class="card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                ${createStatusBadge(item.status)}
            </article>
        `;

        // เพิ่ม card เข้าไปในหน้าเว็บ
        $container.append(card);
    });
}
```

## Plugin Anti-Patterns

Avoid these mistakes:

1. Loading many plugins without a clear reason.
2. Using abandoned plugins in production systems.
3. Mixing multiple UI frameworks without design control.
4. Ignoring accessibility.
5. Editing plugin source code directly instead of wrapping or configuring it.
6. Depending on plugins for simple tasks that modern JavaScript can handle easily.

## Modern JavaScript Equivalent

```javascript
function renderCards(items) {
    const container = document.querySelector('#cardGrid');
    container.innerHTML = '';

    items.forEach((item) => {
        const article = document.createElement('article');
        article.className = 'card';
        article.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            ${createStatusBadge(item.status)}
        `;
        container.appendChild(article);
    });
}
```

## Lab

Create reusable UI components:

- KPI card
- Status badge
- Modal panel
- Filter toolbar
- Notification message

## Exercise

1. Build a simple `$.fn.highlightBox()` plugin.
2. Add options such as color, label, and active state.
3. Create a dashboard card component.
4. Compare plugin-style design with plain JavaScript modules.

## Mini Project

Create an **Audit UI Component Library** with:

- Finding status badge
- Risk level label
- Evidence card
- Action button group
- Toast notification

## Teaching Notes

This lesson is a good place to explain software reuse. Learners should understand that plugins are not magic; they are reusable functions attached to jQuery objects.

## Summary

jQuery plugins can still be valuable for real-world applications, especially when maintaining existing systems. However, every plugin should be evaluated for maintenance, security, compatibility, accessibility, and license clarity.
