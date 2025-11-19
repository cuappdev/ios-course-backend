/**
 * Parameters required to create a new member.
 */
export type MemberCreationParams = {
  /**
   * The name of the member.
   */
  name: string;
  /**
   * The position or role of the member.
   */
  position: string;
  /**
   * The subteam the member belongs to.
   */
  subteam: string;
};

/**
 * Represents a bird member from the bird_members.json file.
 */
export type BirdMember = {
  /**
   * The name of the bird member.
   */
  name: string;
  /**
   * The location of the bird member.
   */
  location: string;
  /**
   * The image identifier for the bird member.
   */
  image: string;
  /**
   * The count associated with the bird member.
   */
  count: number;
};
