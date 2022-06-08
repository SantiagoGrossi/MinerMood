 export class Category{
     name: string;
     quantity: number;
     id:string;
     pressed: boolean;
     oquantity:number;

     constructor(public categoryname?: string, public productquantity?:number, public checked?: boolean,public orders?:number, public key?: string){
         this.name = categoryname,
         this.quantity = productquantity,
         this.id = key,
         this.pressed = checked,
         this.oquantity = 1
     }

 }