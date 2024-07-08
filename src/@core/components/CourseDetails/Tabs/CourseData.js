// ** Reactstrap Imports
import { Card, CardBody, Col, Row } from "reactstrap";

// ** Context

// ** Custom Components
import StatsVertical from "@components/widgets/stats/StatsVertical";

// ** Icons Imports
import { Eye, Heart, MessageSquare, ShoppingBag } from "react-feather";

const CourseData = ({
  courseUserTotal,
  courseCommentTotal,
  paymentDoneTotal,
  courseLikeTotal,
  describe,
}) => {
  let convertedDescribe = "";

  try {
    const convertDescribe = JSON.parse(describe);

    convertedDescribe = convertDescribe;
  } catch (error) {
    convertedDescribe = describe;
  }

  const loadContent = () => {
    return convertedDescribe?.blocks?.map((block, ind) => {
      switch (block.type) {
        case "header":
          return <h3 key={ind}>{block.data.text}</h3>;

        case "paragraph":
          return (
            <p key={ind} className="news-details-paragraph">
              {block.data.text}
            </p>
          );

        default:
          return null;
      }
    });
  };

  return (
    <>
      <Row>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<Eye size={21} />}
            color="info"
            stats={courseUserTotal}
            statTitle="دانشجو"
          />
        </Col>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<MessageSquare size={21} />}
            color="warning"
            stats={courseCommentTotal}
            statTitle="نظر"
          />
        </Col>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<ShoppingBag size={21} />}
            color="danger"
            stats={paymentDoneTotal}
            statTitle="سفارش"
          />
        </Col>
        <Col xl="3" md="4" sm="6">
          <StatsVertical
            icon={<Heart size={21} />}
            color="primary"
            stats={courseLikeTotal}
            statTitle="لایک"
          />
        </Col>
      </Row>
      <Card>
        <CardBody>
          <h4>توضیحات دوره</h4>
          <div className="mt-2">{loadContent()}</div>
        </CardBody>
      </Card>
    </>
  );
};

export default CourseData;
