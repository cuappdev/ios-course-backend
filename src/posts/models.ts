import {
  getModelForClass,
  prop,
  modelOptions,
  Severity,
} from "@typegoose/typegoose";

/**
 * Represents a Post document.
 */
@modelOptions({
  schemaOptions: {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
    timestamps: {
      createdAt: "time",
      updatedAt: false,
    },
  },
  options: { allowMixed: Severity.ALLOW },
})
export class Post {
  /**
   * An array of NetIDs who liked the post.
   */
  @prop({ default: [] })
  public likes!: string[];

  /**
   * The message content of the post.
   */
  @prop()
  public message!: string;
}

/**
 * The Mongoose model for the Post class.
 */
export const PostModel = getModelForClass(Post);
