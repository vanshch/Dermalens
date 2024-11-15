<template>
  <div class="flex justify-center space-x-4">
    <div class="text-center">
      <div class="text-4xl font-bold">{{ days }}</div>
      <div class="text-sm text-gray-400">Days</div>
    </div>
    <div class="text-center">
      <div class="text-4xl font-bold">{{ hours }}</div>
      <div class="text-sm text-gray-400">Hours</div>
    </div>
    <div class="text-center">
      <div class="text-4xl font-bold">{{ minutes }}</div>
      <div class="text-sm text-gray-400">Minutes</div>
    </div>
    <div class="text-center">
      <div class="text-4xl font-bold">{{ seconds }}</div>
      <div class="text-sm text-gray-400">Seconds</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  targetDate: {
    type: Date,
    required: true
  }
})

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let interval

const updateCountdown = () => {
  const now = new Date().getTime()
  const distance = props.targetDate.getTime() - now

  days.value = Math.floor(distance / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((distance % (1000 * 60)) / 1000)
}

onMounted(() => {
  updateCountdown()
  interval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script> 