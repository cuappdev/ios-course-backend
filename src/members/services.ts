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
    return birdMembersData as BirdMember[];
  };
}
