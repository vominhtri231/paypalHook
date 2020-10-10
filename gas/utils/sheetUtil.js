function getObjectsFromSheet(sheet) {
  const data = sheet.getDataRange().getValues();
  const keys = data[0];
  return data
    .filter((row, i) => i > 0)
    .map((row, i) => {
      const rowObj = { row: i + 2 };
      row.forEach((cell, j) => {
        if (keys[j] != "") {
          rowObj[keys[j]] = cell;
        }
      });
      return rowObj;
    })
}