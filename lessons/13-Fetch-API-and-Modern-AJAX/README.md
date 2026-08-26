# Lesson 13 — Fetch API and Modern AJAX

> Module status: Foundation lesson
> Course: MODERN jQUERY 4 & JavaScript for Interactive Web Development

## Learning Objectives

After completing this lesson, learners will be able to:

1. Use the browser-native `fetch()` API.
2. Explain the relationship between AJAX and Fetch API.
3. Use `async` / `await` for clearer asynchronous code.
4. Read JSON responses with `response.json()`.
5. Handle HTTP errors and network errors correctly.
6. Compare `fetch()` with jQuery AJAX.
7. Build a modern data-loading workflow for dashboards.

---

## 1. Modern AJAX with Fetch

The Fetch API is the modern browser-native way to make HTTP requests.

```javascript
fetch('data.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.error(error);
  });
```

Modern syntax with `async` / `await`:

```javascript
async function loadData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

loadData();
```

---

## 2. Key Difference from jQuery AJAX

jQuery AJAX wraps many details for you. Fetch is lower-level and closer to the browser platform.

| Topic | jQuery AJAX | Fetch API |
|---|---|---|
| Library needed | Yes | No |
| JSON parsing | `dataType: 'json'` | `response.json()` |
| HTTP error handling | Often handled in `error` | Must check `response.ok` |
| Promise support | Yes | Native Promise |
| Modern style | Legacy-compatible | Modern standard |

---

## 3. Proper Error Handling

A common mistake is assuming `fetch()` will reject on HTTP 404 or 500. It does not. It rejects mainly on network failure.

Use `response.ok`:

```javascript
async function loadEmployees() {
  try {
    // ส่ง request ไปยังไฟล์หรือ API
    const response = await fetch('employees.json');

    // ตรวจสอบ HTTP status เช่น 404, 500
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // แปลง response body จาก JSON เป็น JavaScript object
    const employees = await response.json();

    // ส่งข้อมูลกลับไปให้ส่วนอื่นใช้งาน
    return employees;
  } catch (error) {
    // จัดการ error ทั้ง network และ HTTP status ที่ throw เอง
    console.error('Load employees failed:', error);
    return [];
  }
}
```

---

## 4. Rendering with Fetch + DOM

```javascript
async function renderEmployees() {
  const list = document.querySelector('#employeeList');

  // แสดงสถานะกำลังโหลดข้อมูล
  list.textContent = 'Loading...';

  const employees = await loadEmployees();

  // ล้างข้อความ Loading
  list.innerHTML = '';

  employees.forEach(function (employee) {
    const item = document.createElement('li');

    // ใช้ textContent เพื่อลดความเสี่ยง XSS
    item.textContent = `${employee.name} — ${employee.department}`;

    list.appendChild(item);
  });
}

renderEmployees();
```

---

## 5. Fetch POST Request

```javascript
async function createEmployee(employee) {
  const response = await fetch('/api/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  });

  if (!response.ok) {
    throw new Error('Unable to create employee');
  }

  return response.json();
}
```

---

## 6. FormData Example

```javascript
const form = document.querySelector('#employeeForm');

form.addEventListener('submit', async function (event) {
  // ป้องกันการ reload หน้า
  event.preventDefault();

  // สร้าง FormData จาก input ทั้งหมดใน form
  const formData = new FormData(form);

  const response = await fetch('/api/employees', {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    alert('Saved');
  }
});
```

---

## 7. Migration Pattern: jQuery AJAX to Fetch

### jQuery

```javascript
$.ajax({
  url: 'data.json',
  method: 'GET',
  dataType: 'json',
  success: function (data) {
    console.log(data);
  },
  error: function () {
    console.error('Request failed');
  }
});
```

### Fetch

```javascript
async function loadData() {
  try {
    const response = await fetch('data.json');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Request failed:', error);
  }
}
```

---

## 8. Common Mistakes

1. Not checking `response.ok`.
2. Calling `response.json()` more than once.
3. Forgetting `await` before `fetch()`.
4. Mixing `then()` and `async/await` without clear reason.
5. Rendering unescaped API data with `innerHTML`.
6. Not showing loading, empty, and error states.

---

## 9. Hands-on Lab

Create a Fetch-powered dashboard:

1. Load JSON data from a local file.
2. Show loading text.
3. Render summary cards.
4. Render table rows.
5. Add error message if JSON cannot load.
6. Add a refresh button.

---

## 10. Mini Project

Build a **Compliance Dashboard Data Loader** using `fetch()`:

- Load findings from JSON.
- Count high-risk items.
- Display cards.
- Render table.
- Add filter by status.

---

## Review Questions

1. What is Fetch API?
2. Why must we check `response.ok`?
3. What is the difference between network error and HTTP error?
4. When should we use `FormData`?
5. How can jQuery AJAX code be migrated to Fetch?

---

## Instructor Notes

This lesson should connect directly to Lesson 12. The recommended teaching flow is:

1. Show jQuery AJAX first.
2. Rewrite the same feature with Fetch.
3. Discuss migration and maintenance decisions.
4. Emphasize that professional developers should understand both patterns.
