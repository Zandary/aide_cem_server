const mongoose = require('mongoose');

const nyvolakoSchema = new mongoose.Schema({
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
}, { collection: 'articlesNyVolako' });

const Nyvolako = mongoose.model('Nyvolako', nyvolakoSchema);

module.exports = Nyvolako;