// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Tooltip,
  UncontrolledDropdown,
} from "reactstrap";

// ** Utils
import { convertDateToPersian } from "../../../utility/date-helper.utils";

// ** Image Imports
import { CheckCircle, Edit, Eye, MoreVertical, XCircle } from "react-feather";
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";
import { useState } from "react";
import toast from "react-hot-toast";
import { activeInactiveNewsAPI } from "../../../core/services/api/news/active-inactive-news.api";
import { onFormData } from "../../../utility/form-data-helper.utils";

// ** Table columns
export const NEWS_COLUMNS = [
  {
    name: "نام خبر",
    sortable: true,
    width: "280px",
    sortField: "title",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center gap-1">
        <img
          src={
            !row.currentImageAddressTumb ||
            row.currentImageAddressTumb === null ||
            row.currentImageAddressTumb === "<string>"
              ? blankThumbnail
              : row.currentImageAddressTumb
          }
          className="course-column-image"
        />
        <div className="d-flex flex-column">
          <Link
            to={`/news/${row.id}`}
            className="course-column-truncate blog-column-truncate text-body"
          >
            <span className="fw-bolder text-primary">{row.title}</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    name: "دسته بندی",
    sortable: true,
    width: "150px",
    sortField: "newsCatregoryName",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center gap-1">
        <div className="d-flex flex-column">
          <span>{row.newsCatregoryName}</span>
        </div>
      </div>
    ),
  },
  {
    name: "آخرین آپدیت",
    sortable: true,
    width: "160px",
    sortField: "updateDate",
    cell: (row) => {
      const formattedUpdateDate = convertDateToPersian(row.updateDate);

      return (
        <div className="d-flex justify-content-left align-items-center gap-1">
          <div className="d-flex flex-column">
            <span>{formattedUpdateDate}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "تعداد بازدید",
    sortable: true,
    width: "130px",
    sortField: "currentView",
    cell: (row) => <span>{row.currentView}</span>,
  },
  {
    sortable: true,
    name: "وضعیت",
    width: "120px",
    sortField: "isActive",
    cell: (row) => (
      <Badge
        color={
          row.isActive === true
            ? "light-success"
            : row.isActive === false
            ? "light-danger"
            : "light-warning"
        }
      >
        {row.isActive ? "فعال" : "غیر فعال"}
      </Badge>
    ),
  },
  {
    name: "عملیات",
    minWidth: "160px",
    cell: (row) => {
      // ** States
      const [activeInactiveNewsTooltip, setActiveInactiveNewsTooltip] =
        useState(false);

      // ** Hooks
      const navigate = useNavigate();

      const handleActiveInactiveNews = async () => {
        try {
          const data = {
            active: !row.isActive,
            id: row.id,
          };

          const formData = onFormData(data);

          const activeInactiveCourse = await activeInactiveNewsAPI(formData);

          if (activeInactiveCourse.success) {
            toast.success(
              `خبر با موفقیت ${row.isActive ? "غیر فعال" : "فعال"} شد !`
            );

            navigate("/news");
          } else {
            toast.error(
              `مشکلی در ${
                row.isActive ? "غیر فعال" : "فعال"
              } کردن خبر به وجود آمد !`
            );
          }
        } catch (error) {
          toast.error(
            `مشکلی در ${
              row.isActive ? "غیر فعال" : "فعال"
            } کردن خبر به وجود آمد !`
          );
        }
      };

      return (
        <div className="column-action d-flex align-items-center gap-1">
          <UncontrolledDropdown>
            <DropdownToggle tag="span">
              <MoreVertical size={17} className="cursor-pointer" />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem tag={Link} to={`/news/${row.id}`} className="w-100">
                <Eye size={14} className="me-50" />
                <span className="align-middle">جزئیات</span>
              </DropdownItem>
              <DropdownItem
                tag={Link}
                to={`/news/edit/${row.id}`}
                className="w-100"
              >
                <Edit size={14} className="me-50" />
                <span className="align-middle">ویرایش</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <div>
            {row.isActive ? (
              <XCircle
                id="activeInactiveNews"
                className="cursor-pointer activeNewsIcon"
                onClick={handleActiveInactiveNews}
              />
            ) : (
              <CheckCircle
                id="activeInactiveNews"
                className="cursor-pointer inActiveNewsIcon"
                onClick={handleActiveInactiveNews}
              />
            )}
            <Tooltip
              placement="top"
              isOpen={activeInactiveNewsTooltip}
              target="activeInactiveNews"
              toggle={() =>
                setActiveInactiveNewsTooltip(!activeInactiveNewsTooltip)
              }
              innerClassName="table-tooltip"
            >
              {row.isActive ? "غیر فعال کردن" : "فعال کردن"}
            </Tooltip>
          </div>
        </div>
      );
    },
  },
];
