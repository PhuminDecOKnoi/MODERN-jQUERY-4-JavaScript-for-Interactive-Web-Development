// รอให้ DOM โหลดเสร็จก่อนเริ่มทำงาน
$(function () {

  // เก็บ selector ที่ใช้ซ้ำไว้ในตัวแปร เพื่อให้อ่านง่ายและลดการ query ซ้ำ
  const courseTitle = $("#course-title");
  const moduleList = $("#module-list");

  // ใช้ตัวแปรนับลำดับ module ที่เพิ่มใหม่
  let moduleCounter = 3;

  // เมื่อผู้ใช้กดปุ่ม Change Title
  $("#changeTitleButton").on("click", function () {

    // เปลี่ยนข้อความของหัวข้อหลักด้วย .text()
    courseTitle.text("Modern jQuery 4 + Vanilla JavaScript Mapping");

  });

  // เมื่อผู้ใช้กดปุ่ม Add Module
  $("#addModuleButton").on("click", function () {

    // สร้าง li ใหม่ด้วย jQuery
    const newModule = $("<li></li>").text(`New Module ${moduleCounter}`);

    // เพิ่ม li เข้าไปท้ายรายการด้วย .append()
    moduleList.append(newModule);

    // เพิ่มค่าลำดับ module สำหรับครั้งถัดไป
    moduleCounter += 1;

  });

  // เมื่อผู้ใช้กดปุ่ม Clear Modules
  $("#clearModulesButton").on("click", function () {

    // ลบรายการ module ทั้งหมดด้านใน ul แต่ยังคงตัว ul ไว้
    moduleList.empty();

    // reset ตัวนับกลับไปที่ 1
    moduleCounter = 1;

  });

});
