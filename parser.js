const readlineSync = require('readline-sync')

sourceFile = readlineSync.questionPath('Read from: ', {
  isFile: true,
})
console.log('-- sourceFile: ' + sourceFile)

saveFile = readlineSync.questionPath('Save to: ', {
  isFile: true,
  exists: null,
  create: true,
})
console.log('-- saveFile: ' + saveFile)

const fs = require('fs')
var data = fs.readFileSync(sourceFile).toString().split('\n')
console.log('-- Data: ', data)

const key = '- error -'
const findError = data.filter((el) => el.includes(key))
console.log('-- Error Data: ', findError)

let output = []
for (let item of findError) {
  let obj = {}
  let value = item.split(' - ')
  let message = JSON.parse(value[2])
  obj['timestamp'] = new Date(value[0]).getTime()
  obj['loglevel'] = value[1]
  obj['transactionId'] = message.transactionId
  obj['err'] = message.err
  output.push(obj)
}
console.log('-- Output Data: ', output)

fs.writeFile(saveFile, JSON.stringify(output, null, 2), function (err) {
  if (err) throw err
})
