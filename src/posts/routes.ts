import { Post as PostModel } from "./models";
import { PostService } from "./services";
import {
  Body,
  Controller,
  Delete,
  Example,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { examplePost, examplePosts } from "./examples";
import { PostCreationParams, LikePostParams } from "./types";
import { Types } from "mongoose";

/**
 * A controller that handles API requests related to posts.
 */
@Tags("A3: ChatDev")
@Route("api/posts")
export class PostController extends Controller {
  private postService: PostService;

  constructor() {
    super();
    this.postService = new PostService();
  }

  /**
   * Retrieves all posts.
   *
   * @returns An array of all posts.
   */
  @Get()
  @Example(examplePosts)
  public async getAllPosts(): Promise<PostModel[]> {
    return this.postService.getPosts();
  }

  /**
   * Creates a new post.
   *
   * @param req The post data to create.
   * @returns The created post.
   */
  @Post("create")
  @Example(examplePost)
  @SuccessResponse(201, "Created")
  public async createPost(@Body() req: PostCreationParams): Promise<PostModel> {
    this.setStatus(201);
    return this.postService.insertPost(req);
  }

  /**
   * Likes a post.
   *
   * @param postId The ID of the post to like.
   * @param req The request body containing the user's NetID.
   * @returns The updated post.
   */
  @Post("{postId}/like")
  @Example(examplePost)
  @SuccessResponse(200, "Updated")
  public async likePost(
    @Path() postId: Types.ObjectId,
    @Body() req: LikePostParams
  ): Promise<PostModel> {
    return this.postService.likePost(postId, req.netId);
  }

  /**
   * Unlikes a post.
   *
   * @param postId The ID of the post to unlike.
   * @param req The request body containing the user's NetID.
   * @returns The updated post.
   */
  @Post("{postId}/unlike")
  @Example(examplePost)
  @SuccessResponse(200, "Updated")
  public async unlikePost(
    @Path() postId: Types.ObjectId,
    @Body() req: LikePostParams
  ): Promise<PostModel> {
    return this.postService.unlikePost(postId, req.netId);
  }

  /**
   * Deletes a post by ID.
   *
   * @param postId The ID of the post to delete.
   * @returns The deleted post.
   */
  @Delete("{postId}/delete")
  @Example(examplePost)
  public async deletePost(@Path() postId: Types.ObjectId): Promise<PostModel> {
    return this.postService.deletePost(postId);
  }

  /**
   * Deletes all posts.
   *
   * @returns A message indicating the number of deleted posts.
   */
  @Delete("delete")
  public async deleteAllPosts(): Promise<string> {
    const deleteCount = await this.postService.deleteAllPosts();
    return `Successfully deleted ${deleteCount} posts`;
  }
}
