<template>
  <q-page class="flex flex-center column">

    <q-btn color="primary" label="Login" @click="login" />

    <q-btn
      color="primary"
      label="Criar pedido"
      class="q-mt-md"
      @click="createOrder"
    />

    <div class="q-mt-lg text-h6">
      🔔 Notificações {{ notifications }}
    </div>

  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { io } from "socket.io-client"

const notifications = ref(0)
const token = ref(null)

// conecta via gateway
const socket = io("http://localhost:3003", {
  transports: ["websocket"]
})

onMounted(() => {

  socket.on("notification", (data) => {
    console.log("Notificação recebida:", data)
    notifications.value++
  })

  socket.on("connect", () => {
    console.log("CONECTOU", socket.id)
  })

})

// =======================
// LOGIN
// =======================

async function login() {

  const res = await fetch("http://localhost:3003/login", {
    method: "POST"
  })

  const data = await res.json()

  token.value = data.token

  console.log("Token recebido:", token.value)
}

// =======================
// CREATE ORDER
// =======================

async function createOrder() {

  if (!token.value) {
    alert("Faça login primeiro!")
    return
  }

  await fetch("http://localhost:3003/api/orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })

}
</script>
