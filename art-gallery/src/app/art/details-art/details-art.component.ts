import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Art } from "src/app/interfaces/Art";
import { ArtService } from "src/app/services-and-guards/art.service";
import { AuthService } from "src/app/services-and-guards/auth.service";

@Component({
  selector: "app-details-art",
  templateUrl: "./details-art.component.html",
  styleUrls: ["./details-art.component.css"],
})
export class DetailsArtComponent implements OnInit {
  art: any;
  editLink: string;
  isArtExisting: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private artService: ArtService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.toastr.info("Loading art...");

    this.artService.LikesColl(this.route.snapshot.params.id);
  }

  ngOnInit() {
    this.artService.getArtById(this.route.snapshot.params.id).then((data) => {
      if (data.data() == undefined) {
        return this.router.navigate(["/not-found"]);
      }

      this.editLink = "/art/edit/" + this.route.snapshot.params.id;
      this.art = data.data();
      this.isArtExisting = true;
      this.toastr.success("Art loaded.");
    });
  }

  IsUserAuthor(userId: any): boolean {
    let currentId = this.authService.GetUserId;
    return currentId == userId;
  }

  likeArt(art: Art) {
    this.artService.likeArt(this.route.snapshot.params.id, art);
  }

  deleteArt() {
    this.artService.removeArtById(this.route.snapshot.params.id);
  }
}
