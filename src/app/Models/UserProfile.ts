export class UserProfile {
  id:number;
  username:string;
  name:string


constructor(id:number,username:string,name:string){
  this.id=id;
  this.name=name;
  this.username=username
}

getbyid(id:number){
return this.username;
}

}
