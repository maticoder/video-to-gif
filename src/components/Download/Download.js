import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

import Loader from "../Loader/Loader";

import "./Download.css";

import download from "../../images/download.svg";

import BeachAccessIcon from "@material-ui/icons/BeachAccess";

import { FileContext } from "../../FileContext";

class Download extends Component {
    static contextType = FileContext;

    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
            loading: true
        };
    }

    async componentDidMount() {
        try {
            const res = await axios.post(
                "/convert",
                {
                    filename: this.context.filename,
                    duration: this.context.duration
                },
                {
                    // timeout: 5 * 60 * 1000
                }
            );

            this.context.setFilename(res.data.filename);
            this.setState(
                {
                    // loading: false,
                    isVisible: false
                },
                () => {
                    setTimeout(() => {
                        this.setState({
                            isVisible: true,
                            loading: false
                        });
                    }, 300);
                }
            );
        } catch (err) {
            console.error(err);
        }
    }

    onSubmit = e => {
        e.preventDefault();

        axios({
            url: `/download/?filename=${this.context.filename}`,
            method: "GET",
            responseType: "blob"
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", this.context.filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    render() {
        return (
            <div
                className={`download ${
                    this.state.isVisible ? "download-in" : "download-out"
                }`}
            >
                {this.state.loading ? (
                    <Loader />
                ) : (
                    <div
                        className={`download ${
                            this.state.isVisible
                                ? "download-in"
                                : "download-out"
                        }`}
                    >
                        <div>
                            <h1 className="name">Download</h1>
                            <h1 className="name">your gif</h1>
                            <img
                                width="200px"
                                height="200px"
                                className="logo"
                                src={download}
                                alt="download"
                            />
                            <p className="download-description">Click to</p>
                            <p className="download-description">
                                download your gif
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <Button
                                    className="download-button"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<BeachAccessIcon />}
                                    type="submit"
                                    // onClick={() => this.closeComponent("/download", 600)}
                                >
                                    Download
                                </Button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Download;
