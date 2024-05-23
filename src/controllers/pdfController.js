const PDFDocument = require('pdfkit');
const Order = require('../models/order');

exports.downloadPDF = async (req, res) => {
    try {
        // Obtener el ID de la orden desde los parámetros de la URL
        const orderId = req.params.orderId;

        // Obtener la orden desde la base de datos
        const order = await Order.findById(orderId).populate('products.product');

        // Crear un nuevo documento PDF
        const doc = new PDFDocument();

        // Configurar los encabezados de la respuesta HTTP para descargar el archivo PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="pedido.pdf"');

        // Escribir el PDF en la respuesta HTTP
        doc.pipe(res);

        // Verificar si se encontró la orden
        if (order) {
            // Agregar detalles de la orden al PDF
            doc.fontSize(16).text(`Orden ID: ${order._id}`);
            doc.moveDown().fontSize(14).text(`Nombre: ${order.name}`);
            doc.moveDown().text(`Dirección: ${order.address}`);
            doc.text(`Ciudad: ${order.city}`);
            doc.text(`Estado/Provincia: ${order.state}`);
            doc.text(`Código Postal: ${order.zip}`);
            doc.text(`País: ${order.country}`);
            doc.moveDown().text(`Número de tarjeta: **** **** **** ${order.cardNumber}`);

            // Agregar detalles de los productos al PDF
            doc.moveDown().fontSize(20).text('Detalle del pedido');

            order.products.forEach(item => {
                doc.moveDown().fontSize(12).text(`Producto: ${item.product.name}`);
                doc.text(`Cantidad: ${item.quantity}`);
                doc.text(`Precio unitario: ${item.product.price.toFixed(2)} €`);
                doc.text(`Subtotal: ${(item.product.price * item.quantity).toFixed(2)} €`);
            });

            // Agregar el total de la orden al PDF
            doc.moveDown().fontSize(20).text(`Total: ${order.total.toFixed(2)} €`);
        } else {
            // Si no se encuentra la orden, enviar un mensaje de error en el PDF
            doc.moveDown().text('Orden no encontrada');
        }

        // Finalizar el PDF
        doc.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al generar el PDF del pedido');
    }
};

