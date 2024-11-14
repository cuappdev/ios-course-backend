/**
 * Parameters required to create a new post.
 */
export type PostCreationParams = {
  /**
   * The message content of the post.
   */
  message: string;
};

/**
 * Parameters required to like/unlike a post.
 */
export type LikePostParams = {
  /**
   * The NetID of the user liking/unliking the post.
   */
  netId: string;
};
