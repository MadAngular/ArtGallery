import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services-and-guards/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    public authService: AuthService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private fBuilder: FormBuilder
  ) {
    this.loginForm = this.fBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });

    if (this.authService.isLoggedIn) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.returnUrl = this.activeRoute.snapshot.queryParams.returnUrl || "/";
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.authService.Login(
      this.form.email.value,
      this.form.password.value,
      this.returnUrl
    );
  }
}
