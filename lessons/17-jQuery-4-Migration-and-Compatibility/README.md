# Lesson 17 — jQuery 4 Migration and Compatibility

> Module 17 of **MODERN jQUERY 4 & JavaScript for Interactive Web Development**

## Learning Objectives

By the end of this lesson, learners should be able to:

1. Explain why migration planning matters when upgrading jQuery.
2. Identify common compatibility risks in older jQuery code.
3. Use a migration checklist before upgrading a production system.
4. Replace deprecated patterns with safer modern alternatives.
5. Compare jQuery 3-style code with jQuery 4-ready code.
6. Plan testing before and after a library upgrade.

## Why Migration Matters

Many organizations still maintain applications built with older jQuery versions. Upgrading jQuery can improve maintainability and security posture, but it may also break old code that depends on removed or deprecated APIs.

Migration should therefore be treated as a controlled software change, not just a CDN URL update.

## Migration Flow

```text
Inventory current jQuery usage
  ↓
Identify plugins and dependencies
  ↓
Run compatibility checks
  ↓
Replace deprecated patterns
  ↓
Test UI behavior and AJAX flows
  ↓
Deploy gradually
```

## Migration Checklist

| Area | What to Check |
|---|---|
| jQuery version | Current version and target version |
| Plugins | Maintained, compatible, replaceable |
| Deprecated APIs | Old event shortcuts, legacy patterns |
| AJAX behavior | Response format, error handling, headers |
| DOM manipulation | Unsafe HTML insertion and XSS risk |
| Browser support | Required browsers for the organization |
| Test coverage | Forms, filters, modals, tables, dashboard widgets |

## Common Legacy Patterns

### Pattern 1: Event shortcuts

Older style:

```javascript
// รูปแบบเก่าที่ควรหลีกเลี่ยงในหลักสูตรใหม่
$('#saveButton').click(function () {
    saveData();
});
```

Recommended style:

```javascript
// ใช้ .on() เพื่อให้ชัดเจนและเหมาะกับ event delegation
$('#saveButton').on('click', function () {
    saveData();
});
```

### Pattern 2: Direct HTML insertion

Risky style:

```javascript
// เสี่ยง XSS หาก userName มาจากผู้ใช้โดยตรง
$('#profile').html(userName);
```

Safer style:

```javascript
// ใช้ .text() เมื่อต้องการแสดงข้อความธรรมดา
$('#profile').text(userName);
```

### Pattern 3: Missing AJAX error handling

Weak style:

```javascript
$.getJSON('/api/items.php', function (items) {
    renderItems(items);
});
```

Better style:

```javascript
$.getJSON('/api/items.php')
    .done(function (items) {
        renderItems(items);
    })
    .fail(function () {
        showError('Cannot load items.');
    });
```

## jQuery 4-Ready Coding Principles

1. Prefer `.on()` for event binding.
2. Use event delegation for dynamic content.
3. Keep AJAX success and error handling explicit.
4. Use `.text()` for plain text output.
5. Avoid depending on abandoned plugins.
6. Keep UI logic separate from data logic.
7. Document migration decisions.

## Vanilla JavaScript Mapping

```javascript
// jQuery
$('#saveButton').on('click', saveData);

// Modern JavaScript
document.querySelector('#saveButton').addEventListener('click', saveData);
```

```javascript
// jQuery
$('#profile').text(userName);

// Modern JavaScript
document.querySelector('#profile').textContent = userName;
```

## Migration Testing Matrix

| Feature | Test Case |
|---|---|
| Forms | Required fields, invalid email, submit behavior |
| Tables | Search, filter, sort, pagination |
| Modals | Open, close, keyboard behavior |
| AJAX | Success, failure, empty data, malformed data |
| Plugins | Initialization, options, events |
| Accessibility | Keyboard navigation and visible focus |

## Lab

Take an old jQuery snippet and refactor it into jQuery 4-ready style.

Required refactoring:

- Replace event shortcuts with `.on()`.
- Replace unsafe `.html()` with `.text()` where appropriate.
- Add `.fail()` handling to AJAX calls.
- Document the migration risk.

## Exercise

1. Audit a legacy HTML page and list all jQuery usage.
2. Identify at least five migration risks.
3. Rewrite old event handlers.
4. Create a migration report in Markdown.

## Mini Project

Create a **jQuery Migration Audit Report** for a simulated HR dashboard.

The report should include:

- Current jQuery usage
- Plugins used
- Deprecated patterns
- Security risks
- Refactoring recommendations
- Testing checklist

## Teaching Notes

This lesson links programming with software governance. Learners should understand that version upgrades affect security, compatibility, documentation, testing, and maintainability.

## Summary

jQuery 4 migration should be performed systematically. Good migration practice combines code refactoring, plugin review, security checks, UI testing, and documentation.
