import React, { Component } from "react";
import { TimePicker } from "antd";

const format = "HH:mm";

class TimeRnagePicker extends Component {
  static getDerivedStateFromProps(nextProps) {
    if ("value" in nextProps) {
      return {
        ...(nextProps.value || {})
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      start: value.start,
      end: value.end
    };
  }

  handleStartChange = start => {
    if (!("value" in this.props)) {
      this.setState({ start });
    }
    this.triggerChange({ start });
  };

  handleEndChange = end => {
    if (!("value" in this.props)) {
      this.setState({ end });
    }
    this.triggerChange({ end });
  };

  triggerChange = changedValue => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { start, end } = this.state;
    const { disabled } = this.props;
    return (
      <span>
        <TimePicker
          disabled={disabled}
          onChange={this.handleStartChange}
          value={start}
          format={format}
        />
        <span style={{ marginLeft: "20px" }}>~</span>
        <TimePicker
          disabled={disabled}
          style={{ marginLeft: 20 }}
          onChange={this.handleEndChange}
          value={end}
          format={format}
        />
      </span>
    );
  }
}

export default TimeRnagePicker;
