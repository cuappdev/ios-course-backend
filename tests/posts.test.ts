import {
  describe,
  beforeAll,
  afterAll,
  expect,
  it,
  beforeEach,
} from "@jest/globals";
import { connectDB, disconnectDB } from "./utils/dbConnection";
import { PostModel } from "../src/posts/models";
import { PostService } from "../src/posts/services";
import PostFactory from "./mocks/postFactory";
import { Types } from "mongoose";
import { InvalidArgumentError } from "../src/utils/errors";
import { faker } from "@faker-js/faker";

describe("getPosts", () => {
  let postService: PostService;

  beforeAll(async () => {
    await connectDB();
    await PostModel.createCollection();
    await PostModel.syncIndexes();
    postService = new PostService();
  });

  afterAll(async () => {
    await PostModel.deleteMany({});
    await disconnectDB();
  });

  beforeEach(async () => {
    await PostModel.deleteMany({});
  });

  it("should return no posts", async () => {
    // when
    const getResponse = await postService.getPosts();

    // then
    expect(getResponse).toHaveLength(0);
  });

  it("should return 5 posts", async () => {
    // given
    const posts = await PostFactory.create(5);
    await PostModel.create(posts);

    // when
    const getResponse = await postService.getPosts();

    // then
    expect(getResponse).toHaveLength(5);
  });
});

describe("insertPost", () => {
  let postService: PostService;

  beforeAll(async () => {
    await connectDB();
    await PostModel.createCollection();
    await PostModel.syncIndexes();
    postService = new PostService();
  });

  afterAll(async () => {
    await PostModel.deleteMany({});
    await disconnectDB();
  });

  beforeEach(async () => {
    await PostModel.deleteMany({});
  });

  it("should have the same fields as the mock", async () => {
    // given
    const mocks = await PostFactory.create(1);
    const mockPost = mocks[0];

    // when
    const insertResponse = await postService.insertPost(mockPost);

    // then
    expect(insertResponse.message).toStrictEqual(mockPost.message);
    expect(insertResponse.likes).toStrictEqual(mockPost.likes);
  });
});

describe("likePost", () => {
  let postService: PostService;

  beforeAll(async () => {
    await connectDB();
    await PostModel.createCollection();
    await PostModel.syncIndexes();
    postService = new PostService();
  });

  afterAll(async () => {
    await PostModel.deleteMany({});
    await disconnectDB();
  });

  beforeEach(async () => {
    await PostModel.deleteMany({});
  });

  it("should throw an error for invalid post id", async () => {
    // given
    const mocks = await PostFactory.create(1);
    const mockPost = mocks[0];
    const mockId = new Types.ObjectId();
    const mockNetId = faker.string.alpha({ length: { min: 4, max: 6 } });
    await PostModel.create(mocks);

    // when
    const updateRequest = async () =>
      await postService.likePost(mockId, mockNetId);

    // then
    await expect(updateRequest).rejects.toThrow(InvalidArgumentError);

    // when
    const getResponse = await PostModel.find();

    // then
    expect(getResponse[0].message).toStrictEqual(mockPost.message);
    expect(getResponse[0].likes).toStrictEqual(mockPost.likes);
  });

  it("should properly add to likes", async () => {
    // given
    const mocks = await PostFactory.create(1);
    const mockPost = mocks[0];
    const insertResponse = await PostModel.create(mockPost);
    const newNetId = faker.string.alpha({ length: { min: 4, max: 6 } });
    mockPost.likes.push(newNetId);

    // when
    const updateRequest = await postService.likePost(
      insertResponse._id,
      newNetId
    );

    // then
    expect(updateRequest._id).toStrictEqual(insertResponse._id);
    expect(updateRequest.message).toStrictEqual(mockPost.message);
    expect(updateRequest.likes).toStrictEqual(mockPost.likes);

    // when
    const getRequest = await PostModel.find();

    // then
    expect(getRequest[0]._id).toStrictEqual(insertResponse._id);
    expect(getRequest[0].message).toStrictEqual(mockPost.message);
    expect(getRequest[0].likes).toStrictEqual(mockPost.likes);
  });

  it("should not add duplicate netid to likes", async () => {
    // given
    const mocks = await PostFactory.create(1);
    const mockPost = mocks[0];
    const insertResponse = await PostModel.create(mockPost);
    const mockNetId = mockPost.likes[0];

    // when
    const updateRequest = await postService.likePost(
      insertResponse._id,
      mockNetId
    );

    // then
    expect(updateRequest._id).toStrictEqual(insertResponse._id);
    expect(updateRequest.message).toStrictEqual(mockPost.message);
    expect(updateRequest.likes).toStrictEqual(mockPost.likes);

    // when
    const getRequest = await PostModel.find();

    // then
    expect(getRequest[0]._id).toStrictEqual(insertResponse._id);
    expect(getRequest[0].message).toStrictEqual(mockPost.message);
    expect(getRequest[0].likes).toStrictEqual(mockPost.likes);
  });
});

