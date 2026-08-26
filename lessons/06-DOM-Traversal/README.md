# Lesson 06 — DOM Traversal with jQuery

> Professional Thai Course: Modern jQuery 4 & JavaScript for Interactive Web Development

## Learning Objectives

หลังเรียนบทนี้ ผู้เรียนจะสามารถ:

1. อธิบายแนวคิด DOM Traversal ได้อย่างถูกต้อง
2. ใช้ jQuery เพื่อค้นหา parent, child, sibling และ ancestor elements
3. เลือกใช้ `.find()`, `.children()`, `.parent()`, `.closest()`, `.siblings()`, `.next()` และ `.prev()` ได้เหมาะสม
4. เปรียบเทียบ jQuery traversal กับ Modern JavaScript DOM API
5. เขียนโค้ดที่อ่านง่าย ลด selector ซ้ำ และดูแลต่อได้ในงานจริง

---

## 1. Concept

DOM Traversal คือการ “เดินทาง” ไปยัง element ที่มีความสัมพันธ์กันในเอกสาร HTML เช่น จากปุ่มไปยัง card ที่ปุ่มนั้นอยู่ หรือจาก list item ไปยังรายการถัดไป

ในงานจริง DOM Traversal สำคัญมาก เพราะช่วยให้เราไม่ต้องเขียน selector ยาว ๆ หรือผูกโค้ดกับโครงสร้างหน้าเว็บแบบเปราะบางเกินไป

---

## 2. Core jQuery Methods

| Method | Purpose | Thai Explanation |
|---|---|---|
| `.parent()` | Select direct parent | เลือก element แม่โดยตรง |
| `.parents()` | Select all ancestors | เลือก element บรรพบุรุษทั้งหมด |
| `.closest()` | Select nearest matching ancestor | เลือก element แม่/บรรพบุรุษที่ใกล้ที่สุดตาม selector |
| `.children()` | Select direct children | เลือกลูกโดยตรง |
| `.find()` | Search descendants | ค้นหาลูกหลานภายใน element |
| `.siblings()` | Select sibling elements | เลือก element ระดับเดียวกัน |
| `.next()` | Select next sibling | เลือก element ถัดไป |
| `.prev()` | Select previous sibling | เลือก element ก่อนหน้า |

---

## 3. jQuery Example with Thai Comments

```javascript
// รอให้ DOM โหลดเสร็จก่อนเริ่มผูก event
$(function () {

    // เมื่อคลิกปุ่มที่มี class .toggle-card
    $('.toggle-card').on('click', function () {

        // this คือปุ่มที่ถูกคลิก
        // closest('.course-card') คือการหา card ที่อยู่ใกล้ปุ่มนั้นที่สุด
        const $card = $(this).closest('.course-card');

        // ค้นหาเนื้อหาภายใน card นั้นเท่านั้น ไม่กระทบ card อื่น
        const $content = $card.find('.course-card__content');

        // เปิด/ปิดเนื้อหาแบบ toggle
        $content.slideToggle(200);

        // เพิ่ม/ลบ class active เพื่อเปลี่ยน style
        $card.toggleClass('is-active');
    });
});
```

---

## 4. Modern JavaScript Equivalent

```javascript
document.querySelectorAll('.toggle-card').forEach((button) => {
    button.addEventListener('click', () => {
        const card = button.closest('.course-card');
        const content = card.querySelector('.course-card__content');

        content.hidden = !content.hidden;
        card.classList.toggle('is-active');
    });
});
```

---

## 5. Best Practices

- ใช้ `.closest()` เมื่อ event เกิดจาก element ลูก แต่ต้องทำงานกับ container แม่
- ใช้ `.find()` เพื่อจำกัด scope ไม่ให้ selector ไปกระทบ element อื่นทั้งหน้า
- หลีกเลี่ยง selector ยาวเกินไป เช่น `body div.wrapper main section div ul li span`
- ตั้งชื่อ class ตามหน้าที่ เช่น `.course-card`, `.toggle-card`, `.panel-content`
- เขียน DOM traversal ให้สัมพันธ์กับ component ไม่ใช่ทั้ง document

---

## 6. Common Mistakes

```javascript
// ไม่แนะนำ: selector กว้างเกินไป กระทบทุก panel ในหน้า
$('.panel').slideToggle();
```

```javascript
// แนะนำ: จำกัดผลกระทบเฉพาะ card ที่ผู้ใช้คลิก
$(this).closest('.course-card').find('.panel').slideToggle();
```

---

## 7. Lab

สร้างหน้า course card จำนวน 3 ใบ โดยแต่ละใบมีปุ่ม “ดูรายละเอียด” เมื่อคลิกแล้วให้เปิดเฉพาะรายละเอียดของ card นั้น ไม่กระทบ card อื่น

### Requirements

- ใช้ `.closest()` เพื่อหา card ปัจจุบัน
- ใช้ `.find()` เพื่อหา content ภายใน card
- ใช้ `.toggleClass()` เพื่อเปลี่ยนสถานะ active
- เพิ่ม comment ภาษาไทยใน code ทุกจุดสำคัญ

---

## 8. Review Questions

1. `.parent()` ต่างจาก `.closest()` อย่างไร
2. `.children()` ต่างจาก `.find()` อย่างไร
3. เหตุใดจึงควรจำกัด scope ของ selector
4. DOM Traversal ช่วยให้โค้ดดูแลรักษาง่ายขึ้นอย่างไร

---

## Summary

DOM Traversal เป็นทักษะสำคัญของ jQuery เพราะช่วยให้โค้ดทำงานแบบ component-oriented มากขึ้น โดยเฉพาะงาน dashboard, form, table, card, menu และ interactive UI ที่ต้องตอบสนองต่อ element เฉพาะส่วน
