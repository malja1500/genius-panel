import http from "../../interceptor";

export const addNewsReplyCommentAPI = async (
  newsId,
  userIpAddress,
  title,
  describe,
  userId,
  parentId
) => {
  try {
    const response = await http.post("/News/CreateNewsReplyComment", {
      newsId,
      userIpAddress,
      title,
      describe,
      userId,
      parentId,
    });

    return response.data;
  } catch (error) {
    return false;
  }
};
