# GitHub Pages Deploy Guide

เอกสารนี้อธิบายแนวทาง Deploy Repository นี้ให้เป็น Static Site ผ่าน GitHub Pages

## 1. Site Entry Point

ไฟล์หลักของเว็บไซต์อยู่ที่ root ของ repository:

```text
index.html
assets/site.css
assets/site.js
.nojekyll
```

`index.html` ทำหน้าที่เป็น Landing Page ของหลักสูตร และเชื่อมโยงไปยัง:

- Lessons 01–20
- Examples 01–05
- Capstone Project
- Documentation

## 2. Deployment Method

Repository นี้มี GitHub Actions Workflow สำหรับ Deploy GitHub Pages:

```text
.github/workflows/pages.yml
```

Workflow จะทำงานเมื่อมีการ push เข้า branch `main` หรือเมื่อกด Run workflow ด้วยตนเอง

## 3. Recommended GitHub Pages Setting

ใน GitHub Repository ให้ตั้งค่า:

```text
Settings → Pages → Build and deployment → Source = GitHub Actions
```

หลังจากตั้งค่าแล้ว GitHub Actions จะ deploy เว็บไซต์จากไฟล์ static ทั้งหมดใน repository

## 4. Expected Site URL

โดยปกติ URL ของ GitHub Pages จะอยู่ในรูปแบบ:

```text
https://phumindecoknoi.github.io/MODERN-jQUERY-4-JavaScript-for-Interactive-Web-Development/
```

## 5. Local Preview

สามารถเปิดดูหน้าเว็บแบบ local ได้โดยเปิดไฟล์:

```text
index.html
```

หรือใช้ local server เช่น:

```bash
python -m http.server 8000
```

จากนั้นเปิด:

```text
http://localhost:8000
```

## 6. Quality Checklist

ก่อน Deploy ควรตรวจสอบ:

- [ ] หน้า `index.html` เปิดได้
- [ ] CSS โหลดจาก `assets/site.css`
- [ ] JavaScript โหลดจาก `assets/site.js`
- [ ] ลิงก์ Lessons 01–20 ทำงาน
- [ ] ลิงก์ Examples ทำงาน
- [ ] ลิงก์ Capstone Project ทำงาน
- [ ] GitHub Actions ผ่านโดยไม่มี error
- [ ] GitHub Pages แสดงผลบน mobile ได้ดี

## 7. Notes

ไฟล์ `.nojekyll` ถูกเพิ่มไว้เพื่อป้องกันไม่ให้ GitHub Pages ประมวลผล repository นี้ด้วย Jekyll โดยไม่จำเป็น ทำให้ static assets และโครงสร้าง folder ทำงานตรงตามที่กำหนด
