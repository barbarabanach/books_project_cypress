export default {
    async loadBooks(context) {
        const response = await fetch('https://api.itbook.store/1.0/search/mongodb');
        const responseData = await response.json();
  
        if (!response.ok) {
            const error = new Error(responseData.message || 'Something goes wrong! Try again later...');
            throw error;
        }
        
        const books = [];
 
        for(const key in responseData.books) {
            const authorsResponse = await fetch(`https://api.itbook.store/1.0/books/${responseData.books[key].isbn13}`);
            const authorsData = await authorsResponse.json();

            const book = {
                id: key,
                title: responseData.books[key].title,
                isbn13: responseData.books[key].isbn13,
                price: responseData.books[key].price,
                image: responseData.books[key].image,
                author: authorsData.authors
            };
            books.push(book);
        }
        context.commit('setBooks', books);
    },
};