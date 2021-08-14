import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services-and-guards/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fBuilder: FormBuilder
  ) {
    this.registerForm = this.fBuilder.group({
      email: ["", [Validators.email]],
      password: ["", [Validators.minLength(6), Validators.required]],
      repassword: ["", [Validators.minLength(6), Validators.required]],
    });

    if (this.authService.isLoggedIn) {
      this.router.navigate(["/"]);
    }
  }

  get form() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.authService
      .Register(this.form.email.value, this.form.password.value)
      .finally(() => {
        this.form.password.reset();
        this.form.repassword.reset();
      });
  }
}
