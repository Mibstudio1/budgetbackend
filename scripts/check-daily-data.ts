import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDailyData() {
  try {
    console.log('Checking daily data in database...');

    // ตรวจสอบข้อมูล Sales
    const sales = await prisma.bG_Sales_Entry.findMany({
      include: {
        bGProject: true
      },
      orderBy: {
        date: 'asc'
      }
    });

    console.log('\n=== SALES ENTRIES ===');
    console.log(`Total sales entries: ${sales.length}`);
    
    if (sales.length > 0) {
      sales.forEach((sale, index) => {
        console.log(`${index + 1}. Date: ${sale.date}, Amount: ${sale.totalPrice}, Project: ${sale.bGProject?.name || 'No Project'}`);
      });
    } else {
      console.log('No sales entries found');
    }

    // ตรวจสอบข้อมูล Expenses
    const expenses = await prisma.bG_Expense_Entries.findMany({
      include: {
        bGProject: true
      },
      orderBy: {
        date: 'asc'
      }
    });

    console.log('\n=== EXPENSE ENTRIES ===');
    console.log(`Total expense entries: ${expenses.length}`);
    
    if (expenses.length > 0) {
      expenses.forEach((expense, index) => {
        console.log(`${index + 1}. Date: ${expense.date}, Amount: ${expense.cost}, Name: ${expense.name}, Project: ${expense.bGProject?.name || 'No Project'}`);
      });
    } else {
      console.log('No expense entries found');
    }

    // ตรวจสอบข้อมูลในเดือนสิงหาคม 2025
    console.log('\n=== AUGUST 2025 DATA ===');
    const augustSales = sales.filter(sale => sale.date.startsWith('2025-08'));
    const augustExpenses = expenses.filter(expense => expense.date.startsWith('2025-08'));

    console.log(`Sales in August 2025: ${augustSales.length}`);
    augustSales.forEach((sale, index) => {
      console.log(`${index + 1}. Date: ${sale.date}, Amount: ${sale.totalPrice}, Project: ${sale.bGProject?.name || 'No Project'}`);
    });

    console.log(`Expenses in August 2025: ${augustExpenses.length}`);
    augustExpenses.forEach((expense, index) => {
      console.log(`${index + 1}. Date: ${expense.date}, Amount: ${expense.cost}, Name: ${expense.name}, Project: ${expense.bGProject?.name || 'No Project'}`);
    });

  } catch (error) {
    console.error('Error checking daily data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDailyData();
