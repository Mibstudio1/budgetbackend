# Vercel Deployment Guide

## การ Deploy บน Vercel

### 1. Environment Variables
ตั้งค่า Environment Variables ใน Vercel Dashboard:

```
DATABASE_URL=postgresql://postgres.dwnkbropmczpyxtzcymh:Yg7!wzQp@39LmXv%@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.dwnkbropmczpyxtzcymh:Yg7!wzQp@39LmXv%@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
JWT_SECRET=9c728a27a5cf6e9b06a0e36482a5cc47a90e037de1f184cfa8d1c8582d02c7dbf3d6ac0aa56a1e689740f9f5f8adf8a344cd96a1f716c1dfd87f0e21888460a4
NODE_ENV=production
```

### 2. Build Settings
- **Framework Preset**: Node.js
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. API Endpoints
หลังจาก deploy สำเร็จ API จะอยู่ที่:
- `https://your-project.vercel.app/api/authen/register`
- `https://your-project.vercel.app/api/authen/login`
- และ endpoints อื่นๆ

### 4. Troubleshooting
หากมีปัญหา:
1. ตรวจสอบ Environment Variables
2. ตรวจสอบ Database Connection
3. ดู Build Logs ใน Vercel Dashboard
