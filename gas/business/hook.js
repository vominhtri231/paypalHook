//送信済みデータかどうかを確認
function isHookHandled(hookId) {
  const paymentShreadsheet = SpreadsheetApp.openById(MISC_SPREADSHEET_ID);
  const hookSheet = paymentShreadsheet.getSheetByName(HOOK_SHEET_NAME);

  const hooks = getObjectsFromSheet(hookSheet);
  return hooks.some(({ id }) => id === hookId);
}

//hookIdをデータベースに登録
function saveHandledHook(hookId) {
  const paymentShreadsheet = SpreadsheetApp.openById(MISC_SPREADSHEET_ID);
  const hookSheet = paymentShreadsheet.getSheetByName(HOOK_SHEET_NAME);
  hookSheet.appendRow([hookId]);
}
