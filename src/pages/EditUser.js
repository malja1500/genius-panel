// ** React Imports
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

// ** Custom Components
import BreadCrumbs from "@components/breadcrumbs";
import Wizard from "@components/wizard";

// ** Steps
import GlobalData from "../@core/components/EditUser/steps/GlobalData";
import UserConnection from "../@core/components/EditUser/steps/UserConnection";

// ** Core Imports
import { getUserWithIdAPI } from "../core/services/api/user/useUserWithId";
import { updateUserAPI } from "../core/services/api/user/update-user.api";

const EditUserPage = () => {
  // ** Ref
  const ref = useRef(null);

  // ** States
  const [userDetails, setUserDetails] = useState();
  const [stepper, setStepper] = useState(null);
  const [globalData, setGlobalData] = useState();
  const [userConnection, setUserConnection] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // ** Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmitFn = async () => {
    try {
      setLoading(true);

      const userData = {
        id,
        ...globalData,
        ...userConnection,
      };

      const editUser = await updateUserAPI(userData);

      if (editUser.success) {
        toast.success("کاربر با موفقیت ویرایش شد !");

        navigate("users");
      } else {
        toast.error("مشکلی در ویرایش کاربر به وجود آمد !");
      }
    } catch (error) {
      setLoading(false);

      toast.error("مشکلی در ویرایش کاربر به وجود آمد !");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      id: "global-data",
      title: "اطلاعات عمومی",
      subtitle: "اطلاعات عمومی کاربر",
      content: (
        <GlobalData
          stepper={stepper}
          user={userDetails}
          setGlobalData={setGlobalData}
        />
      ),
    },
    {
      id: "user-connection",
      title: "راه های ارتباطی",
      subtitle: "راه های ارتباطی کاربر",
      content: (
        <UserConnection
          stepper={stepper}
          user={userDetails}
          isLoading={isLoading}
          userConnection={userConnection}
          setUserConnection={setUserConnection}
          handleSubmitFn={handleSubmitFn}
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const getUserDetails = await getUserWithIdAPI(id);

        setUserDetails(getUserDetails);
      } catch (error) {
        toast.error("مشکلی در دریافت اطلاعات کاربر به وجود آمد !");
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="horizontal-wizard">
      <BreadCrumbs
        title="ویرایش کاربر"
        data={[
          { title: "مدیریت کاربران", href: "/users" },
          {
            title: `${userDetails?.fName || "کاربر"} ${
              userDetails?.lName || "نابغه"
            }`,
          },
          { title: "ویرایش کاربر" },
        ]}
      />
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default EditUserPage;
