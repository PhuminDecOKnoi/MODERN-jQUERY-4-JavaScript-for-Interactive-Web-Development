// Example 03 — Form Validation
// หลักสูตร Modern jQuery 4 & JavaScript for Interactive Web Development

// รอให้ DOM โหลดครบก่อนเริ่มผูก event
$(function () {

  // เลือกฟอร์ม Employee Profile
  const $form = $("#employeeForm");

  // ฟังก์ชันช่วยแสดง error ของแต่ละ field
  function setInvalid($field, errorSelector, message) {
    // เพิ่ม class is-invalid เพื่อเปลี่ยนกรอบ input เป็นสีแดง
    $field.addClass("is-invalid").removeClass("is-valid");

    // ใช้ .text() เพื่อแสดงข้อความแบบปลอดภัย ไม่ตีความเป็น HTML
    $(errorSelector).text(message);
  }

  // ฟังก์ชันช่วยแสดงสถานะถูกต้องของ field
  function setValid($field, errorSelector) {
    // เพิ่ม class is-valid และลบ class is-invalid
    $field.addClass("is-valid").removeClass("is-invalid");

    // ล้างข้อความ error
    $(errorSelector).text("");
  }

  // ฟังก์ชันตรวจสอบรูปแบบ email แบบพื้นฐาน
  function isValidEmail(email) {
    // ตัวอย่างนี้ใช้ regular expression ระดับพื้นฐานเพื่อการเรียนรู้
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ตรวจจับ submit event ของฟอร์ม
  $form.on("submit", function (event) {
    // ป้องกันการ submit แบบปกติของ Browser เพื่อให้เราตรวจข้อมูลก่อน
    event.preventDefault();

    // อ่านค่าจาก form control และตัดช่องว่างหัวท้าย
    const fullName = $("#fullName").val().trim();
    const email = $("#email").val().trim();
    const department = $("#department").val();
    const consent = $("#consent").is(":checked");

    // ตัวแปรรวมสถานะว่า form ผ่านหรือไม่
    let isFormValid = true;

    // ตรวจชื่อ-นามสกุล
    if (fullName === "") {
      setInvalid($("#fullName"), "#fullNameError", "กรุณากรอกชื่อ-นามสกุล");
      isFormValid = false;
    } else {
      setValid($("#fullName"), "#fullNameError");
    }

    // ตรวจ email
    if (email === "") {
      setInvalid($("#email"), "#emailError", "กรุณากรอกอีเมล");
      isFormValid = false;
    } else if (!isValidEmail(email)) {
      setInvalid($("#email"), "#emailError", "รูปแบบอีเมลไม่ถูกต้อง");
      isFormValid = false;
    } else {
      setValid($("#email"), "#emailError");
    }

    // ตรวจ department
    if (department === "") {
      setInvalid($("#department"), "#departmentError", "กรุณาเลือกหน่วยงาน");
      isFormValid = false;
    } else {
      setValid($("#department"), "#departmentError");
    }

    // ตรวจ consent checkbox
    if (!consent) {
      $("#consentError").text("กรุณายืนยันข้อมูลก่อนดำเนินการ");
      isFormValid = false;
    } else {
      $("#consentError").text("");
    }

    // ถ้าฟอร์มไม่ผ่าน ให้หยุดทำงาน และ focus field แรกที่ผิด
    if (!isFormValid) {
      $(".is-invalid").first().focus();
      return;
    }

    // แสดงข้อมูล preview เมื่อ validation ผ่าน
    $("#previewName").text(fullName);
    $("#previewEmail").text(email);
    $("#previewDepartment").text(department);

    // เปิด preview card
    $("#previewCard").prop("hidden", false).hide().fadeIn(200);
  });

  // ล้างสถานะเมื่อ reset form
  $form.on("reset", function () {
    // หน่วงเวลาเล็กน้อยเพื่อให้ Browser reset ค่าในฟอร์มก่อน
    setTimeout(function () {
      $("input, select").removeClass("is-valid is-invalid");
      $(".error-message").text("");
      $("#previewCard").prop("hidden", true);
    }, 0);
  });

});
