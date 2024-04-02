export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    likedBooksIds: number[];
    booksInCartIds: number[];
}