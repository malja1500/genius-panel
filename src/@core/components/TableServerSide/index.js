// ** React Imports
import { forwardRef, Fragment, memo, useState } from "react";
import { Link } from "react-router-dom";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown, Trash } from "react-feather";
import ReactPaginate from "react-paginate";

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";

// ** Utility Imports
import { useTimeOut } from "../../../utility/hooks/useTimeOut";

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

const DataTableServerSide = ({
  data,
  columns,
  renderTitle,
  currentPage,
  rowsPerPage,
  setCurrentPage,
  setRowsPerPage,
  setSearchValue,
  setSort,
  setSortColumn,
  setSelectedRows,
  handleDeleteData,
  isCourseCreateButtonShow,
  loadingNotFoundText,
  deleteSelectedRowsText,
  handleSearchFilter,
  selectableRows,
  isDeletingData,
  setIsDeletingData,
}) => {
  // ** States
  const [itemOffset, setItemOffset] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const endOffset = itemOffset + rowsPerPage;
  const currentItems = data?.slice(itemOffset, endOffset);

  const textTimeOut = useTimeOut();

  const handlePageClick = (event, isFilter, currentPage) => {
    setCurrentPage(isFilter ? currentPage : event.selected + 1);
    const newOffset =
      (isFilter ? currentPage * rowsPerPage : event.selected * rowsPerPage) %
      data?.length;

    setItemOffset(newOffset);
  };

  // ** Function to handle filter
  const handleFilter = (e) => {
    handlePageClick(undefined, true, 0);

    textTimeOut(() => {
      setSearchValue(e.target.value);
    }, 800);
  };

  // ** Function to handle per page
  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(data.length / rowsPerPage);

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={Math.ceil(count) || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePageClick(page)}
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        }
      />
    );
  };

  // ** Handle sort
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  // ** Function to handle selected rows
  const onSelectedRows = async (e) => {
    setSelectedRows(e.selectedRows);
    setIsDeleting(e.selectedRows);
    if (e.selectedRows?.length !== 0) {
      setIsDeleting(true);
      setIsDeletingData(true);
    } else {
      setIsDeleting(false);
      setIsDeletingData(false);
    }
  };

  return (
    <Fragment>
      <Card className="dataTableCard">
        <CardHeader className="d-flex justify-content-between align-items-center border-bottom">
          <CardTitle tag="h4" className="tableTitle">
            {renderTitle}
          </CardTitle>
          <div className="d-flex gap-1">
            {isDeleting && isDeletingData && (
              <Button
                className="d-flex align-items-center delete-course-btn"
                onClick={handleDeleteData}
                color="danger"
              >
                <Trash size={16} />
                <span>{deleteSelectedRowsText}</span>
              </Button>
            )}
            {isCourseCreateButtonShow && (
              <Button tag={Link} to="/create-course" color="primary">
                افزودن دوره
              </Button>
            )}
          </div>
        </CardHeader>
        <Row className="mx-0 mt-1 mb-50">
          <Col sm="6">
            <div className="d-flex gap-1 align-items-center">
              <Label for="sort-select" className="mt-one">
                تعداد نمایش در صفحه
              </Label>
              <Input
                className="dataTable-select"
                type="select"
                id="sort-select"
                value={rowsPerPage}
                onChange={(e) => handlePerPage(e)}
              >
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
            </div>
          </Col>
          <Col
            className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
            sm="6"
          >
            <Label className="me-1 mt-one" for="search-input">
              جستجو
            </Label>
            <Input
              className="dataTable-filter"
              type="text"
              bsSize="sm"
              id="search-input"
              onChange={handleSearchFilter ? handleSearchFilter : handleFilter}
            />
          </Col>
        </Row>
        <div className="react-dataTable">
          <DataTable
            noHeader
            pagination
            paginationServer
            className="react-dataTable"
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            data={currentItems}
            selectableRows={selectableRows}
            selectableRowsComponent={BootstrapCheckbox}
            onSelectedRowsChange={onSelectedRows}
            noDataComponent={<span>{loadingNotFoundText}</span>}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default memo(DataTableServerSide);
