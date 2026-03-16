const notificationDB = []

function create(notification) {

  notificationDB.push(notification)

  return notification
}

function findAll() {
  return notificationDB
}

module.exports = {
  create,
  findAll
}