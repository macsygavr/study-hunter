import { Link } from 'react-router-dom';
import './coursesTable.css';

function CoursesTable({ courseName, coursePrice, courseId }) {
  return (
    <>
      <p className="CoursesTableP">
        <Link className="postItemLink" to={`/course/${courseId}`}>
          <span>{courseName}</span>
        </Link>
        <span>
          Цена:
          &nbsp;
          {coursePrice}
          {' '}
          руб.
        </span>
      </p>
      <hr style={{ marginTop: '-15px', color: 'rgb(198, 198, 198)' }} />
    </>
  );
}

export default CoursesTable;
