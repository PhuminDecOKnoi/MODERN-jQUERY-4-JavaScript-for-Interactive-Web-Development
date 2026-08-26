// Example 02 — jQuery Events Lab
// จุดประสงค์: ฝึก event handling, DOM traversal และ class manipulation ด้วย jQuery

// รอให้ DOM โหลดเสร็จก่อนเริ่มทำงาน
$(function () {

    // จับ event คลิกปุ่มเปลี่ยน theme
    $('#themeToggle').on('click', function () {

        // สลับ class dark-mode ที่ body เพื่อให้ CSS เปลี่ยน theme
        $('body').toggleClass('dark-mode');

        // ตรวจสอบว่า body มี class dark-mode อยู่หรือไม่
        const isDarkMode = $('body').hasClass('dark-mode');

        // เปลี่ยนข้อความปุ่มตามสถานะ theme ปัจจุบัน
        $(this).text(isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });

    // จับ event คลิกที่ course card ทั้งใบ
    $('.course-card').on('click', function () {

        // ลบสถานะ selected จาก card ทั้งหมดก่อน
        $('.course-card').removeClass('is-selected');

        // เพิ่มสถานะ selected เฉพาะ card ที่ถูกคลิก
        $(this).addClass('is-selected');

        // อ่านชื่อ lesson จาก h2 ภายใน card ที่ถูกคลิก
        const lessonTitle = $(this).find('h2').text();

        // อัปเดตข้อความ status ด้านล่าง
        $('#statusText').text(`Selected: ${lessonTitle}`);
    });

    // จับ event คลิกปุ่ม toggle รายละเอียด
    $('.toggle-card').on('click', function (event) {

        // ป้องกันไม่ให้ event click ของปุ่ม bubble ไปกระตุ้น card ซ้ำโดยไม่จำเป็น
        event.stopPropagation();

        // หา course-card ที่ใกล้ปุ่มนี้ที่สุด
        const $card = $(this).closest('.course-card');

        // หา content ภายใน card นี้เท่านั้น
        const $content = $card.find('.course-card__content');

        // เปิด/ปิดรายละเอียดด้วย animation
        $content.slideToggle(180);

        // สลับ class active เพื่อเปลี่ยน visual state
        $card.toggleClass('is-active');

        // อ่านชื่อบทเรียนเพื่อแจ้งสถานะ
        const lessonTitle = $card.find('h2').text();
        $('#statusText').text(`Toggled details: ${lessonTitle}`);
    });
});
