<template>
  <div class="mb-4">
    <label :for="id" class="block text-sm font-medium">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full mt-1 px-4 py-2 bg-gray-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
      :placeholder="placeholder"
    />
    <span v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  modelValue: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  error: String
});

defineEmits(['update:modelValue']);
</script> 