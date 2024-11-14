import { faker } from "@faker-js/faker";
import { Member } from "../../src/members/models";
import FactoryUtils from "../utils/factoryUtils";

/**
 * Factory class for generating mock Member objects.
 */
class MemberFactory {
  /**
   * Creates a list of random Member objects.
   *
   * @param n The number of Member objects to create.
   * @returns A promise resolving to an array of `n` random Member objects.
   */
  public static async create(n: number): Promise<Member[]> {
    return Promise.all(FactoryUtils.create(n, MemberFactory.mock));
  }

  /**
   * Creates a single mock Member object with random data.
   *
   * @returns A promise resolving to a mock Member object.
   */
  public static async mock(): Promise<Member> {
    const mockMember = new Member();
    mockMember.name = faker.string.alpha({ length: { min: 5, max: 10 } });
    mockMember.position = faker.string.alpha({ length: { min: 5, max: 10 } });
    mockMember.name = faker.string.alpha({ length: { min: 5, max: 10 } });
    return mockMember;
  }
}

export default MemberFactory;
