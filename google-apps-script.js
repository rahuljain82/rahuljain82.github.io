/**
 * Google Apps Script for Marathon Calendar Integration
 * 
 * This script reads marathon data from a Google Sheet and serves it as JSON
 * to your web application. Deploy this as a web app with execute permissions
 * set to "Anyone" and access to "Anyone with the link".
 */

// Configuration - Update these values for your setup
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Google Sheet ID
const SHEET_NAME = 'marathons'; // Name of the sheet tab containing marathon data

/**
 * Main function that handles GET requests from the web app
 * Returns marathon data as JSON
 */
function doGet(e) {
  try {
    console.log('Marathon data request received');
    
    // Get marathon data from the sheet
    const marathonData = getMarathonData();
    
    // Create JSON response
    const response = {
      success: true,
      data: marathonData,
      timestamp: new Date().toISOString(),
      count: marathonData.length
    };
    
    console.log(`Returning ${marathonData.length} marathons`);
    
    // Return JSON response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify(marathonData))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error in doGet:', error);
    
    // Return error response
    const errorResponse = {
      success: false,
      error: error.toString(),
      timestamp: new Date().toISOString()
    };
    
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Function to read marathon data from Google Sheets
 * Returns an array of marathon objects
 */
function getMarathonData() {
  try {
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      throw new Error(`Sheet "${SHEET_NAME}" not found. Available sheets: ${spreadsheet.getSheets().map(s => s.getName()).join(', ')}`);
    }
    
    // Get all data from the sheet
    const range = sheet.getDataRange();
    const values = range.getValues();
    
    if (values.length < 2) {
      console.log('No data found in sheet');
      return [];
    }
    
    // Get headers from the first row
    const headers = values[0].map(header => header.toString().toLowerCase().trim());
    console.log('Sheet headers:', headers);
    
    // Validate required headers
    const requiredHeaders = ['name', 'date', 'city', 'description', 'registrationlink'];
    const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
    
    if (missingHeaders.length > 0) {
      throw new Error(`Missing required headers: ${missingHeaders.join(', ')}. Found headers: ${headers.join(', ')}`);
    }
    
    // Create header index map
    const headerMap = {};
    headers.forEach((header, index) => {
      headerMap[header] = index;
    });
    
    // Process data rows
    const marathons = [];
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      
      // Skip empty rows
      if (row.every(cell => !cell)) {
        continue;
      }
      
      try {
        const marathon = {
          name: getCellValue(row, headerMap, 'name'),
          date: formatDate(getCellValue(row, headerMap, 'date')),
          city: getCellValue(row, headerMap, 'city'),
          description: getCellValue(row, headerMap, 'description'),
          registrationLink: getCellValue(row, headerMap, 'registrationlink'),
          busAvailable: getBooleanValue(row, headerMap, 'busavailable'),
          bibdetails: getBooleanValue(row, headerMap, 'bibdetails'),
          display: getBooleanValue(row, headerMap, 'display', true) // Default to true
        };
        
        // Validate essential fields
        if (marathon.name && marathon.date && marathon.city) {
          marathons.push(marathon);
          console.log(`Added marathon: ${marathon.name} on ${marathon.date}`);
        } else {
          console.log(`Skipped incomplete row ${i + 1}: missing essential data`);
        }
        
      } catch (error) {
        console.error(`Error processing row ${i + 1}:`, error);
        // Continue processing other rows
      }
    }
    
    console.log(`Successfully processed ${marathons.length} marathons`);
    return marathons;
    
  } catch (error) {
    console.error('Error reading sheet data:', error);
    throw error;
  }
}

/**
 * Helper function to get cell value safely
 */
function getCellValue(row, headerMap, headerName) {
  const index = headerMap[headerName];
  if (index === undefined) {
    return '';
  }
  
  const value = row[index];
  return value ? value.toString().trim() : '';
}

/**
 * Helper function to get boolean value from cell
 */
function getBooleanValue(row, headerMap, headerName, defaultValue = false) {
  const value = getCellValue(row, headerMap, headerName).toLowerCase();
  
  if (value === 'true' || value === '1' || value === 'yes') {
    return true;
  } else if (value === 'false' || value === '0' || value === 'no') {
    return false;
  }
  
  return defaultValue;
}

/**
 * Helper function to format date consistently
 */
function formatDate(dateValue) {
  if (!dateValue) {
    return '';
  }
  
  try {
    let date;
    
    // Handle different date formats
    if (dateValue instanceof Date) {
      date = dateValue;
    } else if (typeof dateValue === 'string') {
      // Try parsing the string
      date = new Date(dateValue);
    } else if (typeof dateValue === 'number') {
      // Handle Excel serial dates
      date = new Date((dateValue - 25569) * 86400 * 1000);
    } else {
      throw new Error('Invalid date format');
    }
    
    // Validate the date
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    
    // Return in YYYY-MM-DD format
    return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    
  } catch (error) {
    console.error(`Error formatting date "${dateValue}":`, error);
    return dateValue.toString(); // Return original value if formatting fails
  }
}

/**
 * Test function to verify the setup
 * Run this function manually to test your configuration
 */
function testMarathonData() {
  try {
    console.log('Testing marathon data retrieval...');
    
    const data = getMarathonData();
    console.log('Test successful!');
    console.log(`Found ${data.length} marathons:`);
    
    data.forEach((marathon, index) => {
      console.log(`${index + 1}. ${marathon.name} - ${marathon.date} - Display: ${marathon.display}`);
    });
    
    return data;
    
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
}

/**
 * Function to create a sample sheet with test data
 * Run this once to set up your sheet structure
 */
function createSampleData() {
  try {
    console.log('Creating sample data...');
    
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }
    
    // Clear existing data
    sheet.clear();
    
    // Set headers
    const headers = [
      'name', 'date', 'city', 'description', 'registrationLink', 
      'busAvailable', 'bibdetails', 'display'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Sample data
    const sampleData = [
      ['Stonehill Marathon 2025', '2025-09-07', 'Bangalore', '5k, 10k and Half Marathon', 'https://raadiantsports.com/registration/', false, false, true],
      ['Wipro Bengaluru Marathon', '2025-09-21', 'Bengaluru', 'Early bird ended', 'https://mysamay.in/public/event/info/22de74cf-e15d-4b56-8556-871a041ad251%3Fcmeta%3DLngs9BwHcs', false, false, true],
      ['Malnad Ultra', '2025-11-22', 'Bengaluru', '30k, 50k and 100k', 'https://malnadultra.com', false, false, true],
      ['Goa River Marathon', '2025-12-14', 'Goa', 'Scenic route by the river', 'https://www.skfgoarivermarathon.com/', false, false, true],
      ['Ladakh Marathon', '2025-09-14', 'Leh', 'For Brave and Resilient', 'https://ladakhmarathon.com/', false, false, false],
      ['Mumbai Marathon', '2025-01-19', 'Mumbai', 'World Athletics Gold Label Race', 'https://procamrunning.in/tcs-world-10k-bangalore/', true, true, true],
      ['Delhi Half Marathon', '2025-10-21', 'New Delhi', 'Airtel Delhi Half Marathon', 'https://procamrunning.in/airtel-delhi-half-marathon/', false, true, true]
    ];
    
    // Add sample data
    sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);
    
    // Format the sheet
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.autoResizeColumns(1, headers.length);
    
    console.log('Sample data created successfully!');
    console.log(`Sheet URL: ${spreadsheet.getUrl()}`);
    
  } catch (error) {
    console.error('Error creating sample data:', error);
    throw error;
  }
}