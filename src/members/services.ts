import { MemberModel } from "./models";
import { MemberCreationParams, BirdMember } from "./types";
import birdMembersData from "../../bird_members.json";

/**
 * A service class for managing members.
 */
export class MemberService {
  /**
   * Fetch all members from the database.
   *
   * @returns A promise resolving to an array of all members.
   */
  public getMembers = async () => {
    return await MemberModel.find();
  };

  /**
   * Insert a new member into the database.
   *
   * @param memberData The data for the new member.
   * @returns A promise resolving to the newly created member document.
   */
  public insertMember = async (memberData: MemberCreationParams) => {
    return await MemberModel.create(memberData);
  };

  /**
   * Deletes all members from the database.
   *
   * @returns A promise resolving to the number of deleted members.
   */
  public deleteAllMembers = async () => {
    const deleteResult = await MemberModel.deleteMany({});
    return deleteResult.deletedCount;
  };

  /**
   * Fetch all bird members from the bird_members.json file.
   *
   * @returns A promise resolving to an array of all bird members.
   */
  public getBirdMembers = async (): Promise<BirdMember[]> => {
    // Generate a random wait time between 2000 ms (2 seconds) and 4000 ms (4 seconds)
    const minWaitTime = 2000;
    const maxWaitTime = 4000;
    const waitTime = Math.floor(
      Math.random() * (maxWaitTime - minWaitTime + 1) + minWaitTime
    );

    // Wait for the random amount of time
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  
    return birdMembersData as BirdMember[];
  };
}
