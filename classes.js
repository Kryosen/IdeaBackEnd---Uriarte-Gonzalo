class User {
  constructor(name, surname, books, pets) {
    this.name = name;
    this.surname = surname;
    this.books = books;
    this.pets = pets;
  }

  getFullName() {
    return console.log(
      `Nombre completo del usuario: ${this.name} ${this.surname}`
    );
  }

  addMascota(newPet) {
    this.pets.push(newPet);
  }

  countMascotas() {
    return console.log(`El usuario tiene: ${this.pets.length} mascotas`);
  }

  addBook(bookName, bookAuthor) {
    this.books.push({ name: bookName, author: bookAuthor });
  }

  getBookNames() {
    const bookNamesOnly = this.books.map((val) => val.name);
    console.log(`Los nombres de los libros son: ${bookNamesOnly}`);
  }
}

const gonzalo = new User(
  "Gonzalo",
  "Uriarte",
  [
    { name: " El Alquimista", author: "Paulo Coelho" },
    { name: " El Principito", author: "Antoine de Saint-Exupéry" },
  ],
  ["Louis", "Tania"]
);

gonzalo.countMascotas();

gonzalo.getBookNames();

gonzalo.getFullName();

gonzalo.addMascota("Jarno");

gonzalo.addBook(" 1Q84", "Haruki Murakami");

gonzalo.countMascotas();

gonzalo.getBookNames();
