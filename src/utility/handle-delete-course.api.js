// ** React Imports
import toast from "react-hot-toast";

// ** Core Imports
import { deleteCourseAPI } from "../core/services/api/course/delete-course.api";

export const handleDeleteCourse = async (
  active,
  courseId,
  navigate,
  redirectUrl
) => {
  try {
    const deleteCourse = await deleteCourseAPI(active, courseId);
    if (deleteCourse.success) {
      toast.success("دوره با موفقیت حذف شد !");

      navigate(redirectUrl);
    } else toast.error("مشکلی در حذف دوره به وجود آمد ...");
  } catch (error) {
    toast.error("مشکلی در حذف دوره به وجود آمد ...");
  }
};
