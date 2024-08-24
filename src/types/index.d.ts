import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

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
  };
  views: number;
  upvotes: number;
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

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
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
