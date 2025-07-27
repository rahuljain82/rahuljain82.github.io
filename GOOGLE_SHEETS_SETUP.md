# Google Apps Script Integration Setup Guide

## Overview
This guide will help you set up Google Apps Script integration for your marathon application. The app will dynamically load marathon data from a Google Sheet via Google Apps Script with automatic filtering for future dates and display flags.

## Features Implemented
- ✅ **Display Flag**: Control which marathons appear on the app
- ✅ **Automatic Date Filtering**: Past marathons are automatically hidden
- ✅ **Dynamic Updates**: New races added to the sheet appear automatically
- ✅ **Real-time Refresh**: Manual refresh button + auto-refresh every 30 minutes
- ✅ **Fallback Data**: App works even if Google Apps Script is unavailable
- ✅ **No API Keys Required**: Uses Google Apps Script web app deployment

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

## Step 2: Set Up Google Apps Script

### 2.1 Create a Google Apps Script Project
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Name it "Marathon Calendar API" or similar

### 2.2 Add the Script Code
1. Delete the default `myFunction()` code
2. Copy the entire content from `google-apps-script.js` file
3. Paste it into the script editor

### 2.3 Configure the Script
Update these variables in the script:
```javascript
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Google Sheet ID
const SHEET_NAME = 'marathons'; // Name of the sheet tab containing marathon data
```

### 2.4 Get Your Sheet ID
From your Google Sheet URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
Copy the `SHEET_ID_HERE` part and replace `YOUR_GOOGLE_SHEET_ID_HERE` in the script.

### 2.5 Deploy as Web App
1. Click "Deploy" > "New deployment"
2. Choose type: "Web app"
3. Description: "Marathon Calendar API"
4. Execute as: "Me"
5. Who has access: "Anyone"
6. Click "Deploy"
7. Copy the web app URL (you'll need this for your HTML file)

## Step 3: Configure Your Application

### 3.1 Update index.html
In your `index.html` file, find this line and replace with your web app URL:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec';
```

Replace `YOUR_SCRIPT_ID_HERE` with the actual script ID from your deployed web app URL.

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

## Step 4: Test Your Google Apps Script

### 4.1 Test the Script Functions
1. In the Google Apps Script editor, run the `testMarathonData()` function
2. Check the execution log for any errors
3. You should see: "Test successful!" and a list of marathons

### 4.2 Optional: Create Sample Data
1. Run the `createSampleData()` function to automatically set up your sheet
2. This will create the proper structure and add sample marathon data

## Step 5: Testing the Integration

### 5.1 Test the Web App
1. Open your `index.html` in a browser
2. Check the browser console (F12) for any errors
3. You should see: "Loading marathons from Google Apps Script..." followed by "Loaded X marathons from Google Apps Script"

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

1. **"No valid data received from Google Apps Script"**
   - Check if your Google Apps Script is deployed correctly
   - Verify the SHEET_ID in your script is correct
   - Ensure your sheet has data in the expected format
   - Run the `testMarathonData()` function in Apps Script to debug

2. **"HTTP error! status: 403" or "HTTP error! status: 404"**
   - Check your Google Apps Script URL is correct
   - Verify the web app is deployed with "Anyone" access
   - Make sure you're using the correct deployment URL

3. **"Missing required headers" in Apps Script logs**
   - Check column headers match exactly: name, date, city, description, registrationLink
   - Headers are case-insensitive but must be present
   - Run `createSampleData()` function to set up proper structure

4. **Marathons not appearing**
   - Check the `display` column is TRUE
   - Verify dates are in the future
   - Ensure date format is YYYY-MM-DD
   - Check Apps Script execution logs for errors

5. **Script timeout or permission errors**
   - Make sure you've authorized the script to access your Google Sheets
   - Check that the Google Apps Script has permission to read your sheet

### Fallback Behavior
If Google Apps Script fails to load, the app will automatically use fallback data and continue working.

## Security Notes

- No API keys required - Google Apps Script handles authentication
- The web app can be deployed with "Anyone" access for public marathon information
- For sensitive data, consider additional authentication in the Apps Script
- The current setup is suitable for public marathon calendars

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Google Sheet structure matches the requirements
3. Test with the sample data provided
4. Ensure all API setup steps were completed correctly