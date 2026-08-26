# Lesson 07 — Text, HTML, Attributes and Properties

> Professional Thai Course: Modern jQuery 4 & JavaScript for Interactive Web Development

## Learning Objectives

หลังเรียนบทนี้ ผู้เรียนจะสามารถ:

1. ใช้ `.text()`, `.html()`, `.val()`, `.attr()` และ `.prop()` ได้ถูกต้อง
2. แยกความแตกต่างระหว่าง attribute และ property ได้
3. อธิบายความเสี่ยงของการใช้ `.html()` กับข้อมูลจากผู้ใช้ได้
4. เปรียบเทียบ jQuery กับ Modern JavaScript DOM API
5. เขียนโค้ดจัดการ form, button, label และ status message ได้อย่างปลอดภัย

---

## 1. Core Concept

jQuery ช่วยให้การอ่านและเขียนค่าของ element ทำได้ง่ายขึ้น แต่ผู้เรียนต้องเข้าใจว่าคำสั่งแต่ละตัวมีขอบเขตต่างกัน

- `.text()` ใช้กับข้อความธรรมดา
- `.html()` ใช้กับ HTML markup
- `.val()` ใช้กับค่าใน form controls
- `.attr()` ใช้กับ HTML attributes
- `.prop()` ใช้กับ DOM properties เช่น checked, disabled, selected

---

## 2. API Summary

| Method | Use Case | Safer For User Input? |
|---|---|---|
| `.text()` | อ่าน/เขียนข้อความ | Yes |
| `.html()` | อ่าน/เขียน HTML markup | No, unless trusted |
| `.val()` | อ่าน/เขียนค่า input/select/textarea | Yes |
| `.attr()` | อ่าน/เขียน HTML attribute | Depends |
| `.prop()` | อ่าน/เขียน property เช่น checked/disabled | Yes for boolean state |

---

## 3. jQuery Example with Thai Comments

```javascript
$(function () {

    // เมื่อผู้ใช้กดปุ่ม preview
    $('#previewButton').on('click', function () {

        // อ่านค่าจาก input name
        const name = $('#employeeName').val();

        // ใช้ .text() เพื่อแสดงข้อความอย่างปลอดภัย
        // เหมาะกับข้อมูลที่มาจากผู้ใช้ เพราะไม่ตีความเป็น HTML
        $('#previewName').text(name);

        // อ่านสถานะ checkbox ด้วย .prop()
        const isActive = $('#employeeActive').prop('checked');

        // เปลี่ยนข้อความสถานะตามค่าที่อ่านได้
        $('#previewStatus').text(isActive ? 'Active' : 'Inactive');

        // เปิดใช้งานปุ่ม submit เมื่อมีชื่อแล้วเท่านั้น
        $('#submitButton').prop('disabled', name.trim() === '');
    });
});
```

---

## 4. Modern JavaScript Equivalent

```javascript
document.querySelector('#previewButton').addEventListener('click', () => {
    const name = document.querySelector('#employeeName').value;
    const isActive = document.querySelector('#employeeActive').checked;

    document.querySelector('#previewName').textContent = name;
    document.querySelector('#previewStatus').textContent = isActive ? 'Active' : 'Inactive';
    document.querySelector('#submitButton').disabled = name.trim() === '';
});
```

---

## 5. Attribute vs Property

### Attribute

Attribute คือค่าที่เขียนไว้ใน HTML markup เช่น

```html
<input id="agree" type="checkbox" checked>
```

### Property

Property คือสถานะจริงของ DOM object หลัง browser โหลดและผู้ใช้โต้ตอบแล้ว เช่น checkbox อาจถูกคลิกเปลี่ยนสถานะจาก checked เป็น unchecked

```javascript
// อ่าน attribute ดั้งเดิม
$('#agree').attr('checked');

// อ่านสถานะจริงในปัจจุบัน
$('#agree').prop('checked');
```

สำหรับ checkbox, radio, selected และ disabled ควรใช้ `.prop()` เป็นหลัก

---

## 6. Security Note

```javascript
// ไม่แนะนำ: ถ้า userInput มาจากผู้ใช้ อาจทำให้เกิด XSS
$('#result').html(userInput);
```

```javascript
// แนะนำ: แสดงเป็นข้อความธรรมดา ปลอดภัยกว่า
$('#result').text(userInput);
```

---

## 7. Lab

สร้าง form ข้อมูลพนักงาน ประกอบด้วย:

- Employee Name
- Department
- Active checkbox
- Preview area
- Submit button

เมื่อผู้ใช้กรอกข้อมูลและกด preview ให้แสดงข้อมูลใน preview area และเปิดปุ่ม submit เมื่อกรอกข้อมูลครบ

---

## 8. Review Questions

1. `.text()` ต่างจาก `.html()` อย่างไร
2. เมื่อใดควรใช้ `.prop()` แทน `.attr()`
3. ทำไมการใช้ `.html()` กับ user input จึงมีความเสี่ยง
4. `.val()` ใช้กับ element ประเภทใดบ้าง

---

## Summary

บทนี้เป็นพื้นฐานสำคัญของการทำงานกับข้อมูลในหน้าเว็บ โดยเฉพาะ form, preview, dynamic status และ UI state management การเลือกใช้ method ให้ถูกต้องช่วยให้โค้ดปลอดภัย อ่านง่าย และลด bug ได้มาก
