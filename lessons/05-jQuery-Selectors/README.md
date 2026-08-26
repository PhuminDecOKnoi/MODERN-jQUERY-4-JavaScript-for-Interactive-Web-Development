# Lesson 05: jQuery Selectors

> Modern jQuery 4 & JavaScript for Interactive Web Development

## Learning Objectives

หลังจบบทนี้ ผู้เรียนจะสามารถ:

1. ใช้ jQuery selectors เพื่อเลือก element ได้หลายรูปแบบ
2. เปรียบเทียบ CSS selectors, jQuery selectors และ `querySelector()` ได้
3. ใช้ basic, hierarchy, attribute และ form selectors ได้
4. เขียน selector ที่อ่านง่ายและมีประสิทธิภาพได้
5. หลีกเลี่ยง selector ที่ซับซ้อนเกินจำเป็นและกระทบ performance ได้

---

## 1. Concept: Selector คืออะไร

Selector คือรูปแบบการระบุ element ที่ต้องการทำงานด้วย เช่น element id class attribute หรือสถานะของ form field

jQuery ใช้ CSS selector เป็นฐาน ทำให้ผู้เรียนที่รู้ CSS อยู่แล้วสามารถใช้งานได้รวดเร็ว

```javascript
// เลือก element ด้วย selector
$(".course-card");
```

---

## 2. Basic Selectors

| Selector | Meaning | Example |
|---|---|---|
| `$("p")` | เลือกทุก `<p>` | paragraph ทั้งหมด |
| `$("#main")` | เลือก id main | element เดียว |
| `$(".active")` | เลือก class active | element หลายตัว |
| `$("*")` | เลือกทุก element | ไม่ควรใช้ถ้าไม่จำเป็น |

```javascript
// เลือกทุก card
const cards = $(".course-card");

// เลือกหัวข้อหลัก
const title = $("#course-title");
```

---

## 3. Grouping Selectors

```javascript
// เลือกทั้ง h1, h2 และ .highlight
$("h1, h2, .highlight").addClass("text-primary");
```

ใช้เมื่อต้องการ apply action เดียวกันกับ element หลายกลุ่ม

---

## 4. Hierarchy Selectors

| Selector | Meaning |
|---|---|
| `$("main p")` | เลือก p ทุกตัวที่อยู่ภายใน main |
| `$("main > p")` | เลือก p ที่เป็น child โดยตรงของ main |
| `$("h2 + p")` | เลือก p ตัวแรกที่อยู่ถัดจาก h2 |
| `$("h2 ~ p")` | เลือก p ทุกตัวที่เป็น sibling หลัง h2 |

```javascript
// เลือก paragraph ที่อยู่ใน article เท่านั้น
$("article p").addClass("article-text");
```

---

## 5. Attribute Selectors

```javascript
// เลือก link ที่มี target attribute
$("a[target]").addClass("external-link");

// เลือก input ที่ type เป็น email
$("input[type='email']").addClass("email-input");

// เลือก link ที่ href เริ่มต้นด้วย https
$("a[href^='https']").addClass("secure-link");
```

| Selector | Meaning |
|---|---|
| `[attr]` | มี attribute นั้น |
| `[attr='value']` | attribute เท่ากับค่า |
| `[attr^='value']` | เริ่มต้นด้วยค่า |
| `[attr$='value']` | ลงท้ายด้วยค่า |
| `[attr*='value']` | มีค่านั้นอยู่ภายใน |

---

## 6. Form Selectors

```javascript
// เลือก input ทั้งหมด
$(":input");

// เลือก checkbox ที่ถูก checked
$("input:checked");

// เลือก field ที่ disabled
$(":disabled");

// เลือก field ที่ enabled
$(":enabled");
```

> หมายเหตุ: ใน code production ควรใช้ selector ที่ชัดเจน เช่น `input[type='checkbox']:checked` มากกว่า selector ที่กว้างเกินไป

---

## 7. Filter Selectors

```javascript
// เลือก item แรก
$(".module-item:first").addClass("first-module");

// เลือก item สุดท้าย
$(".module-item:last").addClass("last-module");

// เลือก item ลำดับคู่
$(".module-item:even").addClass("even-row");

// เลือก item ลำดับคี่
$(".module-item:odd").addClass("odd-row");
```

---

## 8. Modern JavaScript Equivalent

```javascript
// jQuery
$(".course-card").addClass("active");

// Vanilla JavaScript
document.querySelectorAll(".course-card").forEach((card) => {
  card.classList.add("active");
});
```

---

## 9. Performance Best Practices

1. เลือกด้วย id เมื่อเป็น element เดียวและชัดเจน
2. หลีกเลี่ยง universal selector `*` ในงานจริง
3. อย่าเขียน selector ยาวเกินไป เช่น `body main section div ul li a span`
4. cache selector ที่ใช้ซ้ำ
5. ใช้ class ที่สื่อความหมายแทน selector ที่ผูกกับโครงสร้าง HTML มากเกินไป

```javascript
// ไม่ดี: query ซ้ำหลายรอบ
$("#dashboard").addClass("active");
$("#dashboard").show();
$("#dashboard").attr("aria-live", "polite");

// ดี: cache selector
const dashboard = $("#dashboard");
dashboard.addClass("active");
dashboard.show();
dashboard.attr("aria-live", "polite");
```

---

## 10. Common Mistakes

| Mistake | Why it is a problem | Better approach |
|---|---|---|
| ใช้ selector กว้างเกินไป | กระทบ element ที่ไม่ต้องการ | ใช้ class/id เฉพาะเจาะจง |
| ใช้ id ซ้ำ | HTML invalid และ jQuery เลือกผิด | id ต้อง unique |
| ผูก selector กับ DOM ลึกเกินไป | เปลี่ยน layout แล้ว code พัง | ใช้ semantic class |
| query ซ้ำ | performance ต่ำลง | cache selector |

---

## 11. Hands-on Lab

สร้างหน้า `selectors-lab.html` ที่มี:

- Course cards 4 ใบ
- Form ค้นหา course
- Checkbox filter active course
- ปุ่ม Highlight Premium Course

ใช้ selector อย่างน้อย 5 ประเภท:

1. ID selector
2. Class selector
3. Element selector
4. Attribute selector
5. Form selector

---

## 12. Exercise

1. เขียน jQuery selector เพื่อเลือก link ที่เปิด tab ใหม่
2. เขียน selector เพื่อเลือก input email
3. เขียน selector เพื่อเลือก card ที่มี class `featured`
4. เขียน selector เพื่อเลือก checkbox ที่ checked
5. แปลง selector จาก jQuery เป็น `querySelectorAll()`

---

## 13. Mini Project

สร้าง **Course Filter UI** ที่สามารถ:

- แสดง course ทั้งหมด
- Filter ตาม category
- Highlight course ที่ active
- ซ่อน course ที่ inactive
- แสดงจำนวนผลลัพธ์

---

## Teaching Notes

บทนี้เป็นฐานสำคัญของ jQuery ทั้งหมด เพราะ jQuery เริ่มจากการเลือก element ก่อนเสมอ ผู้สอนควรย้ำว่า selector ที่ดีต้องไม่ใช่แค่ทำงานได้ แต่ต้องอ่านง่าย maintain ง่าย และไม่เปราะเมื่อโครงสร้าง HTML เปลี่ยน
