# Marathon App with Google Sheets Integration

This project has been updated to use Google Sheets as a dynamic data source instead of hardcoded marathon information. The app now supports:

- ✅ Dynamic marathon data from Google Sheets
- ✅ Display flag to show/hide marathons
- ✅ Automatic filtering of past events
- ✅ Real-time updates when Google Sheet is modified
- ✅ Fallback to cached data if API fails

## Files Overview

### Core Files
- `index.html` - Main application with Google Sheets integration
- `google-apps-script.js` - Google Apps Script for serving data from Google Sheets
- `marathon-sheet-template.csv` - Template for Google Sheet setup
- `test-api.html` - Testing tool for Google Apps Script deployment

### Documentation
- `SETUP_GUIDE.md` - Detailed setup instructions
- `README.md` - This file

## Quick Setup

1. **Create Google Sheet**: Use the template in `marathon-sheet-template.csv`
2. **Deploy Google Apps Script**: Copy code from `google-apps-script.js`
3. **Update HTML**: Replace the API URL in `index.html`
4. **Test**: Use `test-api.html` to verify your setup

## Google Sheet Structure

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

## Key Features

### Display Control
- Set "Display Flag" to `TRUE` to show a marathon
- Set "Display Flag" to `FALSE` to hide a marathon
- Changes take effect immediately

### Date Filtering
- Events with past dates are automatically hidden
- Only future events are displayed
- Events are sorted by date (soonest first)

### Error Handling
- Graceful fallback to cached data if API fails
- Loading states and error messages
- Retry functionality

### Real-time Updates
- Add new marathons to Google Sheet
- Modify existing marathon details
- Changes appear immediately in the app

## Testing

Use `test-api.html` to test your Google Apps Script deployment:

1. Open `test-api.html` in your browser
2. Enter your Google Apps Script web app URL
3. Click "Test API" to verify data is loading correctly

## Troubleshooting

### Common Issues

1. **"Failed to fetch marathon data"**
   - Check your Google Apps Script web app URL
   - Verify the script is deployed as a web app
   - Ensure "Who has access" is set to "Anyone"

2. **No marathons showing**
   - Check "Display Flag" is set to TRUE
   - Verify dates are in YYYY-MM-DD format
   - Ensure dates are in the future

3. **CORS errors**
   - The script includes CORS headers
   - Test the web app URL directly in browser

## Security Notes

- Web app is set to "Anyone" access for simplicity
- For production, consider restricting access
- Keep Google Sheet permissions appropriate

## Future Enhancements

The Google Apps Script can be extended to support:
- Additional marathon details (entry fees, categories)
- Caching for better performance
- Authentication for restricted access
- Advanced filtering options

## Support

For detailed setup instructions, see `SETUP_GUIDE.md`.