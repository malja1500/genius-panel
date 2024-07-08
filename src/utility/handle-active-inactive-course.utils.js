// ** React Imports
import toast from "react-hot-toast";

// ** Core Imports
import { activeAndInactiveCourseAPI } from "../core/services/api/course/active-and-deactive-course.api";

export const handleActiveInActiveCourse = async (
  active,
  id,
  navigate,
  redirectUrl
) => {
  try {
    const activeInActiveCourse = await activeAndInactiveCourseAPI(!active, id);

    if (activeInActiveCourse.success) {
      toast.success(`دوره با موفقیت ${active ? "غیر فعال" : "فعال"} شد`);
      navigate(redirectUrl);
    } else {
      toast.error(
        `مشکلی در ${active ? "غیر فعال کردن" : "فعال کردن"} به وجود آمد !`
      );
    }
  } catch (error) {
    toast.error(
      `مشکلی در ${active ? "غیر فعال کردن" : "فعال کردن"} به وجود آمد !`
    );
  }
};
