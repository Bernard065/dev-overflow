export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
];

// eslint-disable-next-line no-undef
export const sidebarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];


// Filters
export const HomePageFilters = [
  { name: "Newest", value: "newest" },
  { name: "Recommended", value: "recommended" },
  { name: "Frequent", value: "frequent" },
  { name: "Unanswered", value: "unanswered" },
];


export const UserFilters = [
  { name: "New Users", value: "new_users" },
  { name: "Old Users", value: "old_users" },
  { name: "Top Contributors", value: "top_contributors" },
];

