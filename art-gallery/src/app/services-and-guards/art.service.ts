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

  addArt(title: string, description: string, imageUrl: string, author: string) {
    let art: Art = {
      creatorId: this.authService.GetUserId,
      title: title,
      description: description,
      imageURL: imageUrl,
      likes: 0,
      author: author,
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
      .then(() => {
        this.toastr.success("Art piece deleted!");
        this.router.navigate(["/art"]);
      });
  }

  LikesColl(artId: string) {
    return this.firestore
      .collection("likes")
      .ref.where("ArtId", "==", artId)
      .get();
  }

  IsUserLikedArtById(artId: string) {
    return this.LikesCollection.where("ArtId", "==", artId).get();
  }

  addLike(like: Like) {
    let id = uuidv4();
    return this.LikesCollection.doc(id).set(like);
  }

  likeArt(artId: string, art: Art) {
    let like: Like = {
      UserId: this.authService.GetUserId,
      ArtId: artId,
    };

    this.IsUserLikedArtById(artId).then((data) => {
      let arr = data.docs.filter(
        (x) => x.data().UserId == this.authService.GetUserId
      );
      if (arr.length > 0) {
        this.toastr.error("You already liked this art piece!");
        return;
      }
      art.likes += 1;

      this.addLike(like)
        .then(() => {
          this.toastr.success("You liked this art piece");
        })
        .catch((err) => {
          this.toastr.error("Something went wrong while liking the art piece!");
          this.toastr.error(err.message);
        });
      this.editArt(art, artId);
    });
  }
}
