$(function () {
  // เก็บข้อมูล Finding ทั้งหมดไว้ในตัวแปรกลางของหน้า
  let findings = [];

  // Cache selectors เพื่อไม่ต้องค้นหา DOM ซ้ำหลายครั้ง
  const $tableBody = $("#findingTableBody");
  const $searchInput = $("#searchInput");
  const $statusFilter = $("#statusFilter");
  const $riskFilter = $("#riskFilter");
  const $resetButton = $("#resetButton");
  const $detailBox = $("#detailBox");
  const $resultSummary = $("#resultSummary");

  // โหลดข้อมูลจำลองจากไฟล์ JSON
  $.getJSON("data.json")
    .done(function (data) {
      findings = data.findings;
      renderDashboard(findings);
    })
    .fail(function () {
      $resultSummary.text("Unable to load dashboard data.");
      $tableBody.empty().append(
        $("<tr>").append(
          $("<td>")
            .attr("colspan", 8)
            .addClass("empty-state")
            .text("Data loading failed. Please check data.json.")
        )
      );
    });

  // เมื่อผู้ใช้พิมพ์ค้นหา หรือเปลี่ยน filter ให้ render ใหม่ทันที
  $searchInput.on("input", applyFilters);
  $statusFilter.on("change", applyFilters);
  $riskFilter.on("change", applyFilters);

  // ปุ่ม Reset ใช้คืนค่าตัวกรองทั้งหมด
  $resetButton.on("click", function () {
    $searchInput.val("");
    $statusFilter.val("all");
    $riskFilter.val("all");
    renderDashboard(findings);
    renderEmptyDetail();
  });

  // ใช้ event delegation เพราะปุ่ม View ถูกสร้างแบบ dynamic จากข้อมูล JSON
  $tableBody.on("click", ".btn-view", function () {
    const id = $(this).data("id");
    const finding = findings.find((item) => item.id === id);

    if (finding) {
      renderDetail(finding);
    }
  });

  function applyFilters() {
    const keyword = $searchInput.val().toLowerCase().trim();
    const status = $statusFilter.val();
    const risk = $riskFilter.val();

    // กรองข้อมูลจาก array ก่อน render เพื่อให้ logic แยกจาก DOM
    const filtered = findings.filter((item) => {
      const text = [item.id, item.area, item.requirement, item.owner, item.status, item.risk]
        .join(" ")
        .toLowerCase();

      const matchKeyword = !keyword || text.includes(keyword);
      const matchStatus = status === "all" || item.status === status;
      const matchRisk = risk === "all" || item.risk === risk;

      return matchKeyword && matchStatus && matchRisk;
    });

    renderDashboard(filtered);
  }

  function renderDashboard(data) {
    renderKpis(data);
    renderTable(data);
  }

  function renderKpis(data) {
    // คำนวณ KPI จากข้อมูลที่แสดงอยู่ตาม filter ปัจจุบัน
    $("#totalCount").text(data.length);
    $("#openCount").text(data.filter((item) => item.status === "Open").length);
    $("#progressCount").text(data.filter((item) => item.status === "In Progress").length);
    $("#closedCount").text(data.filter((item) => item.status === "Closed").length);
    $("#highRiskCount").text(data.filter((item) => item.risk === "High").length);
  }

  function renderTable(data) {
    $tableBody.empty();
    $resultSummary.text(`${data.length} finding(s) displayed`);

    if (data.length === 0) {
      $tableBody.append(
        $("<tr>").append(
          $("<td>")
            .attr("colspan", 8)
            .addClass("empty-state")
            .text("No findings match the current filters.")
        )
      );
      return;
    }

    data.forEach((item) => {
      const $row = $("<tr>");

      // ใช้ .text() เพื่อ render ข้อมูลเป็นข้อความ ลดความเสี่ยง XSS
      $row.append($("<td>").text(item.id));
      $row.append($("<td>").text(item.area));
      $row.append($("<td>").text(item.requirement));
      $row.append($("<td>").append(createBadge(item.risk, `badge-${item.risk.toLowerCase()}`)));
      $row.append($("<td>").append(createBadge(item.status, statusClass(item.status))));
      $row.append($("<td>").text(item.owner));
      $row.append($("<td>").text(item.dueDate));
      $row.append(
        $("<td>").append(
          $("<button>")
            .addClass("btn-view")
            .attr("type", "button")
            .data("id", item.id)
            .text("View")
        )
      );

      $tableBody.append($row);
    });
  }

  function createBadge(text, className) {
    return $("<span>").addClass(`badge ${className}`).text(text);
  }

  function statusClass(status) {
    if (status === "Open") return "badge-open";
    if (status === "In Progress") return "badge-progress";
    return "badge-closed";
  }

  function renderDetail(item) {
    $detailBox.removeClass("empty-state").empty();

    const fields = [
      ["Finding", `${item.id} — ${item.area}`],
      ["Requirement", item.requirement],
      ["Details", item.details],
      ["Root Cause", item.rootCause],
      ["Corrective Action", item.correctiveAction],
      ["Evidence Required", item.evidence]
    ];

    fields.forEach(([label, value]) => {
      $detailBox.append($("<p>").addClass("detail-label").text(label));
      $detailBox.append($("<p>").text(value));
    });
  }

  function renderEmptyDetail() {
    $detailBox.addClass("empty-state").empty().text("No finding selected.");
  }
});