describe("unlikePost", () => {
  let postService: PostService;

  beforeAll(async () => {
    await connectDB();
    await PostModel.createCollection();
    await PostModel.syncIndexes();
    postService = new PostService();
  });

  afterAll(async () => {
    await PostModel.deleteMany({});
    await disconnectDB();
  });

  beforeEach(async () => {
    await PostModel.deleteMany({});
  });

  it("should throw an error for invalid post id", async () => {
    // given
    const mocks = await PostFactory.create(1);
    const mockPost = mocks[0];
    const mockId = new Types.ObjectId();
    await PostModel.create(mockPost);
    const removedNetId = mockPost.likes[0];

    // when
    const updateRequest = async () =>
      await postService.unlikePost(mockId, removedNetId);

    // then
    await expect(updateRequest).rejects.toThrow(InvalidArgumentError);

    // when
    const getResponse = await PostModel.find();

    // then
    expect(getResponse[0].message).toStrictEqual(mockPost.message);
    expect(getResponse[0].likes).toStrictEqual(mockPost.likes);
  });

  it("should throw an error for invalid netid", async () => {
    // given
    const mocks = await PostFactory.create(1);
    const mockPost = mocks[0];
    const insertResponse = await PostModel.create(mockPost);
    const removedNetId = faker.string.alpha({ length: { min: 4, max: 6 } });

    // when
    const updateRequest = async () =>
      await postService.unlikePost(insertResponse._id, removedNetId);

    // then
    await expect(updateRequest).rejects.toThrow(InvalidArgumentError);

    // when
    const getResponse = await PostModel.find();

    // then
    expect(getResponse[0].message).toStrictEqual(mockPost.message);
    expect(getResponse[0].likes).toStrictEqual(mockPost.likes);
  });

  it("should properly remove from likes", async () => {
    // given
    const mocks = await PostFactory.create(1);
    const mockPost = mocks[0];
    const insertResponse = await PostModel.create(mockPost);
    const removedNetId = mockPost.likes[0];
    const index = mockPost.likes.indexOf(removedNetId, 0);
    if (index > -1) {
      mockPost.likes.splice(index, 1);
    }

    // when
    const updateRequest = await postService.unlikePost(
      insertResponse._id,
      removedNetId
    );

    // then
    expect(updateRequest._id).toStrictEqual(insertResponse._id);
    expect(updateRequest.message).toStrictEqual(mockPost.message);
    expect(updateRequest.likes).toStrictEqual(mockPost.likes);

    // when
    const getRequest = await PostModel.find();

    // then
    expect(getRequest[0]._id).toStrictEqual(insertResponse._id);
    expect(getRequest[0].message).toStrictEqual(mockPost.message);
    expect(getRequest[0].likes).toStrictEqual(mockPost.likes);
  });
});

describe("deletePost", () => {
  let postService: PostService;

  beforeAll(async () => {
    await connectDB();
    await PostModel.createCollection();
    await PostModel.syncIndexes();
    postService = new PostService();
  });

  afterAll(async () => {
    await PostModel.deleteMany({});
    await disconnectDB();
  });

  beforeEach(async () => {
    await PostModel.deleteMany({});
  });

  it("should throw an error for invalid post id", async () => {
    // given
    const mocks = await PostFactory.create(1);
    const mockPost = mocks[0];
    const mockId = new Types.ObjectId();
    await PostModel.create(mockPost);

    // when
    const deleteRequest = async () => await postService.deletePost(mockId);

    // then
    await expect(deleteRequest).rejects.toThrow(InvalidArgumentError);

    // when
    const getResponse = await PostModel.find();

    // then
    expect(getResponse[0].message).toStrictEqual(mockPost.message);
    expect(getResponse[0].likes).toStrictEqual(mockPost.likes);
  });

  it("should delete the mock post", async () => {
    // given
    const mocks = await PostFactory.create(1);
    const mockPost = mocks[0];
    const insertResponse = await PostModel.create(mockPost);

    // when
    const deleteResponse = await postService.deletePost(insertResponse._id);
    const getResponse = await PostModel.find();

    // then
    expect(deleteResponse._id).toStrictEqual(insertResponse._id);
    expect(deleteResponse.message).toStrictEqual(mockPost.message);
    expect(deleteResponse.likes).toStrictEqual(mockPost.likes);
    expect(getResponse).toHaveLength(0);
  });
});

describe("deleteAllPosts", () => {
  let postService: PostService;

  beforeAll(async () => {
    await connectDB();
    await PostModel.createCollection();
    await PostModel.syncIndexes();
    postService = new PostService();
  });

  afterAll(async () => {
    await PostModel.deleteMany({});
    await disconnectDB();
  });

  beforeEach(async () => {
    await PostModel.deleteMany({});
  });

  it("should delete all posts", async () => {
    // given
    const numPosts = 4;
    const mocks = await PostFactory.create(numPosts);
    await PostModel.create(mocks);

    // when
    const deleteResponse = await postService.deleteAllPosts();
    const getResponse = await PostModel.find();

    // then
    expect(deleteResponse).toStrictEqual(numPosts);
    expect(getResponse).toHaveLength(0);
  });
});
