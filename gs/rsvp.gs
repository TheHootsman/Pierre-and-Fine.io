
const sheetName = 'Sheet1'
const scriptProp = PropertiesService.getScriptProperties()

function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}


function doPost(e) {
 const lock = LockService.getScriptLock()
  lock.tryLock(10000)


  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)

    const nextRow = sheet.getLastRow() + 1
    const nGuests = parseInt(e.parameter.nGuests, 10);

    sheet.getRange(nextRow, 9,1,1).setValue(JSON.stringify(e.parameters));

// Ensure parameters are arrays
    const firstnames = Array.isArray(e.parameters["firstname[]"])
      ? e.parameters["firstname[]"]
      : [e.parameters["firstname[]"]];

    const lastnames = Array.isArray(e.parameters["lastname[]"])
      ? e.parameters["lastname[]"]
      : [e.parameters["lastname[]"]];

    const email = Array.isArray(e.parameters["email[]"])
      ? e.parameters["email[]"]
      : [e.parameters["email[]"]];

    const phone = Array.isArray(e.parameters["phone[]"])
      ? e.parameters["phone[]"]
      : [e.parameters["phone[]"]];

    const diet = Array.isArray(e.parameters["diet[]"])
      ? e.parameters["diet[]"]
      : [e.parameters["diet[]"]];

    const comment = Array.isArray(e.parameters["comment[]"])
      ? e.parameters["comment[]"]
      : [e.parameters["comment[]"]];

    const rows = [];
    for (let i = 0; i < nGuests; i++) {
      rows.push([
        new Date(), // Timestamp
        e.parameter.ip || "N/A", // Ensure IP exists
        firstnames[i] || "Unknown", // Handle missing values gracefully
        lastnames[i] || "Unknown",
        email[i] || "N/A",
        phone[i] || "N/A",
        diet[i] || "Unknown",
        comment[i] || "N/A"

      ]);
    }

    sheet.getRange(nextRow, 1, nGuests, 8).setValues(rows);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}
