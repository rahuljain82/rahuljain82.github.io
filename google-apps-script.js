// Google Apps Script for Marathon Data API
// Deploy this as a web app to get the API endpoint

function doGet() {
  try {
    // Get the active spreadsheet (you'll need to replace this with your actual spreadsheet ID)
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your actual spreadsheet ID
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('Marathons');
    
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Sheet not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get all data from the sheet
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);
    
    // Find column indices
    const nameIndex = headers.indexOf('Name');
    const dateIndex = headers.indexOf('Date');
    const cityIndex = headers.indexOf('City');
    const descriptionIndex = headers.indexOf('Description');
    const registrationLinkIndex = headers.indexOf('RegistrationLink');
    const busAvailableIndex = headers.indexOf('BusAvailable');
    const bibDetailsIndex = headers.indexOf('BibDetails');
    const displayFlagIndex = headers.indexOf('Display');
    
    // Validate required columns exist
    if (nameIndex === -1 || dateIndex === -1 || cityIndex === -1 || descriptionIndex === -1 || registrationLinkIndex === -1) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Required columns missing' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const marathons = rows
      .filter(row => {
        // Check if display flag is true (if column exists)
        if (displayFlagIndex !== -1) {
          const displayFlag = row[displayFlagIndex];
          if (displayFlag === false || displayFlag === 'FALSE' || displayFlag === 'false') {
            return false;
          }
        }
        
        // Check if date is in the future
        const eventDate = new Date(row[dateIndex]);
        if (isNaN(eventDate.getTime())) {
          return false; // Skip invalid dates
        }
        
        return eventDate >= today;
      })
      .map(row => {
        const marathon = {
          name: row[nameIndex] || '',
          date: formatDateForAPI(row[dateIndex]),
          city: row[cityIndex] || '',
          description: row[descriptionIndex] || '',
          registrationLink: row[registrationLinkIndex] || '',
          busAvailable: busAvailableIndex !== -1 ? Boolean(row[busAvailableIndex]) : false,
          bibDetails: bibDetailsIndex !== -1 ? Boolean(row[bibDetailsIndex]) : false
        };
        
        return marathon;
      })
      .filter(marathon => marathon.name && marathon.date); // Filter out empty entries
    
    // Sort by date (earliest first)
    marathons.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return ContentService
      .createTextOutput(JSON.stringify({ marathons: marathons }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function formatDateForAPI(dateValue) {
  if (dateValue instanceof Date) {
    return dateValue.toISOString().split('T')[0]; // YYYY-MM-DD format
  }
  
  // If it's a string, try to parse it
  const date = new Date(dateValue);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }
  
  return null;
}

// Optional: Add CORS headers for cross-origin requests
function doOptions() {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  return ContentService
    .createTextOutput('')
    .setHeaders(headers);
}