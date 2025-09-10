// routes/attendance/punch.js
const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const path = require('path');
const moment = require('moment');

// 🔐 Load Google Sheets credentials
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../../credentials/credentials.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const SPREADSHEET_ID = '1dHESA1po5LLCV5pCUQOtNPLAGgtR5nLY1Mdk-NunvLA';

// 📌 Punch Route
router.post('/', async (req, res) => {
  try {
    const { userId, userName, action } = req.body;

    if (!userId || !userName || !action) {
      return res.status(400).json({ message: 'Missing user data' });
    }

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const sheetTitle = `${userName}_${userId}`;
    const today = moment().format('YYYY-MM-DD');
    const nowTime = moment().format('HH:mm:ss');

    // 🔎 Check if sheet exists
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const sheetExists = spreadsheet.data.sheets.some(
      (sheet) => sheet.properties.title === sheetTitle
    );

    // 📄 Create sheet if not exists
    if (!sheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetTitle,
                },
              },
            },
          ],
        },
      });

      // Add custom headers
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetTitle}!A1:F1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [['User ID', 'Name', 'Date', 'Punch In', 'Punch Out', 'Total Time']],
        },
      });
    }

    // 🔍 Fetch existing rows
    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetTitle}!A2:F`,
    });

    const rows = readRes.data.values || [];

    // 🔄 Find today's row if it exists
    let rowIndex = -1;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === userId && rows[i][2] === today) {
        rowIndex = i + 2; // +2 because A1 is headers, arrays are 0-indexed
        break;
      }
    }

    // 🟢 Punch In
    if (action.toLowerCase() === 'punch in') {
      if (rowIndex === -1) {
        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: `${sheetTitle}!A:F`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[userId, userName, today, nowTime, '', '']],
          },
        });
        return res.status(200).json({ message: 'Punch In recorded' });
      } else {
        return res.status(400).json({ message: 'Already punched in today' });
      }
    }

    // 🔴 Punch Out
    if (action.toLowerCase() === 'punch out') {
      if (rowIndex === -1) {
        return res.status(400).json({ message: 'Punch In not found for today' });
      }

      const punchInTime = rows[rowIndex - 2][3];
      const totalTime = calculateDuration(punchInTime, nowTime);

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetTitle}!E${rowIndex}:F${rowIndex}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[nowTime, totalTime]],
        },
      });

      return res.status(200).json({ message: 'Punch Out recorded with total time' });
    }

    return res.status(400).json({ message: 'Invalid action' });

  } catch (error) {
    console.error('❌ Punch error:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// 🕒 Helper to calculate total time
function calculateDuration(start, end) {
  const format = 'HH:mm:ss';
  const startTime = moment(start, format);
  const endTime = moment(end, format);
  const duration = moment.duration(endTime.diff(startTime));
  const hours = Math.floor(duration.asHours()).toString().padStart(2, '0');
  const minutes = duration.minutes().toString().padStart(2, '0');
  const seconds = duration.seconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

module.exports = router;
