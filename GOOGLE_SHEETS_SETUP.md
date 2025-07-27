# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for your Marathon App to dynamically manage marathon card details.

## Prerequisites

1. A Google account
2. Access to Google Sheets
3. Google Cloud Console access (for API key)

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Marathon Events Database"
4. Set up the following column headers in row 1:

| Column | Header | Description | Example |
|--------|--------|-------------|---------|
| A | Name | Marathon event name | "Mumbai Marathon 2025" |
| B | Date | Event date (YYYY-MM-DD format) | "2025-01-19" |
| C | City | Event city/location | "Mumbai" |
| D | Description | Brief description | "Full Marathon, Half Marathon, 10K" |
| E | Registration Link | URL for registration | "https://example.com/register" |
| F | Bus Available | true/false | "true" or "false" |
| G | Bib Details | true/false | "true" or "false" |
| H | Display Flag | true/false (controls visibility) | "true" or "false" |

## Step 2: Sample Data

Here's some sample data you can add to test the integration:

```
Name                    | Date       | City      | Description                  | Registration Link                    | Bus Available | Bib Details | Display Flag
Mumbai Marathon 2025    | 2025-01-19 | Mumbai    | Full Marathon, Half, 10K     | https://mumbaimarathon.com          | true          | true        | true
Delhi Half Marathon     | 2025-02-15 | Delhi     | Half Marathon and 10K        | https://delhihalfmarathon.com       | false         | true        | true
Bangalore Ultra         | 2025-03-10 | Bangalore | 50K and 25K Ultra           | https://bangaloreultra.com          | true          | false       | true
Chennai Coastal Run     | 2025-04-05 | Chennai   | 21K Coastal Route            | https://chennaicoastal.com          | false         | false       | false
```

## Step 3: Get Google Sheets API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click on it and press "Enable"
4. Create an API key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy the generated API key
   - (Optional) Restrict the API key to only Google Sheets API for security

## Step 4: Make Your Sheet Public

1. In your Google Sheet, click the "Share" button
2. Change access to "Anyone with the link can view"
3. Copy the sheet ID from the URL
   - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Extract the `SHEET_ID_HERE` part

## Step 5: Configure the Application

1. Open your `index.html` file
2. Find the `GOOGLE_SHEETS_CONFIG` object
3. Replace the placeholder values:

```javascript
const GOOGLE_SHEETS_CONFIG = {
  // Replace with your Google Sheets ID from the URL
  sheetId: 'YOUR_ACTUAL_SHEET_ID_HERE',
  // Replace with your Google Sheets API key
  apiKey: 'YOUR_ACTUAL_API_KEY_HERE',
  // Sheet name/tab (change if you renamed the sheet tab)
  sheetName: 'Sheet1',
  // Range to fetch (A:H means columns A through H, all rows)
  range: 'A:H'
};
```

## Step 6: Test the Integration

1. Open your application in a web browser
2. Check the browser console for any errors
3. Verify that marathons are loading from your Google Sheet
4. Test the following scenarios:
   - Add a new marathon with a future date → Should appear in the app
   - Set Display Flag to "false" → Marathon should not appear
   - Set a date in the past → Marathon should not appear
   - Change marathon details → Should update in the app after refresh

## Features Implemented

### ✅ Display Flag Control
- Add `true` or `false` in column H (Display Flag)
- Only marathons with `true` (or empty) will be displayed
- Set to `false` to temporarily hide a marathon

### ✅ Automatic Date Filtering
- Only marathons with future dates are displayed
- Past marathons are automatically filtered out
- Date format: YYYY-MM-DD (e.g., "2025-01-19")

### ✅ Dynamic Updates
- New marathons added to the sheet will appear in the app
- Changes to existing marathons will be reflected
- App refreshes data every 5 minutes automatically

### ✅ Fallback System
- If Google Sheets is unavailable, the app falls back to hardcoded data
- Error handling prevents the app from breaking

## Column Details

| Column | Required | Format | Notes |
|--------|----------|--------|-------|
| Name | ✅ Yes | Text | Marathon event name |
| Date | ✅ Yes | YYYY-MM-DD | Must be future date to display |
| City | No | Text | Event location |
| Description | No | Text | Brief event description |
| Registration Link | No | URL | Full URL including https:// |
| Bus Available | No | true/false | Shows bus availability button |
| Bib Details | No | true/false | Shows bib details button |
| Display Flag | No | true/false | Controls visibility (default: true) |

## Troubleshooting

### Common Issues

1. **No marathons showing up**
   - Check if API key is correct
   - Verify sheet ID is correct
   - Ensure sheet is publicly accessible
   - Check browser console for errors

2. **API quota exceeded**
   - Google Sheets API has usage limits
   - Consider implementing caching for high-traffic sites

3. **Date formatting issues**
   - Ensure dates are in YYYY-MM-DD format
   - Check that dates are in the future

4. **Boolean values not working**
   - Use exactly "true" or "false" (lowercase)
   - Empty cells default to false for bus/bib, true for display flag

### Testing Your Setup

1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for any error messages
4. Check Network tab to see if API calls are successful

## Security Considerations

1. **API Key Security**
   - The API key is visible in client-side code
   - Consider restricting the API key to specific domains
   - For production apps, consider using a backend service

2. **Sheet Access**
   - Only make the sheet "view-only" public
   - Don't share edit access publicly
   - Regularly review who has access to your sheet

## Advanced Features

### Auto-refresh
The app automatically refreshes data every 5 minutes. To change this interval, modify the `setInterval` value in the code:

```javascript
// Refresh every 10 minutes (600000 ms)
setInterval(refreshMarathonData, 600000);
```

### Manual Refresh
You can manually refresh data by calling:
```javascript
refreshMarathonData();
```

### Custom Sheet Structure
If you want to use different column positions, modify the mapping in the `fetchMarathonData()` function:

```javascript
const marathonData = rows.slice(1).map(row => {
  return {
    name: row[0],        // Column A
    date: row[1],        // Column B
    city: row[2],        // Column C
    // ... modify as needed
  };
});
```

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Google Sheets setup
3. Test with the sample data provided
4. Ensure your API key has the correct permissions

Happy marathon management! 🏃‍♂️🏃‍♀️