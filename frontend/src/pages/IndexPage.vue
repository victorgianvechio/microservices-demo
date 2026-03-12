<template>
  <q-page class="flex flex-center column">
    <q-btn color="primary" label="Criar pedido" @click="createOrder" />

    <div class="q-mt-lg text-h6">🔔 Notificações {{ notifications }}</div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { io } from "socket.io-client"

const notifications = ref(0)

const socket = io("http://localhost:3002")

onMounted(() => {

  socket.on("notification", (data) => {

    console.log("Notificação recebida:", data)

    notifications.value++
  })

})

async function createOrder() {

  await fetch("http://localhost:3000/orders", {
    method: "POST"
  })

}
</script>

<!-- <script setup>
import { ref } from 'vue'

const notifications = ref(0)

async function createOrder() {
  console.log('Criando pedido...')
  await fetch('http://localhost:3000/orders', {
    method: 'POST',
  })
}
</script> -->
