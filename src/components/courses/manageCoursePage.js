"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseStore = require('../../stores/courseStore');
var CourseActions = require('../../actions/courseActions');
var AuthorStore = require('../../stores/authorStore');
var Toastr = require('toastr');

var _getAuthorFormattedForDropdown = function(author) {
	return {
		value: author.id,
		text: author.firstName + ' ' + author.lastName
	};
};

var _getCourseState = function(id) {
	return CourseStore.getCourseById(id);
};

var ManageCoursePage = React.createClass({

    mixins: [
      Router.Navigation
    ],

    getInitialState: function() {
      return {
        course: {id: '', title: '', watchHref: '', length: '', category: '', author: ''}, //TODO: Add Author
        errors: {},
        dirty: false
      };
    },

    componentWillMount: function() {
      var courseId = this.props.params.id;  //from the path '/course:id'

      this.setState({allAuthors: AuthorStore.getAllAuthors().map(_getAuthorFormattedForDropdown)});

      if (courseId) {
        this.setState({course: _getCourseState(courseId)});
      }
    },

    setCourseState: function(event) {
      this.setState({dirty: true});
      var field = event.target.name;
      var value = event.target.value;

      if (field === 'author') {
        value = AuthorStore.getAuthorById(value);
      }

      this.state.course[field] = value;

      return this.setState({course: this.state.course});
    },

    courseFormIsValid: function(){
      var formIsValid = true;
      this.state.errors = {}; //clear any previous errors

      if (this.state.course.title.length < 3) {
        this.state.errors.title = 'Title must be at least 3 characters.';
        formIsValid = false;
      }

      if (this.state.course.category.length < 3) {
        this.state.errors.category = 'Last name must be at least 3 characters.';
        formIsValid = false;
      }

      this.setState({errors: this.state.errors});
      return formIsValid;
    },

    saveCourse: function(event) {
      event.preventDefault();

      if (!this.courseFormIsValid()) {
        return;
      }

      if (this.state.course.id) {
        CourseActions.updateCourse(this.state.course);
      } else {
        CourseActions.createCourse(this.state.course);
      }
      this.setState({dirty: false});
      Toastr.success('Author saved.');
      this.transitionTo('courses');
    },

    render: function() {
      return (
        <CourseForm
          course={this.state.course}
          onChange={this.setCourseState}
          authors={this.state.allAuthors}
          onSave={this.saveCourse}
          errors={this.state.errors} />
      );
    }
});

module.exports = ManageCoursePage;
