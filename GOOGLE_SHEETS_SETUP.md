# Google Sheets Integration Setup Guide

## Overview
This guide will help you set up Google Sheets integration for your marathon application. The app will dynamically load marathon data from a Google Sheet with automatic filtering for future dates and display flags.

## Features Implemented
- ✅ **Display Flag**: Control which marathons appear on the app
- ✅ **Automatic Date Filtering**: Past marathons are automatically hidden
- ✅ **Dynamic Updates**: New races added to the sheet appear automatically
- ✅ **Real-time Refresh**: Manual refresh button + auto-refresh every 30 minutes
- ✅ **Fallback Data**: App works even if Google Sheets is unavailable

## Step 1: Create Your Google Sheet

### 1.1 Create a New Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Marathon Calendar" or similar
4. Rename the first sheet tab to "marathons"

### 1.2 Set Up Column Headers
In the first row, add these column headers (case-insensitive):

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| name | date | city | description | registrationLink | busAvailable | bibdetails | display |

### 1.3 Add Sample Data
Here's sample data for rows 2-6:

| name | date | city | description | registrationLink | busAvailable | bibdetails | display |
|------|------|------|-------------|------------------|--------------|------------|---------|
| Stonehill Marathon 2025 | 2025-09-07 | Bangalore | 5k, 10k and Half Marathon | https://raadiantsports.com/registration/ | FALSE | FALSE | TRUE |
| Wipro Bengaluru Marathon | 2025-09-21 | Bengaluru | Early bird ended | https://mysamay.in/public/event/info/22de74cf-e15d-4b56-8556-871a041ad251%3Fcmeta%3DLngs9BwHcs | FALSE | FALSE | TRUE |
| Malnad Ultra | 2025-11-22 | Bengaluru | 30k, 50k and 100k | https://malnadultra.com | FALSE | FALSE | TRUE |
| Goa River Marathon | 2025-12-14 | Goa | Scenic route by the river | https://www.skfgoarivermarathon.com/ | FALSE | FALSE | TRUE |
| Ladakh Marathon | 2025-09-14 | Leh | For Brave and Resilient | https://ladakhmarathon.com/ | FALSE | FALSE | FALSE |

**Note**: The last marathon has `display` set to `FALSE`, so it won't appear in the app.

## Step 2: Set Up Google Sheets API

### 2.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Name it "Marathon App" or similar

### 2.2 Enable Google Sheets API
1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

### 2.3 Create API Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the API key (you'll need this later)
4. (Optional) Click "Restrict Key" to add restrictions:
   - Application restrictions: HTTP referrers
   - API restrictions: Google Sheets API

### 2.4 Make Your Sheet Public
1. In your Google Sheet, click "Share" (top right)
2. Change access to "Anyone with the link can view"
3. Click "Done"

## Step 3: Configure Your Application

### 3.1 Get Your Sheet ID
From your Google Sheet URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
Copy the `SHEET_ID_HERE` part.

### 3.2 Update index.html
In your `index.html` file, find these lines and replace with your values:

```javascript
const SHEET_ID = '1YOUR_SHEET_ID_HERE'; // Replace with your Google Sheet ID
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your Google Sheets API key
const SHEET_NAME = 'marathons'; // Name of the sheet tab containing marathon data
```

Replace:
- `YOUR_SHEET_ID_HERE` with your actual Sheet ID
- `YOUR_API_KEY_HERE` with your actual API key
- `marathons` with your sheet tab name (if different)

## Step 4: Column Specifications

### Required Columns
- **name**: Marathon name (text)
- **date**: Date in YYYY-MM-DD format (e.g., 2025-09-07)
- **city**: City name (text)
- **description**: Brief description (text)
- **registrationLink**: Full URL for registration (text)

### Optional Columns
- **busAvailable**: TRUE/FALSE - Shows "Bus Available" button
- **bibdetails**: TRUE/FALSE - Shows "Bib Details" button  
- **display**: TRUE/FALSE - Controls if marathon appears in app (defaults to TRUE)

### Date Format
**Important**: Use YYYY-MM-DD format for dates (e.g., 2025-09-07)

## Step 5: Testing

### 5.1 Test the Integration
1. Open your `index.html` in a browser
2. Check the browser console (F12) for any errors
3. You should see: "Loading marathons from Google Sheets..." followed by "Loaded X marathons from Google Sheets"

### 5.2 Test Features
- **Display Flag**: Set a marathon's `display` to FALSE and verify it doesn't appear
- **Date Filtering**: Add a marathon with a past date and verify it doesn't appear
- **New Entries**: Add a new marathon with a future date and refresh to see it appear
- **Refresh**: Click the refresh button (circular arrow icon) to reload data

## Step 6: Usage Tips

### Adding New Marathons
1. Add a new row to your Google Sheet
2. Fill in all required columns
3. Set `display` to TRUE
4. Use future dates only
5. The app will automatically pick up changes (refresh manually or wait 30 minutes)

### Hiding Marathons
- Set `display` to FALSE to hide a marathon without deleting it
- Past marathons are automatically hidden regardless of the display flag

### Managing Bus/Bib Features
- Set `busAvailable` to TRUE to show the "Bus Available" button
- Set `bibdetails` to TRUE to show the "Bib Details" button
- Update the URLs in the code if needed (currently pointing to a Google Apps Script)

## Troubleshooting

### Common Issues

1. **"No data found in Google Sheet"**
   - Check if your sheet is public
   - Verify the SHEET_ID and SHEET_NAME are correct
   - Ensure your sheet has data in the expected format

2. **"HTTP error! status: 403"**
   - Check your API key is correct
   - Verify Google Sheets API is enabled
   - Make sure your sheet is publicly accessible

3. **"Missing required columns"**
   - Check column headers match exactly: name, date, city, description, registrationLink
   - Headers are case-insensitive but must be present

4. **Marathons not appearing**
   - Check the `display` column is TRUE
   - Verify dates are in the future
   - Ensure date format is YYYY-MM-DD

### Fallback Behavior
If Google Sheets fails to load, the app will automatically use fallback data and continue working.

## Security Notes

- API keys should be restricted to your domain in production
- Consider using environment variables for sensitive data
- The current setup is suitable for public marathon information
- For sensitive data, consider server-side integration

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Google Sheet structure matches the requirements
3. Test with the sample data provided
4. Ensure all API setup steps were completed correctly