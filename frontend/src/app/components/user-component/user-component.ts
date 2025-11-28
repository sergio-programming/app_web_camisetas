import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserServices, User, UserCreate } from '../../services/user-services';

@Component({
  selector: 'app-user-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-component.html',
  styleUrl: './user-component.css',
})
export class UserComponent implements OnInit {

  users: User[] = []

  userCreateForm: FormGroup;
  userUpdateForm: FormGroup;

  getCreateForm: boolean = false;
  getUpdateForm: boolean = false;

  successMessage: string = "";
  errorMessage: string = "";
  invalidFormMessage: string = "";

  constructor (
    private userServices: UserServices,
    private fb: FormBuilder
  ) {
    this.userCreateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required, Validators.pattern(/^(superadmin|admin)$/)]]
    })

    this.userUpdateForm = this.fb.group({
      email: ['', [Validators.email]],
      nombre: ['', [Validators.minLength(3)]],
      role: ['', [Validators.pattern(/^(superadmin|admin)$/)]],
      activo: ['']
    })
  }

  ngOnInit(): void {
    this.onGetUsers();
  }

  onGetUsers(): void {
    this.userServices.getUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Error al mostrar usuarios: ', err)
    })
  }
  
  submitCreateUser() {
    if (this.userCreateForm.invalid) {
      this.userCreateForm.markAllAsTouched();
      this.invalidFormMessage = 'Debes completar los campos correctamente';
      return;
    }

    const newUser = this.userCreateForm.value as UserCreate;

    this.userServices.createUser(newUser).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        this.invalidFormMessage = '';
        this.onGetUsers();
        this.userCreateForm.reset();

      }, error: (err) => {
        console.error('Error al crear el usuario: ', err);
        this.errorMessage = 'Error al crear el usuario';
        this.successMessage = '';
      } 
    })
  }

  submitUpdateUser(_id: string) {
    if (this.userUpdateForm.invalid) {
      this.userUpdateForm.markAllAsTouched();
      this.invalidFormMessage = 'Debes completar los campos correctamente';
      return
    }

    const updatedUser = this.userUpdateForm.value;

    this.userServices.updateUser(_id, updatedUser).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        this.invalidFormMessage = '';
        this.onGetUsers();
        this.userUpdateForm.reset();

      }, error: (err) => {
        console.error('Error al actualizar el usuario: ', err);
        this.errorMessage = 'Error al actualizar el usuario';
        this.successMessage = '';
      } 
    })
  }

  submitDeleteUser(_id: string) {
    if (confirm('¿Estas seguro de eliminar este usuario?')) {
      this.userServices.deleteUser(_id).subscribe({
        next: (res) => {
          this.successMessage = res.message;
          this.errorMessage = '';
          this.onGetUsers();
        }, error: (err) => {
          console.error('Error al ');          
          this.errorMessage = 'Error al eliminar el usuario';
          this.successMessage = '';
        }
      })
    }
  }

  onGetCreateForm() {
    return !this.getCreateForm;
  }

  onGetUpdateForm() {
    return !this.getUpdateForm;
  }

}
