let OrderDB = []

function create(order) {
  OrderDB.push(order)
  return order
}

module.exports = {
  create
}