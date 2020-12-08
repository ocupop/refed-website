export const formatMoney = (amount, currency = '$', decimalCount = 0, decimal = '.', thousands = ',') => {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? '-' : ''

    const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
    const j = (i.length > 3) ? i.length % 3 : 0

    return currency + negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '')
  } catch (e) {
    console.log('Error formatting value:', e)
  }
}

export const toCamel = (str) => {
  return str.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  })
}

export const toSnake = (str) => {
  return str.replace('-', '_')
}

// export const abbreviateNumber = (value) => {
//   let newValue = value

//   if (value >= 1000) {
//     var suffixes = ["", "k", "m", "b", "t"]
//     var suffixNum = Math.floor(("" + value).length / 3)
//     console.log(suffixNum)
//     var shortValue = ''

//     for (var precision = 2; precision >= 1; precision--) {
//       shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision))
//       var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '')
//       if (dotLessShortValue.length <= 2) { break }
//     }

//     if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1)
//     newValue = shortValue + suffixes[suffixNum]
//   }
//   return '3M'
// }

export const abbreviateNumber = (num, fixed) => {
  if (num === null) { return null; } // terminate early
  if (num === 0) { return '0'; } // terminate early
  fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
  var b = (num).toPrecision(2).split("e"), // get power
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
    c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
    d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
    e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
  return e;
}