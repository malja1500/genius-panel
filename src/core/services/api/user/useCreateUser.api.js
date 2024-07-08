import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import {
  showErrorToast,
  showSuccessToast,
} from "../../../../utility/toast.utils";
import http from "../../interceptor";

export const useCreateUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["createUser"],
    mutationFn: async (data) => {
      const {
        lastName,
        firstName,
        gmail,
        password,
        phoneNumber,
        isStudent,
        isTeacher,
      } = data;

      return await http
        .post("/User/CreateUser", {
          lastName,
          firstName,
          gmail,
          password,
          phoneNumber,
          isStudent,
          isTeacher,
        })
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      if (data.success) {
        showSuccessToast("کاربر با موفقیت ایجاد شد !");

        navigate("/users");
      } else showErrorToast("مشکلی در افزودن کاربر به وجود آمد !");
    },
  });
};
