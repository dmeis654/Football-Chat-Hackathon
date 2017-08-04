const db = require('./server/db');
const Author = require('./server/db/models/author');
const Message = require('./server/db/models/message');
const Channel = require('./server/db/models/channel');

const channels = [
  { name: 'really_random' },
  { name: 'generally_speaking' },
  { name: 'dogs_of_fullstack' },
  { name: 'lunch_planning' }
];

const authors = [{
  name: 'Anonymous',
  image: '/images/anonymous.png',
  language: 'English'
}, {
  name: 'Cody',
  image: '/images/cody.jpg',
  language: 'English'
}, {
  name: 'Ben',
  image: '/images/ben.jpg',
  language: 'English'
}, {
  name: 'Star',
  image: '/images/star.jpg',
  language: 'English'
}, {
  name: 'Batman',
  image: '/images/batman.jpg',
  language: 'English'
}, {
  name: 'Elliott',
  image: '/images/elliott.jpg',
  language: 'English'
}, {
  name: 'Fira',
  image: '/images/fira.jpg',
  language: 'English'
}, {
  name: 'Henry',
  image: '/images/henry.jpg',
  language: 'Spanish'
}, {
  name: 'Marcy',
  image: '/images/marcy.jpg',
  language: 'Spanish'
}, {
  name: 'Milton',
  image: '/images/milton.jpg',
  language: 'Spanish'
}, {
  name: 'Murphy',
  image: '/images/murphy.jpg',
  language: 'Spanish'
}, {
  name: 'Raffi',
  image: '/images/raffi.jpg',
  language: 'Spanish'
}, {
  name: 'Tulsi',
  image: '/images/tulsi.jpg',
  language: 'Spanish'
}, {
  name: 'Pork Chop',
  image: '/images/pork_chop.jpg',
  language: 'French'
}, {
  name: 'Ribs',
  image: '/images/ribs.jpg',
  language: 'French'
}, {
  name: 'Stacey',
  image: '/images/stacey.jpg',
  language: 'French'
}, {
  name: 'JD',
  image: '/images/jd.jpg',
  language: 'French'
}, {
  name: 'BenBen',
  image: '/images/benben.png',
  language: 'French'
}, {
  name: 'Odie',
  image: '/images/odie.jpg',
  language: 'French'
}];

//const id = () => Math.round(Math.random() * (authors.length - 1)) + 1;

const messages = [
  //English
  { authorId: 2, content: 'I like React!', channelId: 1 },
  { authorId: 3, content: 'I like Redux!', channelId: 1 },
  { authorId: 4, content: 'I like React-Redux!', channelId: 1 },
  { authorId: 5, content: 'I like writing web apps!', channelId: 2 },
  { authorId: 6, content: 'You should learn JavaScript!', channelId: 2 },
  { authorId: 7, content: 'JavaScript is pretty great!', channelId: 2 },
  //French
  { authorId: 8, content: 'Dogs are great!', channelId: 3 },
  { authorId: 9, content: 'Cats are also great!', channelId: 3 },
  { authorId: 10, content: 'Why must we fight so?', channelId: 3 },
  { authorId: 11, content: 'I want to get tacos!', channelId: 4 },
  { authorId: 12, content: 'I want to get salad!', channelId: 4 },
  { authorId: 13, content: 'I want a taco salad!', channelId: 4 },
  //Chinese
  { authorId: 14, content: 'Dogs are great!', channelId: 3 },
  { authorId: 15, content: 'Cats are also great!', channelId: 3 },
  { authorId: 16, content: 'Why must we fight so?', channelId: 3 },
  { authorId: 17, content: 'I want to get tacos!', channelId: 4 },
  { authorId: 18, content: 'I want to get salad!', channelId: 4 },
  { authorId: 19, content: 'I want a taco salad!', channelId: 4 }
];

const seed = () =>
  Promise.all(authors.map(author =>
    Author.create(author))
  )
  .then(() =>
  Promise.all(channels.map(channel =>
    Channel.create(channel))
  ))
  .then(() =>
  Promise.all(messages.map(message =>
    Message.create(message))
  )
);

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
