// ** React Imports
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Core Imports
import { useDeleteCourseComment } from "../core/services/api/course/course-comments/useDeleteCourseComment.api";

export const handleDeleteCourseComments = async (selectedRows) => {
  // ** Hooks
  const navigate = useNavigate();
  const deleteCourseComment = useDeleteCourseComment();

  const MySwal = withReactContent(Swal);

  MySwal.fire({
    title: "آیا از حذف نظر مطمئن هستید؟",
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
        selectedRows.map((comment) => {
          deleteCourseComment.mutate(comment.id, {
            onSuccess: () => {
              MySwal.fire({
                title: "نظر با موفقیت  حذف شد",
                icon: "success",
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

          if (deleteCourseComment.success) {
            toast.success("نظر با موفقیت حذف شد !");

            navigate(`/courses/${id}`);
          }
        });
      });
    },
  });
};
