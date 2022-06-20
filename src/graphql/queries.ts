export const queries = {
  listProducts:
    `query listProducts {
      listProducts {
        items {
          id
          name
          quility
        }
      }
    }`,

    getListBooks :`query listBooks {
      listBooks {
        items {
          content
          id
          price
          rating
          title
        }
      }
    }`,
  getBookById:`
  query getBookById($id: ID!) {
    getBook(id: $id) {
      id
      content
      price
      rating
      title
    }
  }`

}