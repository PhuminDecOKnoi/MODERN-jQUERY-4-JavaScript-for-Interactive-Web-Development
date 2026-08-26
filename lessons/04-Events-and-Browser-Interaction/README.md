# Lesson 04: Events and Browser Interaction

> Modern jQuery 4 & JavaScript for Interactive Web Development

## Learning Objectives

หลังจบบทนี้ ผู้เรียนจะสามารถ:

1. อธิบาย event-driven programming บน Browser ได้
2. ใช้ `.on()` เพื่อจัดการ click, input, submit และ keyboard events ได้
3. ใช้ `event.preventDefault()` ได้อย่างถูกต้อง
4. เข้าใจ `this`, `event.target` และ event object
5. เขียน event delegation สำหรับ dynamic elements ได้

---

## 1. Concept: Event คืออะไร

Event คือเหตุการณ์ที่เกิดขึ้นใน Browser เช่น

- ผู้ใช้คลิกปุ่ม
- ผู้ใช้พิมพ์ใน input
- ผู้ใช้ submit form
- หน้าเว็บโหลดเสร็จ
- mouse เคลื่อนที่ผ่าน element

JavaScript และ jQuery ใช้ event เพื่อทำให้หน้าเว็บตอบสนองต่อการกระทำของผู้ใช้

---

## 2. Basic Click Event

```javascript
// รอให้ DOM พร้อมก่อนเริ่มผูก event
$(function () {

  // เมื่อผู้ใช้คลิกปุ่ม id="saveButton"
  $("#saveButton").on("click", function () {

    // แสดงข้อความใน Console
    console.log("Save button clicked");

  });

});
```

### Vanilla JavaScript Equivalent

```javascript
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#saveButton").addEventListener("click", () => {
    console.log("Save button clicked");
  });
});
```

---

## 3. Event Object

```javascript
$("#saveButton").on("click", function (event) {

  // event.type แสดงชนิดของ event เช่น click
  console.log(event.type);

  // event.target คือ element จริงที่ถูกกระทำ
  console.log(event.target);

});
```

---

## 4. Form Submit Event

```javascript
$("#profileForm").on("submit", function (event) {

  // ป้องกัน browser reload หน้าเว็บหลัง submit form
  event.preventDefault();

  // อ่านค่าจาก input
  const employeeName = $("#employeeName").val();

  // ตรวจสอบค่าว่าง
  if (employeeName.trim() === "") {
    $("#message").text("Please enter employee name.");
    return;
  }

  // แสดงผลลัพธ์
  $("#message").text(`Saved: ${employeeName}`);

});
```

---

## 5. Input Event

```javascript
$("#searchBox").on("input", function () {

  // $(this) หมายถึง input ที่กำลังเกิด event
  const keyword = $(this).val().toLowerCase();

  // แสดง keyword ที่ผู้ใช้พิมพ์
  console.log(keyword);

});
```

---

## 6. Keyboard Event

```javascript
$("#searchBox").on("keydown", function (event) {

  // ตรวจว่า key ที่กดคือ Enter หรือไม่
  if (event.key === "Enter") {
    console.log("Search submitted by Enter key");
  }

});
```

---

## 7. Event Delegation

Event delegation คือการผูก event กับ parent element เพื่อให้จัดการ child element ที่ถูกสร้างภายหลังได้

```javascript
// ผูก event กับ parent list
$("#taskList").on("click", ".delete-task", function () {

  // ลบ li ที่ปุ่ม delete อยู่ภายใน
  $(this).closest("li").remove();

});
```

### ทำไม Event Delegation สำคัญ

ถ้า element ถูกสร้างภายหลังด้วย JavaScript การผูก event ตรงกับ element นั้นตั้งแต่แรกอาจไม่ทำงาน Event delegation จึงเป็น pattern สำคัญมากในงาน dynamic UI

---

## 8. Common jQuery Event Methods

| Event | Use Case |
|---|---|
| `click` | ปุ่ม เมนู card action |
| `dblclick` | double-click interaction |
| `input` | search, live validation |
| `change` | select, checkbox, radio |
| `submit` | form submission |
| `keydown` | shortcut, Enter key |
| `mouseenter` | hover interaction |
| `mouseleave` | hover exit |
| `focus` | input focus |
| `blur` | input lost focus |

---

## 9. Common Mistakes

1. ลืมใช้ `event.preventDefault()` กับ form
2. ใช้ `.click()` shorthand แทน `.on("click")` ใน code ใหม่
3. ผูก event กับ dynamic element โดยตรงแทน event delegation
4. สับสนระหว่าง `this` กับ `event.target`
5. ใส่ logic ยาวเกินไปใน event handler ทำให้ code อ่านยาก

---

## 10. Hands-on Lab

สร้างหน้า `events-lab.html` ที่มี:

- Form เพิ่ม task
- Input ชื่อ task
- ปุ่ม Add Task
- รายการ task
- ปุ่ม Delete ในแต่ละ task

ข้อกำหนด:

- ใช้ submit event
- ใช้ `preventDefault()`
- ใช้ event delegation สำหรับปุ่ม Delete
- ใช้ `.closest()` เพื่อลบ task

---

## 11. Exercise

1. สร้าง click event ด้วย `.on()`
2. สร้าง submit event และป้องกัน page reload
3. ใช้ `input` event เพื่อแสดงข้อความแบบ live preview
4. ใช้ event delegation กับรายการที่เพิ่มใหม่
5. เขียน Vanilla JavaScript equivalent ของ click event

---

## 12. Mini Project

สร้าง **Interactive To-do List** โดยใช้ jQuery events ครบถ้วน:

- Add task
- Delete task
- Mark done
- Filter completed / pending
- Show total count

---

## Teaching Notes

บทนี้เป็นจุดเปลี่ยนจากเว็บ static ไปสู่เว็บ interactive ผู้สอนควรเน้นว่า jQuery event system ช่วยลดความซับซ้อนของ browser interaction แต่ผู้เรียนต้องเข้าใจ event object และ event delegation อย่างแท้จริง
