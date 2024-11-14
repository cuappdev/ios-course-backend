import { Types } from "mongoose";
import { PostModel } from "./models";
import { PostCreationParams } from "./types";
import { InvalidArgumentError } from "../utils/errors";

/**
 * A service class for managing posts.
 */
export class PostService {
  /**
   * Fetch all posts from the database.
   *
   * @returns A promise resolving to an array of all posts.
   */
  public getPosts = async () => {
    return await PostModel.find();
  };

  /**
   * Insert a new post into the database.
   *
   * @param postData The data for the new post.
   * @returns A promise resolving to the newly created post document.
   */
  public insertPost = async (postData: PostCreationParams) => {
    return await PostModel.create(postData);
  };

  /**
   * Adds a like to a post by a user.
   *
   * @param postId The ID of the post to like.
   * @param netId The NetID of the user liking the post.
   * @throws InvalidArgumentError if the `postId` or `netId` is invalid.
   * @returns A promise resolving to the updated post document.
   */
  public likePost = async (postId: Types.ObjectId, netId: string) => {
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      {
        $addToSet: { likes: netId }, // Use $addToSet to add only if not already present
      },
      { new: true }
    );
    if (!updatedPost) {
      throw new InvalidArgumentError("Invalid postId or netId supplied");
    }
    return updatedPost;
  };

  /**
   * Removes a like from a post by a user.
   *
   * @param postId The ID of the post to unlike.
   * @param netId The NetID of the user unliking the post.
   * @throws InvalidArgumentError if the `postId` or `netId` is invalid.
   * @returns A promise resolving to the updated post document.
   */
  public unlikePost = async (postId: Types.ObjectId, netId: string) => {
    const post = await PostModel.findById(postId);
    if (!post) {
      throw new InvalidArgumentError("Invalid postId supplied");
    }
    if (!post.likes.includes(netId)) {
      throw new InvalidArgumentError("The given netId has not liked this post");
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: netId },
      },
      { new: true }
    );
    return updatedPost!;
  };

  /**
   * Deletes a post from the database.
   *
   * @param postId The ID of the post to delete.
   * @throws InvalidArgumentError if the `postId` is invalid.
   * @returns A promise resolving to the deleted post document.
   */
  public deletePost = async (postId: Types.ObjectId) => {
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      throw new InvalidArgumentError("Invalid postId supplied");
    }
    return deletedPost;
  };

  /**
   * Deletes all posts from the database.
   *
   * @returns A promise resolving to the number of deleted posts.
   */
  public deleteAllPosts = async () => {
    const deleteResult = await PostModel.deleteMany({});
    return deleteResult.deletedCount;
  };
}
