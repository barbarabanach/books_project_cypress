export default {
    books(state) {
        return state.books;
    },
    hasBooks(state) {
        return state.books && state.books.length > 0;
    }
};