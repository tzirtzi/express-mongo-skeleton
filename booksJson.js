const mongoose = require("mongoose");
const mongooseConnect = require('./api/data/mongooseConnect')(mongoose);

const Book = require("./api/models/book");

//Save item service
async function createBook(item, index) {

	console.log(`Processing item at index ${index}`);
	const book = new Book({
		_id: new mongoose.Types.ObjectId(),
		title: item.title,
		genre: item.genre,
		author: item.author,
		read: false
	});

	postItem(book)
		.then(savedItem => {
			console.log(savedItem);
		})
		.catch(err => {
			console.log(err);
		});

}

//Generic db save item controller
async function postItem(modelInstance) {
	return modelInstance
		.save()
}


const books = [
	{
		title: 'War and Peace',
		genre: 'Historical Fiction',
		author: 'Lev Nikolayevich Tolstoy',
		read: false
	},
	{
		title: 'Les Misérables',
		genre: 'Historical Fiction',
		author: 'Victor Hugo',
		read: false
	},
	{
		title: 'The Time Machine',
		genre: 'Science Fiction',
		author: 'H. G. Wells',
		read: false
	},
	{
		title: 'A Journey into the Center of the Earth',
		genre: 'Science Fiction',
		author: 'Jules Verne',
		read: false
	},
	{
		title: 'The Dark World',
		genre: 'Fantasy',
		author: 'Henry Kuttner',
		read: false
	},
	{
		title: 'The Wind in the Willows',
		genre: 'Fantasy',
		author: 'Kenneth Grahame',
		read: false
	},
	{
		title: 'Life On The Mississippi',
		genre: 'History',
		author: 'Mark Twain',
		read: false
	},
	{
		title: 'Childhood',
		genre: 'Biography',
		author: 'Lev Nikolayevich Tolstoy',
		read: false
	}
];

books.forEach(createBook);

