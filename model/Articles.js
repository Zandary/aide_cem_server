const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
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

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;