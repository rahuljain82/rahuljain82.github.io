# Setup Guide for Your Existing Google Apps Script

## Overview
Your existing Google Apps Script code is perfect! The updated `index.html` has been modified to work seamlessly with your script that fetches data from your Google Sheet.

## Your Current Script
```javascript
function doGet(e) {
  const ss = SpreadsheetApp.openById("1wLGD_BvBKgN-8YZvgfdqmYDrJlMbpxLFFGDxJhMga3g");
  const sheet = ss.getSheetByName("Sheet1");
  const rows = sheet.getDataRange().getValues();
  const [headers, ...data] = rows;
  const items = data.map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
  return ContentService
    .createTextOutput(JSON.stringify(items))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Setup Steps

### 1. Update Your Google Sheet Structure
Make sure your Google Sheet (`Sheet1`) has these column headers in the first row:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| name | date | city | description | registrationLink | busAvailable | bibdetails | display |

**Note**: Column names are case-insensitive. You can use `Name`, `Date`, `City`, etc.

### 2. Deploy Your Script (if not already done)
1. In your Google Apps Script project, click **Deploy** > **New deployment**
2. Choose type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy**
6. Copy the web app URL

### 3. Update index.html
In the `index.html` file, find this line:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec';
```

Replace `YOUR_SCRIPT_ID_HERE` with your actual script ID from the deployment URL.

### 4. Sample Data Format
Your Google Sheet should have data like this:

| name | date | city | description | registrationLink | busAvailable | bibdetails | display |
|------|------|------|-------------|------------------|--------------|------------|---------|
| Stonehill Marathon 2025 | 2025-09-07 | Bangalore | 5k, 10k and Half Marathon | https://raadiantsports.com/registration/ | FALSE | FALSE | TRUE |
| Wipro Bengaluru Marathon | 2025-09-21 | Bengaluru | Early bird ended | https://mysamay.in/public/event/info/... | FALSE | FALSE | TRUE |

## Features That Will Work Automatically

### ✅ **Display Control**
- Set `display` column to `FALSE` to hide a marathon from the app
- Set to `TRUE` or leave empty to show the marathon

### ✅ **Automatic Date Filtering**
- Only marathons with future dates will appear
- Past marathons are automatically hidden

### ✅ **Bus and Bib Buttons**
- Set `busAvailable` to `TRUE` to show "Bus Available" button
- Set `bibdetails` to `TRUE` to show "Bib Details" button

### ✅ **Dynamic Updates**
- Add new marathons to your sheet - they'll appear automatically
- Use the refresh button or wait for auto-refresh (every 30 minutes)

## Date Formats Supported
The app handles various date formats:
- `2025-09-07` (YYYY-MM-DD) - Recommended
- `07/09/2025` (DD/MM/YYYY)
- `09/07/2025` (MM/DD/YYYY)
- Excel date numbers

## Boolean Values Supported
For `busAvailable`, `bibdetails`, and `display` columns:
- `TRUE`, `true`, `1`, `yes` = True
- `FALSE`, `false`, `0`, `no` = False
- Empty = False (except `display` which defaults to True)

## Testing Your Setup

### 1. Test Your Script
1. In Google Apps Script, run your `doGet()` function manually
2. Check the execution log for any errors
3. The function should return JSON data

### 2. Test the Web App
1. Visit your deployed web app URL directly in a browser
2. You should see JSON data of your marathons
3. If you see an error, check your sheet structure and permissions

### 3. Test the Integration
1. Open `index.html` in a browser
2. Check browser console (F12) for any errors
3. You should see: "Loading marathons from Google Apps Script..." followed by "Loaded X marathons"

## Troubleshooting

### Common Issues:

1. **No marathons showing**
   - Check that `display` column is TRUE or empty
   - Verify dates are in the future
   - Check browser console for errors

2. **Script errors**
   - Make sure your sheet is named "Sheet1" or update the script
   - Verify the sheet ID in your script is correct
   - Check that required columns exist

3. **Permission errors**
   - Ensure the web app is deployed with "Anyone" access
   - Make sure you've authorized the script to access your sheets

## Your Advantages

✅ **Simple Code** - Your script is clean and efficient  
✅ **No Changes Needed** - Your existing script works perfectly  
✅ **Flexible** - Works with any column names (case-insensitive)  
✅ **Dynamic** - Automatically adapts to your sheet structure  

The updated `index.html` is specifically designed to work with your existing Google Apps Script, so you don't need to change anything in your script code!