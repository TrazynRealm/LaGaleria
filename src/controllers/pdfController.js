const PDFDocument = require('pdfkit');

exports.downloadPDF = async (req, res) => {
    console.log('Descargando PDF...');

    try {
        const doc = new PDFDocument();
        console.log('Descargando PDF... 2');


        // Establecer el tipo de contenido en la respuesta HTTP
        res.setHeader('Content-Type', 'application/pdf');
        // Establecer el encabezado para indicar la descarga del archivo PDF
        res.setHeader('Content-Disposition', 'attachment; filename="pedido.pdf"');

        // Pipe the PDF kit output to the response
        doc.pipe(res);

        // Agregar el contenido del PDF aquí
        doc.fontSize(20).text('Detalle del pedido', { align: 'center' });

        // Aquí deberías obtener los datos del pedido desde la base de datos
         orders.forEach((order, index) => {
             doc.text(`Pedido ${order._id}`, { continued: true }).fontSize(12).moveDown();
             order.products.forEach((product) => {
                 doc.text(`- Producto: ${product.product.name}, Cantidad: ${product.quantity}, Precio: ${product.product.price.toFixed(2)}€`);
             });
             doc.text(`Total del pedido: ${order.products.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}€`);
             if (index < orders.length - 1) {
                 doc.addPage();
             }
         });

        // Finalizar y enviar el PDF al cliente
        doc.end();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al generar el PDF del pedido');
    }
};
