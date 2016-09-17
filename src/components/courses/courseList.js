'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var toastr = require('toastr');

var CourseList = React.createClass({

    propTypes: {
      courses: React.PropTypes.array.isRequired
    },

    // deleteAuthor: function(id, event) {
    //   event.preventDefault();
    //   AuthorActions.deleteAuthor(id);
    //   toastr.success('Author Deleted');
    // },

    render: function () {
        var createCourseRow = function(course) {
          return (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.author.name}</td>
                <td>{course.category}</td>
                <td>{course.length}</td>
              </tr>
          );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Length</th>
                    </thead>
                    <tbody>
                        {this.props.courses.map(createCourseRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = CourseList;
