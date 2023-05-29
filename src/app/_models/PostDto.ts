export class PostDto {
  id: number;
  text: string;
  status: string;
  likes: number;
  shares: number;
  isLiked: boolean = false;
  author: string;
  authorNickname: string;
}
