# Contributing Guide

Thank you for your interest in contributing to **MODERN jQUERY 4 & JavaScript for Interactive Web Development**.

This repository is designed as a professional Thai-English learning resource for modern interactive web development using jQuery 4, JavaScript, DOM APIs, AJAX, Fetch API, REST API, and real-world dashboard projects.

## Contribution Principles

Contributions should follow these principles:

1. **Education first** — every contribution should help learners understand concepts clearly.
2. **Modern but practical** — jQuery should be taught together with modern JavaScript equivalents.
3. **Thai inline comments** — code examples should include useful Thai comments for teaching.
4. **Real-world relevance** — examples should be connected to practical web development use cases.
5. **Security-aware** — avoid unsafe DOM injection, insecure AJAX patterns, and poor validation examples.
6. **Readable structure** — keep lessons, examples, labs, and projects easy to navigate.

## Repository Structure

```text
lessons/      Main course lessons
examples/     Focused code examples
labs/         Practice activities and guided exercises
projects/     Mini projects and capstone projects
docs/         Course documentation and roadmap
assets/       Images, diagrams, and reusable media
templates/    Lesson, lab, and project templates
references/   Reference notes and source links
```

## Lesson Contribution Format

Each lesson should include:

```text
1. Learning Objectives
2. Core Concepts
3. Syntax / API / Methods / Properties
4. jQuery Example
5. Modern JavaScript Equivalent
6. Thai Comment-in-Line Explanation
7. Common Mistakes
8. Hands-on Lab
9. Exercise
10. Mini Project
11. Summary
12. References
```

## Code Style

Use readable and beginner-friendly code.

```javascript
// เลือกปุ่มด้วย id="saveButton"
const saveButton = document.querySelector("#saveButton");

// ตรวจสอบว่าพบปุ่มก่อนผูก event
if (saveButton) {
  saveButton.addEventListener("click", () => {
    console.log("Saved");
  });
}
```

For jQuery examples:

```javascript
// รอให้ DOM โหลดเสร็จก่อนเริ่มทำงาน
$(function () {
  // ผูกเหตุการณ์ click ให้กับปุ่ม save
  $("#saveButton").on("click", function () {
    console.log("Saved");
  });
});
```

## Commit Message Guidelines

Use clear commit messages:

```text
Add lesson 01 JavaScript fundamentals
Add jQuery event delegation example
Improve dashboard project documentation
Fix typo in AJAX lab instructions
```

## Pull Request Checklist

Before opening a pull request, make sure:

- [ ] The content is technically accurate.
- [ ] Thai explanations are clear and professional.
- [ ] Code examples run correctly.
- [ ] jQuery examples include modern JavaScript equivalents when useful.
- [ ] Security and accessibility concerns are considered.
- [ ] Markdown formatting is clean.

## Content Quality Standard

This repository aims to be suitable for:

- self-study,
- classroom teaching,
- corporate training,
- GitHub portfolio development,
- real-world dashboard practice.

Please keep contributions professional, practical, and learner-centered.
