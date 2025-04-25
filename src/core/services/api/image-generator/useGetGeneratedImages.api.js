// ** React Imports
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetGeneratedImage = async () => {
  const getGeneratedImage = (generatedImageId) => {
    return useQuery({
      queryKey: ["getGeneratedImage", generatedImageId],
      queryFn: async () =>
        await axios
          .get(`https://api.imggen.ai/guest-watch-process/${generatedImageId}`)
          .then((res) => res.data)
          .then((data) => console.log(data)),
    });
  };

  return getGeneratedImage;
};
