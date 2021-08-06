import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { AuthService } from "../../services-and-guards/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  returnUrl: string;
  editingMode = false;
  profilePicForm: FormGroup;
  photo: Observable<string>;

  constructor(
    public authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fBuilder: FormBuilder
  ) {
    this.profilePicForm = this.fBuilder.group({
      picture: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.returnUrl = this.activeRoute.snapshot.queryParams.returnUrl || "/";

    if (!this.authService.isLoggedIn) {
      this.router.navigate([this.returnUrl]);
    }
    this.authService.GetUserPhoto.get().subscribe((data) => {
      if (data.data() != undefined) {
        this.photo = data.data().photoUrl;
        this.profilePicForm.controls.picture.setValue(data.data().photoUrl);
      } else {
        this.profilePicForm.controls.picture.setValue("");
      }
    });
  }

  toggleEdit() {
    this.editingMode = !this.editingMode;
  }

  onSubmit() {
    this.authService.SetUserPhoto(this.form.picture.value).then(() => {
      this.photo = this.form.picture.value;
      this.editingMode = false;
    });
  }

  get form() {
    return this.profilePicForm.controls;
  }

  get username() {
    return this.authService.GetUserUsernameByEmail;
  }

  get email() {
    return this.authService.GetUserEmail;
  }
}
