import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import "./Choose.css";

import choose from "../../images/choose.svg";

import VideocamIcon from "@material-ui/icons/Videocam";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import { FileContext } from "../../FileContext";

class Choose extends Component {
    static contextType = FileContext;

    constructor(props) {
        super(props);
        this.state = {
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

    // changes file and filename whenever user changes a file input
    onUploadFileChange = e => {
        // check if user clicked cancel
        if (e.target.files.length === 0) return;

        // set file and filename and reset the progress
        this.context.setFile(e.target.files[0]);
        this.context.setFilename(e.target.files[0].name);

        // reset progress of uploading to the server
        this.context.setProgress(0);
    };

    render() {
        return (
            <div
                className={`choose ${
                    this.state.isVisible ? "choose-in" : "choose-out"
                }`}
            >
                <h1 className="name">Choose</h1>
                <h1 className="name">Video</h1>
                <img
                    width="200px"
                    height="200px"
                    className="logo"
                    src={choose}
                    alt="upload"
                />
                <p className="choose-description">Choose video</p>
                <p className="choose-description">you want to upload</p>
                <form>
                    <div>
                        <input
                            className="input"
                            id="file-input"
                            type="file"
                            multiple
                            onChange={this.onUploadFileChange}
                        />
                        <label htmlFor="file-input">
                            <Button
                                className="choose-button"
                                variant="contained"
                                color="secondary"
                                component="span"
                                startIcon={<VideocamIcon />}
                            >
                                {this.context.filename.length <= 12
                                    ? this.context.filename
                                    : this.context.filename.slice(0, 12) +
                                      "..."}
                            </Button>
                        </label>
                    </div>
                </form>
                <div className="navigation">
                    <Button
                        className="back"
                        variant="contained"
                        color="primary"
                        startIcon={<NavigateBeforeIcon />}
                        onClick={() => this.closeComponent("/", 600)}
                    >
                        Back
                    </Button>
                    <Button
                        className="next"
                        variant="contained"
                        color="secondary"
                        endIcon={<NavigateNextIcon />}
                        onClick={() => this.closeComponent("/upload", 600)}
                        // make button disabled unti the file is not choosen
                        disabled={this.context.file !== null ? false : true}
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    }
}

export default Choose;
