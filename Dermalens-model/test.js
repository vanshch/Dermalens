const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

// Load the model
async function loadModel() {
    const model = await tf.loadLayersModel('model.json');
    console.log("Model loaded successfully!");
    return model;
}

// Preprocess the image
async function preprocessImage(filePath, targetSize) {
    const imageBuffer = fs.readFileSync(filePath);
    let tensor = tf.node.decodeImage(imageBuffer)
        .resizeNearestNeighbor(targetSize)
        .toFloat()
        .div(tf.scalar(255.0))
        .expandDims();
    return tensor;
}

// Run prediction
async function runPrediction(model, filePath) {
    const targetSize = [224, 224]; // Adjust to your model’s input size
    const preprocessedImage = await preprocessImage(filePath, targetSize);
    const predictions = await model.predict(preprocessedImage).data();
    console.log("Predictions:", predictions);
    return predictions;
}

// Main execution
(async function() {
    const model = await loadModel();
    const filePath = 'Psoriasis_on_back1.jpg'; // Replace with your image file path
    const predictions = await runPrediction(model, filePath);
})();
