# Lesson 10 — Effects and Animations

> Modern jQuery 4 & JavaScript for Interactive Web Development  
> Module 10: Effects, Animation และการออกแบบ Interaction ที่เหมาะสม

---

## 1. Learning Objectives

หลังเรียนบทนี้ ผู้เรียนจะสามารถ:

1. ใช้ jQuery Effects สำหรับการแสดง/ซ่อน Element ได้
2. ใช้ `.fadeIn()`, `.fadeOut()`, `.slideUp()`, `.slideDown()` ได้
3. ใช้ `.animate()` สำหรับ animation แบบกำหนด property เองได้
4. ใช้ `.stop()` เพื่อควบคุม animation queue ได้
5. แยกได้ว่าเมื่อใดควรใช้ jQuery Effects และเมื่อใดควรใช้ CSS Transition
6. ออกแบบ interaction ที่ไม่รบกวนผู้ใช้และไม่ทำให้หน้าเว็บช้า

---

## 2. Core Concepts

jQuery Effects เป็นชุดคำสั่งสำหรับสร้าง visual feedback เช่น แสดงกล่องข้อความ เปิด/ปิด panel แจ้งเตือน หรือทำ animation แบบง่าย

แต่ใน Modern Web Development ไม่ควรใช้ animation มากเกินไป เพราะอาจกระทบ accessibility, performance และ user experience

---

## 3. Common Effect Methods

| Method | Purpose |
|---|---|
| `.show()` | แสดง Element |
| `.hide()` | ซ่อน Element |
| `.toggle()` | สลับแสดง/ซ่อน |
| `.fadeIn()` | ค่อย ๆ แสดง |
| `.fadeOut()` | ค่อย ๆ ซ่อน |
| `.fadeToggle()` | สลับ fade |
| `.slideDown()` | เลื่อนลงเพื่อแสดง |
| `.slideUp()` | เลื่อนขึ้นเพื่อซ่อน |
| `.slideToggle()` | สลับ slide |
| `.animate()` | animation แบบกำหนดเอง |
| `.stop()` | หยุด animation ที่กำลังทำงาน |

---

## 4. Basic Example

```js
// รอให้ DOM พร้อมใช้งาน
$(function () {

  // เมื่อผู้ใช้คลิกปุ่ม togglePanel
  $("#togglePanel").on("click", function () {

    // สลับการแสดงผลของ panel ด้วย slide animation
    $("#infoPanel").slideToggle(250);

  });

});
```

---

## 5. Fade Notification Example

```js
function showMessage(message) {

  // ใส่ข้อความลงในกล่องแจ้งเตือน
  $("#messageBox").text(message);

  // แสดงแบบ fade แล้วค่อยซ่อนหลังจาก 2 วินาที
  $("#messageBox")
    .stop(true, true)
    .fadeIn(200)
    .delay(2000)
    .fadeOut(300);

}
```

---

## 6. Custom Animation

```js
$("#card").animate(
  {
    opacity: 0.85,
    marginLeft: "20px"
  },
  300
);
```

หมายเหตุ: `.animate()` ใช้กับ numeric CSS properties ได้ดี แต่ควรหลีกเลี่ยง animation ที่ซับซ้อนมาก เพราะ CSS transitions หรือ Web Animations API อาจเหมาะกว่า

---

## 7. Vanilla JavaScript / CSS Equivalent

```css
.panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.panel.is-open {
  max-height: 300px;
}
```

```js
// เลือก panel
const panel = document.querySelector("#infoPanel");

// สลับ class เพื่อให้ CSS transition ทำงาน
panel.classList.toggle("is-open");
```

---

## 8. UX and Accessibility Notes

- Animation ควรช่วยให้ผู้ใช้เข้าใจสถานะ ไม่ใช่สร้างความรำคาญ
- หลีกเลี่ยง animation ที่เร็วหรือกระพริบรุนแรง
- ควรออกแบบให้เนื้อหาอ่านได้แม้ animation ไม่ทำงาน
- สำหรับระบบงานจริง เช่น Dashboard หรือ HR System ควรใช้ animation เท่าที่จำเป็น

---

## 9. Common Mistakes

| Mistake | Risk | Recommendation |
|---|---|---|
| Animation ซ้อนกันหลายครั้ง | เกิด queue และ UI กระตุก | ใช้ `.stop(true, true)` |
| ใช้ `.animate()` กับทุกอย่าง | Performance ลดลง | ใช้ CSS transition เมื่อเหมาะสม |
| ซ่อนข้อความสำคัญด้วย effect | Accessibility issue | ให้ข้อมูลสำคัญยังเข้าถึงได้ |
| ใช้ duration นานเกินไป | UX ช้า | ใช้ 150–300 ms สำหรับ UI ทั่วไป |

---

## 10. Hands-on Lab

สร้างหน้า Notification Center ที่สามารถ:

1. แสดง success message ด้วย fade effect
2. เปิด/ปิด help panel ด้วย slide effect
3. ใช้ `.stop()` เพื่อป้องกัน animation queue
4. เปรียบเทียบการทำงานกับ CSS transition

---

## 11. Review Questions

1. `.fadeIn()` กับ `.show()` ต่างกันอย่างไร?
2. `.slideToggle()` เหมาะกับ UI ประเภทใด?
3. `.stop(true, true)` มีประโยชน์อย่างไร?
4. เมื่อใดควรใช้ CSS transition แทน jQuery animation?
5. Animation ที่ดีควรสนับสนุน UX อย่างไร?

---

## 12. Key Takeaway

> jQuery Effects เหมาะกับ interaction แบบรวดเร็วและเข้าใจง่าย แต่หลักสูตรสมัยใหม่ต้องสอนให้ผู้เรียนเลือกใช้ animation อย่างมีเหตุผล โดยคำนึงถึง performance, accessibility และ user experience เสมอ
