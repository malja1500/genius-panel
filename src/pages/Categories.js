// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** Reactstrap Imports
import { Card } from "reactstrap";

// ** Core Imports
import { getNewsCategoryListsAPI } from "../core/services/api/news/get-news-category-lists";

// ** Columns
import { CATEGORY_COLUMNS } from "../@core/components/Categories/categories-columns";

// ** Custom Components
import BreadCrumbs from "../@core/components/breadcrumbs";
import CategoriesTable from "../@core/components/Categories/CategoriesTable";

const CategoriesPage = () => {
  // ** States
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const getCategories = await getNewsCategoryListsAPI();

        setCategories(getCategories);
      } catch (error) {
        toast.error("مشکلی در دریافت دسته بندی ها به وجود آمد !");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <BreadCrumbs
        title="لیست دسته بندی ها"
        data={[
          { title: "لیست اخبار", link: "/news" },
          { title: "مدیریت دسته بندی ها" },
        ]}
      />
      <Card className="rounded">
        <CategoriesTable data={categories} columns={CATEGORY_COLUMNS} />
      </Card>
    </div>
  );
};

export default CategoriesPage;
