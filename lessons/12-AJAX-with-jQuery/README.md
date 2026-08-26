# Lesson 12 — AJAX with jQuery

> Module status: Foundation lesson
> Course: MODERN jQUERY 4 & JavaScript for Interactive Web Development

## Learning Objectives

After completing this lesson, learners will be able to:

1. Explain what AJAX means in real web applications.
2. Use `$.ajax()` to request data without reloading the page.
3. Use `$.get()` and `$.post()` for simple HTTP requests.
4. Handle success, failure, and completion states.
5. Render JSON data into HTML with jQuery.
6. Compare jQuery AJAX with modern `fetch()`.
7. Apply AJAX to dashboard, search, form submission, and CRUD workflows.

---

## 1. What is AJAX?

AJAX stands for **Asynchronous JavaScript and XML**. In modern practice, AJAX usually means:

> Sending or receiving data from a server after the page has already loaded, without refreshing the whole page.

Although the original name includes XML, most modern applications use **JSON** instead.

Common real-world use cases:

- Live search
- Loading dashboard cards
- Submitting a form in the background
- Fetching table data
- Updating status without page reload
- Loading notifications
- CRUD operations

---

## 2. Why jQuery AJAX Still Matters

Modern JavaScript has `fetch()`, but jQuery AJAX is still useful when maintaining existing systems or teaching legacy-to-modern migration.

Many real-world PHP, Laravel, WordPress, CMS, admin dashboard, and older enterprise web systems still contain code such as:

```javascript
$.ajax({
  url: '/api/employees',
  method: 'GET',
  dataType: 'json',
  success: function (data) {
    console.log(data);
  }
});
```

A professional developer should understand both:

- how to maintain jQuery AJAX safely; and
- how to migrate it to `fetch()` when appropriate.

---

## 3. Core jQuery AJAX Methods

| Method | Purpose | Typical Use |
|---|---|---|
| `$.ajax()` | Full AJAX configuration | Production-grade request handling |
| `$.get()` | Shortcut for GET request | Load read-only data |
| `$.post()` | Shortcut for POST request | Submit form data |
| `.load()` | Load HTML into an element | Simple partial HTML replacement |

---

## 4. Basic GET Request

```javascript
// โหลดข้อมูลจาก API ด้วย jQuery AJAX
$.ajax({
  url: 'data.json',          // ตำแหน่งไฟล์หรือ API endpoint
  method: 'GET',             // ใช้ GET เพื่ออ่านข้อมูล
  dataType: 'json',          // บอก jQuery ว่าคาดหวังข้อมูลแบบ JSON
  success: function (data) { // ทำงานเมื่อ request สำเร็จ
    console.log(data);       // แสดงข้อมูลที่ได้รับใน Console
  },
  error: function (xhr, status, error) { // ทำงานเมื่อ request ล้มเหลว
    console.error(error);                // แสดง error เพื่อช่วย debug
  }
});
```

---

## 5. Rendering JSON Data to HTML

```javascript
$.ajax({
  url: 'employees.json',
  method: 'GET',
  dataType: 'json',
  success: function (employees) {
    // ล้างข้อมูลเดิมก่อน render ใหม่
    $('#employeeList').empty();

    // วนลูปข้อมูลพนักงานทีละรายการ
    $.each(employees, function (index, employee) {
      // สร้าง HTML จากข้อมูล JSON
      const item = `
        <li>
          <strong>${employee.name}</strong>
          <span>${employee.department}</span>
        </li>
      `;

      // เพิ่มรายการเข้าไปใน DOM
      $('#employeeList').append(item);
    });
  }
});
```

> Security note: When rendering user-generated data, prefer `.text()` or escaping output to reduce XSS risk.

---

## 6. POST Request Example

```javascript
$('#employeeForm').on('submit', function (event) {
  // ป้องกันไม่ให้ browser submit form แบบ reload หน้า
  event.preventDefault();

  // รวมข้อมูลใน form ให้อยู่ในรูปแบบ query string
  const formData = $(this).serialize();

  $.ajax({
    url: '/api/employees',
    method: 'POST',
    data: formData,
    success: function (response) {
      alert('Saved successfully');
    },
    error: function () {
      alert('Unable to save data');
    }
  });
});
```

---

## 7. jQuery AJAX vs Fetch Mapping

| jQuery AJAX | Modern JavaScript |
|---|---|
| `$.ajax({ url, method })` | `fetch(url, { method })` |
| `success: function(data)` | `.then(response => response.json())` |
| `error: function(xhr)` | `.catch(error => {})` |
| `dataType: 'json'` | `response.json()` |
| `$(form).serialize()` | `new FormData(form)` |

---

## 8. Common Mistakes

1. Forgetting `event.preventDefault()` on forms.
2. Rendering untrusted HTML directly into `.html()`.
3. Assuming every response is valid JSON.
4. Not handling network errors.
5. Hardcoding API URLs in many files.
6. Mixing too much business logic into event handlers.
7. Ignoring loading and empty states.

---

## 9. Hands-on Lab

Create a simple employee list loader:

1. Create `employees.json`.
2. Use `$.ajax()` to load the file.
3. Render employee cards into the page.
4. Add loading state before request.
5. Add error state if request fails.
6. Add department filter.

---

## 10. Mini Project

Build a small **Audit Finding Loader**:

- Load finding records from JSON.
- Render finding cards.
- Filter by severity.
- Show total count.
- Add error handling.

---

## Review Questions

1. What problem does AJAX solve?
2. What is the difference between `$.ajax()`, `$.get()`, and `$.post()`?
3. Why should untrusted data not be inserted with `.html()`?
4. How does jQuery AJAX compare with `fetch()`?
5. What is a loading state and why does it matter?

---

## Instructor Notes

This lesson should be taught by demonstrating the same feature twice:

1. jQuery AJAX version
2. Modern `fetch()` version

The goal is not to claim jQuery is always better, but to help learners understand existing code and modern alternatives professionally.
