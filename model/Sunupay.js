const mongoose = require('mongoose');

const sunupaySchema = new mongoose.Schema({
  titre: String,
  numero: String,
  contenu: [
    {
      sousTitre: String,
      image: {
        rang: Number,
        nom: Number,
      },
      texte: [String],
    },
  ],
}, { collection: 'articlesSunupay' });

const Sunupay = mongoose.model('Sunupay', sunupaySchema);

module.exports = Sunupay;