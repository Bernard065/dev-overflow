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
