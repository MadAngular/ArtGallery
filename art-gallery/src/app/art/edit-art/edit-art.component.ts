import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ArtService } from "src/app/services-and-guards/art.service";

@Component({
  selector: "app-edit-art",
  templateUrl: "./edit-art.component.html",
  styleUrls: ["./edit-art.component.css"],
})
export class EditArtComponent {
  editForm: FormGroup;
  art: any;

  constructor(
    private artService: ArtService,
    private router: Router,
    private route: ActivatedRoute,
    private fBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.editForm = this.fBuilder.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      description: ["", [Validators.required, Validators.minLength(6)]],
      imageURL: ["", [Validators.required]],
    });
    this.artService
      .getArtById(this.route.snapshot.params.id)
      .then((art) => {
        this.art = art.data();
        this.editForm.controls.title.setValue(art.data().title);
        this.editForm.controls.description.setValue(art.data().description);
        this.editForm.controls.imageURL.setValue(art.data().imageURL);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  get form() {
    return this.editForm.controls;
  }

  onSubmit() {
    const obj = {
      ...this.art,
      ...{
        title: this.form.title.value,
        description: this.form.description.value,
        imageURL: this.form.imageURL.value,
      },
    };

    this.artService
      .editArt(obj, this.route.snapshot.params.id)
      .then(() => {
        this.toastr.success("Art piece successfully changed!");
        this.router.navigate([`/art/details/${this.route.snapshot.params.id}`]);
      })
      .catch((err) => {
        this.toastr.error(err.message);
      });
  }
}
