import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedRevenueTargets() {
  try {
    console.log('Starting revenue targets cleanup and seeding...');

    // Delete all existing revenue targets to clean up duplicates
    console.log('Deleting all existing revenue targets...');
    await prisma.bG_Revenue_Targets.deleteMany({});
    console.log('All existing revenue targets deleted');

    // Create new revenue targets for 2025
    const months = [
      '2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06',
      '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12'
    ];

    const targets = [
      100000, 120000, 150000, 180000, 200000, 220000,
      250000, 280000, 300000, 320000, 350000, 400000
    ];

    console.log('Creating new revenue targets for 2025...');
    
    for (let i = 0; i < months.length; i++) {
      const target = await prisma.bG_Revenue_Targets.create({
        data: {
          month: months[i],
          target: targets[i],
          createdBy: 'system'
        }
      });
      console.log(`Created target for ${months[i]}: ${targets[i].toLocaleString()} THB`);
    }

    console.log('\n=== REVENUE TARGETS SEEDING COMPLETED ===');
    console.log(`Total targets created: ${months.length}`);

    // Verify the data
    const allTargets = await prisma.bG_Revenue_Targets.findMany({
      orderBy: { month: 'asc' }
    });

    console.log('\n=== VERIFICATION ===');
    allTargets.forEach((target, index) => {
      console.log(`${index + 1}. Month: ${target.month}, Target: ${target.target.toLocaleString()} THB, ID: ${target.id}`);
    });

  } catch (error) {
    console.error('Error seeding revenue targets:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedRevenueTargets();
