// ** React Imports
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Core Imports
import { useActiveInactiveCourse } from "../core/services/api/course/useActiveInactiveCourse";

const MySwal = withReactContent(Swal);

export const useHandleActiveInactiveCourse = () => {
  const activeInactiveCourse = useActiveInactiveCourse();

  const handleActiveInactiveCourse = async (isActive, courseId) => {
    MySwal.fire({
      title: isActive
        ? "آیا از غیر فعال دوره مطمئن هستید؟"
        : "آیا از فعال دوره مطمئن هستید ؟",
      text: `آیا از ${
        isActive ? "غیر فعال" : "فعال"
      } کردن دوره اطمینان کامل دارید ؟`,
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
      confirmButtonText: isActive ? "غیر فعال کردن" : "فعال کردن",
      cancelButtonText: "انصراف",
      showLoaderOnConfirm: true,
      async preConfirm() {
        (await activeInactiveCourse).mutate({
          active: !isActive,
          id: courseId,
        });
      },
    });
  };

  return handleActiveInactiveCourse;
};
