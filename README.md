# Running Ninjas - Google Sheets Integration

This project has been enhanced to integrate with Google Sheets for dynamic marathon data management, replacing the previous hardcoded approach.

## 🚀 New Features

### ✅ Google Sheets Integration
- **Dynamic Data**: Marathon details are now fetched from a Google Sheet instead of being hardcoded
- **Real-time Updates**: Changes in the Google Sheet are immediately reflected in the app
- **Easy Management**: Add, edit, or remove marathons directly from the Google Sheet

### ✅ Smart Filtering
- **Display Flag**: Control which marathons are shown using a simple true/false flag
- **Date Filtering**: Past events are automatically hidden from the app
- **Future Events**: New races with future dates automatically appear

### ✅ Enhanced User Experience
- **Loading States**: Users see a loading indicator while data is being fetched
- **Error Handling**: Graceful error handling with retry functionality
- **Fallback Mode**: If Google Sheets is unavailable, the app falls back to hardcoded data

## 📁 Files Overview

- `index.html` - Main application with Google Sheets integration
- `google-apps-script.js` - Backend API script for Google Apps Script
- `SETUP_GUIDE.md` - Detailed setup instructions
- `google-sheet-structure.md` - Google Sheet structure documentation
- `sample-data.csv` - Sample data template for Google Sheets

## 🛠️ Quick Setup

1. **Create Google Sheet** with the required columns (see `google-sheet-structure.md`)
2. **Set up Google Apps Script** using `google-apps-script.js`
3. **Deploy the script** as a web app
4. **Update the URL** in `index.html`
5. **Test the integration**

For detailed instructions, see `SETUP_GUIDE.md`.

## 📊 Google Sheet Structure

Required columns:
- `Name` - Marathon name
- `Date` - Event date (YYYY-MM-DD)
- `City` - Event location
- `Description` - Event description
- `RegistrationLink` - Registration URL

Optional columns:
- `BusAvailable` - Boolean for bus service
- `BibDetails` - Boolean for bib details
- `Display` - Boolean to show/hide marathon

## 🔧 Configuration

In `index.html`, update this line with your Google Apps Script URL:
```javascript
const GOOGLE_APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

## 🎯 Key Benefits

1. **No Code Changes**: Add new marathons without touching the HTML file
2. **Centralized Management**: All marathon data in one Google Sheet
3. **Automatic Filtering**: Past events hidden, future events shown
4. **Flexible Display**: Control visibility with simple flags
5. **Reliable**: Fallback to hardcoded data if API fails

## 🔒 Security

- Google Apps Script is deployed with "Anyone" access for public data
- No sensitive information is exposed
- Consider implementing authentication for private data

## 🐛 Troubleshooting

Common issues and solutions are documented in `SETUP_GUIDE.md`. The app includes comprehensive error handling and will fall back to hardcoded data if the Google Sheets integration fails.

## 📈 Future Enhancements

Potential improvements:
- Caching for better performance
- Authentication for private sheets
- Admin interface for data management
- Email notifications for new events
- Calendar integration

---

**Note**: This implementation maintains backward compatibility. If the Google Sheets integration is not configured, the app will use the original hardcoded data.