const BadgeListItem = ({ listTitle, children }) => {
  return (
    <li className="mb-75 d-flex">
      <span className="fw-bolder me-25">{listTitle}</span>
      <div className="d-flex flex-wrap course-details-badge-list-item-mapped-wrapper">
        {children}
      </div>
    </li>
  );
};

export default BadgeListItem;
