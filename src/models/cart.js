const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 } // Cantidad predeterminada de 1
  }],
}, { timestamps: true });


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
