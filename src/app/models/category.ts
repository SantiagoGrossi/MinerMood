 export class Category{
     name: string;
     quantity: number;
     id:string;

     constructor(public categoryname?: string, public productquantity?:number, public key?: string){
         this.name = categoryname,
         this.quantity = productquantity,
         this.id = key
     }

 }