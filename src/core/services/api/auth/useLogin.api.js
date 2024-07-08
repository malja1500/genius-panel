import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  showErrorToast,
  showSuccessToast,
} from "../../../../utility/toast.utils";
import { setItem } from "../../common/storage.services";
import http from "../../interceptor";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (user) =>
      await http.post("/Sign/Login", user).then((res) => res.data),
    onSuccess: (data) => {
      if (data.success === true) {
        if (
          data.roles.includes("Administrator") ||
          data.roles.includes("Teacher")
        ) {
          showSuccessToast("با موفقیت وارد شدید !");

          setItem("token", data.token);
          setItem("userId", data.id);
          navigate("/");
        } else {
          showErrorToast("شما دسترسی ورود به پنل ادمین را ندارید !");
        }
      } else {
        showErrorToast("کاربری با اطلاعات شما وجود ندارد !");
      }
    },
    onError: () => {
      showErrorToast("مشکلی در فرایند ورود به وجود آمد !");
    },
  });
};
