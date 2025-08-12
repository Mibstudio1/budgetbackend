# 📦 Backend API - JWT Authentication (NestJS)

RESTful API สำหรับระบบที่มีการ login / authentication ด้วย JWT พร้อมระบบป้องกัน route ด้วย `AuthGuard` (Bearer Token)

---

## 🚀 Technologies Used

- [NestJS](https://nestjs.com/) - Node.js Framework
- [JWT](https://jwt.io/) - JSON Web Token
- [class-validator](https://github.com/typestack/class-validator) - Validation
- [Passport](http://www.passportjs.org/) - Authentication middleware
- [Prisma ORM](https://www.prisma.io/) - ORM สำหรับเชื่อมต่อฐานข้อมูล

---

## 📄 Installation

```bash
npm install
```

## 🧪 Run the App

```bash
npm run start:dev
```

## 🔐 Authentication Flow

- LOGIN Request body

```json
username: "admin",
password: "yourpassword"
```

Respone

```json
name: "yourname",
role: "yourrole",
token: "grp-,zpdf.1asdgb3..."
```

- REGISTER Request body

```json
name: "yourname",
username: "admin",
password: "yourpassword",
role: "yourrole",
```

Respone

```json
name: "yourname",
role: "yourrole",
token: "grp-,zpdf.1asdgb3..."
```

## 🔐 How to use the token

ในทุก request ยกเว้น Option ที่ต้องใช้ auth ให้ส่ง header:

```json
Authorization: Bearer <token>
```

## 🛡️ Protected Route Example
GET /project/all-projects
Require: Authorization Header

✅ ต้องส่ง Authorization: Bearer <token> ถึงจะเข้าได้

❌ หากไม่ส่ง หรือส่งผิด จะได้รับ HTTP 401 Unauthorized
# budgetbackend
