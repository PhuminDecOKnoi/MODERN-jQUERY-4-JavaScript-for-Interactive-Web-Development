// Example 05 — PHP-Style CRUD Mockup
// จุดประสงค์: จำลอง CRUD flow แบบ PHP/MySQL โดยยังไม่ต้องใช้ backend จริง

$(function () {
    // ข้อมูลจำลองแทน records ที่ปกติจะมาจาก MySQL ผ่าน PHP API
    let employees = [
        { id: 'EMP-001', name: 'Phumin Decoknoi', department: 'HR', status: 'Active' },
        { id: 'EMP-002', name: 'Audit Specialist', department: 'Audit', status: 'Active' },
        { id: 'EMP-003', name: 'Compliance Officer', department: 'Compliance', status: 'Inactive' },
        { id: 'EMP-004', name: 'IT Support', department: 'IT', status: 'Active' }
    ];

    // โหลดข้อมูลครั้งแรกเมื่อหน้าเว็บพร้อมใช้งาน
    renderApp();

    // เมื่อผู้ใช้ submit form ให้เพิ่ม record ใหม่
    $('#employeeForm').on('submit', function (event) {
        // ป้องกัน browser reload หน้า
        event.preventDefault();

        // อ่านค่าจาก form
        const employeeId = $('#employeeId').val().trim();
        const fullName = $('#fullName').val().trim();
        const department = $('#department').val();
        const status = $('#status').val();

        // ตรวจสอบข้อมูลก่อนเพิ่ม record
        if (!employeeId || !fullName || !department || !status) {
            showMessage('Please complete all required fields.', 'error');
            return;
        }

        // ตรวจสอบรหัสซ้ำ เหมือน validation ฝั่ง server ก่อน insert database
        const duplicate = employees.some(function (employee) {
            return employee.id.toLowerCase() === employeeId.toLowerCase();
        });

        if (duplicate) {
            showMessage('Employee ID already exists.', 'error');
            return;
        }

        // เพิ่ม record ใหม่เข้า array จำลอง
        employees.push({
            id: employeeId,
            name: fullName,
            department: department,
            status: status
        });

        // reset form หลังบันทึกสำเร็จ
        this.reset();

        // แสดงข้อความสถานะ
        showMessage('Employee record added successfully.', 'success');

        // render หน้าจอใหม่
        renderApp();
    });

    // เมื่อเปลี่ยน filter ให้ render table ใหม่
    $('#departmentFilter').on('change', function () {
        renderApp();
    });

    // ใช้ event delegation เพราะปุ่มในตารางถูกสร้างแบบ dynamic
    $('#employeeTable').on('click', '[data-action="toggle"]', function () {
        // อ่าน id จาก data attribute ของปุ่ม
        const id = $(this).data('id');

        // เปลี่ยนสถานะ Active/Inactive
        employees = employees.map(function (employee) {
            if (employee.id === id) {
                return {
                    ...employee,
                    status: employee.status === 'Active' ? 'Inactive' : 'Active'
                };
            }

            return employee;
        });

        showMessage('Employee status updated.', 'success');
        renderApp();
    });

    // ลบ record ด้วย event delegation
    $('#employeeTable').on('click', '[data-action="delete"]', function () {
        const id = $(this).data('id');

        // กรอง record ที่ไม่ใช่ id ที่ต้องการลบ
        employees = employees.filter(function (employee) {
            return employee.id !== id;
        });

        showMessage('Employee record deleted.', 'success');
        renderApp();
    });

    function renderApp() {
        // render KPI ก่อน
        renderKpis();

        // render table ตาม filter ปัจจุบัน
        renderTable(getFilteredEmployees());
    }

    function getFilteredEmployees() {
        // อ่านค่า department filter
        const selectedDepartment = $('#departmentFilter').val();

        // ถ้าเลือก All ให้คืนข้อมูลทั้งหมด
        if (selectedDepartment === 'All') {
            return employees;
        }

        // กรองเฉพาะ department ที่เลือก
        return employees.filter(function (employee) {
            return employee.department === selectedDepartment;
        });
    }

    function renderKpis() {
        // คำนวณจำนวนพนักงานทั้งหมด
        $('#totalEmployees').text(employees.length);

        // คำนวณจำนวน Active
        const activeCount = employees.filter(function (employee) {
            return employee.status === 'Active';
        }).length;
        $('#activeEmployees').text(activeCount);

        // คำนวณจำนวน department แบบไม่ซ้ำ
        const departmentCount = new Set(employees.map(function (employee) {
            return employee.department;
        })).size;
        $('#departmentCount').text(departmentCount);
    }

    function renderTable(items) {
        const $table = $('#employeeTable');

        // ล้างข้อมูลเดิมก่อน render ใหม่
        $table.empty();

        if (items.length === 0) {
            $table.append('<tr><td colspan="5">No records found.</td></tr>');
            return;
        }

        // วนลูปข้อมูลเพื่อสร้างแถวในตาราง
        $.each(items, function (_, employee) {
            const badgeClass = employee.status === 'Active' ? 'active' : 'inactive';

            const row = `
                <tr>
                    <td>${escapeHtml(employee.id)}</td>
                    <td>${escapeHtml(employee.name)}</td>
                    <td>${escapeHtml(employee.department)}</td>
                    <td><span class="badge ${badgeClass}">${escapeHtml(employee.status)}</span></td>
                    <td>
                        <div class="action-row">
                            <button class="secondary" type="button" data-action="toggle" data-id="${escapeHtml(employee.id)}">
                                Toggle
                            </button>
                            <button class="danger" type="button" data-action="delete" data-id="${escapeHtml(employee.id)}">
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            `;

            $table.append(row);
        });
    }

    function showMessage(text, type) {
        // แสดงข้อความสถานะ และเปลี่ยน class ตาม success/error
        $('#formMessage')
            .removeClass('success error')
            .addClass(type)
            .text(text);
    }

    function escapeHtml(value) {
        // ป้องกัน XSS เบื้องต้นก่อนนำค่าลง HTML string
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }
});
