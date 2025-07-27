# Google Sheets Integration Setup Guide

This guide will help you set up the Google Sheets integration to replace the hardcoded marathon data with dynamic data from a Google Sheet.

## Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name the first sheet "Marathons"
3. Add the following headers in the first row:

```
Name | Date | City | Description | RegistrationLink | BusAvailable | BibDetails | Display
```

4. Add your marathon data in the rows below. Example:

```
Stonehill Marathon 2025 | 2025-09-07 | Bangalore | 5k, 10k and Half Marathon | https://raadiantsports.com/registration/ | false | false | true
Wipro Bengaluru Marathon | 2025-09-21 | Bengaluru | Early bird ended | https://mysamay.in/public/event/info/22de74cf-e15d-4b56-8556-871a041ad251%3Fcmeta%3DLngs9BwHcs | false | false | true
```

## Step 2: Get Your Spreadsheet ID

1. Look at the URL of your Google Sheet
2. The URL will look like: `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit`
3. Copy the `YOUR_SPREADSHEET_ID_HERE` part

## Step 3: Set Up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project
3. Replace the default code with the contents of `google-apps-script.js`
4. Replace `YOUR_SPREADSHEET_ID_HERE` in the script with your actual spreadsheet ID
5. Save the project with a name like "Marathon Data API"

## Step 4: Deploy the Google Apps Script

1. Click on "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set the following options:
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click "Deploy"
5. Copy the Web app URL that is generated

## Step 5: Update Your HTML File

1. Open `index.html`
2. Find this line:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the Web app URL from Step 4

## Step 6: Test the Integration

1. Open your `index.html` file in a web browser
2. You should see the loading state briefly, then your marathon data from the Google Sheet
3. If there's an error, check the browser console for details

## Features Explained

### Display Flag
- Add a `Display` column to your Google Sheet
- Set to `true` to show the marathon, `false` to hide it
- If the column doesn't exist, all marathons will be shown (except past ones)

### Date Filtering
- Past events are automatically hidden from the app
- Only future events will be displayed
- Events are sorted by date (earliest first)

### Real-time Updates
- Any changes you make to the Google Sheet will be reflected in the app
- No need to update the HTML file when adding new marathons

## Troubleshooting

### Common Issues

1. **"Google Apps Script URL not configured"**
   - Make sure you've updated the `GOOGLE_APPS_SCRIPT_URL` in `index.html`

2. **"Sheet not found"**
   - Ensure your Google Sheet has a sheet named exactly "Marathons"
   - Check that the spreadsheet ID is correct

3. **"Required columns missing"**
   - Make sure your Google Sheet has all the required columns: Name, Date, City, Description, RegistrationLink

4. **CORS errors**
   - The Google Apps Script includes CORS headers, but if you still get errors, try accessing the script URL directly in your browser first

5. **Data not loading**
   - Check that your Google Sheet is shared with appropriate permissions
   - Verify the Google Apps Script is deployed as a web app with "Anyone" access

### Fallback Mode

If the Google Sheets integration fails, the app will automatically fall back to the original hardcoded data, so your app will still work.

## Column Details

| Column | Required | Type | Description |
|--------|----------|------|-------------|
| Name | Yes | Text | Marathon name |
| Date | Yes | Date | Event date (YYYY-MM-DD format) |
| City | Yes | Text | City where the event takes place |
| Description | Yes | Text | Brief description of the event |
| RegistrationLink | Yes | URL | Link to registration page |
| BusAvailable | No | Boolean | Whether bus service is available |
| BibDetails | No | Boolean | Whether bib details are available |
| Display | No | Boolean | Whether to show this marathon |

## Security Notes

- The Google Apps Script is set to "Anyone" access, which means the data is publicly readable
- If you need more security, you can restrict access and implement authentication
- Consider using environment variables for sensitive configuration in production