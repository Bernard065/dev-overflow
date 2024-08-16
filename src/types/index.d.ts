export interface RenderTagProps {
  _id: number;
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

export interface Questionprops {
  questionTitle: string;
  answers: number;
  questionTag: {
    _id: string;
    name: string;
  }[];
  author: string;
  views: number;
  votes: number;
  createdAt: string;
}
