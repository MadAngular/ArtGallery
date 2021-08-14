import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ArtService } from "src/app/services-and-guards/art.service";

@Component({
  selector: "app-collection-art",
  templateUrl: "./collection-art.component.html",
  styleUrls: ["./collection-art.component.css"],
})
export class CollectionArtComponent {
  collection: any[];
  isCollectionLoaded: boolean = false;
  constructor(private artService: ArtService, private toastr: ToastrService) {
    this.toastr.info("Art collection is loading...");
    this.artService.getArt().then((querySnapshot) => {
      this.collection = querySnapshot.docs;
      this.isCollectionLoaded = true;
      this.toastr.success("Art collection loaded!");
    });
  }
}
