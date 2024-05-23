// Importa Express y crea una instancia de Router
const express = require('express');
const router = express.Router();

// Importa el controlador adecuado para manejar la descarga del PDF
const pdfController = require('../controllers/pdfController');

// Define la ruta GET para descargar el PDF
router.get('/download-pdf/:orderId', pdfController.downloadPDF);

// Exporta el router para su uso en la aplicación principal
module.exports = router;
