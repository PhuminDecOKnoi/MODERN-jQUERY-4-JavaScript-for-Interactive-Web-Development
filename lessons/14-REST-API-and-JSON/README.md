# Lesson 14 — REST API and JSON

> Module status: Foundation lesson
> Course: MODERN jQUERY 4 & JavaScript for Interactive Web Development

## Learning Objectives

After completing this lesson, learners will be able to:

1. Explain the role of REST API in web applications.
2. Understand common HTTP methods: GET, POST, PUT, PATCH, DELETE.
3. Read and structure JSON data.
4. Connect jQuery AJAX and Fetch API to REST-style endpoints.
5. Design simple API response formats for dashboards.
6. Handle loading, empty, success, and error states.
7. Apply REST API concepts to CRUD and dashboard projects.

---

## 1. What is REST API?

REST API is a common architectural style for allowing front-end applications to communicate with servers.

A front-end page may request data from endpoints such as:

```text
GET /api/employees
GET /api/employees/1
POST /api/employees
PATCH /api/employees/1
DELETE /api/employees/1
```

The server normally returns structured data, often in JSON format.

---

## 2. Common HTTP Methods

| Method | Purpose | Example |
|---|---|---|
| GET | Read data | Load employee list |
| POST | Create new data | Add new employee |
| PUT | Replace full resource | Replace employee record |
| PATCH | Update partial data | Change employee status |
| DELETE | Remove data | Delete employee record |

---

## 3. JSON Basics

JSON stands for **JavaScript Object Notation**.

Example:

```json
{
  "id": 1,
  "name": "Somchai",
  "department": "HR",
  "status": "active"
}
```

Array of objects:

```json
[
  {
    "id": 1,
    "name": "Somchai",
    "department": "HR"
  },
  {
    "id": 2,
    "name": "Suda",
    "department": "Audit"
  }
]
```

---

## 4. Recommended API Response Shape

For dashboards and admin systems, a predictable response shape is easier to maintain.

```json
{
  "success": true,
  "message": "Data loaded successfully",
  "data": [
    {
      "id": 1,
      "title": "Missing training evidence",
      "severity": "high",
      "status": "open"
    }
  ]
}
```

Recommended fields:

| Field | Meaning |
|---|---|
| `success` | Whether the request succeeded |
| `message` | Human-readable message |
| `data` | Main payload |
| `meta` | Pagination or summary information |
| `errors` | Validation or processing errors |

---

## 5. Loading REST Data with jQuery AJAX

```javascript
$.ajax({
  url: '/api/findings',
  method: 'GET',
  dataType: 'json',
  success: function (response) {
    // ตรวจสอบว่า API แจ้งว่าสำเร็จหรือไม่
    if (!response.success) {
      alert(response.message);
      return;
    }

    // ส่งข้อมูลหลักไป render ต่อ
    renderFindings(response.data);
  },
  error: function () {
    alert('Cannot connect to API');
  }
});
```

---

## 6. Loading REST Data with Fetch

```javascript
async function loadFindings() {
  try {
    const response = await fetch('/api/findings');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    renderFindings(result.data);
  } catch (error) {
    console.error(error);
  }
}
```

---

## 7. Rendering API Data Safely

Prefer creating elements and using `.text()` or `textContent` for untrusted data.

### jQuery

```javascript
function renderFindings(findings) {
  const $tableBody = $('#findingTableBody');

  // ล้างแถวเดิมก่อน render ใหม่
  $tableBody.empty();

  $.each(findings, function (index, finding) {
    const $row = $('<tr></tr>');

    // ใช้ .text() เพื่อลดความเสี่ยง XSS
    $('<td></td>').text(finding.id).appendTo($row);
    $('<td></td>').text(finding.title).appendTo($row);
    $('<td></td>').text(finding.severity).appendTo($row);
    $('<td></td>').text(finding.status).appendTo($row);

    $tableBody.append($row);
  });
}
```

### Vanilla JavaScript

```javascript
function renderFindings(findings) {
  const tableBody = document.querySelector('#findingTableBody');
  tableBody.innerHTML = '';

  findings.forEach(function (finding) {
    const row = document.createElement('tr');

    ['id', 'title', 'severity', 'status'].forEach(function (key) {
      const cell = document.createElement('td');
      cell.textContent = finding[key];
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
}
```

---

## 8. Common REST API Mistakes

1. Using POST for every action.
2. Returning inconsistent response structures.
3. Returning HTML when JSON is expected.
4. Not separating API data from UI rendering logic.
5. Not handling empty results.
6. Not validating server-side input.
7. Rendering API data as raw HTML.

---

## 9. Hands-on Lab

Design a simple REST-style JSON file for audit findings:

1. Add `success`, `message`, `data`, and `meta`.
2. Store at least 5 finding records.
3. Load the JSON with jQuery AJAX.
4. Render KPI cards.
5. Render a table.
6. Filter by severity.
7. Rewrite the loading function with Fetch.

---

## 10. Mini Project

Build a **REST API Dashboard Mockup**:

- API response file: `data.json`
- Dashboard cards
- Status filter
- Severity filter
- Dynamic table
- Empty state
- Error state

---

## Review Questions

1. What is REST API?
2. What is the role of JSON?
3. What is the difference between GET and POST?
4. Why should API responses use consistent structure?
5. How can front-end rendering reduce XSS risk?

---

## Instructor Notes

This lesson prepares learners for real projects in later modules. It should be connected to:

- CRUD applications
- Dashboards
- PHP/MySQL backends
- Node.js APIs
- Audit and HR data systems

The recommended teaching emphasis is API thinking, not only syntax.
