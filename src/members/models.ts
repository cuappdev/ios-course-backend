import {
  getModelForClass,
  prop,
  modelOptions,
  Severity,
} from "@typegoose/typegoose";

/**
 * Represents a Member document.
 */
@modelOptions({
  schemaOptions: {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret.id;
        delete ret._id;
      },
    },
  },
  options: { allowMixed: Severity.ALLOW },
})
export class Member {
  /**
   * The name of the member.
   */
  @prop()
  public name!: string;

  /**
   * The position or role of the member within the team.
   */
  @prop()
  public position!: string;

  /**
   * The subteam the member belongs to (e.g., "iOS", "Backend", "Design").
   */
  @prop()
  public subteam!: string;
}

/**
 * The Mongoose model for the Member class.
 */
export const MemberModel = getModelForClass(Member);
