/**
 * Google Apps Script to serve marathon data from Google Sheets
 * 
 * Expected Google Sheet columns:
 * A: Name
 * B: Date (YYYY-MM-DD format)
 * C: City
 * D: Description
 * E: Registration Link
 * F: Bus Available (TRUE/FALSE)
 * G: Bib Details (TRUE/FALSE)
 * H: Display Flag (TRUE/FALSE)
 * 
 * Usage: Deploy this as a web app and use the URL to fetch data
 */

function doGet() {
  try {
    // Get the active spreadsheet (you'll need to replace this with your actual spreadsheet ID)
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your actual spreadsheet ID
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Get all data from the sheet
    const data = sheet.getDataRange().getValues();
    
    // Skip header row and process data
    const marathons = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for comparison
    
    for (let i = 1; i < data.length; i++) { // Start from row 2 (skip header)
      const row = data[i];
      
      // Check if we have enough columns
      if (row.length < 8) continue;
      
      const [
        name,
        dateStr,
        city,
        description,
        registrationLink,
        busAvailable,
        bibDetails,
        displayFlag
      ] = row;
      
      // Skip if display flag is false
      if (displayFlag !== true && displayFlag !== 'TRUE') continue;
      
      // Parse and validate date
      let eventDate;
      try {
        eventDate = new Date(dateStr);
        if (isNaN(eventDate.getTime())) continue; // Skip invalid dates
      } catch (e) {
        continue; // Skip if date parsing fails
      }
      
      // Skip if date is in the past
      if (eventDate < today) continue;
      
      // Add to marathons array
      marathons.push({
        name: name || '',
        date: dateStr || '',
        city: city || '',
        description: description || '',
        registrationLink: registrationLink || '',
        busAvailable: busAvailable === true || busAvailable === 'TRUE',
        bibDetails: bibDetails === true || bibDetails === 'TRUE'
      });
    }
    
    // Sort by date (soonest first)
    marathons.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Return JSON response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        data: marathons,
        count: marathons.length,
        lastUpdated: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        message: 'Failed to fetch marathon data'
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
  }
}

/**
 * Optional: Function to test the data locally
 */
function testData() {
  const response = doGet();
  console.log(response.getContent());
}