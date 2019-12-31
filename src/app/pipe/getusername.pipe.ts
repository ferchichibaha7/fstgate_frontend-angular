import { UserService } from 'src/app/Services/Data/user.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getusername'
})
export class GetusernamePipe implements PipeTransform {
constructor(private userservice:UserService){}
user:any
  transform(id:number):string {
    this.getusername(id);
    console.log("inside transform: "+this.user);


    return this.user
  }

getusername(id:number){
  this.user=  this.userservice.getUserProfileById(id).subscribe(data=>{

console.log("inside getuser: "+data.name);
this.user=data.name

  });
}


}
