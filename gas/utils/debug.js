
function debug(e) {
  const debugSpreadSheet = SpreadsheetApp.openById(DEBUG_SPREADSHEED_ID);

  const rawSheet = debugSpreadSheet.getSheetByName(RAW_SHEET_NAME);
  rawSheet.appendRow([JSON.stringify(e)])

  const postBodyJson = e.postData.contents;
  const postObject = JSON.parse(postBodyJson);
  const { resource, event_type } = postObject;
  const postSheed = debugSpreadSheet.getSheetByName(POST_SHEET_NAME);
  postSheed.appendRow([JSON.stringify(event_type), JSON.stringify(resource)]);
}