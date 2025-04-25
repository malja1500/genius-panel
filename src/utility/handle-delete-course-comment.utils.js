// ** React Imports
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Core Imports
import { useDeleteCourseComment } from "../core/services/api/course/course-comments/useDeleteCourseComment.api";

export const useHandleDeleteCourseComment = () => {
  // ** Hooks
  const deleteCourseComment = useDeleteCourseComment();
  const MySwal = withReactContent(Swal);

  const handleDeleteCourseComment = (id) => {
    MySwal.fire({
      title: "آیا از حذف این نظر مطمئن هستید؟",
      text: "در صورت حذف نظر، نظر به طور کامل حذف خواهد شد.",
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
      confirmButtonText: "حذف",
      cancelButtonText: "انصراف",
      showLoaderOnConfirm: true,
      preConfirm() {
        return new Promise((resolve) => {
          deleteCourseComment.mutate(id, {
            onSuccess: (data) => {
              if (data.success)
                MySwal.fire({
                  title: "نظر با موفقیت حذف شد",
                  icon: "success",
                  confirmButtonText: "باشه",
                });
              else
                MySwal.fire({
                  title: "مشکلی در حذف نظر به وجود آمد",
                  icon: "error",
                  confirmButtonText: "باشه",
                });

              resolve();
            },
            onError: () => {
              MySwal.fire({
                title: "مشکلی در حذف نظر به وجود آمد",
                icon: "error",
                confirmButtonText: "باشه",
              });
              resolve();
            },
          });
        });
        //   navigate(`/courses/${row.courseId}`)
      },
    });
  };

  return handleDeleteCourseComment;
};
