import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkRevenueTargets() {
  try {
    console.log('Checking revenue targets in database...');

    // ตรวจสอบข้อมูล Revenue Targets ทั้งหมด
    const allTargets = await prisma.bG_Revenue_Targets.findMany({
      orderBy: { month: 'asc' }
    });

    console.log('\n=== ALL REVENUE TARGETS ===');
    console.log(`Total revenue targets: ${allTargets.length}`);
    
    if (allTargets.length > 0) {
      allTargets.forEach((target, index) => {
        console.log(`${index + 1}. Month: "${target.month}", Target: ${target.target}, ID: ${target.id}`);
      });
    } else {
      console.log('No revenue targets found');
    }

    // ตรวจสอบข้อมูลสำหรับเดือนสิงหาคม 2025
    console.log('\n=== AUGUST 2025 TARGETS ===');
    const augustTargets = allTargets.filter(target => 
      target.month.includes('สิงหาคม') || 
      target.month.includes('2025-08') ||
      target.month === 'สิงหาคม 2025' ||
      target.month === '2025-08'
    );

    console.log(`August 2025 targets found: ${augustTargets.length}`);
    augustTargets.forEach((target, index) => {
      console.log(`${index + 1}. Month: "${target.month}", Target: ${target.target}, ID: ${target.id}`);
    });

    // ตรวจสอบข้อมูลสำหรับปี 2025
    console.log('\n=== 2025 TARGETS ===');
    const targets2025 = allTargets.filter(target => 
      target.month.includes('2025')
    );

    console.log(`2025 targets found: ${targets2025.length}`);
    targets2025.forEach((target, index) => {
      console.log(`${index + 1}. Month: "${target.month}", Target: ${target.target}, ID: ${target.id}`);
    });

  } catch (error) {
    console.error('Error checking revenue targets:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkRevenueTargets();
