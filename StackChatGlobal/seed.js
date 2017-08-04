const db = require('./server/db');
const Author = require('./server/db/models/author');
const Message = require('./server/db/models/message');
const Channel = require('./server/db/models/channel');

const channels = [
  { name: 'Agentina vs. Brazil', id: 1 },
  { name: 'Love the Website', id: 2 },
  { name: 'Man U vs. Real', id: 3 },
  { name: 'Trash Talkers', id: 4 }
];

const authors = [{
  name: 'Anonymous',
  image: '/images/anonymous.png',
  language: 'English'
}, {
  name: 'Dan',
  image: '/images/user2.png',
  language: 'English'
}, {
  name: 'Joe',
  image: '/images/user3.jpg',
  language: 'English'
}, {
  name: 'Amy',
  image: '/images/user4.png',
  language: 'English'
}, {
  name: 'Lucy',
  image: '/images/user5.jpeg',
  language: 'English'
}, {
  name: 'Jacob',
  image: '/images/user6.png',
  language: 'English'
}, {
  name: 'Cassio',
  image: '/images/user7.png',
  language: 'English'
}, {
  name: 'Emily',
  image: '/images/user8.png',
  language: 'Spanish'
}, {
  name: 'Pedro',
  image: '/images/user9.png',
  language: 'Spanish'
}, {
  name: 'Leonardo',
  image: '/images/user10.jpeg',
  language: 'Spanish'
}, {
  name: 'Chet',
  image: '/images/user11.jpeg',
  language: 'Spanish'
}, {
  name: 'Raffi',
  image: '/images/user12.jpeg',
  language: 'Spanish'
}, {
  name: 'David',
  image: '/images/user13.jpeg',
  language: 'Spanish'
}, {
  name: 'Jim',
  image: '/images/user14.jpeg',
  language: 'French'
}, {
  name: 'Alex',
  image: '/images/user15.jpeg',
  language: 'French'
}, {
  name: 'Tony',
  image: '/images/user16.jpeg',
  language: 'French'
}, {
  name: 'Jane',
  image: '/images/user17.jpeg',
  language: 'French'
}, {
  name: 'Joker',
  image: '/images/user18.jpeg',
  language: 'French'
}, {
  name: 'Logan',
  image: '/images/user19.jpeg',
  language: 'French'
}];

//const id = () => Math.round(Math.random() * (authors.length - 1)) + 1;

const messages = [
  //English
  { authorId: 2, content: 'I love football!', channelId: 1 },
  { authorId: 3, content: 'Brazil will beat Germany next time!', channelId: 1 },
  { authorId: 4, content: 'Yeah, Germany`s team is trash!', channelId: 1 },
  { authorId: 5, content: 'Brazil lost 7-0', channelId: 1 },
  { authorId: 6, content: 'Who do you think is going to win?', channelId: 3 },
  { authorId: 7, content: 'I am very sad!', channelId: 1 },
  //French
  { authorId: 8, content: 'Real Madrid is definitely going to win!', channelId: 3 },
  { authorId: 9, content: 'No chance, Manchester United all the way!', channelId: 3 },
  { authorId: 10, content: 'I am just here so I don`t get fined', channelId: 3 },
  { authorId: 11, content: 'Your team is trash!', channelId: 4 },
  { authorId: 12, content: 'No your team is trash!', channelId: 4 },
  { authorId: 13, content: 'Both teams are bad, please stop. Thanks.', channelId: 4 },
  //Chinese
  { authorId: 14, content: 'I think both teams are bad. Go Arsenal!', channelId: 3 },
  { authorId: 15, content: 'What does losing feel like', channelId: 1 },
  { authorId: 16, content: 'Haha whatever you say', channelId: 3 },
  { authorId: 17, content: 'I love this website', channelId: 2 },
  { authorId: 18, content: 'Yeah, this website is great!', channelId: 2 },
  { authorId: 19, content: 'This is the best website since the 1995-1996 Bulls!', channelId: 2 },
  { authorId: 2, content: 'No one likes you David', channelId: 2 },
  { authorId: 18, content: 'Wheres the Batman', channelId: 2 }
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
