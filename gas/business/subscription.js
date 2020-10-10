//分割払いデータを出力する
function saveNewSubscription({ resource: subscription }, hookId) {
  //Logger.log(resource)
  //Logger.log(subscription)
  const paymentShreadsheet = SpreadsheetApp.openById(PAYMENT_SPREADSHEET_ID);
  const subscriptionSheet = paymentShreadsheet.getSheetByName(SUBSCRIPTION_SHEET_NAME);
  subscriptionSheet.appendRow(createSubscriptionRow(subscription, hookId));
}

//分割払いデータを
function createSubscriptionRow({
  id: subscriptionId,
  plan_id: planId,
  create_time: createTime,
  subscriber: {
    name: subscriberName,
    email_address: subscriberEmail,
    shipping_address: {
      address
    }
  },
  billing_info: {
    cycle_executions: cycles,
    last_payment: {
      amount
    }
  },
}, hookId) {
  const productCode = getProductCodeFromPlan(planId);
  const productName = getProductName(productCode);
  const { completed, remaining, total } = getEffectiveCycle(cycles);

  const payments = adoptOrphanPayments(subscriptionId);
  const { completed: newCompleted, remaining: newRemaining, historyPayments: newHistoryPayments, completeStatus } =
    payments.reduce((acc, cur) => updateSubscription(acc, cur), { completed, remaining, historyPayments: "" });

  return [productCode, productName, subscriptionId, getFullName(subscriberName), subscriberEmail,
    getAddressString(address), Number(amount.value),
    JSON.stringify({
      createdTime: createTime.replace(/T/, " ").replace(/Z/, ""),
      amount: Number(amount.value),
      id: hookId,
      orderId: planId,
      installments: true,
      totalInstallments: Number(total),
      completedInstallments: Number(newCompleted),
      remainingInstallments: Number(newRemaining),
      completed: completeStatus,
    }),
    newHistoryPayments];
  /*
  return [subscriptionId, planId, productCode, productName, getFullName(subscriberName), subscriberEmail,
    getAddressString(address), getMoneyAmount(amount), total, newCompleted, newRemaining, newHistory];
  */
}

//分割払いデータを出力する
function savePayment({ resource: payment }) {
  const paymentShreadsheet = SpreadsheetApp.openById(PAYMENT_SPREADSHEET_ID);
  const subscriptionSheet = paymentShreadsheet.getSheetByName(SUBSCRIPTION_SHEET_NAME);

  const subscriptions = getObjectsFromSheet(subscriptionSheet);
  const updatedValues = getUpdatedValues(subscriptions, payment);

  if (!updatedValues) {
    saveOrphanPayment(payment);
  } else {
    const updatingRange = subscriptionSheet.getRange(updatedValues.row, SUBSCRIPTION_UPDATE_FROM, 1, SUBSCRIPTIOn_UPDATE_RANGE);
    updatingRange.setValues(updatedValues.values);
  }
}

//分割払いの2回目以降の支払いがされたときに更新行とデータを返す
function getUpdatedValues(
  subscriptions,
  {
    billing_agreement_id,
    create_time: time,
    id,
  }) {
  const matchingSubscription = subscriptions.find(({ orderId }) => orderId === billing_agreement_id);
  if (!matchingSubscription) {
    return;
  }

  const { history, payments: historyPayments } = matchingSubscription;
  const histObj = JSON.parse(history);
  const { completedInstallments: completed, remainingInstallments: remaining } = histObj;

  const { historyPayments: newHistoryPayments, completed: newCompleted, remaining: newRemaining, completeStatus } =
    updateSubscription({ completed, remaining, historyPayments }, { id, time });
  return {
    row: matchingSubscription.row,
    values: [[JSON.stringify({ ...histObj, completedInstallments: newCompleted, remainingInstallments: newRemaining, completed: completeStatus }), newHistoryPayments]]
  };
}

//分割払いの2回目以降の支払いがされると更新データを返す
function updateSubscription({ completed, remaining, historyPayments }, payment) {
  const newCompleted = completed + 1;
  const newRemaining = remaining - 1;
  const newHistoryPayments = historyPayments ? historyPayments + "\n" + getPaymentString(payment) : getPaymentString(payment);
  const newStatus = newRemaining < 1;
  return { historyPayments: newHistoryPayments, completed: newCompleted, remaining: newRemaining, completeStatus: newStatus };
}
