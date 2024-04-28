export class DetailedItem {
  description: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  authorPhone: string;
  authorAvatarId: string;
  id: string;
  name: string;
  subCategoryId: number;
  location: string;
  price: number;
  mainImageId: string;

  constructor(
    description: string,
    authorId: string,
    authorName: string,
    createdAt: string,
    authorPhone: string,
    authorAvatarId: string,
    id: string,
    name: string,
    subCategoryId: number,
    location: string,
    price: number,
    mainImageId: string
  ) {

    this.description = description;
    this.authorId = authorId;
    this.authorName = authorName;
    this.createdAt = createdAt;
    this.authorPhone = authorPhone;
    this.authorAvatarId = authorAvatarId;
    this.id = id;
    this.name = name;
    this.subCategoryId = subCategoryId;
    this.location = location;
    this.price = price;
    this.mainImageId = mainImageId;
  }
}