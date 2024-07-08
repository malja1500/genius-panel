// ** React Imports
import { Fragment, useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import toast from "react-hot-toast";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

// ** Core Imports
import { createNewsFormSchema } from "../../../../core/validations/create-news/create-news-form.validation";
import { getNewsCategoryListsAPI } from "../../../../core/services/api/news/get-news-category-lists";

// ** Custom Components
import FileUploaderSingle from "../../FileUploaderSingle";

// ** Utils
import { selectThemeColors } from "../../../../utility/Utils";
import { convertOptions } from "../../../../utility/convert-options-helper.utils";

const defaultValues = {
  title: "",
  miniDescribe: "",
  googleTitle: "",
  googleDescribe: "",
  newsCategoryId: 0,
};

const GlobalData = ({
  stepper,
  news,
  setGoogleTitle,
  setGoogleDescribe,
  setTitle,
  setMiniDescribe,
  setKeyword,
  setNewsCategoryId,
  files,
  setFiles,
  setUpdatedData,
}) => {
  // ** States
  const [newsCategoryLists, setNewsCategoryLists] = useState();
  const [defaultNewsCategoryList, setDefaultNewsCategoryList] = useState();

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues,
    resolver: news ? undefined : yupResolver(createNewsFormSchema),
  });

  const onSubmit = (e) => {
    if (news) {
      stepper.next();
    } else {
      if (isObjEmpty(errors)) {
        const {
          title,
          miniDescribe,
          googleTitle,
          googleDescribe,
          keyword,
          newsCategoryId,
        } = e;

        setTitle(title);
        setMiniDescribe(miniDescribe);
        setGoogleTitle(googleTitle);
        setGoogleDescribe(googleDescribe);
        setKeyword(keyword);
        setNewsCategoryId(+newsCategoryId.value);

        stepper.next();
      }
    }
  };

  const animatedComponents = makeAnimated();

  useEffect(() => {
    const fetchNewsCategoryLists = async () => {
      try {
        const getNewsCategoryLists = await getNewsCategoryListsAPI();

        const convertNewsCategoryLists = convertOptions(getNewsCategoryLists);

        setNewsCategoryLists(convertNewsCategoryLists);
      } catch (error) {
        toast.error("مشکلی در دریافت لیست بندی های اخبار  به وجود آمد !");
      }
    };

    fetchNewsCategoryLists();
  }, []);

  useEffect(() => {
    if (news) {
      const findCategoryList = newsCategoryLists.find(
        (category) => category.value === news.newsCatregoryId
      );

      setDefaultNewsCategoryList(findCategoryList);

      const {
        title,
        googleTitle,
        keyword,
        miniDescribe,
        googleDescribe,
        newsCatregoryId,
      } = news;

      setValue("title", title);
      setValue("googleTitle", googleTitle);
      setValue("keyword", keyword);
      setValue("miniDescribe", miniDescribe);
      setValue("googleDescribe", googleDescribe);
      setValue("newsCategoryId", findCategoryList);

      setUpdatedData({
        title,
        googleTitle,
        keyword,
        miniDescribe,
        googleDescribe,
        newsCatregoryId,
      });
    }
  }, [news]);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات عمومی خبر</h5>
        <small className="text-muted">
          در این بخش باید اطلاعات عمومی خبر را وارد کنید.
        </small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="title">
              عنوان
            </Label>
            <Controller
              id="title"
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="title"
                  placeholder="عنوان خبر"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.title && (
              <FormFeedback>{errors.title.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="googleTitle">
              عنوان گوگل
            </Label>
            <Controller
              id="googleTitle"
              name="googleTitle"
              control={control}
              render={({ field }) => (
                <Input
                  id="googleTitle"
                  placeholder="عنوان گوگل"
                  invalid={errors.googleTitle && true}
                  {...field}
                />
              )}
            />
            {errors.googleTitle && (
              <FormFeedback>{errors.googleTitle.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="keyword">
              کلمات اصلی
            </Label>
            <Controller
              id="keyword"
              name="keyword"
              control={control}
              render={({ field }) => (
                <Input
                  id="keyword"
                  placeholder="عنوان خبر"
                  invalid={errors.keyword && true}
                  {...field}
                />
              )}
            />
            {errors.keyword && (
              <FormFeedback>{errors.keyword.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="newsCategoryId">
              انتخاب دسته بندی
            </Label>
            <Controller
              id="newsCategoryId"
              name="newsCategoryId"
              control={control}
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  name="newsCategoryId"
                  defaultInputValue={news && defaultNewsCategoryList?.label}
                  options={newsCategoryLists}
                  isClearable
                  isSearchable
                  components={animatedComponents}
                  {...field}
                />
              )}
            />
          </Col>
          {errors.newsCategoryId && (
            <FormFeedback>{errors.newsCategoryId.message}</FormFeedback>
          )}
        </Row>
        <Row className="mb-1">
          <Col md="6">
            <Label className="form-label" for="miniDescribe">
              توضیح کوتاه
            </Label>
            <Controller
              control={control}
              id="miniDescribe"
              name="miniDescribe"
              render={({ field }) => (
                <Input
                  type="textarea"
                  id="miniDescribe"
                  placeholder="توضیح کوتاه"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.miniDescribe && (
              <FormFeedback>{errors.miniDescribe.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="googleDescribe">
              توضیحات گوگل
            </Label>
            <Controller
              id="googleDescribe"
              name="googleDescribe"
              control={control}
              render={({ field }) => (
                <Input
                  type="textarea"
                  id="googleDescribe"
                  placeholder="توضیحات گوگل"
                  invalid={errors.googleDescribe && true}
                  {...field}
                />
              )}
            />
            {errors.googleDescribe && (
              <FormFeedback>{errors.googleDescribe.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <div className="mt-4">
          <h5>آپلود عکس خبر</h5>
          <FileUploaderSingle
            files={files}
            setFiles={setFiles}
            image={news?.currentImageAddress}
          />
        </div>
        <div className="d-flex justify-content-between">
          <Button type="button" color="primary" className="btn-prev" disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
              disabled
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default GlobalData;
