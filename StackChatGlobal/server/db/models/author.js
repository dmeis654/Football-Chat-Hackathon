const Sequelize = require('sequelize');
const db = require('../db');

const images = [
  'http://skyviewacademy.org/wp-content/uploads/2017/05/soccer1.png',
  'https://lh4.ggpht.com/O-S9ibQRzOVEOvXYb9aD5-QNMufPXnFtdX0n4Mss_jZlnJCAdbtbKn9nrT3k8Lc3hg=w300',
  'http://files.leagueathletics.com/Images/Club/13217/Soccer-on-soccer-ball-clip-art-and-award-certificates-clipartix.png',
  'https://s-media-cache-ak0.pinimg.com/736x/63/69/4a/63694a479c6f4368e176b02984020609--messi-vs-ronaldo-messi-cr.jpg',
  'http://www.magicsolver.com/blog/wp-content/uploads/2010/05/icon-World-cup-Calendar-final.png',
  'https://s-media-cache-ak0.pinimg.com/originals/3c/c9/71/3cc971767482ce835cdb0311f8e525c9.jpg',
  'https://s-media-cache-ak0.pinimg.com/736x/c9/61/23/c9612328f76cfa03bb6fc3b782724eff--ronaldo-football-players.jpg',
  'https://s-media-cache-ak0.pinimg.com/736x/a5/78/c3/a578c3dd7ae787ae321faab327fd9fd2--edgar-davids-holland-netherlands.jpg',
  'https://s-media-cache-ak0.pinimg.com/736x/cc/6f/6a/cc6f6ab5141705a3791b696517150046.jpg',
  'https://m.media-amazon.com/images/S/aplus-media/vc/7895a621-9359-412d-92d2-94c15adc4c70.jpg'
];

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

module.exports = db.define('author', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: function () {
      return getRandomImage();
    }
  },
  language: {
    type: Sequelize.STRING,
    //allowNull: false
  }
});
