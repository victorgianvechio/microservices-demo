const express = require("express")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/env")

const router = express.Router()

router.post("/login", (req, res) => {
  const user = { id: 1, name: "Victor" }

  const token = jwt.sign(user, JWT_SECRET)

  res.json({ token })
})

module.exports = router