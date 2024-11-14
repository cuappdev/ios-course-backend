import { faker } from "@faker-js/faker";
import { Post } from "../../src/posts/models";
import FactoryUtils from "../utils/factoryUtils";

/**
 * Factory class for generating mock Post objects.
 */
class PostFactory {
  /**
   * Creates a list of random Post objects.
   *
   * @param n The number of Post objects to create.
   * @returns A promise resolving to an array of `n` random Post objects.
   */
  public static async create(n: number): Promise<Post[]> {
    return Promise.all(FactoryUtils.create(n, PostFactory.mock));
  }

  /**
   * Creates a single mock Post object with random data.
   *
   * @returns A promise resolving to a mock Post object.
   */
  public static async mock(): Promise<Post> {
    const mockPost = new Post();
    mockPost.likes = Array.from({ length: 2 }, () =>
      faker.string.alpha({ length: { min: 4, max: 6 } })
    );
    mockPost.message = faker.string.alpha({ length: { min: 5, max: 10 } });
    return mockPost;
  }
}

export default PostFactory;
