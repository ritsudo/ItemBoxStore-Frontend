export class NewItemContract {
    name: string;
    subCategoryId: number;
    description: string;
    location: string;
    price: number;
  
    constructor(
      name: string,
      subCategoryId: number,
      description: string,
      location: string,
      price: number
        ) {
      this.name = name;
      this.subCategoryId = subCategoryId;
      this.description = description;
      this.location = location;
      this.price = price;
    }
  }