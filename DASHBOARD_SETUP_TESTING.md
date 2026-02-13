# Dashboard Setup & Testing Guide

## Quick Setup (5 minutes)

### Step 1: Verify json-server is running

```bash
# Terminal 1: Start json-server
json-server --watch db.json --port 3001
```

Expected output:
```
  \o/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3001/customers
  http://localhost:3001/transactions
  http://localhost:3001/packages

  Home
  http://localhost:3001
```

### Step 2: Add test data to `db.json`

```json
{
  "customers": [
    { "id": 1, "name": "Budi Santoso", "email": "budi@company.com" },
    { "id": 2, "name": "Siti Nurhaliza", "email": "siti@company.com" },
    { "id": 3, "name": "Ahmad Wijaya", "email": "ahmad@company.com" }
  ],
  "packages": [
    { "id": 1, "name": "Paket Bronze", "price": 50000, "bandwidth": "10GB", "duration": "1 bulan" },
    { "id": 2, "name": "Paket Silver", "price": 100000, "bandwidth": "50GB", "duration": "1 bulan" },
    { "id": 3, "name": "Paket Gold", "price": 150000, "bandwidth": "100GB", "duration": "1 bulan" },
    { "id": 4, "name": "Paket Platinum", "price": 250000, "bandwidth": "500GB", "duration": "1 bulan" }
  ],
  "transactions": [
    { "id": 1, "customerId": 1, "packageId": 2, "date": "2024-02-13T10:30:00Z", "status": "completed" },
    { "id": 2, "customerId": 2, "packageId": 3, "date": "2024-02-12T09:15:00Z", "status": "completed" },
    { "id": 3, "customerId": 3, "packageId": 4, "date": "2024-02-11T14:45:00Z", "status": "completed" },
    { "id": 4, "customerId": 1, "packageId": 1, "date": "2024-02-10T11:20:00Z", "status": "completed" },
    { "id": 5, "customerId": 2, "packageId": 2, "date": "2024-02-09T16:00:00Z", "status": "completed" }
  ]
}
```

### Step 3: Start React dev server

```bash
# Terminal 2: Start React app
npm run dev
```

### Step 4: Navigate to Dashboard

1. Open `http://localhost:5173` (or your dev server port)
2. Login (if required)
3. Click on Dashboard
4. You should see:
   - Loading spinner briefly
   - 4 statistics cards
   - Recent transactions table

---

## Expected Output

### Statistics Cards

```
┌──────────────────────┬──────────────────────┬──────────────────────┬──────────────────────┐
│        👥            │         📊           │         💰           │         📦           │
│ Total Pelanggan      │ Total Transaksi      │ Total Pendapatan     │ Total Paket          │
│        3             │         5            │    Rp 650.000        │         4            │
└──────────────────────┴──────────────────────┴──────────────────────┴──────────────────────┘
```

**How calculated:**
- Total Pelanggan: Count of customers = 3 ✅
- Total Transaksi: Count of transactions = 5 ✅
- Total Pendapatan: 100k + 150k + 250k + 50k + 100k = **650,000** ✅
- Total Paket: Count of packages = 4 ✅

### Recent Transactions Table

```
┌───┬──────────────────┬────────────────┬──────────────┬──────────────────────┐
│ # │ Nama Pelanggan   │ Nama Paket     │ Harga        │ Tanggal Transaksi   │
├───┼──────────────────┼────────────────┼──────────────┼──────────────────────┤
│ 1 │ Budi Santoso     │ Paket Silver   │ Rp 100.000   │ 13 Feb 2024 10:30   │
│ 2 │ Siti Nurhaliza   │ Paket Gold     │ Rp 150.000   │ 12 Feb 2024 09:15   │
│ 3 │ Ahmad Wijaya     │ Paket Platinum │ Rp 250.000   │ 11 Feb 2024 14:45   │
│ 4 │ Budi Santoso     │ Paket Bronze   │ Rp 50.000    │ 10 Feb 2024 11:20   │
│ 5 │ Siti Nurhaliza   │ Paket Silver   │ Rp 100.000   │ 9 Feb 2024 16:00    │
└───┴──────────────────┴────────────────┴──────────────┴──────────────────────┘
```

**Note:** Table shows latest 5, sorted by date (newest first)

---

## Manual Calculation Verification

### Step 1: Get Transaction Data

```
Transaction 1: Budi (customerId: 1) bought Silver (packageId: 2)
Transaction 2: Siti (customerId: 2) bought Gold (packageId: 3)
Transaction 3: Ahmad (customerId: 3) bought Platinum (packageId: 4)
Transaction 4: Budi (customerId: 1) bought Bronze (packageId: 1)
Transaction 5: Siti (customerId: 2) bought Silver (packageId: 2)
```

