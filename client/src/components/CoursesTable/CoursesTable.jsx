import React from 'react';
import { Link } from 'react-router-dom';
import './coursesTable.css';

function CoursesTable({ courseName, coursePrice, courseId }) {
  return (
    <>
      <div className="CoursesTableP1 mb-0">
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
      </div>
      <hr style={{ color: 'rgb(198, 198, 198)', marginBottom: '10px', marginTop: '10px' }} />
    </>
  );
}

export default React.memo(CoursesTable);
