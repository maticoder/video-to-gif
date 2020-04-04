import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import "./Main.css";

import logo from "../../images/logo.svg";

import { FileContext } from "../../FileContext";

class Main extends Component {
    static contextType = FileContext;

    constructor(props) {
        super(props);
        this.state = {
            isVisible: true
        };
    }

    // reset the initial app's state
    componentDidMount() {
        this.context.setFile(null);
        this.context.setFilename("Choose file");
        this.context.setProgress(0);
        this.context.setDuration([0, 100]);
    }

    // redirecting to another route
    // delay the redirection and animate the component
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
                className={`main ${
                    this.state.isVisible ? "main-in" : "main-out"
                }`}
            >
                <h1 className="name name1-in">Video to Gif</h1>
                <h1 className="name name2-in">Converter</h1>
                <img
                    width="200px"
                    height="200px"
                    className="logo logo-in"
                    src={logo}
                    alt="logo"
                />
                {/* <input type="file" /> */}
                <p className="made made-in">made by</p>
                <p className="author author-in">Mati</p>
                <Button
                    className="button next next-in"
                    variant="contained"
                    color="secondary"
                    component="span"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => this.closeComponent("/choose", 600)}
                >
                    Go next
                </Button>
            </div>
        );
    }
}

export default Main;
