const blog = {
  id: "1001",
  posts: [
    {
      id: "123",
      author: {
        id: "1",
        nombre: "Pablo",
        apellido: "Perez",
        edad: "20442654",
        alias: "CABA 123",
        avatar: "foto1.png",
      },
      title: "My awesome blog post",
      comments: [
        {
          id: "324",
          commenter: {
            id: "2",
            nombre: "Nicole",
            apellido: "Gonzalez",
            edad: "20442638",
            alias: "CABA 456",
            avatar: "foto2.png",
          },
        },
        {
          id: "325",
          commenter: {
            id: "3",
            nombre: "Pedro",
            apellido: "Mei",
            edad: "20446938",
            alias: "CABA 789",
            avatar: "foto3.png",
          },
        },
      ],
    },
    {
      id: "1123",
      author: {
        id: "2",
        nombre: "Nicole",
        apellido: "Gonzalez",
        edad: "20442638",
        alias: "CABA 456",
        avatar: "foto2.png",
      },
      title: "My awesome blog post",
      comments: [
        {
          id: "1324",
          commenter: {
            id: "1",
            nombre: "Pablo",
            apellido: "Perez",
            edad: "20442654",
            alias: "CABA 123",
            avatar: "foto1.png",
          },
        },
        {
          id: "1325",
          commenter: {
            id: "3",
            nombre: "Pedro",
            apellido: "Mei",
            edad: "20446938",
            alias: "CABA 789",
            avatar: "foto3.png",
          },
        },
      ],
    },
    {
      id: "2123",
      author: {
        id: "3",
        nombre: "Pedro",
        apellido: "Mei",
        edad: "20446938",
        alias: "CABA 789",
        avatar: "foto3.png",
      },
      title: "My awesome blog post",
      comments: [
        {
          id: "2324",
          commenter: {
            id: "2",
            nombre: "Nicole",
            apellido: "Gonzalez",
            edad: "20442638",
            alias: "CABA 456",
            avatar: "foto2.png",
          },
        },
        {
          id: "2325",
          commenter: {
            id: "1",
            nombre: "Pablo",
            apellido: "Perez",
            edad: "20442654",
            alias: "CABA 123",
            avatar: "foto1.png",
          },
        },
      ],
    },
  ],
};

export default blog;
