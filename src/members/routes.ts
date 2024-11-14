import {
  Body,
  Controller,
  Delete,
  Example,
  Get,
  Post,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { MemberService } from "./services";
import { exampleMember, exampleMembers } from "./examples";
import { Member } from "./models";
import { MemberCreationParams } from "./types";

/**
 * A controller that handles API requests related to members.
 */
@Tags("Networking Lecture")
@Route("api/members")
export class MemberController extends Controller {
  private memberService: MemberService;

  constructor() {
    super();
    this.memberService = new MemberService();
  }

  /**
   * Retrieves all members.
   *
   * @returns An array of all members.
   */
  @Get()
  @Example(exampleMembers)
  public async getAllMembers(): Promise<Member[]> {
    return this.memberService.getMembers();
  }

  /**
   * Creates a new member.
   *
   * @param req The member data to create.
   * @returns The created member.
   */
  @Post()
  @Example(exampleMember)
  @SuccessResponse(201, "Created")
  public async createMember(
    @Body() req: MemberCreationParams
  ): Promise<Member> {
    this.setStatus(201);
    return this.memberService.insertMember(req);
  }

  /**
   * Deletes all members.
   *
   * @returns A message indicating the number of deleted members.
   */
  @Delete("")
  public async deleteAllMembers(): Promise<string> {
    const deleteCount = await this.memberService.deleteAllMembers();
    return `Successfully deleted ${deleteCount} members`;
  }
}
