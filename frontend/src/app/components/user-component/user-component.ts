import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserServices } from '../../services/user-services';

@Component({
  selector: 'app-user-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-component.html',
  styleUrl: './user-component.css',
})
export class UserComponent {

  userCreateForm: FormGroup;
  successMessage: string = "";
  errorMessage: string = "";
  invalidFormMessage: string = "";

  constructor (
    private userServices: UserServices,
    private fb: FormBuilder
  ) {
    this.userCreateForm = this.fb.group({
      
    })
  }


}
