function saveOrder({ resource }, hookId) {
  const paymentShreadsheet = SpreadsheetApp.openById(PAYMENT_SPREADSHEET_ID);
  const orderSheet = paymentShreadsheet.getSheetByName(ORDER_SHEET_NAME);
  resource["hookId"] = hookId;
  const orderRows = getOrderRows(resource);
  if (!!orderRows) {
    orderRows.forEach(orderRow => {
      orderSheet.appendRow(orderRow);
    })
  }
}

//一括払いの出力データを整形
function getOrderRows(order) {
  //Logger.log(order)
  const {
    id: orderId,
    update_time: updateTime,
    create_time: createTime,
    purchase_units: purchaseUnits,
    payer: {
      name: payerName,
      email_address: payerEmailAddress,
    },
    status
  } = order;

  const productCode = getProductCodeFromOrder(orderId);
  const productName = getProductName(productCode);
  Logger.log(orderId)
  Logger.log(productCode)
  Logger.log(productName)

  return purchaseUnits
    .map(
      ({
        amount: totalAmount,
        shipping: {
          name: {
            full_name: shippingName
          },
          address
        },
      }, itemIndex) => {
        const firstItem = itemIndex === 0;
        return [
          // order field
          getCommonField(firstItem, productCode),
          getCommonField(firstItem, productName),
          getCommonField(firstItem, orderId),
          getCommonField(firstItem, getFullName(payerName)),
          getCommonField(firstItem, payerEmailAddress),
          getAddressString(address),
          totalAmount.value,
          JSON.stringify({
            createdTime: getCommonField(firstItem, createTime).replace(/T/, " ").replace(/Z/, ""),
            amount: Number(totalAmount.value),
            id: order.hookId,
            orderId: orderId,
            installments: false,
            completed: true,
          }),
          //getMoneyAmount(totalAmount),
          //getCommonField(firstItem, updateTime),
          //getCommonField(firstItem, createTime),
          //getCommonField(firstItem, status),

          // item field
          //shippingName,
        ]
      });
}

function getCommonField(firstRow, field) {
  return firstRow ? field : "";
}

//商品コードから商品名を出力する
function updateExistingOrders({ productCode, orderId }) {
  const paymentShreadsheet = SpreadsheetApp.openById(PAYMENT_SPREADSHEET_ID);
  const orderSheet = paymentShreadsheet.getSheetByName(ORDER_SHEET_NAME);
  const orders = getObjectsFromSheet(orderSheet);
  orders
    .filter(order => order['OrderId'] === orderId)
    .forEach(order => {
      const updatingRange = orderSheet.getRange(order.row, 1, 1, 2);
      updatingRange.setValues([[productCode, getProductName(productCode)]]);
    });
}
