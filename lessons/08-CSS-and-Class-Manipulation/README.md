# Lesson 08 — CSS and Class Manipulation

> Professional Thai Course: Modern jQuery 4 & JavaScript for Interactive Web Development

## Learning Objectives

หลังเรียนบทนี้ ผู้เรียนจะสามารถ:

1. ใช้ `.css()` เพื่ออ่านและเขียน style ได้
2. ใช้ `.addClass()`, `.removeClass()`, `.toggleClass()` และ `.hasClass()` ได้ถูกต้อง
3. แยกกรณีที่ควรใช้ inline style กับ CSS class ได้
4. สร้าง interactive UI state เช่น active, selected, error และ success ได้
5. เปรียบเทียบ jQuery class manipulation กับ `classList` ใน Modern JavaScript

---

## 1. Core Concept

ในการพัฒนาเว็บแบบมืออาชีพ ไม่ควรเปลี่ยน style ทุกอย่างผ่าน JavaScript โดยตรง ควรใช้ JavaScript เพื่อเปลี่ยน “state” แล้วให้ CSS เป็นตัวควบคุมหน้าตา

ตัวอย่าง state ที่พบบ่อย:

- `.is-active`
- `.is-selected`
- `.is-open`
- `.is-error`
- `.is-success`
- `.is-loading`

---

## 2. API Summary

| Method | Purpose | Thai Explanation |
|---|---|---|
| `.css()` | Read/write inline CSS | อ่านหรือกำหนด style โดยตรง |
| `.addClass()` | Add CSS class | เพิ่ม class |
| `.removeClass()` | Remove CSS class | ลบ class |
| `.toggleClass()` | Toggle CSS class | สลับ class เปิด/ปิด |
| `.hasClass()` | Check CSS class | ตรวจว่า element มี class หรือไม่ |

---

## 3. jQuery Example with Thai Comments

```javascript
$(function () {

    // เมื่อคลิกปุ่มเปลี่ยน theme
    $('#themeToggle').on('click', function () {

        // สลับ class dark-mode ที่ body
        $('body').toggleClass('dark-mode');

        // ตรวจสอบว่า body มี class dark-mode อยู่หรือไม่
        const isDark = $('body').hasClass('dark-mode');

        // เปลี่ยนข้อความปุ่มตามสถานะปัจจุบัน
        $(this).text(isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });

    // เมื่อคลิก card ใด card หนึ่ง
    $('.dashboard-card').on('click', function () {

        // ลบ selected จาก card ทั้งหมดก่อน
        $('.dashboard-card').removeClass('is-selected');

        // เพิ่ม selected เฉพาะ card ที่ถูกคลิก
        $(this).addClass('is-selected');
    });
});
```

---

## 4. Modern JavaScript Equivalent

```javascript
document.querySelector('#themeToggle').addEventListener('click', (event) => {
    document.body.classList.toggle('dark-mode');

    const isDark = document.body.classList.contains('dark-mode');
    event.currentTarget.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
});

document.querySelectorAll('.dashboard-card').forEach((card) => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.dashboard-card').forEach((item) => {
            item.classList.remove('is-selected');
        });

        card.classList.add('is-selected');
    });
});
```

---

## 5. Best Practices

- ใช้ class เพื่อควบคุม style เป็นหลัก
- ใช้ `.css()` เฉพาะกรณีที่ค่าต้องคำนวณแบบ dynamic จริง ๆ
- ตั้งชื่อ class state ด้วยรูปแบบชัดเจน เช่น `.is-active`, `.is-error`
- แยก business logic ออกจาก visual style
- หลีกเลี่ยงการกำหนด style ซ้ำ ๆ ใน JavaScript

---

## 6. Common Mistake

```javascript
// ไม่แนะนำ: เปลี่ยน style หลายจุดด้วย JavaScript โดยตรง
$('#box').css('background', 'red');
$('#box').css('color', 'white');
$('#box').css('border', '1px solid red');
```

```javascript
// แนะนำ: เพิ่ม class แล้วให้ CSS จัดการทั้งหมด
$('#box').addClass('is-error');
```

---

## 7. Lab

สร้าง dashboard card จำนวน 4 ใบ โดยเมื่อผู้ใช้คลิก card ใด ให้ card นั้นมีสถานะ selected และ card อื่นถูกยกเลิก selected

### Requirements

- ใช้ `.removeClass()` เพื่อล้าง state เดิม
- ใช้ `.addClass()` เพื่อกำหนด state ใหม่
- ใช้ `.toggleClass()` สำหรับ dark mode
- เขียน comment ภาษาไทยใน JavaScript

---

## 8. Review Questions

1. เหตุใดการใช้ class จึงดีกว่าการเขียน style ตรงด้วย JavaScript
2. `.toggleClass()` เหมาะกับ use case แบบใด
3. `.hasClass()` ใช้ตรวจสอบอะไร
4. อะไรคือ UI state class

---

## Summary

CSS and Class Manipulation เป็นหัวใจของ interactive UI เพราะช่วยให้ JavaScript รับผิดชอบ logic ส่วน CSS รับผิดชอบ visual presentation ทำให้โค้ดแยกหน้าที่ชัดเจน ดูแลรักษาง่าย และเหมาะกับงานจริงระดับ dashboard หรือ web application
