# Lesson 03: DOM Selection and Manipulation

> Modern jQuery 4 & JavaScript for Interactive Web Development

## Learning Objectives

หลังจบบทนี้ ผู้เรียนจะสามารถ:

1. อธิบายความหมายของ DOM (Document Object Model) ได้
2. เลือก element บนหน้าเว็บด้วย jQuery และ Modern JavaScript ได้
3. อ่านและแก้ไขข้อความ HTML attribute และ value ของ element ได้
4. เพิ่ม ลบ และแก้ไข element ในหน้าเว็บแบบ dynamic ได้
5. เปรียบเทียบ jQuery DOM API กับ Vanilla JavaScript DOM API ได้

---

## 1. Concept: DOM คืออะไร

DOM คือโครงสร้างข้อมูลที่ Browser สร้างขึ้นจาก HTML Document เพื่อให้ JavaScript สามารถเข้าถึงและเปลี่ยนแปลงหน้าเว็บได้

ตัวอย่าง HTML:

```html
<section id="profile-card" class="card">
  <h2 class="name">Phumin Decoknoi</h2>
  <p class="role">Private Business</p>
</section>
```

Browser จะมอง HTML นี้เป็น tree ของ node เช่น `section`, `h2`, `p` และ attributes เช่น `id`, `class`

---

## 2. jQuery Selection

```javascript
// เลือก element ด้วย id
const profileCard = $("#profile-card");

// เลือก element ด้วย class
const nameText = $(".name");

// เลือก element ด้วย tag
const paragraphs = $("p");
```

### Modern JavaScript Equivalent

```javascript
// เลือก element แรกที่ตรงกับ selector
const profileCard = document.querySelector("#profile-card");

// เลือก element ทั้งหมดที่ตรงกับ selector
const paragraphs = document.querySelectorAll("p");
```

---

## 3. Reading and Writing Text

### jQuery

```javascript
// อ่านข้อความจาก element
const currentName = $(".name").text();

// เปลี่ยนข้อความใน element
$(".name").text("Modern jQuery Learner");
```

### Vanilla JavaScript

```javascript
// อ่านข้อความจาก element
const currentName = document.querySelector(".name").textContent;

// เปลี่ยนข้อความใน element
document.querySelector(".name").textContent = "Modern JavaScript Learner";
```

---

## 4. Reading and Writing HTML

```javascript
// เปลี่ยน HTML ภายใน element
$("#profile-card").html(`
  <h2>Modern jQuery 4</h2>
  <p>Interactive Web Development</p>
`);
```

> ระวัง: `.html()` อาจก่อให้เกิด XSS ได้ หากนำข้อมูลจากผู้ใช้มาใส่โดยไม่ sanitize

---

## 5. Attribute and Property

```javascript
// อ่าน attribute
const imageSource = $("img").attr("src");

// แก้ไข attribute
$("img").attr("alt", "Course preview image");

// อ่าน property เช่น checked
const isChecked = $("#accept-policy").prop("checked");
```

### Key Difference

| Topic | `.attr()` | `.prop()` |
|---|---|---|
| ใช้กับ | HTML attribute | DOM property |
| ตัวอย่าง | `src`, `href`, `alt` | `checked`, `disabled`, `selected` |
| ใช้บ่อยกับ form state | ไม่เหมาะ | เหมาะกว่า |

---

## 6. Creating Elements

```javascript
// สร้าง element ใหม่ด้วย jQuery
const newItem = $("<li></li>").text("Lesson 03: DOM Manipulation");

// เพิ่มเข้าไปใน list
$("#lesson-list").append(newItem);
```

### Vanilla JavaScript

```javascript
// สร้าง li ใหม่
const newItem = document.createElement("li");

// ใส่ข้อความ
newItem.textContent = "Lesson 03: DOM Manipulation";

// เพิ่มเข้าไปใน list
document.querySelector("#lesson-list").append(newItem);
```

---

## 7. Common jQuery DOM Methods

| Method | Purpose | Example |
|---|---|---|
| `.text()` | อ่าน/แก้ไขข้อความ | `$("h1").text("Title")` |
| `.html()` | อ่าน/แก้ไข HTML | `$("main").html("<p>Hi</p>")` |
| `.val()` | อ่าน/แก้ไข value ของ form | `$("input").val()` |
| `.attr()` | อ่าน/แก้ไข attribute | `$("a").attr("href")` |
| `.prop()` | อ่าน/แก้ไข property | `$("input").prop("checked")` |
| `.append()` | เพิ่ม child ท้าย element | `$("ul").append("<li>Item</li>")` |
| `.prepend()` | เพิ่ม child หน้า element | `$("ul").prepend("<li>First</li>")` |
| `.remove()` | ลบ element | `$(".alert").remove()` |
| `.empty()` | ลบ child ทั้งหมด | `$("#box").empty()` |

---

## 8. Hands-on Lab

ให้สร้างหน้า `profile.html` ที่มี:

- ชื่อผู้เรียน
- บทบาท
- ปุ่ม Change Name
- ปุ่ม Add Skill
- รายการ Skill

เมื่อกดปุ่ม:

- Change Name เปลี่ยนชื่อด้วย `.text()`
- Add Skill เพิ่มรายการด้วย `.append()`

---

## 9. Exercise

1. ใช้ jQuery เลือก element ด้วย id, class และ tag อย่างละ 1 ตัวอย่าง
2. เขียน code เปลี่ยนข้อความด้วย `.text()`
3. เขียน code เพิ่มรายการใหม่ใน `<ul>` ด้วย `.append()`
4. เขียน Vanilla JS equivalent ของข้อ 2 และ 3

---

## 10. Mini Project

สร้าง **Interactive Course Card** ที่สามารถ:

- เปลี่ยนชื่อ Course
- เพิ่มรายการ Module
- ลบรายการ Module
- เปลี่ยนสถานะ Course เป็น Active/Inactive

---

## Teaching Notes

บทนี้ควรสอนให้ผู้เรียนเข้าใจว่า jQuery ไม่ได้ทำงานแทน JavaScript แบบลึกลับ แต่เป็น wrapper ที่ทำให้ DOM API เขียนสั้นและอ่านง่ายขึ้น โดยต้องสอนเปรียบเทียบกับ `document.querySelector()` และ `classList` เสมอ
