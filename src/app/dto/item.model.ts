export class Item {
    id: string;
    name: string;
    subCategoryId: number;
    location: string;
    price: number;
    mainImageId: string;
  
    constructor(
        id: string, 
        name: string, 
        subCategoryId: number,
        location: string,
        price: number, 
        mainImageId: string
        ) {
      this.id = id;
      this.name = name;
      this.subCategoryId = subCategoryId;
      this.location = location;
      this.price = price;
      this.mainImageId = mainImageId;
    }
  }