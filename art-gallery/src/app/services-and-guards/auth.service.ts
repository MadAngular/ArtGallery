import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFirestoreDocument } from "@angular/fire/firestore/document/document";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { User } from "../models/User";
import { UserInfo } from "../models/UserInfo";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userData: User;
  constructor(
    public firestore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem("user", JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem("user"));
      } else {
        localStorage.setItem("user", null);
        JSON.parse(localStorage.getItem("user"));
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null ? true : false;
  }

  get GetUserId() {
    let user = JSON.parse(localStorage.getItem("user"));
    return user.uid;
  }

  get GetUserEmail() {
    let user = JSON.parse(localStorage.getItem("user"));
    return user.email;
  }

  get GetUserUsernameByEmail() {
    let user = JSON.parse(localStorage.getItem("user"));
    let res = user.email.split("@")[0];
    return res;
  }

  get GetUserPhoto() {
    return this.firestore.collection<UserInfo>("userInfo").doc(this.GetUserId);
  }

  Register(email: string, password: string) {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.toastr.success("Sign up successful!");
        this.SetUserData(result.user);
        this.firestore
          .collection<UserInfo>("userInfo")
          .doc(result.user.uid)
          .set({ photoURL: "" })
          .then(() => {
            this.router.navigate(["home"]);
          });
      })
      .catch((error) => {
        this.toastr.error(error.message);
      });
  }

  Login(email: string, password: string, returnUrl: string) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.toastr.success("Login Successful!");
        this.userData = result.user;
        this.router.navigateByUrl(returnUrl);
      })
      .catch((error) => {
        this.toastr.error(error.message);
      });
  }

  Logout() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem("user");
      this.router.navigate(["/"]);
      this.toastr.info("Logged out!");
    });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SetUserPhoto(photoUrl: any) {
    let newPhoto: UserInfo = {
      photoUrl: photoUrl,
    };

    this.toastr.info("Updating picture...");
    return this.firestore
      .collection<UserInfo>("userInfo")
      .doc(this.GetUserId)
      .set(newPhoto)
      .then(() => {
        this.toastr.success("Picture updated!");
      });
  }
}
