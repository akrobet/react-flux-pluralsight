'use strict';

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var Navigation = require('react-router').Navigation;

var CourseList = require('./courseList');
var CourseStore = require('../../stores/CourseStore');

var CoursePage = React.createClass({
	mixins: [Navigation],

  getInitialState: function () {
      return {
          courses: CourseStore.getAllCourses()
      };
  },

  componentWillMount: function() {
    CourseStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    CourseStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({courses: CourseStore.getAllCourses()});
  },

  render: function () {

      return (
          <div>
              <h1>Courses</h1>
              <Link to="addCourse" className="btn btn-default">Add Course</Link>
              <CourseList courses={this.state.courses} />
          </div>
      );
  }
});

module.exports = CoursePage;
