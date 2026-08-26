# Security Policy

Security is important in this course because interactive web development often deals with user input, DOM updates, API requests, cookies, sessions, and server-side integration.

This repository teaches jQuery 4 and JavaScript with a security-aware mindset.

## Supported Content Scope

Security guidance in this repository covers:

- safe DOM manipulation,
- input validation basics,
- output escaping concepts,
- AJAX and Fetch request handling,
- avoiding unsafe HTML injection,
- REST API error handling,
- basic client-side and server-side responsibility separation,
- secure teaching examples for PHP / MySQL integration where applicable.

## Important Teaching Rule

Client-side JavaScript and jQuery validation improves user experience, but it is **not enough** for security.

Always validate and authorize again on the server side.

## Common Risks Covered in This Course

### 1. DOM-based XSS

Avoid inserting untrusted data directly into `.html()`.

Prefer `.text()` for plain text output.

```javascript
// Safer for plain text
$("#message").text(userInput);

// Risky if userInput is untrusted HTML
$("#message").html(userInput);
```

### 2. Unsafe AJAX Assumptions

Do not assume that successful client-side validation means the backend is safe.

```javascript
$.ajax({
  url: "/api/employees",
  method: "POST",
  data: formData,
  success: function (response) {
    console.log("Saved", response);
  },
  error: function (xhr) {
    console.error("Request failed", xhr.status);
  }
});
```

### 3. Sensitive Data Exposure

Do not store passwords, API keys, tokens, or confidential data directly in frontend files.

### 4. Insecure Plugin Usage

Before using a jQuery plugin:

- check maintenance status,
- check license,
- review security issues,
- avoid abandoned plugins for production systems,
- prefer native browser APIs when suitable.

## Reporting Security Issues

If you find a security issue in the repository examples or documentation, please open a GitHub issue with:

```text
Title: Security issue in [file/module]
Description: What is the issue?
Location: File path and line/section
Impact: Why does it matter?
Suggested fix: Optional recommendation
```

Do not include real secrets, passwords, tokens, or private data in issue reports.

## Educational Disclaimer

This repository is for educational and professional training purposes. Production systems require additional review, backend validation, authentication, authorization, logging, monitoring, and secure deployment practices.
