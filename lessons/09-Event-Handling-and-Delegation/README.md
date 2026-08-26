# Lesson 09 — Event Handling and Delegation

> Modern jQuery 4 & JavaScript for Interactive Web Development  
> Module 09: การจัดการเหตุการณ์และ Event Delegation

---

## 1. Learning Objectives

หลังเรียนบทนี้ ผู้เรียนจะสามารถ:

1. อธิบายความหมายของ Event ใน Browser ได้
2. ใช้ `.on()` เพื่อผูก Event กับ Element ได้อย่างถูกต้อง
3. ใช้ `event.preventDefault()` เพื่อควบคุมพฤติกรรมเริ่มต้นของ Browser ได้
4. ใช้ `event.target` และ `this` เพื่อระบุ Element ที่เกิดเหตุการณ์ได้
5. อธิบายหลักการ Event Delegation ได้
6. ใช้ Delegation กับรายการที่ถูกเพิ่มแบบ Dynamic ได้
7. เปรียบเทียบ jQuery Event กับ Vanilla JavaScript `addEventListener()` ได้

---

## 2. Core Concepts

Event คือเหตุการณ์ที่เกิดขึ้นในหน้าเว็บ เช่น ผู้ใช้คลิกปุ่ม กรอกข้อความ ส่งฟอร์ม เลื่อนเมาส์ หรือกดแป้นพิมพ์

ใน jQuery การจัดการ Event แบบมาตรฐานควรใช้ `.on()` เป็นหลัก เพราะรองรับทั้ง direct binding และ delegated binding

```js
$("#saveButton").on("click", function () {
  console.log("Button clicked");
});
```

---

## 3. Important Event Methods

| Method | Purpose |
|---|---|
| `.on()` | ผูก Event Handler |
| `.off()` | ยกเลิก Event Handler |
| `.trigger()` | สั่งให้ Event ทำงานด้วยโค้ด |
| `.one()` | ผูก Event ให้ทำงานครั้งเดียว |
| `event.preventDefault()` | ยกเลิกพฤติกรรมเริ่มต้น |
| `event.stopPropagation()` | หยุด Event Bubbling |

---

## 4. Basic jQuery Event Example

```js
// รอให้ DOM โหลดครบก่อนเริ่มทำงาน
$(function () {

  // ผูก click event เข้ากับปุ่มที่มี id="saveButton"
  $("#saveButton").on("click", function () {

    // แสดงข้อความใน Console เมื่อผู้ใช้คลิกปุ่ม
    console.log("ผู้ใช้คลิกปุ่ม Save แล้ว");

  });

});
```

---

## 5. Event Object

jQuery ส่ง Event Object เข้ามาใน Callback Function เพื่อให้เราอ่านข้อมูลของเหตุการณ์ได้

```js
$("#searchInput").on("keyup", function (event) {
  console.log("Key code:", event.key);
  console.log("Target:", event.target);
});
```

---

## 6. Event Delegation

Event Delegation คือการผูก Event ไว้กับ Parent Element แล้วให้ Parent ตรวจจับ Event ที่เกิดกับ Child Element

เหมาะมากกับ Element ที่ถูกเพิ่มเข้ามาภายหลัง เช่น รายการ Todo, ตารางข้อมูล, Notification หรือ Dynamic Form

```js
// ผูก Event ไว้ที่ Parent
$("#todoList").on("click", ".delete-btn", function () {

  // this หมายถึงปุ่ม .delete-btn ที่ถูกคลิกจริง
  $(this).closest("li").remove();

});
```

---

## 7. Vanilla JavaScript Equivalent

```js
// เลือก Parent Element
const todoList = document.querySelector("#todoList");

// ใช้ addEventListener เพื่อฟัง click event ที่ Parent
todoList.addEventListener("click", function (event) {

  // ตรวจว่า element ที่ถูกคลิกมี class delete-btn หรือไม่
  if (event.target.matches(".delete-btn")) {

    // หา li ที่ใกล้ที่สุด แล้วลบออกจาก DOM
    event.target.closest("li").remove();

  }

});
```

---

## 8. Common Mistakes

| Mistake | Why It Is a Problem | Better Approach |
|---|---|---|
| ใช้ `.click()` แทน `.on()` | ยืดหยุ่นน้อยกว่า | ใช้ `.on("click", handler)` |
| ผูก Event กับทุก item ทีละตัว | ทำให้โค้ดซ้ำและจัดการยาก | ใช้ Event Delegation |
| ไม่ใช้ `preventDefault()` ใน form/link | Browser อาจเปลี่ยนหน้าโดยไม่ตั้งใจ | ใช้ `event.preventDefault()` |
| ใช้ `this` โดยไม่เข้า context | อาจอ้างถึง element ผิด | ตรวจด้วย `console.log(this)` |

---

## 9. Hands-on Lab

สร้าง Todo List ขนาดเล็กที่สามารถ:

1. เพิ่มรายการใหม่
2. ลบรายการด้วยปุ่ม Delete
3. ใช้ Event Delegation กับปุ่มที่สร้างขึ้นภายหลัง
4. แสดงจำนวนรายการทั้งหมด

---

## 10. Review Questions

1. `.on()` แตกต่างจาก `.click()` อย่างไร?
2. Event Delegation เหมาะกับสถานการณ์ใด?
3. `event.preventDefault()` ใช้เพื่ออะไร?
4. `event.target` แตกต่างจาก `this` อย่างไร?
5. เพราะเหตุใด Dynamic Element จึงควรใช้ Delegated Event?

---

## 11. Key Takeaway

> Event Handling คือหัวใจของ Interactive Web Development ส่วน Event Delegation คือเทคนิคสำคัญที่ทำให้ jQuery เหมาะกับหน้าเว็บที่มี Dynamic Content และ Real-world Dashboard
