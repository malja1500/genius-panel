import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  dismissToast,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../../../utility/toast.utils";
import http from "../../../interceptor";

export const useRejectCourseComment = (commentCourseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["rejectCourseComment", commentCourseId],
    mutationFn: async () =>
      http
        .post("/Course/RejectCourseComment", undefined, {
          params: {
            commentCourseId,
          },
        })
        .then((res) => res.data),
    onMutate: () =>
      showLoadingToast("در حال لغو نظر ...", "rejectCourseCommentLoading"),
    onSuccess: (data) => {
      dismissToast("rejectCourseCommentLoading");

      if (data.success) {
        showSuccessToast("نظر با موفقیت لغو شد !");

        queryClient.invalidateQueries({
          queryKey: ["adminCommentManagement"],
        });
      } else showErrorToast("مشکلی در لغو نظر به وجود آمد !");
    },
    onError: () => {
      dismissToast("rejectCourseCommentLoading");
      showErrorToast("مشکلی در لغو نظر به وجود آمد !");
    },
  });
};
