import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../../services-and-guards/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  editingMode = false;
  profilePicForm: FormGroup;
  photo: Observable<string>;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fBuilder: FormBuilder
  ) {
    this.profilePicForm = this.fBuilder.group({
      picture: ["", Validators.required],
    });
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(["/login"]);
    }

    this.authService.GetUserPhoto.get().subscribe((collection) => {
      if (collection.data() != undefined) {
        this.photo = collection.data().photoUrl;
        this.profilePicForm.controls.picture.setValue(collection.data().photoUrl);
      } else {
        this.profilePicForm.controls.picture.setValue("");
      }
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

  toggleEdit() {
    this.editingMode = !this.editingMode;
  }

  onSubmit() {
    this.authService.SetUserPhoto(this.form.picture.value).then(() => {
      this.photo = this.form.picture.value;
      this.editingMode = false;
    });
  }
}
