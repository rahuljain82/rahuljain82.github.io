# Google Sheet Structure for Marathon Data

## Required Columns

Create a Google Sheet with the following columns in the first row:

| Column Name | Data Type | Required | Description |
|-------------|-----------|----------|-------------|
| Name | Text | Yes | Marathon name (e.g., "Stonehill Marathon 2025") |
| Date | Date | Yes | Event date in YYYY-MM-DD format |
| City | Text | Yes | City where the marathon takes place |
| Description | Text | Yes | Brief description of the event |
| RegistrationLink | URL | Yes | Link to registration page |
| BusAvailable | Boolean | No | Whether bus service is available (true/false) |
| BibDetails | Boolean | No | Whether bib details are available (true/false) |
| Display | Boolean | No | Whether to display this marathon (true/false) |

## Example Data

| Name | Date | City | Description | RegistrationLink | BusAvailable | BibDetails | Display |
|------|------|------|-------------|------------------|--------------|------------|---------|
| Stonehill Marathon 2025 | 2025-09-07 | Bangalore | 5k, 10k and Half Marathon | https://raadiantsports.com/registration/ | false | false | true |
| Wipro Bengaluru Marathon | 2025-09-21 | Bengaluru | Early bird ended | https://mysamay.in/public/event/info/22de74cf-e15d-4b56-8556-871a041ad251%3Fcmeta%3DLngs9BwHcs | false | false | true |
| Malnad Ultra | 2025-11-22 | Bengaluru | 30k, 50k and 100k | https://malnadultra.com | false | false | true |
| Goa River Marathon | 2025-12-14 | Goa | Scenic route by the river | https://www.skfgoarivermarathon.com/ | false | false | true |
| Ladakh Marathon | 2025-09-14 | Leh | For Brave and Resilient | https://ladakhmarathon.com/ | false | false | true |

## Setup Instructions

1. Create a new Google Sheet
2. Name the first sheet "Marathons"
3. Add the column headers as shown above
4. Add your marathon data
5. Share the sheet with appropriate permissions
6. Copy the Spreadsheet ID from the URL
7. Replace `YOUR_SPREADSHEET_ID_HERE` in the Google Apps Script with your actual Spreadsheet ID

## Features

- **Display Flag**: Set to `false` to hide a marathon from the app
- **Date Filtering**: Past events are automatically hidden
- **Future Events**: New events with future dates will automatically appear
- **Real-time Updates**: Changes in the sheet will be reflected in the app

## Notes

- The `Display` column is optional. If not present, all marathons will be shown (except past ones)
- Date format should be YYYY-MM-DD for best compatibility
- Boolean values can be `true`/`false`, `TRUE`/`FALSE`, or `1`/`0`
- Empty rows will be ignored