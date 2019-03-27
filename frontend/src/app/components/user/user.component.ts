import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {User} from 'src/app/models/user';


@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers:[UserService]
})
export class UserComponent implements OnInit {
  value = 'la re puta madre ndea';

  errorsLogin : any = {};
  errorsRegister : any = {};
  

  constructor(private userService : UserService) { }

  ngOnInit() {
  }

  resetForm(form : NgForm){
    form.reset();
  }

    

  login(form : NgForm){
    this.userService.login(form.value).subscribe(
       (response:any)=>{
          if(response.errors){
            this.errorsLogin.username = response.errors.username;
            this.errorsLogin.password = response.errors.password; 
          }
          else{
            console.log(response);
            this.resetForm(form);
          }
       },
       error=>{
        console.log(error);
       }
    );
  }

  register(form:NgForm){
    console.log(form.value);

    this.userService.register(form.value)
    .subscribe(
      (response:any)=>{
        if(response.errors){
          this.errorsRegister = response.errors;
        }
        else{
          this.errorsRegister = {};
          console.log(response);
          this.resetForm(form);
        }
      },
      error=>{
        console.log(error);
      }
    );
  }

}
