//金額の単位をつけて値を返す
function getMoneyAmount({ currency_code: currency, value }) {
  return value + " " + currency;
}

//指定フォーマットに成型して住所を返す
function getAddressString({ address_line_1, admin_area_2, admin_area_1, postal_code, country_code }) {
  return `${address_line_1} ${admin_area_2} ${admin_area_1} ${postal_code} ${country_code}`
}

//指定フォーマットに成型して名前を返す
function getFullName({ given_name, surname }) {
  return given_name + "" + surname;
}

//分割払いデータの支払済み回数/残支払い回数/トータル回数を取得する
function getEffectiveCycle(cycles) {
  const {
    cycles_completed: completed,
    cycles_remaining: remaining,
    total_cycles: total
  } = cycles.find(({ tenure_type }) => tenure_type === "REGULAR");

  return { completed, remaining, total }
}

//
function getPaymentString({ id, time }) {
  return `- Payment ${id} at ${time}`;
}