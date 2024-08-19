export interface RenderTagProps {
  _id: string;
  title: string;
  totalQuestions?: number;
  showCount?: boolean;
}

export interface CustomInputProps {
  route: string;
  imgSrc: string;
  placeholder: string;
}

export interface CustomFilterProps {
  placeholder: string;
  pageFilters: {
    name: string;
    value: string;
  }[];
  containerClasses?: string;
}

export interface NoResultsProps {
  title: string;
  description: string;
  link: string;
  buttonTitle: string;
}

export interface QuestionCardProps {
  _id: string;
  title: string;
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
