import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";
import { BADGE_CRITERIA } from "@/constants";

export interface RenderTagProps {
  _id: string | number;
  title: string;
  totalQuestions?: number;
  showCount?: boolean;
}

export interface CustomInputProps {
  route: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

export interface CustomFilterProps {
  placeholder: string;
  pageFilters: {
    name: string;
    value: string;
  }[];
  containerClasses?: string;
  otherClasses?: string;
}

export interface NoResultsProps {
  title: string;
  description: string;
  link: string;
  buttonTitle: string;
}

export interface QuestionCardProps {
  _id: number;
  clerkId?: string | null;
  questionTitle: string;
  answers: Array<object>;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  views: number;
  upvotes: string[];
  createdAt: Date;
}

export interface CreateQuestionParams {
  questionTitle: string;
  explanation: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface GetUserByIdParams {
  userId: string;
}

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface CreateUserParams {
  clerkId: string;
  email: string;
  name: string;
  username: string;
  picture: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface UserCardProps {
  user: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
    username: string;
  };
}

export interface GetTopInteractedTagsParams {
  userId: string;
  limit?: number;
}

export interface GetAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface CreateAnswerParams {
  content: string;
  author: string; // User ID
  question: string; // Question ID
  path: string;
}

export interface AnswerFormProps {
  question: string;
  questionId: string;
  authorId: string;
}

export interface GetAnswersParams {
  questionId: string;
  sortBy?: string;
  page?: number;
  pageSize?: number;
}

export interface AllAnswersProps {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

export interface VotesProps {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  hasSaved?: boolean;
}

export interface AnswerVoteParams {
  answerId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface QuestionVoteParams {
  questionId: string;
  userId: string;
  hasupVoted: boolean;
  hasdownVoted: boolean;
  path: string;
}

export interface SaveQuestionParams {
  questionId: string;
  userId: string;
  path: string;
}

export interface GetSavedQuestionsParams {
  clerkId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface ViewQuestionParams {
  questionId: string;
  userId: string | undefined;
}

export interface GetQuestionsByTagIdParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface BadgeCounts {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
}

export type BadgeCriteriaType = keyof typeof BADGE_CRITERIA;

export interface BadgeParams {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export interface StatsProps {
  totalQuestions: number;
  totalAnswers: number;
  badgeCounts: BadgeCounts;
  reputation: number;
}

export interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

export interface TabProps {
  userId: string;
  clerkId?: string | null;
  searchParams: { [key: string]: string | undefined };
}

export interface AnswerCardProps {
  authorId: string;
  clerkId?: string | null;
  authorPicture: string;
  questionId: string;
  questionTitle: string;
  authorName: string;
  upvotes: string[];
  createdAt: Date;
}

export interface GetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface EditDeleteProps {
  itemId: string;
  type: string;
}

export interface DeleteQuestionParams {
  questionId: string;
  path: string;
}

export interface DeleteAnswerParams {
  answerId: string;
  path: string;
}

export interface EditQuestionParams {
  questionId: string;
  questionTitle: string;
  explanation: string;
  path: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export interface RemoveKeysFromQueryParams {
  params: string;
  keysToRemove: string[];
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface RecommendedParams {
  userId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}
