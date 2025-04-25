// ** React Imports
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

// ** Custom Components
import BreadCrumbs from "@components/breadcrumbs";
import Wizard from "@components/wizard";

// ** Steps
import GlobalData from "../@core/components/EditUser/steps/GlobalData";
import UserConnection from "../@core/components/EditUser/steps/UserConnection";

// ** Core Imports
import { useUpdateUser } from "../core/services/api/user/useUpdateUser.api";
import { useUserWithId } from "../core/services/api/user/useUserWithId";

const EditUserPage = () => {
  // ** Ref
  const ref = useRef(null);

  // ** States
  const [stepper, setStepper] = useState(null);
  const [globalData, setGlobalData] = useState();
  const [userConnection, setUserConnection] = useState(null);

  // ** Hooks
  const { id } = useParams();
  const { data: userDetails } = useUserWithId(id);
  const updateUser = useUpdateUser();

  const handleSubmitFn = () => {
    const userData = {
      id,
      ...globalData,
      ...userConnection,
    };

    updateUser.mutate(userData);
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
          isLoading={updateUser.isPending}
          userConnection={userConnection}
          setUserConnection={setUserConnection}
          handleSubmitFn={handleSubmitFn}
        />
      ),
    },
  ];

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
      <Wizard
        instance={(el) => setStepper(el)}
        ref={ref}
        steps={steps}
        options={{ linear: false }}
      />
    </div>
  );
};

export default EditUserPage;
