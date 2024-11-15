<template>
    <div v-if="!isAnalyzed" class="w-full max-w-md mx-auto">
        <label for="file-upload"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
            :class="{ 'border-blue-500': isDragging }" @dragenter.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false" @dragover.prevent @drop.prevent="handleDrop">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloudIcon class="w-10 h-10 mb-3 text-gray-400" />
                <p class="mb-2 text-sm text-gray-300">
                    <span class="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p class="text-xs text-gray-400">
                    SVG, PNG, JPG or GIF
                </p>
            </div>
            <input id="file-upload" type="file" class="hidden" @change="handleFileSelect" accept="image/*" />
        </label>

        <div v-if="selectedFile" class="mt-4 space-y-4">
            <div class="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div class="flex items-center">
                    <FileIcon class="w-6 h-6 mr-2 text-gray-400" />
                    <span class="text-sm font-medium text-gray-200">
                        {{ selectedFile.name }}
                    </span>
                </div>
                <button @click="removeFile"
                    class="text-sm font-medium text-red-400 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-700 rounded">
                    Remove
                </button>
            </div>

            <div v-if="imagePreview" class="relative w-full h-64 bg-gray-700 rounded-lg overflow-hidden">
                <img :src="imagePreview" alt="Preview" class="w-full h-full object-contain" />
            </div>
        </div>

        <!-- <button @click="()=>{uploadFile,removeFile}"  -->
        <button @click="uploadFile" 

            class="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            :disabled="!selectedFile">
            Upload
        </button>
    </div>

    <div v-else class="w-full max-w-md mx-auto flex flex-col items-center">
        <analysis :disease="analysis_prop" class="w-full" />
        <button @click="handleReanalysis"
            class="mt-4 w-full max-w-md px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded-md shadow-sm transition-colors duration-300">
            Analyze Another Image
        </button>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { UploadCloudIcon, FileIcon } from 'lucide-vue-next'
import axios from 'axios'
import analysis from './analysis.vue'

const isAnalyzed = ref(false)
const isDragging = ref(false)
const selectedFile = ref(null)
const imagePreview = ref(null)
let analysis_prop = ref({
    name: 'Common Cold',
    severity: 'low',
    symptoms: ['Cough', 'Sneezing', 'Runny nose'],
    remedies: ['Drink warm liquids', 'Rest', 'Gargle'],
    medicines: ['Paracetamol', 'Ibuprofen'],
    specialistNumber: '+91 9876543210',
})

const handleDrop = (e) => {
    isDragging.value = false
    const files = e.dataTransfer.files
    if (files.length > 0) {
        selectedFile.value = files[0]
    }
}

const handleFileSelect = (e) => {
    const files = e.target.files
    if (files.length > 0) {
        selectedFile.value = files[0]
    }
}

const removeFile = () => {
    selectedFile.value = null
    imagePreview.value = null
}

const uploadFile = () => {
    if (selectedFile.value) {
        const formData = new FormData()
        formData.append('file', selectedFile.value)
        // Send the file to the server
        axios.post('http://localhost:3000/api/test/image', formData)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                analysis_prop.value = response.data;
                isAnalyzed.value = true;
            })
            .catch((error) => {
                console.error('Error uploading file', error)
            })
        isAnalyzed.value = true;
    }
}

// Create image preview when a file is selec/ted
watch(selectedFile, (file) => {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
            imagePreview.value = e.target.result
        }
        reader.readAsDataURL(file)
    } else {
        imagePreview.value = null
    }
})

// Add new function for reanalysis
const handleReanalysis = () => {
    isAnalyzed.value = false;
    selectedFile.value = null;
    imagePreview.value = null;
    analysis_prop.value = {
        name: '',
        severity: '',
        symptoms: [],
        remedies: [],
        medicines: [],
        specialistNumber: '',
    };
}
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>