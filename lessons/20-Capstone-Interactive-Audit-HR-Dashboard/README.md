# Lesson 20 — Capstone: Interactive Audit / HR Dashboard

> Module type: Capstone Project / Integrated Practice

## Learning Objectives

By the end of this capstone, learners will be able to:

1. Build an interactive dashboard using HTML, CSS, JavaScript, and jQuery.
2. Load structured JSON data and render KPI cards, tables, filters, and status badges.
3. Apply event delegation, DOM manipulation, and form interaction patterns.
4. Use safe rendering practices to reduce XSS risk.
5. Compare jQuery and Vanilla JavaScript approaches in a real project.
6. Prepare a GitHub-ready project with readable code and Thai comment-in-line explanations.

## Project Scenario

You are developing a small internal dashboard for an HR / Labour Audit / Compliance team.

The dashboard must show:

- Total audit findings.
- Open findings.
- Closed findings.
- High-risk findings.
- Filter by status.
- Search by keyword.
- Dynamic table rendering.
- Details panel for selected finding.

This project is intentionally practical. It connects DOM manipulation, jQuery selectors, events, forms, JSON, AJAX-style thinking, dashboard UI, and production readiness.

## Required Features

### 1. KPI Cards

The dashboard must calculate and display:

- Total findings.
- Open findings.
- In-progress findings.
- Closed findings.
- High-risk findings.

### 2. Data Table

The table must display:

- Finding ID.
- Area.
- Requirement.
- Risk level.
- Status.
- Owner.
- Due date.
- Action button.

### 3. Search and Filter

Learners must implement:

- Keyword search.
- Status filter.
- Risk filter.
- Reset button.

### 4. Details Panel

When the user clicks `View`, the dashboard should show:

- Finding details.
- Root cause.
- Corrective action.
- Evidence required.

### 5. Security and Accessibility

The project must:

- Avoid unsafe `.html()` with user data.
- Use `.text()` or escaping for dynamic content.
- Provide meaningful button labels.
- Use keyboard-friendly controls.
- Include visible empty state.

## Suggested File Structure

```text
projects/interactive-audit-dashboard/
├── index.html
├── style.css
├── script.js
└── data.json
```

## Data Model

```json
{
  "id": "F-001",
  "area": "Working Hours",
  "requirement": "Daily rest and overtime control",
  "risk": "High",
  "status": "Open",
  "owner": "HR Compliance",
  "dueDate": "2026-09-30",
  "details": "Overtime records require additional review.",
  "rootCause": "Working hour monitoring process is not consistently reviewed.",
  "correctiveAction": "Improve weekly review and approval control.",
  "evidence": "Attendance report, overtime approval, corrective action record"
}
```

## Implementation Steps

1. Create HTML layout.
2. Load sample JSON data.
3. Render KPI cards.
4. Render table rows.
5. Add search and filter events.
6. Add details panel.
7. Add reset behavior.
8. Add safe rendering helper.
9. Add Thai inline comments.
10. Review accessibility and performance.

## Core jQuery Concepts Used

- `$(function () {})`
- `$()` selectors
- `.on()` event handling
- Event delegation
- `.text()`
- `.val()`
- `.empty()`
- `.append()`
- `.filter()`
- `.data()`
- `.addClass()` / `.removeClass()`

## Vanilla JavaScript Concepts Used

- `querySelector`
- `querySelectorAll`
- `addEventListener`
- `textContent`
- `classList`
- `Array.prototype.filter`
- `Array.prototype.map`
- Template functions

## Assessment Rubric

| Criteria | Excellent | Acceptable | Needs Improvement |
|---|---|---|---|
| Functionality | All dashboard functions work | Most functions work | Major functions missing |
| Code Quality | Clear, modular, readable | Mostly readable | Hard to maintain |
| Security | Safe rendering applied | Some safe rendering | Unsafe HTML injection |
| UX | Clear states and controls | Basic usable UI | Confusing UI |
| Accessibility | Keyboard and labels considered | Basic labels | Poor accessibility |
| Documentation | Thai comments and README clear | Some comments | Little explanation |

## Final Deliverables

Learners must submit:

1. Source code.
2. Screenshot of dashboard.
3. Short explanation of jQuery features used.
4. jQuery vs Vanilla JS reflection.
5. Security and accessibility checklist.

## Review Questions

1. Why is this capstone suitable for practicing jQuery?
2. Which parts of the dashboard use event delegation?
3. How can unsafe rendering lead to XSS?
4. What is the difference between filtering data and filtering DOM rows?
5. How would you connect this dashboard to a PHP/MySQL backend?

## Key Takeaway

> The capstone transforms jQuery from isolated syntax into a real interactive web application pattern. This is the bridge from lesson-based learning to professional dashboard development.