### Step 2: Look up Package Prices

```
Silver (Id: 2) → Price: 100,000
Gold (Id: 3) → Price: 150,000
Platinum (Id: 4) → Price: 250,000
Bronze (Id: 1) → Price: 50,000
Silver (Id: 2) → Price: 100,000
```

### Step 3: Calculate Total

```
100,000
+ 150,000
+ 250,000
+  50,000
+ 100,000
─────────
650,000 ✅
```

**Dashboard shows: Rp 650.000 ✓**

---

## Test Scenarios

### Scenario 1: Normal Load (Happy Path)

**Setup:** db.json with complete data (see above)

**Expected:**
- ✅ No loading spinner (fast)
- ✅ 4 stat cards visible
- ✅ Revenue = 650,000
- ✅ 5 transactions in table
- ✅ Data is enriched (customer names, package names)

### Scenario 2: Empty Database

**Setup:** Clear db.json

```json
{
  "customers": [],
  "packages": [],
  "transactions": []
}
```

**Expected:**
- ✅ Stats show: 0 / 0 / Rp 0 / 0
- ✅ "Tidak ada transaksi terbaru" message
- ✅ No table displayed

### Scenario 3: Partial Data (Missing Price)

**Setup:** Package without price field

```json
{
  "packages": [
    { "id": 1, "name": "Paket Bronze" }  // ← No price!
  ],
  "transactions": [
    { "id": 1, "customerId": 1, "packageId": 1, "date": "2024-02-13" }
  ]
}
```

**Expected:**
- ✅ Revenue = 0 (defaults to 0 for missing price)
- ✅ Price shows as "Rp 0" in table
- ✅ No errors in console

### Scenario 4: Add New Transaction

**Step 1:** Open another terminal and add transaction

```bash
curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -d '{"customerId": 1, "packageId": 2, "date": "2024-02-14T10:00:00Z"}'
```

**Step 2:** Refresh dashboard

**Expected:**
- ✅ New transaction appears at top of table
- ✅ Revenue increases

### Scenario 5: API Connection Error

**Step 1:** Stop json-server

```bash
# Ctrl+C in Terminal 1
```

**Step 2:** Refresh dashboard

**Expected:**
- ✅ Loading spinner shows
- ✅ After ~5 seconds: Error message "⚠️ Gagal memuat data dashboard"
- ✅ "Coba Lagi" button visible
- ✅ Console shows error details

**Step 3:** Restart json-server and click retry

```bash
# Restart json-server
json-server --watch db.json --port 3001

# Click "Coba Lagi" button
```

**Expected:**
- ✅ Dashboard reloads successfully
- ✅ Stats and transactions show again

---

## Browser DevTools Testing

### Console Debugging

Open DevTools (F12) → Console tab

**Check for:**
```javascript
// Should NOT see errors like:
// ❌ Cannot read property 'id' of undefined
// ❌ packageMap[packageId] is undefined
// ❌ AxiosError: Network Error

// Should see successful fetch:
// ✅ No errors (clean console)
```

### Network Tab

Open DevTools → Network tab → Refresh page

**Look for:**
```
✅ GET http://localhost:3001/customers - 200 OK - 2ms
✅ GET http://localhost:3001/transactions - 200 OK - 2ms
✅ GET http://localhost:3001/packages - 200 OK - 2ms
```

All three should load in parallel (same timeline), not sequentially.

### React DevTools

Install React DevTools browser extension

**Check:**
1. Expand `<Dashboard>` component
2. Look at `dashboardData` state
3. Verify it has `customers`, `transactions`, `packages`:
   ```
   dashboardData = {
     customers: Array(3),
     transactions: Array(5),
     packages: Array(4)
   }
   ```

---

## Responsive Testing

### Mobile View (375px)

```bash
# Open DevTools
# Press Ctrl+Shift+M (or toggle device toolbar)
# Select iPhone SE (375x667)
```

**Expected:**
- ✅ Stat cards stack vertically (1 column)
- ✅ Text not cut off
- ✅ Table readable (horizontal scroll if needed)
- ✅ Table font size reduced but readable

### Tablet View (768px)

```bash
# Select iPad (768x1024) in DevTools
```

**Expected:**
- ✅ Stat cards in 2 columns
- ✅ Table shows all columns
- ✅ Proper spacing

### Desktop View (1200px+)

```bash
# Full screen
```

