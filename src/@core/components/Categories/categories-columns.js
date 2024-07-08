// ** React Imports
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import { Badge } from "reactstrap";

// ** Third Party Components
import { Edit, Star } from "react-feather";

// ** Utils
import { convertDateToPersian } from "../../../utility/date-helper.utils";

// ** Image Imports
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";

// ** Table columns
export const CATEGORY_COLUMNS = [
  {
    name: "دسته بندی",
    minWidth: "270px",
    sortField: "categoryName",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center gap-1">
        <img src={blankThumbnail} className="course-column-image" />
        <div className="d-flex flex-column">
          <Link
            to={`/categories/edit/${row.id}`}
            className="blog-column-truncate text-body"
          >
            <span className="fw-bolder">دسته بندی {row.categoryName}</span>
          </Link>
        </div>
      </div>
    ),
  },
  {
    name: "آیدی دسته بندی",
    width: "160px",
    sortField: "id",
    cell: (row) => {
      return (
        <Badge color="light-primary" pill className="category-id-badge">
          {row.id}
        </Badge>
      );
    },
  },
  {
    name: "نام دسته بندی",
    minWidth: "180px",
    sortField: "categoryName",
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center gap-1">
        <Badge
          color="light-primary"
          tag={Link}
          to={`/categories/edit/${row.id}`}
          className="text-body d-flex justify-content-center align-items-center category-name-badge"
        >
          <Star className="category-name-star-icon" />
          <span className="fw-bolder text-primary text-truncate category-name-truncate">
            {row.categoryName}
          </span>
        </Badge>
      </div>
    ),
  },
  {
    name: "تاریخ ایحاد",
    minWidth: "150px",
    sortField: "fullName",
    cell: (row) => {
      const formattedUpdateDate = convertDateToPersian(row.insertDate);

      return (
        <div className="mr-5">
          <span className="text-sm">{formattedUpdateDate}</span>
        </div>
      );
    },
  },
  {
    name: "عملیات",
    minWidth: "160px",
    cell: (row) => {
      return (
        <div className="column-action d-flex align-items-center gap-1">
          <Link to={`/categories/edit/${row.id}`}>
            <Edit size={20} className="me-50 edit-category-icon" />
          </Link>
        </div>
      );
    },
  },
];
