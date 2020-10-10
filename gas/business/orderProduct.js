//オーダーIDが一致している場合、商品コードを返す
function getProductCodeFromOrder(orderId) {
  const paymentShreadsheet = SpreadsheetApp.openById(MISC_SPREADSHEET_ID);
  const productOrderSheet = paymentShreadsheet.getSheetByName(ORDER_PRODUCT_SHEET_NAME);
  const productsOrders = getObjectsFromSheet(productOrderSheet);

  const matchProductOrder = productsOrders.find(productOrder => productOrder.orderId == orderId);
  return matchProductOrder ? matchProductOrder.productCode : "";
}

//出力シートに新規一括支払いデータを出力する
function saveOrderProduct({ productCode, orderId }) {
  const paymentShreadsheet = SpreadsheetApp.openById(MISC_SPREADSHEET_ID);
  const orderProductSheet = paymentShreadsheet.getSheetByName(ORDER_PRODUCT_SHEET_NAME);
  orderProductSheet.appendRow([orderId, productCode]);
}
