const lessons = [
  ["01", "JavaScript Fundamentals", "พื้นฐานภาษา JavaScript, variables, functions, objects และ arrays", "lessons/01-JavaScript-Fundamentals/"],
  ["02", "Why jQuery", "บทบาทของ jQuery ในระบบเว็บปัจจุบันและระบบเดิม", "lessons/02-Why-jQuery/"],
  ["03", "DOM Selection and Manipulation", "เลือก element และปรับเนื้อหาหน้าเว็บด้วย DOM", "lessons/03-DOM-Selection-and-Manipulation/"],
  ["04", "Events and Browser Interaction", "จัดการ click, input, submit และ browser interaction", "lessons/04-Events-and-Browser-Interaction/"],
  ["05", "jQuery Selectors", "ใช้ jQuery selectors เพื่อเลือก element อย่างเป็นระบบ", "lessons/05-jQuery-Selectors/"],
  ["06", "DOM Traversal", "เดินโครงสร้าง DOM ด้วย parent, child, sibling และ closest", "lessons/06-DOM-Traversal/"],
  ["07", "Text, HTML, Attributes and Properties", "จัดการ text, html, val, attr, prop อย่างถูกต้อง", "lessons/07-Text-HTML-Attributes-and-Properties/"],
  ["08", "CSS and Class Manipulation", "ควบคุม style และ class เพื่อสร้าง interactive UI", "lessons/08-CSS-and-Class-Manipulation/"],
  ["09", "Event Handling and Delegation", "ใช้ .on() และ event delegation สำหรับ dynamic content", "lessons/09-Event-Handling-and-Delegation/"],
  ["10", "Effects and Animations", "show, hide, fade, slide, animate และข้อควรระวัง", "lessons/10-Effects-and-Animations/"],
  ["11", "Forms and Validation", "ตรวจสอบฟอร์มและจัดการ feedback ของผู้ใช้", "lessons/11-Forms-and-Validation/"],
  ["12", "AJAX with jQuery", "ใช้ $.ajax(), $.get(), $.post() เพื่อดึงข้อมูล", "lessons/12-AJAX-with-jQuery/"],
  ["13", "Fetch API and Modern AJAX", "เปรียบเทียบ jQuery AJAX กับ fetch และ async/await", "lessons/13-Fetch-API-and-Modern-AJAX/"],
  ["14", "REST API and JSON", "เข้าใจ REST endpoints, JSON และ data rendering", "lessons/14-REST-API-and-JSON/"],
  ["15", "jQuery with PHP and MySQL", "เชื่อมแนวคิด front-end กับ backend CRUD", "lessons/15-jQuery-with-PHP-and-MySQL/"],
  ["16", "jQuery Plugins and UI Components", "ประเมินและใช้งาน plugin/component อย่างปลอดภัย", "lessons/16-jQuery-Plugins-and-UI-Components/"],
  ["17", "jQuery 4 Migration and Compatibility", "แนวทาง migration, compatibility และ deprecated API", "lessons/17-jQuery-4-Migration-and-Compatibility/"],
  ["18", "jQuery vs Vanilla JavaScript", "Mapping แนวคิด jQuery ไปยัง Modern JavaScript", "lessons/18-jQuery-vs-Vanilla-JavaScript/"],
  ["19", "Security, Performance and Accessibility", "XSS, performance, keyboard access และ semantic UI", "lessons/19-Security-Performance-and-Accessibility/"],
  ["20", "Capstone Interactive Audit / HR Dashboard", "สร้าง Dashboard สรุปหลักสูตรแบบใช้งานจริง", "lessons/20-Capstone-Interactive-Audit-HR-Dashboard/"]
];

const lessonGrid = document.querySelector("#lessonGrid");

if (lessonGrid) {
  lessonGrid.innerHTML = lessons.map(([number, title, description, url]) => `
    <a class="lesson-card" href="${url}">
      <span>${number}</span>
      <h3>${title}</h3>
      <p>${description}</p>
    </a>
  `).join("");
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}
