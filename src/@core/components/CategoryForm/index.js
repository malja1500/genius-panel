// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

// ** Third Party Components
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
import FileUploaderSingle from "../FileUploaderSingle";

// ** Core Imports
import { createNewsCategoryAPI } from "../../../core/services/api/news/create-news-category.api";
import { updateNewsCategoryAPI } from "../../../core/services/api/news/update-news-category.api";
import { categoryFormSchema } from "../../../core/validations/create-category-form.validation";

// ** Utils
import { onFormData } from "../../../utility/form-data-helper.utils";

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/page-blog.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";

const CategoryForm = ({ category }) => {
  // ** States
  const [files, setFiles] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      categoryName: "",
      googleTitle: "",
      iconName: "",
      googleDescribe: "",
    },
    resolver: yupResolver(categoryFormSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      setLoading(true);

      const data = onFormData({
        id: category ? category.id : undefined,
        ...values,
        image: category ? (files && files[0]) || category.image : files[0],
        iconAddress: category
          ? (files && files[0]) || category.iconAddress
          : files[0],
      });

      const sendCategory = category
        ? await updateNewsCategoryAPI(data)
        : await createNewsCategoryAPI(data);

      if (sendCategory.success) {
        toast.success(
          `دسته بندی با موفقیت ${category ? "ویرایش" : "ایجاد"} شد !`
        );

        navigate("/categories");
      } else {
        toast.error(
          `مشکلی در ${category ? "ویرایش" : "ایجاد"} دسته بندی به وجود آمد !`
        );
      }
    } catch (error) {
      setLoading(false);

      toast.error(
        `مشکلی در ${category ? "ویرایش" : "ایجاد"} دسته بندی به وجود آمد !`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      setValue("categoryName", category.categoryName);
      setValue("iconName", category.iconName);
      setValue("googleTitle", category.googleTitle);
      setValue("googleDescribe", category.googleDescribe);
    }
  }, [category]);

  return (
    <div className="blog-edit-wrapper">
      <Breadcrumbs
        title="افزودن دسته بندی"
        data={[
          { title: "مدیریت اخبار", link: "/news" },
          { title: "دسته بندی ها", link: "/categories" },
          { title: "افزودن دسته بندی" },
        ]}
      />
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <div>
                <h2 className="mb-25">افزودن دسته بندی</h2>
              </div>
              <Form
                className="mt-2"
                onSubmit={handleSubmit((values) => onSubmit(values))}
              >
                <Row>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="categoryName">
                      عنوان دسته بندی
                    </Label>
                    <Controller
                      name="categoryName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="categoryName"
                          invalid={errors.categoryName && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.categoryName && (
                      <FormFeedback>{errors.categoryName.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="googleTitle">
                      عنوان گوگل
                    </Label>
                    <Controller
                      name="googleTitle"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="googleTitle"
                          invalid={errors.googleTitle && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.googleTitle && (
                      <FormFeedback>{errors.googleTitle.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="iconName">
                      نام آیکون
                    </Label>
                    <Controller
                      name="iconName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="iconName"
                          invalid={errors.iconName && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.iconName && (
                      <FormFeedback>{errors.iconName.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="googleDescribe">
                      توضیحات گوگل
                    </Label>
                    <Controller
                      name="googleDescribe"
                      control={control}
                      render={({ field }) => (
                        <Input
                          type="textarea"
                          id="googleDescribe"
                          invalid={errors.googleDescribe && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.googleDescribe && (
                      <FormFeedback>
                        {errors.googleDescribe.message}
                      </FormFeedback>
                    )}
                  </Col>
                  <Col md="12" className="mb-2">
                    <div className="border rounded p-2">
                      <h4 className="mb-1">عکس دسته بندی</h4>
                      <FileUploaderSingle
                        files={files}
                        setFiles={setFiles}
                        image={category && category.image}
                      />
                    </div>
                  </Col>
                  <Col md="12" className="mt-50 d-flex">
                    <Button
                      type="submit"
                      color="primary"
                      className="me-1 d-flex align-items-center submit-button"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Spinner size="sm" className="loading-spinner" />
                      )}
                      <span> {category ? "ویرایش" : "ایجاد"} دسته بندی</span>
                    </Button>
                    <Button
                      tag={Link}
                      to="/categories"
                      color="secondary"
                      outline
                    >
                      انصراف
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CategoryForm;
