# Vercel Deployment Guide

## ขั้นตอนการ Deploy Backend API ขึ้น Vercel

### 1. เตรียม Environment Variables

คุณต้องตั้งค่า Environment Variables ใน Vercel Dashboard:

```
DATABASE_URL=your_postgresql_connection_string
DIRECT_URL=your_postgresql_direct_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
NODE_ENV=production
```

### 2. Database Setup

- ใช้ PostgreSQL database (แนะนำใช้ Supabase, Neon, หรือ Railway)
- ต้องมี connection string ที่รองรับ SSL
- ตัวอย่าง DATABASE_URL: `postgresql://username:password@host:port/database?sslmode=require`

### 3. Deploy ผ่าน Vercel CLI

```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Login เข้า Vercel
vercel login

# Deploy project
cd budget-backend-devyong
vercel

# หรือ deploy ไปยัง production
vercel --prod
```

### 4. Deploy ผ่าน GitHub Integration

1. Push code ไปยัง GitHub repository
2. เชื่อมต่อ repository กับ Vercel
3. ตั้งค่า Environment Variables ใน Vercel Dashboard
4. Deploy อัตโนมัติ

### 5. ไฟล์ที่สำคัญสำหรับ Vercel

- `vercel.json` - Vercel configuration (ใช้ functions แทน builds)
- `src/main.ts` - Entry point
- `package.json` - Dependencies และ scripts

### 6. การแก้ไขปัญหา

#### ปัญหา Module Path
- ใช้ relative path import แทน absolute path
- ตัวอย่าง: `import { PrismaService } from '../prisma/prisma.service';`

#### ปัญหา Database Connection
- ตรวจสอบ DATABASE_URL และ DIRECT_URL
- ต้องใช้ SSL connection สำหรับ production

#### ปัญหา Build
- ตรวจสอบ TypeScript compilation
- ตรวจสอบ dependencies ใน package.json

### 7. API Endpoints

หลังจาก deploy สำเร็จ API จะอยู่ที่:
- Base URL: `https://your-project.vercel.app`
- API Prefix: `/api`
- ตัวอย่าง: `https://your-project.vercel.app/api/auth/login`

### 8. Monitoring

- ตรวจสอบ logs ใน Vercel Dashboard
- ใช้ Vercel Analytics สำหรับ monitoring
- ตั้งค่า alerts สำหรับ errors

### 9. Environment Variables ที่จำเป็น

```env
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# Environment
NODE_ENV=production
```

### 10. การ Update

เมื่อต้องการ update API:
1. Push code ใหม่ไปยัง GitHub
2. Vercel จะ auto-deploy
3. หรือใช้ `vercel --prod` สำหรับ manual deploy
