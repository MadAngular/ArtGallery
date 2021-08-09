import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ArtService } from "src/app/services-and-guards/art.service";
import { AuthService } from "src/app/services-and-guards/auth.service";

@Component({
  selector: "app-create-art",
  templateUrl: "./create-art.component.html",
  styleUrls: ["./create-art.component.css"],
})
export class CreateArtComponent {
  createForm: FormGroup;

  constructor(
    private artService: ArtService,
    private authService: AuthService,
    private fBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.createForm = this.fBuilder.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.minLength(6)]],
      imageURL: ["", Validators.required],
    });
  }

  get form() {
    return this.createForm.controls;
  }

  onSubmit() {
    this.artService
      .addArt(
        this.form.title.value,
        this.form.description.value,
        this.form.imageURL.value,
        this.authService.GetUserUsernameByEmail
      )
      .then(() => {
        this.toastr.success("Art piece added!");
        this.createForm.reset();
        this.router.navigate(["/"])
      })
      .catch((err) => {
        this.toastr.error(err.message);
      });
  }
}
