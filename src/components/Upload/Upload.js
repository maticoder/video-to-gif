import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./Upload.css";

import upload from "../../images/upload.svg";

import BackupIcon from "@material-ui/icons/Backup";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import { FileContext } from "../../FileContext";

class Upload extends Component {
    static contextType = FileContext;

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

    onSubmit = async e => {
        // dont send a form
        e.preventDefault();

        // if there is no file dont send any request
        if (this.context.file === null) return;

        // make form data
        const formData = new FormData();

        // append file to upload to the form data
        formData.append("file", this.context.file);

        // try to make axios request asynchronyusly
        try {
            const res = await axios.post("/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: progressEvent => {
                    this.context.setProgress(
                        parseInt(
                            Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total
                            )
                        )
                    );
                }
            });

            const { name, duration } = res.data;
            // console.log(res.data);
            this.context.setFilename(name);
            this.context.setDuration([0, duration]);
            // console.log(name);
        } catch (err) {
            if (err.response.status === 500) {
                console.log("There was a problem with the server");
            } else {
                console.log(err.response.data.message);
            }
        }
    };

    render() {
        return (
            <div
                className={`upload ${
                    this.state.isVisible ? "upload-in" : "upload-out"
                }`}
            >
                <h1 className="name">Upload</h1>
                <h1 className="name">your Video</h1>
                <img
                    width="200px"
                    height="200px"
                    className="logo"
                    src={upload}
                    alt="upload"
                />
                <p className="upload-description">Upload your video</p>
                <p className="upload-description">to the server</p>
                <form onSubmit={this.onSubmit}>
                    <Button
                        className="upload-button"
                        variant="contained"
                        color="primary"
                        startIcon={<BackupIcon />}
                        type="submit"
                        disabled={this.context.progress !== 0 ? true : false}
                    >
                        Upload
                        {this.context.progress !== 0 ? (
                            <CircularProgress
                                variant="static"
                                style={{ position: "absolute" }}
                                color="secondary"
                                size={30}
                                value={this.context.progress}
                            />
                        ) : null}
                    </Button>
                </form>
                <div className="navigation">
                    <Button
                        className="back"
                        variant="contained"
                        color="primary"
                        startIcon={<NavigateBeforeIcon />}
                        onClick={() => this.closeComponent("/choose", 600)}
                    >
                        Back
                    </Button>
                    <Button
                        className="next"
                        variant="contained"
                        color="secondary"
                        endIcon={<NavigateNextIcon />}
                        onClick={() => this.closeComponent("/edit", 600)}
                        disabled={this.context.progress === 100 ? false : true}
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    }
}

export default Upload;
