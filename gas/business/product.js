//商品コードから商品名を取得する
function getProductName(productCode) {
  const productSpreadsheet = SpreadsheetApp.openById(PRODUCT_SPREADSHEET_ID);
  const productSheet = productSpreadsheet.getSheetByName(PRODUCT_SHEET_NAME);
  const products = getObjectsFromSheet(productSheet);

  const product = products.find(product => product.productCode === productCode);
  return product ? product.productName : "";
}