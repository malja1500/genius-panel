// ** React Imports
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Core Imports
import { useDeleteCourse } from "../core/services/api/course/useDeleteCourse";

const MySwal = withReactContent(Swal);

export const useHandleDeleteCourse = () => {
  const deleteCourseAPI = useDeleteCourse();

  const handleDeleteCourse = async (isDeleted, courseId) => {
    MySwal.fire({
      title: isDeleted
        ? "آیا از بازگردانی دوره مطمئن هستید؟"
        : "آیا از حذف دوره مطمئن هستید ؟",
      text: isDeleted
        ? "در صورت بازگردانی دوره،دوره برای کاربران قابل رویت بود ."
        : "در صورت حذف دوره، دوره دیگر برای کاربران قابل رویت نخواهد بود.",
      icon: "warning",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
      buttonsStyling: false,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: isDeleted ? "بازگردانی" : "حذف",
      cancelButtonText: "انصراف",
      showLoaderOnConfirm: true,
      async preConfirm() {
        const deleteCourse = deleteCourseAPI.mutate({
          active: isDeleted,
          id: courseId,
        });

        console.log(deleteCourse);
      },
    });
  };

  return handleDeleteCourse;
};
