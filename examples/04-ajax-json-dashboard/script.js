// Example 04 — AJAX JSON Dashboard
// Course: MODERN jQUERY 4 & JavaScript for Interactive Web Development

// เก็บข้อมูลล่าสุดไว้ในตัวแปรกลาง เพื่อใช้ filter ซ้ำได้โดยไม่ต้องโหลดไฟล์ใหม่ทุกครั้ง
let latestFindings = [];

// รอให้ DOM โหลดเสร็จก่อนเริ่มผูก event
$(function () {
  // เมื่อกดปุ่ม Load ให้โหลดข้อมูลจากไฟล์ JSON
  $('#loadButton').on('click', function () {
    loadDashboardData();
  });

  // เมื่อเปลี่ยน filter ให้ render ตารางใหม่จากข้อมูลเดิม
  $('#severityFilter').on('change', function () {
    const selectedSeverity = $(this).val();
    renderDashboard(latestFindings, selectedSeverity);
  });
});

function loadDashboardData() {
  // แสดงสถานะกำลังโหลด เพื่อให้ผู้ใช้รู้ว่าระบบกำลังทำงาน
  setStatus('Loading dashboard data...');

  $.ajax({
    url: 'data.json',       // ไฟล์ JSON จำลอง API response
    method: 'GET',          // ใช้ GET เพื่ออ่านข้อมูล
    dataType: 'json',       // บอก jQuery ว่าต้องการข้อมูล JSON
    success: function (response) {
      // ตรวจสอบ response structure ตามรูปแบบที่ออกแบบไว้
      if (!response.success) {
        setStatus(response.message || 'API returned unsuccessful response.');
        return;
      }

      // เก็บ data ไว้ใช้ต่อสำหรับ filter
      latestFindings = response.data;

      // render dashboard ด้วยข้อมูลทั้งหมดในครั้งแรก
      renderDashboard(latestFindings, $('#severityFilter').val());

      setStatus(response.message);
    },
    error: function (xhr, status, error) {
      // แสดงข้อความเมื่อโหลดไฟล์หรือ API ไม่สำเร็จ
      setStatus(`Cannot load data: ${error}`);
    }
  });
}

function renderDashboard(findings, severityFilter) {
  // กรองข้อมูลตาม severity ที่ผู้ใช้เลือก
  const visibleFindings = severityFilter === 'all'
    ? findings
    : findings.filter(function (finding) {
        return finding.severity === severityFilter;
      });

  // อัปเดต KPI cards จากข้อมูลทั้งหมด ไม่ใช่เฉพาะข้อมูลที่ filter
  updateSummaryCards(findings);

  // render table เฉพาะข้อมูลที่ filter แล้ว
  renderFindingTable(visibleFindings);
}

function updateSummaryCards(findings) {
  // นับจำนวน finding ทั้งหมด
  $('#totalFindings').text(findings.length);

  // นับจำนวน high risk
  const highRiskCount = findings.filter(function (finding) {
    return finding.severity === 'high';
  }).length;

  $('#highRiskFindings').text(highRiskCount);

  // นับจำนวนรายการที่ยัง open
  const openCount = findings.filter(function (finding) {
    return finding.status === 'open';
  }).length;

  $('#openFindings').text(openCount);
}

function renderFindingTable(findings) {
  const $tbody = $('#findingTableBody');

  // ล้างแถวเดิมก่อน render ใหม่
  $tbody.empty();

  // แสดง empty state เมื่อไม่มีข้อมูลตรงกับ filter
  if (findings.length === 0) {
    $tbody.append('<tr><td colspan="5">No matching findings.</td></tr>');
    return;
  }

  $.each(findings, function (index, finding) {
    const $row = $('<tr></tr>');

    // ใช้ .text() เพื่อใส่ข้อมูลแบบปลอดภัยกว่าการต่อ HTML ดิบ
    $('<td></td>').text(finding.id).appendTo($row);
    $('<td></td>').text(finding.title).appendTo($row);
    $('<td></td>').append($('<span></span>').addClass('badge').text(finding.severity)).appendTo($row);
    $('<td></td>').text(finding.status).appendTo($row);
    $('<td></td>').text(finding.owner).appendTo($row);

    $tbody.append($row);
  });
}

function setStatus(message) {
  // อัปเดตข้อความสถานะในหน้าเว็บ
  $('#statusMessage').text(message);
}
