const router = require('express').Router();
const { Message, Author } = require('../db/models');
const path = require('path')

function translateText (text, target) {
  // Imports the Google Cloud client library
  const Translate = require('@google-cloud/translate');

  // Instantiates a client
  const translate = Translate({
    projectId: 'stackchatglobal',
    keyFilename: path.join(__dirname, '../../StackChatGlobal-207dda4001e5.json')
  });

  return translate.translate(text, target)
    .then((results) => {
      let translations = results[0];
      translations = Array.isArray(translations) ? translations : [translations];

      //console.log('Translations:');
      return translations.map((translation, i) => {
       
      return translation;
      });
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
}

module.exports = router;

//Testing translate
router.get('/:id/translateSpanish', function (req, res, next) {
  Message.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(message => translateText(message.content, "es"))
  .then((translated) => res.json(translated))
  .catch(next)
})

//Translate to Languages

router.get('/translateEnglish', function (req, res, next) {
  Message.findAll({})
  .then(messageObjects => {
    return messageObjects.map((message) => {
      const translated = translateText(message.content, "en")
      return translated
      .then(translated => {
      message.content = translated[0]
      return message
      })
    })
  })
  .then((translated) => {
    Promise.all(translated)
    .then(resolved => res.json(resolved))
  })
  .catch(next)
})

router.get('/translateSpanish', function (req, res, next) {
  Message.findAll({})
  .then(messageObjects => {
    return messageObjects.map((message) => {
      const translated = translateText(message.content, "es")
      return translated
      .then(translated => {
      message.content = translated[0]
      return message
      })
    })
  })
  .then((translated) => {
    Promise.all(translated)
    .then(resolved => res.json(resolved))
  })
  .catch(next)
})

router.get('/translateFrench', function (req, res, next) {
  Message.findAll({})
  .then(messageObjects => {
    return messageObjects.map((message) => {
      const translated = translateText(message.content, "fr")
      return translated
      .then(translated => {
      message.content = translated[0]
      return message
      })
    })
  })
  .then((translated) => {
    Promise.all(translated)
    .then(resolved => res.json(resolved))
  })
  .catch(next)
})

// GET api/messages
router.get('/', function (req, res, next) {
  Message.findAll()
    .then(messages => res.json(messages))
    .catch(next);
});

// POST /api/messages
router.post('/', function (req, res, next) {
  console.log("hello")
  // We don't have proper users yet (we'll get there soon, though!).
  // Instead, we'll findOrCreate an author by name, for simplicity.
  // Of course, you wouldn't want to do this in a real chat app!
  Author.findOrCreate({
    where: {
      name: req.body.name || 'Anonymous'
    }
  })
  .spread(author => {
    console.log("hi")
    const message = Message.build(req.body);
    message.setAuthor(author, { save: false });
    return message.save()
      .then(message => {
        message = message.toJSON();
        message.author = author;
        return message;
      });
  })
  .then(message => {
    res.json(message);
  })
  .catch(next);

});

// PUT /api/messages
router.put('/:messageId', function (req, res, next) {
  const messageId = req.params.messageId;

  Message.findById(messageId)
    .then(message => message.update(req.body))
    .catch(next);
});

// DELETE /api/messages
router.delete('/:messageId', function (req, res, next) {
  const id = req.params.messageId;

  Message.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});
