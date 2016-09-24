"use strict";

var React = require('react');

var DropDown = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    options: React.PropTypes.array,
    value: React.PropTypes.object
  },

  render: function() {

    var wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + 'has-error';
    }

    var createOption = function(opt) {
      return (
        <option value={opt.value}>{opt.text}</option>
      );
    };

    return (
        <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
          <div className="field">
            <select
              name={this.props.name}
              className="form-control"
              value={this.props.value}
              onChange={this.props.onChange}>
              {this.props.options.map(createOption, this)}
            </select>
            <div className="input">{this.props.error}</div>
          </div>
        </div>
    );
  }
});

module.exports = DropDown;
