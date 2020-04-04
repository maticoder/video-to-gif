import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import "./Edit.css";

import edit from "../../images/edit.svg";

import { FileContext } from "../../FileContext";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

class Edit extends Component {
    static contextType = FileContext;

    constructor(props) {
        super(props);
        this.state = {
            // check if component is visible and animate it
            isVisible: true,

            // video resolution
            resolution: 144,

            min: 0,
            max: 100
        };
    }

    componentDidMount() {
        this.setState({
            min: this.context.duration[0],
            max: this.context.duration[1]
        });
    }

    // animate component when it's gonna be unmounted
    closeComponent = (to, time) => {
        this.setState(
            {
                isVisible: false
            },
            () => {
                setTimeout(() => {
                    this.props.history.push(to);
                }, time);
            }
        );
    };

    handleDurationChange = (event, newValue) => {
        this.context.setDuration(newValue);
    };

    handleResolutionChange = event => {
        this.setState({
            resolution: event.target.value
        });
    };

    render() {
        return (
            <div
                className={`edit ${
                    this.state.isVisible ? "edit-in" : "edit-out"
                }`}
            >
                <h1 className="name">Edit</h1>
                <h1 className="name">your Video</h1>
                <img
                    width="200px"
                    height="200px"
                    className="logo"
                    src={edit}
                    alt="edit"
                />
                <div className="duration">
                    <h1 className="duration-name">Video duration</h1>
                    <Slider
                        min={this.state.min}
                        max={this.state.max}
                        step={0.1}
                        value={this.context.duration}
                        onChange={this.handleDurationChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={() => this.context.duration}
                        marks={[
                            {
                                value: this.state.min,
                                label: `${this.state.min}`
                            },
                            {
                                value: this.state.max,
                                label: `${this.state.max}`
                            }
                        ]}
                    />
                </div>
                <div className="resolution">
                    <h1 className="resolution-name">Video resolution</h1>
                    <Select
                        className="resolution-select"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.resolution}
                        onChange={this.handleResolutionChange}
                    >
                        <MenuItem value={144}>144</MenuItem>
                        <MenuItem value={240}>240</MenuItem>
                        <MenuItem value={360}>360</MenuItem>
                        <MenuItem value={480}>480</MenuItem>
                        <MenuItem value={720}>720</MenuItem>
                        <MenuItem value={1080}>1080</MenuItem>
                    </Select>
                </div>
                <div className="navigation">
                    <Button
                        className="back"
                        variant="contained"
                        color="primary"
                        startIcon={<NavigateBeforeIcon />}
                        onClick={() => this.closeComponent("/upload", 600)}
                    >
                        Back
                    </Button>
                    <Button
                        className="next"
                        variant="contained"
                        color="secondary"
                        endIcon={<NavigateNextIcon />}
                        onClick={() => this.closeComponent("/convert", 600)}
                        // disabled={this.context.progress === 100 ? false : true}
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    }
}

export default Edit;
