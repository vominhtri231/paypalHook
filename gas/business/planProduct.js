function savePlanProduct({ resource: { name: productCode, id: planId } }) {
  const paymentShreadsheet = SpreadsheetApp.openById(MISC_SPREADSHEET_ID);
  const planProductSheet = paymentShreadsheet.getSheetByName(PLAN_PRODUCT_SHEET_NAME);

  planProductSheet.appendRow([planId, productCode])
}

function getProductCodeFromPlan(planId) {
  const paymentShreadsheet = SpreadsheetApp.openById(MISC_SPREADSHEET_ID);
  const planProductSheet = paymentShreadsheet.getSheetByName(PLAN_PRODUCT_SHEET_NAME);
  const planProducts = getObjectsFromSheet(planProductSheet);

  const matchProductOrder = planProducts.find(productOrder => productOrder.planId == planId);
  return matchProductOrder ? matchProductOrder.productCode : "";
}