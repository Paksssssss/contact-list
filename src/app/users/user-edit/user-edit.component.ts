import { UsersService } from './../users.service';
import { User } from './../users.model';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @ViewChild('f') addUserForm: NgForm;
  userId: number;
  editMode = false;


  constructor(private usersService: UsersService,
              private ngZone: NgZone) { }

  ngOnInit() {
    this.usersService.userEditing.subscribe(
      (user) => {
        this.editMode = true;
        this.userId = user.id;
        this.ngZone.run(()=>{
          this.addUserForm.form.setValue({
            name: user.name,
            email: user.email,
            contact: user.contactNo
          })
        })

      }
    )
    this.usersService.userDeleted.subscribe(
      () => {
        this.editMode = false;
        this.addUserForm.resetForm();
      }
    )
  }

  onSubmit() {
    if (this.editMode) {
      this.usersService.updateUser(this.addUserForm.value, this.userId);
      this.addUserForm.reset();
      this.editMode = false;
    } else {
      this.usersService.addUser(this.addUserForm.value);
      this.addUserForm.reset();
      this.editMode = false;
    }
  }


}
