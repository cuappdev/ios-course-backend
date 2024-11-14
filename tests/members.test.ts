import {
  describe,
  beforeAll,
  afterAll,
  expect,
  it,
  beforeEach,
} from "@jest/globals";
import { connectDB, disconnectDB } from "./utils/dbConnection";
import { MemberModel } from "../src/members/models";
import { MemberService } from "../src/members/services";
import MemberFactory from "./mocks/memberFactory";

describe("getMembers", () => {
  let memberService: MemberService;

  beforeAll(async () => {
    await connectDB();
    await MemberModel.createCollection();
    await MemberModel.syncIndexes();
    memberService = new MemberService();
  });

  afterAll(async () => {
    await MemberModel.deleteMany({});
    await disconnectDB();
  });

  beforeEach(async () => {
    await MemberModel.deleteMany({});
  });

  it("should return no members", async () => {
    // when
    const getResponse = await memberService.getMembers();

    // then
    expect(getResponse).toHaveLength(0);
  });

  it("should return 5 members", async () => {
    // given
    const members = await MemberFactory.create(5);
    await MemberModel.create(members);

    // when
    const getResponse = await memberService.getMembers();

    // then
    expect(getResponse).toHaveLength(5);
  });
});

describe("insertMember", () => {
  let memberService: MemberService;

  beforeAll(async () => {
    await connectDB();
    await MemberModel.createCollection();
    await MemberModel.syncIndexes();
    memberService = new MemberService();
  });

  afterAll(async () => {
    await MemberModel.deleteMany({});
    await disconnectDB();
  });

  beforeEach(async () => {
    await MemberModel.deleteMany({});
  });

  it("should have the same fields as the mock", async () => {
    // given
    const mocks = await MemberFactory.create(1);
    const mockMember = mocks[0];

    // when
    const insertResponse = await memberService.insertMember(mockMember);

    // then
    expect(insertResponse.name).toStrictEqual(mockMember.name);
    expect(insertResponse.position).toStrictEqual(mockMember.position);
    expect(insertResponse.subteam).toStrictEqual(mockMember.subteam);
  });
});

describe("deleteAllMembers", () => {
  let memberService: MemberService;

  beforeAll(async () => {
    await connectDB();
    await MemberModel.createCollection();
    await MemberModel.syncIndexes();
    memberService = new MemberService();
  });

  afterAll(async () => {
    await MemberModel.deleteMany({});
    await disconnectDB();
  });

  beforeEach(async () => {
    await MemberModel.deleteMany({});
  });

  it("should delete all members", async () => {
    // given
    const numMembers = 4;
    const mocks = await MemberFactory.create(numMembers);
    await MemberModel.create(mocks);

    // when
    const deleteResponse = await memberService.deleteAllMembers();
    const getResponse = await MemberModel.find();

    // then
    expect(deleteResponse).toStrictEqual(numMembers);
    expect(getResponse).toHaveLength(0);
  });
});
