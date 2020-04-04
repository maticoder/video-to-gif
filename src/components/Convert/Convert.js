import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import "./Convert.css";

import convert from "../../images/convert.svg";

import EditIcon from "@material-ui/icons/Edit";

class Convert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // check if component is visible and animate it
            isVisible: true
        };
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

    render() {
        return (
            <div
                className={`convert ${
                    this.state.isVisible ? "convert-in" : "convert-out"
                }`}
            >
                <h1 className="name">Convert</h1>
                <h1 className="name">your Video</h1>
                <img
                    width="200px"
                    height="200px"
                    className="logo"
                    src={convert}
                    alt="convert"
                />
                <p className="convert-description">Click to</p>
                <p className="convert-description">convert your video</p>
                <Button
                    className="convert-button"
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    type="submit"
                    onClick={() => this.closeComponent("/download", 600)}
                >
                    Convert
                </Button>
            </div>
        );
    }
}

export default Convert;
