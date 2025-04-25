// ** React Imports
import { Fragment, useEffect } from "react";

// ** Third Party Components
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Controller, useForm } from "react-hook-form";

// ** Reactstrap Imports
import {
  Button,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";

// ** Core Imports
import { userConnectionFormSchema } from "../../../../core/validations/edit-user/user-connection-form.validation";

const UserConnection = ({
  stepper,
  user,
  isLoading,
  userConnection,
  setUserConnection,
  handleSubmitFn,
}) => {
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(userConnectionFormSchema),
  });

  const onSubmit = (e) => {
    const { phoneNumber, gmail, recoveryEmail, telegramLink, linkdinProfile } =
      e;

    setUserConnection({
      phoneNumber,
      gmail,
      recoveryEmail,
      telegramLink,
      linkdinProfile,
    });
  };

  useEffect(() => {
    if (user) {
      setValue("phoneNumber", user.phoneNumber);
      setValue("gmail", user.gmail);
      setValue("recoveryEmail", user.recoveryEmail);
      setValue("telegramLink", user.telegramLink);
      setValue("linkdinProfile", user.linkdinProfile);
    }
  }, [user, setValue]);

  useEffect(() => {
    if (userConnection !== null) handleSubmitFn();
  }, [userConnection]);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">راه های ارتباطی کاربر</h5>
        <small className="text-muted">
          در این بخش میتوانید راه های ارتباطی کاربر را ویرایش کنید.
        </small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="phoneNumber">
              شماره تلفن کاربر
            </Label>
            <Controller
              id="phoneNumber"
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <Input
                  id="phoneNumber"
                  invalid={errors.phoneNumber && true}
                  {...field}
                />
              )}
            />
            {errors.phoneNumber && (
              <FormFeedback>{errors.phoneNumber.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="gmail">
              جیمیل کاربر
            </Label>
            <Controller
              control={control}
              id="gmail"
              name="gmail"
              render={({ field }) => (
                <Input id="gmail" invalid={errors.title && true} {...field} />
              )}
            />
            {errors.gmail && (
              <FormFeedback>{errors.gmail.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="recoveryEmail">
              ایمیل بازگردانی کاربر
            </Label>
            <Controller
              control={control}
              id="recoveryEmail"
              name="recoveryEmail"
              render={({ field }) => (
                <Input
                  id="recoveryEmail"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.recoveryEmail && (
              <FormFeedback>{errors.recoveryEmail.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="telegramLink">
              لینک تلگرام کاربر
            </Label>
            <Controller
              control={control}
              id="telegramLink"
              name="telegramLink"
              render={({ field }) => (
                <Input
                  id="telegramLink"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.telegramLink && (
              <FormFeedback>{errors.telegramLink.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="linkdinProfile">
              پروفایل لینکدین کاربر
            </Label>
            <Controller
              control={control}
              id="linkdinProfile"
              name="linkdinProfile"
              render={({ field }) => (
                <Input
                  id="linkdinProfile"
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.linkdinProfile && (
              <FormFeedback>{errors.linkdinProfile.message}</FormFeedback>
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
          <Button
            type="submit"
            color="primary"
            className="btn-next d-flex align-items-center submit-button"
            disabled={isLoading}
          >
            {isLoading && <Spinner size="sm" className="loading-spinner" />}
            <span className="align-middle d-sm-inline-block d-none">
              ویرایش کاربر
            </span>
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

export default UserConnection;
