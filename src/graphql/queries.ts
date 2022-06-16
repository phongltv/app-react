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

    listBooks : `query listBooks {
      listBooks {
        items {
          content
          id
          price
          title
          rating
        }
      }
    }`

}