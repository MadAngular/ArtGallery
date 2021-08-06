export class Art {
  title: string;
  description: string;
  imageURL: string;
  likes: number;
  creatorId: string;
  constructor(
    creator: string,
    title: string,
    desciption: string,
    imageUrl: string
  ) {
    (this.creatorId = creator), (this.title = title), (this.likes = 0);
    this.description = desciption;
    this.imageURL = imageUrl;
  }
}
