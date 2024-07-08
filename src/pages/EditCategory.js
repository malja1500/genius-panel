// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

// ** Custom Components
import CategoryForm from "../@core/components/CategoryForm";

// ** Core Imports
import { getNewsCategoryAPI } from "../core/services/api/news/get-news-category.api";

const EditCategoryPage = () => {
  // ** States
  const [category, setCategory] = useState();

  // ** Hooks
  const { id } = useParams();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const getCategory = await getNewsCategoryAPI(id);

        setCategory(getCategory);
      } catch (error) {
        toast.error("مشکلی در دریافت دسته بندی به وجود آمد !");
      }
    };

    fetchCategory();
  }, []);

  return <CategoryForm category={category} />;
};

export default EditCategoryPage;
