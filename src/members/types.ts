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
