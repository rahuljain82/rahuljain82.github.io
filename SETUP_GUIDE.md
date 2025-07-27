# Marathon App Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration to replace the hardcoded marathon data with dynamic data from a Google Sheet.

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it "Marathon Data" or similar
3. Copy the data from `marathon-sheet-template.csv` into your sheet
4. Make sure the first row contains the headers exactly as shown

## Step 2: Set Up Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code and paste the contents of `google-apps-script.js`
3. Replace `YOUR_SPREADSHEET_ID_HERE` with your actual spreadsheet ID
   - To find your spreadsheet ID: Look at the URL of your Google Sheet
   - It's the long string between `/d/` and `/edit` in the URL
   - Example: `https://docs.google.com/spreadsheets/d/1ABC123...XYZ/edit` → ID is `1ABC123...XYZ`
4. Save the script with a name like "Marathon Data API"

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Choose **Web app** as the type
3. Set **Execute as**: "Me" (your Google account)
4. Set **Who has access**: "Anyone"
5. Click **Deploy**
6. Copy the **Web app URL** - you'll need this for the next step

## Step 4: Update Your HTML File

1. Open your `index.html` file
2. Find the section with the hardcoded `marathons` array (around line 300)
3. Replace the entire JavaScript section with the new code that fetches from Google Sheets

## Step 5: Test Your Setup

1. Add a new marathon to your Google Sheet with a future date
2. Set the "Display Flag" to TRUE
3. Refresh your web app - the new marathon should appear
4. Set "Display Flag" to FALSE - the marathon should disappear
5. Add a marathon with a past date - it should not appear

## Google Sheet Column Details

| Column | Header | Description | Format |
|--------|--------|-------------|---------|
| A | Name | Marathon name | Text |
| B | Date | Event date | YYYY-MM-DD |
| C | City | Event location | Text |
| D | Description | Event description | Text |
| E | Registration Link | Registration URL | URL |
| F | Bus Available | Whether bus service is available | TRUE/FALSE |
| G | Bib Details | Whether bib details are available | TRUE/FALSE |
| H | Display Flag | Whether to show in app | TRUE/FALSE |

## Troubleshooting

### Common Issues:

1. **"Failed to fetch marathon data" error**
   - Check that your spreadsheet ID is correct
   - Ensure the Google Apps Script is deployed as a web app
   - Verify the web app URL is accessible

2. **No marathons showing**
   - Check that "Display Flag" is set to TRUE for events you want to show
   - Verify dates are in YYYY-MM-DD format
   - Ensure dates are in the future

3. **CORS errors**
   - The Google Apps Script includes CORS headers, but some browsers may still block requests
   - Try accessing the web app URL directly to test if it works

### Testing Your Google Apps Script:

1. In the Apps Script editor, run the `testData()` function
2. Check the execution log to see if data is being processed correctly

## Security Notes

- The web app is set to "Anyone" access for simplicity
- For production use, consider restricting access as needed
- The spreadsheet ID is visible in the code, so keep your sheet permissions appropriate

## Updating Marathon Data

To update marathon information:
1. Simply edit the Google Sheet
2. Changes will be reflected immediately in your app
3. No need to redeploy the Apps Script or update HTML files

## Adding New Features

The Google Apps Script can be easily extended to:
- Add more columns (e.g., race categories, entry fees)
- Implement caching for better performance
- Add authentication if needed
- Include additional filtering options