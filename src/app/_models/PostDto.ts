export interface PostDto {
  id: number;
  text: string;
  status: string;
  likes: number;
  isLiked: boolean;
  author: string;
  authorNickname: string;
}
