// ** Core Imports
import { useDeleteCourse } from "../core/services/api/course/useDeleteCourse";

export const useHandleDeleteCourse = () => {
  const deleteCourseAPI = useDeleteCourse();

  const handleDeleteCourse = async (selectedRows) => {
    console.log(selectedRows);
    selectedRows.map(async (course) => {
      deleteCourseAPI.mutate({
        active: course.isdelete,
        id: course.courseId,
      });
    });
  };

  return handleDeleteCourse;
};
