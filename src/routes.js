const {
    addBookHandler,
    getAllBookHandler,
    getBookByIdHandler,
    // editBooksByIdHandler,
    // deleteBooksByIdHandler,
} = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: (request, h) => {
            const{name, reading, finished} = request.query;

    if (!name && !reading && !finished) {
        const response = h.response({
            status: 'success',
            data: {
              books: books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
              })),
            },
          })
          .code(200);
    
        return response;
    }
        
    if (name) {
        const query = name.toLowerCase();
        const filteredBooksName = books.filter((book) => book.name.toLowerCase().includes(query));
            
        const response = h.response({
            status: 'success',
            data: {
                books: filteredBooksName.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
                })),
            },
        })
        response.code(200);
        return response;
    }

    if (reading) {

            const filteredBooksReading = books.filter(
                (book) => Number(book.reading) === Number(reading),
            );

            const response = h.response({
                status: 'success',
                data: {
                        books: filteredBooksReading.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    }))
                }
             });
             response.code(200);
             return response;

    }

    const filteredBooksFinished = books.filter(
        (book) => Number(book.finished) === Number(finished),
    );

    const response = h.response({
        status: 'success',
        data: {
            books: filteredBooksFinished.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
            }))
        }
    });
    response.code(200);
    return response;
        } ,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler,
    },
    // {
    //     method: 'PUT',
    //     path: '/books/{bookId}',
    //     handler: editBooksByIdHandler,
    // },
    // {
    //     method: 'DELETE',
    //     path: '/books/{bookId}',
    //     handler: deleteBooksByIdHandler,
    // },
];
 
module.exports = routes;