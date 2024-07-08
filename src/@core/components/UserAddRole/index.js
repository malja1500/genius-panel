import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import { Button, Label, Modal, ModalBody, ModalHeader } from "reactstrap";

// ** Core Imports
import { USER_ROLES } from "../../../core/data/user-roles.data";
import { useAddUserAccess } from "../../../core/services/api/user/useAddUserAccess.api";

// ** Utils
import { selectThemeColors } from "../../../utility/Utils";

const UserAddRole = ({ modal, id, toggleModal, userRoles, isUserDetails }) => {
  // ** States
  const [role, setRole] = useState();

  // ** Hooks
  const addUserAccess = useAddUserAccess(id);

  const animatedComponents = makeAnimated();

  const handleAddRole = async () => {
    const convertedUserRoles = isUserDetails
      ? userRoles.map((user) => user.roleName)
      : userRoles.split(",").map((role) => role.trim());

    const handleEnable = convertedUserRoles.includes(role.role);

    addUserAccess.mutate({
      enable: !handleEnable,
      roleId: role.value,
    });
  };

  return (
    <Modal
      isOpen={modal === id}
      toggle={() => toggleModal(id)}
      className="modal-dialog-centered"
      key={id}
    >
      <ModalHeader toggle={() => toggleModal(id)}>
        در این بخش میتونید دسترسی های لازم را به کاربر بدهید.
      </ModalHeader>
      <ModalBody>
        <Label>انتخاب نقش</Label>
        <Select
          theme={selectThemeColors}
          className="react-select"
          classNamePrefix="select"
          name="courseLevel"
          options={USER_ROLES}
          isClearable
          isSearchable
          components={animatedComponents}
          onChange={(e) => setRole(e)}
        />
        <Button
          color="primary"
          className="mt-1"
          disabled={!role}
          onClick={handleAddRole}
        >
          تغییر نقش
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default UserAddRole;
