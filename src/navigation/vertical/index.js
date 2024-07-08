import { Circle, Code, FileText, Home, Mail, Users } from "react-feather";

import CategoriesPage from "../../pages/Categories";
import CommentsPage from "../../pages/Comments";
import CourseGroupsPage from "../../pages/CourseGroups";
import CourseReservedPage from "../../pages/CourseReserved";
import CoursesPage from "../../pages/CoursesPage";
import CreateCategoryPage from "../../pages/CreateCategory";
import CreateCoursePage from "../../pages/CreateCourse";
import CreateNewsPage from "../../pages/CreateNews";
import CreateUserPage from "../../pages/CreateUser";
import NewsPage from "../../pages/News";
import TeacherCommentsPage from "../../pages/TeacherComments";
import UsersPage from "../../pages/Users";
import CreateCourseGroupPage from "../../pages/CreateCourseGroup";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "users",
    title: "مدیریت کاربران",
    icon: <Users size={20} />,
    children: [
      {
        title: "لیست کاربران",
        navLink: "/users",
        element: <UsersPage />,
        icon: <Circle />,
      },
      {
        title: "افزودن کاربر",
        navLink: "/create-user",
        element: <CreateUserPage />,
        icon: <Circle />,
      },
    ],
  },
  {
    id: "courses",
    title: "مدیریت دوره ها",
    icon: <Code size={20} />,
    children: [
      {
        title: "لیست دوره ها",
        navLink: "/courses",
        element: <CoursesPage />,
        icon: <Circle />,
      },
      {
        title: "دوره های من",
        navLink: "/my-courses",
        element: <CoursesPage />,
        icon: <Circle />,
      },
      {
        title: "دوره های رزرو شده",
        navLink: "/course-reserved",
        element: <CourseReservedPage />,
        icon: <Circle />,
      },
      {
        title: "افزودن دوره",
        navLink: "/create-course",
        element: <CreateCoursePage />,
        icon: <Circle />,
      },
      {
        title: "گروه های دوره",
        navLink: "/course-groups",
        element: <CourseGroupsPage />,
        icon: <Circle />,
      },
      {
        title: "افزودن گروه دوره",
        navLink: "/create-course-group",
        element: <CreateCourseGroupPage />,
        icon: <Circle />,
      },
    ],
  },
  {
    id: "news",
    title: "مدیریت اخبار",
    icon: <FileText size={20} />,
    children: [
      {
        title: "لیست اخبار",
        navLink: "/news",
        element: <NewsPage />,
        icon: <Circle />,
      },
      {
        title: "افزودن خبر",
        navLink: "/create-news",
        element: <CreateNewsPage />,
        icon: <Circle />,
      },
      {
        title: "لیست دسته بندی ها",
        navLink: "/categories",
        element: <CategoriesPage />,
        icon: <Circle />,
      },
      {
        title: "افزودن دسته بندی",
        navLink: "/create-category",
        element: <CreateCategoryPage />,
        icon: <Circle />,
      },
    ],
  },
  {
    id: "comments",
    title: "مدیریت نظرات",
    icon: <Mail size={20} />,
    children: [
      {
        id: "comments",
        title: "مدیریت نظرات",
        navLink: "/comments",
        element: <CommentsPage />,
        icon: <Circle size={20} />,
      },
      {
        id: "teacher-comment",
        title: "نظرات ثبت شده برای شما",
        navLink: "/teacher-comments",
        element: <TeacherCommentsPage />,
        icon: <Circle size={20} />,
      },
    ],
  },
];
