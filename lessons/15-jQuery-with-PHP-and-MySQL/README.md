# Lesson 15 — jQuery with PHP and MySQL

> Module 15 of **MODERN jQUERY 4 & JavaScript for Interactive Web Development**

## Learning Objectives

By the end of this lesson, learners should be able to:

1. Explain the role of jQuery in a PHP/MySQL web application.
2. Design a request-response flow between browser, jQuery, PHP, and MySQL.
3. Send form data using AJAX instead of a full page reload.
4. Render database-like records dynamically in the browser.
5. Understand where client-side validation ends and server-side validation begins.
6. Distinguish between UI mockups, API endpoints, and real database persistence.

## Big Picture

jQuery is especially useful in legacy and practical PHP/MySQL projects because many production systems still use server-rendered pages with interactive JavaScript added on top.

A typical flow looks like this:

```text
Browser UI
  ↓ user input
jQuery Event Handler
  ↓ AJAX request
PHP Endpoint
  ↓ SQL query
MySQL Database
  ↓ JSON response
jQuery DOM Rendering
```

## Recommended Architecture

```text
project/
├── public/
│   ├── index.html
│   ├── assets/css/style.css
│   └── assets/js/app.js
├── api/
│   ├── employees-list.php
│   ├── employees-create.php
│   ├── employees-update.php
│   └── employees-delete.php
└── config/
    └── database.php
```

## Core Concepts

### 1. PHP should return JSON

Modern interactive pages should not mix large HTML fragments with data logic when avoidable. PHP endpoints should usually return JSON.

```php
<?php
header('Content-Type: application/json; charset=utf-8');

echo json_encode([
    'success' => true,
    'message' => 'Data loaded successfully',
    'data' => []
]);
```

### 2. jQuery should manage UI behavior

```javascript
// โหลดข้อมูลจาก server ด้วย jQuery AJAX
$.getJSON('/api/employees-list.php', function (response) {
    // ตรวจสอบสถานะที่ server ส่งกลับมา
    if (response.success) {
        // ส่งข้อมูลไป render เป็นตาราง
        renderEmployees(response.data);
    }
});
```

### 3. MySQL operations must stay on the server

Never expose database credentials or SQL logic to client-side JavaScript.

## jQuery AJAX CRUD Pattern

### Read

```javascript
function loadEmployees() {
    // เรียกข้อมูลพนักงานจาก PHP endpoint
    $.getJSON('/api/employees-list.php')
        .done(function (response) {
            // ถ้าดึงข้อมูลสำเร็จ ให้ render ตาราง
            renderEmployees(response.data);
        })
        .fail(function () {
            // แจ้งเตือนเมื่อ API มีปัญหา
            alert('Cannot load employee data.');
        });
}
```

### Create

```javascript
$('#employeeForm').on('submit', function (event) {
    // ป้องกันไม่ให้ browser reload หน้า
    event.preventDefault();

    // แปลงข้อมูล form เป็นรูปแบบ key=value
    const payload = $(this).serialize();

    // ส่งข้อมูลไปสร้าง record ใหม่
    $.post('/api/employees-create.php', payload)
        .done(function (response) {
            // โหลดตารางใหม่หลังเพิ่มข้อมูลสำเร็จ
            loadEmployees();
        });
});
```

### Update

```javascript
function updateEmployee(id, payload) {
    return $.ajax({
        url: '/api/employees-update.php',
        method: 'POST',
        data: {
            id: id,
            ...payload
        }
    });
}
```

### Delete

```javascript
function deleteEmployee(id) {
    return $.post('/api/employees-delete.php', { id: id });
}
```

## Modern JavaScript Equivalent

```javascript
async function loadEmployees() {
    const response = await fetch('/api/employees-list.php');
    const json = await response.json();
    renderEmployees(json.data);
}
```

## Important Security Notes

| Risk | Correct Practice |
|---|---|
| SQL Injection | Use prepared statements in PHP |
| XSS | Escape output before inserting into HTML |
| CSRF | Add CSRF token for state-changing requests |
| Weak validation | Validate both client-side and server-side |
| Exposed secrets | Keep DB credentials outside public JS |

## Lab

Build a mock employee CRUD page that simulates PHP/MySQL behavior using a local JSON-like array.

Required features:

- Add employee
- Edit employee status
- Delete employee
- Filter by department
- Render KPI cards

## Exercise

1. Create a `loadEmployees()` function.
2. Create a `renderEmployees()` function.
3. Add form validation before creating a new employee.
4. Convert the jQuery AJAX example to `fetch()`.

## Mini Project

Create an **HR Employee Register Mockup** with:

- Employee ID
- Full name
- Department
- Position
- Employment status
- Last updated date

## Teaching Notes

This lesson should emphasize that jQuery is not the database layer. It is a client-side interaction layer that communicates with a backend such as PHP.

## Summary

jQuery remains useful in PHP/MySQL systems because it can progressively enhance existing pages, handle AJAX, validate forms, and update the DOM without requiring a complete frontend framework.
