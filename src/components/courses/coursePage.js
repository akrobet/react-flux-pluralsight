'use strict';

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;

var CourseList = require('./courseList');
var CourseStore = require('../../stores/CourseStore');

var CoursePage = React.createClass({

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
              <CourseList courses={this.state.courses} />
          </div>
      );
  }
});

module.exports = CoursePage;
