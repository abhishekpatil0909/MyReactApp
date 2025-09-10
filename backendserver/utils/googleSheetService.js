const { google } = require('googleapis');
const path = require('path');

// ✅ Update this path to match your file location
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../credentials/credentials.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const SPREADSHEET_ID = '1dHESA1po5LLCV5pCUQOtNPLAGgtR5nLY1Mdk-NunvLA'; // ✅ Your actual Google Sheet ID

async function appendUserToSheet(name, email, role) {
  const client = await auth.getClient(); // ✅ Ensure client is fetched properly
  const sheets = google.sheets({ version: 'v4', auth: client });

  let sheetName;
  switch (role.toLowerCase()) {
    case 'employee':
      sheetName = 'Employee';
      break;
    case 'hr':
      sheetName = 'HR';
      break;
    case 'manager':
      sheetName = 'Manager';
      break;
    case 'student':
      sheetName = 'Student';
      break;
    default:
      throw new Error(`Invalid role: ${role}`);
  }

  const joinDate = new Date().toLocaleDateString(); // e.g., "8/6/2025"

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A:C`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[name, email, joinDate]],
    },
  });
}

module.exports = { appendUserToSheet };
