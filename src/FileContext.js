import React, { useState, createContext } from "react";

export const FileContext = createContext();

export function FileProvider(props) {
    // file object from input
    const [file, setFile] = useState(null);

    // name of the file
    const [filename, setFilename] = useState("Choose file");

    // progress of uploading the file to the server
    const [progress, setProgress] = useState(0);

    // video duration to edit the video
    const [duration, setDuration] = useState([0, 100]);

    return (
        <FileContext.Provider
            value={{
                file,
                setFile,
                filename,
                setFilename,
                progress,
                setProgress,
                duration,
                setDuration
            }}
        >
            {props.children}
        </FileContext.Provider>
    );
}
