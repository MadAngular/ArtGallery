import { Injectable } from "@angular/core";
import { AngularFirestore, CollectionReference } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Art } from "../models/Art";
import { Like } from "../models/Like";
import { AuthService } from "./auth.service";
import { v4 as uuidv4 } from "uuid";

@Injectable({
  providedIn: "root",
})
export class ArtService {
  ArtCollection: CollectionReference;
  LikesCollection: CollectionReference;
  collLen = 0;
  constructor(
    private firestore: AngularFirestore,
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.ArtCollection = firestore.collection<Art>("art").ref;
    this.LikesCollection = firestore.collection<Like>("likes").ref;
  }

  getArt() {
    return this.ArtCollection.get();
  }

  getArtById(id: string) {
    return this.ArtCollection.doc(id).get();
  }

  addArt(title: string, description: string, imageUrl: string) {
    let art: Art = {
      creatorId: this.authService.GetUserId,
      title: title,
      description: description,
      imageURL: imageUrl,
      likes: 0,
    };
    let id = uuidv4();
    return this.ArtCollection.doc(id).set(art);
  }

  editArt(art: any, artId: string) {
    return this.ArtCollection.doc(artId).set(art);
  }

  removeArtById(id: string) {
    this.toastr.warning("Deleting art piece...");
    this.ArtCollection.doc(id)
      .delete()
      .then((data) => {
        this.toastr.success("Art piece deleted!");
        this.router.navigate(["art"]);
      });
  }
}
