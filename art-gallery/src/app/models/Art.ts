export class Art {
  title: string;
  description: string;
  imageURL: string;
  likes: number;
  author: string;
  creatorId: string;
  constructor(
    creator: string,
    title: string,
    desciption: string,
    imageUrl: string,
    author: string
  ) {
    (this.creatorId = creator), (this.title = title), (this.likes = 0);
    this.description = desciption;
    this.imageURL = imageUrl;
    this.author = author;
  }
}
