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
      text: `در صورت مطمئن بودن از ${
        isActive ? "غیر فعال" : "فعال"
      } کردن دوره این کار را انجام دهید`,
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
      preConfirm() {
        return new Promise((resolve) => {
          activeInactiveCourse.mutate(
            {
              active: !isActive,
              id: courseId,
            },
            {
              onSuccess: () => {
                MySwal.fire({
                  title: `دوره با موفقیت ${isActive ? "غیر فعال" : "فعال"} شد`,
                  icon: "success",
                  confirmButtonText: "باشه",
                });
                resolve();
              },
              onError: () => {
                MySwal.fire({
                  title: `مشکلی در ${
                    isActive ? "غیر فعال" : "فعال"
                  } کردن دوره به وجود آمد !`,
                  icon: "error",
                  confirmButtonText: "باشه",
                });
                resolve();
              },
            }
          );
        });
      },
    });
  };

  return handleActiveInactiveCourse;
};
