# การ Deploy บน Vercel

## ขั้นตอนการ Deploy

### 1. เตรียม Database
- ใช้ PostgreSQL database (แนะนำใช้ Neon, Supabase, หรือ Railway)
- ตั้งค่า DATABASE_URL และ DIRECT_URL ใน Vercel Environment Variables

### 2. ติดตั้ง Vercel CLI
```bash
npm install -g vercel
```

### 3. Login เข้า Vercel
```bash
vercel login
```

### 4. Deploy โปรเจค
```bash
vercel
```

### 5. ตั้งค่า Environment Variables ใน Vercel Dashboard
ไปที่ Vercel Dashboard > โปรเจค > Settings > Environment Variables และเพิ่ม:

```
DATABASE_URL=your_postgresql_connection_string
DIRECT_URL=your_postgresql_direct_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

### 6. รัน Database Migration
```bash
vercel env pull .env
npx prisma db push
```

## หมายเหตุสำคัญ

1. **Database**: ต้องใช้ PostgreSQL ที่รองรับ connection pooling
2. **CORS**: ตั้งค่า origin ให้ตรงกับ frontend domain
3. **JWT Secret**: ใช้ secret key ที่ปลอดภัยใน production
4. **Port**: Vercel จะใช้ PORT environment variable อัตโนมัติ

## การแก้ไขปัญหา

### หากมีปัญหาเรื่อง Database Connection
- ตรวจสอบ DATABASE_URL และ DIRECT_URL
- ตรวจสอบว่า database รองรับ connection pooling
- ใช้ connection pooling service เช่น PgBouncer

### หากมีปัญหาเรื่อง Build
- ตรวจสอบ Node.js version ใน Vercel
- ตรวจสอบ dependencies ใน package.json
- ดู build logs ใน Vercel Dashboard
