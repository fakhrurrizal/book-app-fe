export const endpoints = {
    get_me: 'auth/user',
    book: "book",
    book_category: "book-category",
    upload: 'file',
    login: 'auth/signin',
    register: 'auth/signup',
    user: 'user',
    book_lending: 'book-lending',
} as const

export type ApiEndpoint = keyof typeof endpoints

export const getApi: (key: ApiEndpoint) => string = key => {
    const host = process.env.NEXT_PUBLIC_API

    return `${host}/v1/${endpoints[key]}`
}
