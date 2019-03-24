import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {UserService} from 'src/app/services/user.service';
import {User} from 'src/app/models/user';
import { registerContentQuery } from '@angular/core/src/render3';


@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  value = 'la re puta madre ndea';

  constructor(private userService : UserService) { }

  ngOnInit() {
  }

  resetForm(form : NgForm){
    form.reset();
  }

  login(form : NgForm){
    this.userService.login(form.value)
    .subscribe(res=>{
      console.log(res);
      this.resetForm(form);
    });
  }

  register(form:NgForm){
    console.log(form);

    this.userService.register(form.value)
    .subscribe(res=>{
      let response = res;
      
      this.resetForm(form);
    });
  }

}
