# Lesson 11 — Forms and Validation

> Modern jQuery 4 & JavaScript for Interactive Web Development  
> Module 11: Form Handling, Validation และ UX สำหรับข้อมูลผู้ใช้

---

## 1. Learning Objectives

หลังเรียนบทนี้ ผู้เรียนจะสามารถ:

1. อ่านค่าจาก input, select, textarea ด้วย `.val()` ได้
2. ตรวจสอบข้อมูลก่อนส่งฟอร์มได้
3. ใช้ `event.preventDefault()` เพื่อควบคุมการ submit ได้
4. แสดง error message ที่อ่านง่ายและเหมาะสมกับผู้ใช้ได้
5. ใช้ `.addClass()` / `.removeClass()` เพื่อแสดงสถานะ valid/invalid ได้
6. เปรียบเทียบ jQuery Form Handling กับ Vanilla JavaScript ได้
7. อธิบายความแตกต่างระหว่าง client-side validation และ server-side validation ได้

---

## 2. Core Concepts

Form คือจุดสำคัญของ Web Application เพราะเป็นช่องทางรับข้อมูลจากผู้ใช้ เช่น สมัครสมาชิก ค้นหา บันทึกข้อมูลพนักงาน หรือส่งรายงาน Audit

การตรวจสอบข้อมูลฝั่ง Browser ช่วยให้ UX ดีขึ้น แต่ไม่สามารถแทนที่การตรวจสอบฝั่ง Server ได้

> Rule: Client-side validation improves user experience. Server-side validation protects the system.

---

## 3. Important jQuery Methods for Forms

| Method | Purpose |
|---|---|
| `.val()` | อ่านหรือกำหนดค่าของ form control |
| `.text()` | แสดงข้อความ error แบบปลอดภัยกว่า `.html()` |
| `.addClass()` | เพิ่ม class เช่น `is-invalid` |
| `.removeClass()` | ลบ class เมื่อข้อมูลถูกต้อง |
| `.on("submit")` | ตรวจจับการส่งฟอร์ม |
| `.on("input")` | ตรวจข้อมูลขณะผู้ใช้พิมพ์ |
| `.serialize()` | แปลงข้อมูลฟอร์มเป็น query string |

---

## 4. Basic Submit Validation

```js
// รอให้ DOM พร้อมใช้งาน
$(function () {

  // ตรวจจับ submit event ของฟอร์ม
  $("#profileForm").on("submit", function (event) {

    // ป้องกันไม่ให้ Browser ส่งฟอร์มทันที
    event.preventDefault();

    // อ่านค่าจาก input แล้วตัดช่องว่างหัวท้าย
    const name = $("#fullName").val().trim();

    // ตรวจว่าผู้ใช้กรอกชื่อหรือไม่
    if (name === "") {
      $("#fullNameError").text("กรุณากรอกชื่อ-นามสกุล");
      $("#fullName").addClass("is-invalid");
      return;
    }

    // ถ้าข้อมูลถูกต้อง ให้ล้าง error
    $("#fullNameError").text("");
    $("#fullName").removeClass("is-invalid");

    console.log("Form is valid");

  });

});
```

---

## 5. Real-time Input Validation

```js
$("#email").on("input", function () {

  // อ่านค่าปัจจุบันจากช่อง email
  const email = $(this).val().trim();

  // ตรวจรูปแบบ email แบบพื้นฐาน
  const isValidEmail = email.includes("@") && email.includes(".");

  // เปลี่ยนสถานะตามผลการตรวจ
  $(this).toggleClass("is-invalid", !isValidEmail);

});
```

---

## 6. Vanilla JavaScript Equivalent

```js
// เลือกฟอร์มจาก DOM
const form = document.querySelector("#profileForm");

// ฟัง submit event
form.addEventListener("submit", function (event) {

  // ป้องกันการ submit แบบปกติ
  event.preventDefault();

  // อ่านค่าจาก input
  const nameInput = document.querySelector("#fullName");
  const name = nameInput.value.trim();

  // ตรวจข้อมูล
  if (name === "") {
    document.querySelector("#fullNameError").textContent = "กรุณากรอกชื่อ-นามสกุล";
    nameInput.classList.add("is-invalid");
    return;
  }

  // ล้างสถานะ error
  document.querySelector("#fullNameError").textContent = "";
  nameInput.classList.remove("is-invalid");

});
```

---

## 7. Validation Checklist

- ตรวจ required fields
- ตรวจรูปแบบ email / phone / number
- ตรวจความยาวข้อความ
- ตรวจค่าที่เลือกจาก select
- แสดง error ใกล้ field ที่ผิด
- ไม่ใช้ alert เป็นหลักในระบบจริง
- ไม่ส่งข้อมูลจนกว่าข้อมูลขั้นต่ำจะถูกต้อง
- ตรวจซ้ำที่ backend ทุกครั้ง

---

## 8. Common Mistakes

| Mistake | Risk | Better Approach |
|---|---|---|
| เชื่อ client-side validation อย่างเดียว | ผู้ใช้ bypass ได้ | ตรวจซ้ำที่ server |
| ใช้ `.html()` แสดง error จาก input ผู้ใช้ | เสี่ยง XSS | ใช้ `.text()` |
| ใช้ alert ทุก error | UX แย่ | แสดงข้อความใต้ field |
| ไม่ trim ข้อมูล | ข้อมูลมีช่องว่างเกิน | ใช้ `.trim()` |
| ไม่ focus field ที่ผิด | ผู้ใช้แก้ยาก | ใช้ `.focus()` |

---

## 9. Hands-on Lab

สร้าง Employee Profile Form ที่ตรวจสอบ:

1. Full name ต้องไม่ว่าง
2. Email ต้องมีรูปแบบที่ถูกต้อง
3. Department ต้องถูกเลือก
4. Consent checkbox ต้องถูกติ๊ก
5. แสดง preview ของข้อมูลก่อน submit

---

## 10. Review Questions

1. `.val()` ใช้กับ Element ประเภทใด?
2. ทำไมต้องใช้ `event.preventDefault()` ใน submit handler?
3. `.text()` ปลอดภัยกว่า `.html()` ในกรณีใด?
4. Client-side validation แตกต่างจาก server-side validation อย่างไร?
5. การออกแบบ error message ที่ดีควรเป็นอย่างไร?

---

## 11. Key Takeaway

> Form Validation ที่ดีต้องช่วยผู้ใช้กรอกข้อมูลได้ถูกต้อง ลดความผิดพลาด และยังต้องไม่ละเลยความปลอดภัยของระบบฝั่ง Server
