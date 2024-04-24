import { Item } from "./item.model";

export class GetAllResult {
    result: Item[];
    totalPages: number;
  
    constructor(
      result: Item[],
      totalPages: number
    ) {
      this.result = result,
      this.totalPages = totalPages
    }
  }