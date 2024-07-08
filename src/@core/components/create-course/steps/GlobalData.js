// ** React Imports
import { Fragment, useEffect } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";

// ** Utils
import { isObjEmpty } from "@utils";
import { dateFormatter } from "../../../../utility/date-formatter.utils";
import { convertDateToPersian } from "../../../../utility/date-helper.utils";

// ** Third Party Components
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Controller, useForm } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Col, Form, FormFeedback, Input, Label, Row } from "reactstrap";

// ** Core Import
import { createCourseStepOneFormSchema } from "../../../../core/validations/create-course/create-course-step-one-form.validation";

// ** Custom Components
import FileUploaderSingle from "../../FileUploaderSingle";

const GlobalData = ({
  stepper,
  course,
  title,
  cost,
  capacity,
  sessionNumber,
  miniDescribe,
  startTime,
  endTime,
  setTitle,
  setCost,
  setCapacity,
  setSessionNumber,
  setMiniDescribe,
  setStartTime,
  setEndTime,
  files,
  setFiles,
}) => {
  const defaultValues = {
    title: "",
    cost: "",
    capacity: "",
    sessionNumber: "",
    miniDescribe: "",
    startTime: "",
    endTime: "",
  };

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(createCourseStepOneFormSchema),
  });

  const onSubmit = (e) => {
    if (isObjEmpty(errors)) {
      const { title, cost, capacity, sessionNumber, miniDescribe, date } = e;

      if (!course) {
        const getStartTime = dateFormatter.format(date[0][0]);
        const getEndTime = dateFormatter.format(date[0][1]);
        e.startTime = getStartTime;
        e.endTime = getEndTime;
        setStartTime(e.startTime);
        setEndTime(e.endTime);
      }

      if (course) {
        const dateFormatter = new Intl.DateTimeFormat("en", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });

        if (e.date.length === 1) {
          const getStartTime = dateFormatter.format(date[0][0]);
          const getEndTime = dateFormatter.format(date[0][1]);
          setStartTime(getStartTime);
          setEndTime(getEndTime);
          e.startTime = getStartTime;
          e.endTime = getEndTime;
        } else {
          setStartTime(course.startTime);
          setEndTime(course.endTime);
          e.startTime = course.startTime;
          e.endTime = course.endTime;
        }
      }

      setTitle(title);
      setCost(cost);
      setCapacity(capacity);
      setSessionNumber(sessionNumber);
      setMiniDescribe(miniDescribe);

      if (title && cost && capacity && sessionNumber && miniDescribe) {
        stepper.next();
      }
    }
  };

  useEffect(() => {
    if (course) {
      const formattedStartTime = convertDateToPersian(course.startTime);
      const formattedEndTime = convertDateToPersian(course.endTime);
      const formattedDate = [formattedStartTime, formattedEndTime];

      setValue("title", course.title);
      setValue("cost", course.cost);
      setValue("capacity", course.capacity);
      setValue("sessionNumber", course.sessionNumber);
      setValue("miniDescribe", course.miniDescribe);
      setValue("date", formattedDate);
    }
  }, [course, setValue]);

  useEffect(() => {
    if (title && cost && capacity && sessionNumber && miniDescribe) {
      stepper.next();
    }
  }, [title, cost, capacity, sessionNumber, miniDescribe, startTime, endTime]);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات عمومی دوره</h5>
        <small className="text-muted">
          در این بخش باید اطلاعات دوره را وارد کنید.
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
                  placeholder="مانند: دوره جامع react"
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
            <Label className="form-label" for="cost">
              قیمت
            </Label>
            <Controller
              control={control}
              id="cost"
              name="cost"
              render={({ field }) => (
                <Input
                  id="cost"
                  placeholder="قیمت دوره"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.cost && <FormFeedback>{errors.cost.message}</FormFeedback>}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="capacity">
              ظرفیت دوره
            </Label>
            <Controller
              id="capacity"
              name="capacity"
              control={control}
              render={({ field }) => (
                <Input
                  id="capacity"
                  placeholder="ظرفیت دوره"
                  invalid={errors.capacity && true}
                  {...field}
                />
              )}
            />
            {errors.capacity && (
              <FormFeedback>{errors.capacity.message}</FormFeedback>
            )}
          </Col>
          <Col md="6">
            <Label className="form-label" for="sessionNumber">
              تعداد جلسات
            </Label>
            <Controller
              control={control}
              id="sessionNumber"
              name="sessionNumber"
              render={({ field }) => (
                <Input
                  id="sessionNumber"
                  placeholder="تعداد جلسات دوره"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.sessionNumber && (
              <FormFeedback>{errors.sessionNumber.message}</FormFeedback>
            )}
          </Col>
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
          <Col md="6" className="mt-2">
            <Label className="form-label d-block" for="date">
              تاریخ دوره
            </Label>
            <div className="coursesDatePickerWrapper">
              <Controller
                control={control}
                id="date"
                name="date"
                render={({ field }) => (
                  <DatePicker
                    name="date"
                    id="date"
                    value={[startTime, endTime]}
                    format="YYYY/MM/DD"
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    multiple
                    inputClass="form-control coursesDatePickerInput"
                    range
                    dateSeparator=" تا "
                    {...field}
                  />
                )}
              />
            </div>
            {errors.date && <FormFeedback>{errors.date.message}</FormFeedback>}
          </Col>
        </Row>
        <div className="mt-4">
          <h5>آپلود عکس دوره</h5>
          <FileUploaderSingle
            files={files}
            setFiles={setFiles}
            image={course?.imageAddress}
          />
        </div>
        <div className="d-flex justify-content-between">
          <Button type="button" color="primary" className="btn-prev" disabled>
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

export default GlobalData;
