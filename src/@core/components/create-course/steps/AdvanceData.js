// ** React Imports
import { Fragment, useEffect } from "react";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";

// Validation Import
import { createCourseStepTwoFormSchema } from "../../../../core/validations/create-course/create-course-step-two-form.validation";

const defaultValues = {
  googleTitle: "",
  googleSchema: "",
  uniqueUrlString: "",
  shortLink: "",
};

const AdvanceData = ({
  stepper,
  course,
  setGoogleTitle,
  setGoogleSchema,
  setUniqueUrlString,
  setShortLink,
}) => {
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(createCourseStepTwoFormSchema),
  });

  const onSubmit = (e) => {
    if (isObjEmpty(errors)) {
      const { googleTitle, googleSchema, uniqueUrlString, shortLink } = e;
      setGoogleTitle(googleTitle);
      setGoogleSchema(googleSchema);
      setUniqueUrlString(uniqueUrlString);
      setShortLink(shortLink);
      stepper.next();
    }
  };

  useEffect(() => {
    if (course) {
      setValue("googleTitle", course.googleTitle);
      setValue("googleSchema", course.googleSchema);
      setValue("uniqueUrlString", course.uniqeUrlString);
      setValue("shortLink", course.shortLink);
    }
  }, [course]);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات پیشرفته دوره</h5>
        <small className="text-muted">
          در این بخش باید اطلاعات پیشرفته دوره را وارد کنید.
        </small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
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
                  placeholder="مانند: دوره جامع react"
                  invalid={errors.googleTitle && true}
                  {...field}
                />
              )}
            />
            {errors.googleTitle && (
              <FormFeedback>{errors.googleTitle.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="googleSchema">
              اسکیمای گوگل
            </Label>
            <Controller
              control={control}
              id="googleSchema"
              name="googleSchema"
              render={({ field }) => (
                <Input
                  id="googleSchema"
                  placeholder="اسکیمای گوگل"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.googleSchema && (
              <FormFeedback>{errors.googleSchema.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="uniqueUrlString">
              url یونیک دوره
            </Label>
            <Controller
              id="uniqueUrlString"
              name="uniqueUrlString"
              control={control}
              render={({ field }) => (
                <Input
                  id="uniqueUrlString"
                  placeholder="url یونیک دوره "
                  invalid={errors.uniqueUrlString && true}
                  {...field}
                />
              )}
            />
            {errors.uniqueUrlString && (
              <FormFeedback>{errors.uniqueUrlString.message}</FormFeedback>
            )}
          </Col>
          <Col md="6">
            <Label className="form-label" for="shortLink">
              لینک کوتاه
            </Label>
            <Controller
              control={control}
              id="shortLink"
              name="shortLink"
              render={({ field }) => (
                <Input
                  id="shortLink"
                  placeholder="لینک کوتاه دوره"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.shortLink && (
              <FormFeedback>{errors.shortLink.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            type="button"
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
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

export default AdvanceData;
