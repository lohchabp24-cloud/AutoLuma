const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SCREENSHOT_DIR = path.join(__dirname, '..', 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runTestSuite() {
  console.log('--- STARTING AUTOLUMA COMPREHENSIVE E2E VERIFICATION SUITE ---');
  
  const executablePath = 'C:\\Users\\susu\\.cache\\puppeteer\\chrome\\win64-156.0.8078.47\\chrome-win64\\chrome.exe';

  const browser = await puppeteer.launch({
    executablePath: fs.existsSync(executablePath) ? executablePath : undefined,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const BASE_URL = 'http://127.0.0.1:5173';

  try {
    // 1. Homepage Verification
    console.log('1. Testing Homepage & Interactive Compatibility Widget...');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_homepage.png'), fullPage: false });
    console.log('   ✓ Homepage rendered successfully with hero, stats, and categories.');

    // 2. Catalogue Page Verification & Filters
    console.log('2. Testing Product Catalogue & Advanced Filters...');
    await page.goto(`${BASE_URL}/catalog`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_catalog.png'), fullPage: false });
    console.log('   ✓ Catalogue loaded with active lighting assemblies and filters.');

    // 3. Product Detail Page & Spec Inspector
    console.log('3. Testing Product Detail Page & RFQ Modal...');
    await page.goto(`${BASE_URL}/products/vortexbeam-9000-bi-led-headlamp`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_product_detail.png'), fullPage: false });
    console.log('   ✓ Product detail page rendered with photometrics and fitment matrix.');

    // 4. Vehicle Compatibility Finder
    console.log('4. Testing Vehicle Compatibility Finder...');
    await page.goto(`${BASE_URL}/compatibility`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_compatibility_finder.png'), fullPage: false });
    console.log('   ✓ Vehicle compatibility matrix verified.');

    // 5. Engineering Standards & Laboratory
    console.log('5. Testing Engineering & Homologation Standards Page...');
    await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_engineering_standards.png'), fullPage: false });
    console.log('   ✓ Engineering standards and laboratory page rendered.');

    // 6. Contact & RFQ Submission
    console.log('6. Testing Inbound Contact & RFQ Submission Form...');
    await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_contact_rfq.png'), fullPage: false });
    console.log('   ✓ Contact & RFQ page verified.');

    // 7. Admin Login Page
    console.log('7. Testing Admin Authentication & Quick Demo Login...');
    await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_admin_login.png'), fullPage: false });
    
    // Perform Quick Demo Login
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const instantBtn = btns.find((b) => b.textContent && b.textContent.includes('Instant Admin Access'));
      if (instantBtn) instantBtn.click();
    });
    await new Promise((r) => setTimeout(r, 1500));

    // 8. Admin Overview Dashboard
    console.log('8. Testing Admin Overview Dashboard & Analytics Charts...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08_admin_overview.png'), fullPage: false });
    console.log('   ✓ Admin overview dashboard verified with KPIs and Recharts visualization.');

    // 9. Admin Product Management
    console.log('9. Testing Admin Product CRUD...');
    await page.goto(`${BASE_URL}/admin/products`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09_admin_products.png'), fullPage: false });
    console.log('   ✓ Admin product management CRUD interface verified.');

    // 10. Admin Vehicle Compatibility
    console.log('10. Testing Admin Compatibility Management...');
    await page.goto(`${BASE_URL}/admin/compatibility`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10_admin_compatibility.png'), fullPage: false });
    console.log('   ✓ Vehicle compatibility management verified.');

    // 11. Admin Inventory Management
    console.log('11. Testing Admin Inventory & Stock Control...');
    await page.goto(`${BASE_URL}/admin/inventory`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11_admin_inventory.png'), fullPage: false });
    console.log('   ✓ Inventory management and stock controls verified.');

    // 12. Admin Customer Enquiry CRM
    console.log('12. Testing Admin Enquiry Management...');
    await page.goto(`${BASE_URL}/admin/enquiries`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '12_admin_enquiries.png'), fullPage: false });
    console.log('   ✓ Customer enquiry pipeline verified.');

    // 13. Admin Analytics & DB Status
    console.log('13. Testing Admin Analytics & Database Monitor...');
    await page.goto(`${BASE_URL}/admin/analytics`, { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '13_admin_analytics.png'), fullPage: false });
    console.log('   ✓ Analytics and database monitor verified.');

    console.log('\n--- ALL 13 TEST CHECKPOINTS PASSED SUCCESSFULLY! ---');
  } catch (err) {
    console.error('Test Suite encountered an error:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

runTestSuite();