**Expected:**
- ✅ Stat cards in 4 columns
- ✅ Max-width of 1200px container
- ✅ Proper spacing and alignment

---

## Dark Mode Testing

If your app has a dark mode toggle:

**Click theme toggle:**

**Expected:**
- ✅ Background changes to dark
- ✅ Cards change to dark
- ✅ Text stays readable (light color)
- ✅ All elements properly themed

---

## Performance Testing

### Lighthouse Audit

```bash
# Chrome DevTools → Lighthouse
# Generate report
```

**Target scores:**
- ✅ Performance: >90
- ✅ Accessibility: >90
- ✅ Best Practices: >90

### Load Testing

**Test with large dataset:**

```bash
# Create 10,000 transactions in db.json
npm install faker-js
node generate-test-data.js
```

**Monitor:**
- ✅ Dashboard still loads in <1 second
- ✅ No UI freezing
- ✅ No console errors
- ✅ Browser not using excessive memory

---

## Step-by-Step Verification Checklist

### ✅ Pre-requisites
- [ ] Node.js installed
- [ ] json-server installed globally or locally
- [ ] db.json exists in project root
- [ ] React dev server can start

### ✅ Setup Phase
- [ ] json-server running on port 3001
- [ ] Test data added to db.json
- [ ] React dev server running
- [ ] No console errors on startup

### ✅ Display Phase
- [ ] Dashboard page loads
- [ ] Loading spinner shows briefly
- [ ] 4 statistics cards appear
- [ ] Numbers are calculated correctly
- [ ] Recent transactions table shows
- [ ] All 5 rows displayed

### ✅ Calculation Phase
- [ ] Revenue = sum of all transaction package prices
- [ ] Customer names enriched correctly
- [ ] Package names enriched correctly
- [ ] Prices formatted as "Rp xxx.xxx"
- [ ] Dates formatted nicely

### ✅ Interaction Phase
- [ ] Hover over stat cards (lift effect)
- [ ] Hover over table rows (color change)
- [ ] Click retry button after simulated error
- [ ] Responsive on mobile (vertical stack)
- [ ] Dark mode works (if applicable)

### ✅ Error Handling
- [ ] Stop json-server → Error message shows
- [ ] Remove price field → Defaults to 0
- [ ] Empty database → Empty state message
- [ ] Retry button → Reloads data

### ✅ Performance
- [ ] Initial load < 100ms
- [ ] No UI lag or freezing
- [ ] Console has no errors
- [ ] Network tab shows parallel requests

---

## Troubleshooting Common Issues

### Issue: "Gagal memuat data dashboard" error

**Cause 1: json-server not running**
```bash
# Check if running
lsof -i :3001

# If not, start it
json-server --watch db.json --port 3001
```

**Cause 2: Wrong port number**
```bash
# Verify in dashboardService.js
baseURL: "http://localhost:3001"  // Should be 3001
```

**Cause 3: db.json has syntax error**
```bash
# Validate JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('db.json')))"
```

### Issue: Revenue shows 0 even with transactions

**Cause:** Package prices missing
```bash
# Check each package has price field
# ❌ { "id": 1, "name": "Bronze" }
# ✅ { "id": 1, "name": "Bronze", "price": 50000 }
```

### Issue: Table shows "Unknown" for customer/package names

**Cause:** IDs don't match between tables

```bash
# Transaction references packageId that doesn't exist
# { "packageId": 99 }  ← No package with id 99

# Fix: Verify all foreign keys match
```

### Issue: Mobile view not responsive

**Cause:** CSS media queries not loading
```bash
# Rebuild CSS
npm run build  # if applicable

# Or hard refresh
Ctrl+Shift+R or Cmd+Shift+R
```

---

## Success Indicators

You'll know it's working when:

✅ You see 4 colorful stat cards with numbers
✅ Revenue calculation matches manual math
✅ Table shows last 5 transactions with customer names
✅ All dates are formatted nicely
✅ No red errors in browser console
✅ Responsive on mobile (cards stack vertically)
✅ Clicking retry after error reloads data
✅ Loading spinner briefly shows on first load

---

## Next Steps

If everything works:
1. ✅ Dashboard is ready for production
2. ✅ Test with your actual data
3. ✅ Integrate with authentication
4. ✅ Consider Phase 2 enhancements (filters, charts, etc.)
5. ✅ Deploy to production

If issues:
1. Check troubleshooting section above
2. Review browser console for specific errors
3. Verify all files are created (dashboardService.js, etc.)
4. Check DASHBOARD_IMPLEMENTATION.md for detailed explanation

---

**Happy testing! 🎉**
