function saveOrphanPayment({
  billing_agreement_id: subscriptionId,
  create_time,
  id,
}) {
  const paymentShreadsheet = SpreadsheetApp.openById(MISC_SPREADSHEET_ID);
  const orphanPaymentSheet = paymentShreadsheet.getSheetByName(ORPHAN_PAYMENT_SHEET_NAME);
  orphanPaymentSheet.appendRow([subscriptionId, id, create_time])
}

function adoptOrphanPayments(givenSubscriptionId) {
  const paymentShreadsheet = SpreadsheetApp.openById(MISC_SPREADSHEET_ID);
  const orphanPaymentSheet = paymentShreadsheet.getSheetByName(ORPHAN_PAYMENT_SHEET_NAME);
  const orphanPayments = getObjectsFromSheet(orphanPaymentSheet);

  return orphanPayments
    .filter(({ subscriptionId }) => subscriptionId === givenSubscriptionId)
    .map(({ id, time, row }) => {
      orphanPaymentSheet.deleteRow(row);
      return { id, time };
    });
}