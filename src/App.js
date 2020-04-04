import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// / route, main page
import Main from "./components/Main/Main";

// /choose route, choose a file to upload
import Choose from "./components/Choose/Choose";

// /upload route, upload your file to the server
import Upload from "./components/Upload/Upload";

// /edit route, edit your file, change duration, resolution
import Edit from "./components/Edit/Edit";

// /convert click to start converting your video to gif
import Convert from "./components/Convert/Convert";

// /download wait until converting is done, then download your file
import Download from "./components/Download/Download";

import { FileProvider } from "./FileContext";

import "./App.css";

class App extends Component {
    render() {
        return (
            <FileProvider>
                <div className="app">
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Main} />
                            <Route path="/choose" component={Choose} />
                            <Route path="/upload" component={Upload} />
                            <Route path="/edit" component={Edit} />
                            <Route path="/convert" component={Convert} />
                            <Route path="/download" component={Download} />
                        </Switch>
                    </Router>
                </div>
            </FileProvider>
        );
    }
}

export default App;
