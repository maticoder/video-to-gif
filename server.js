const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const uuidv4 = require("uuid").v4;
const ffmpeg = require("fluent-ffmpeg");

app.use(fileUpload());
app.use(express.json());

// upload endpoint
app.post("/upload", (req, res) => {
    // check if there is a file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            message: "No file uploaded"
        });
    }

    // get file from req
    const file = req.files[Object.keys(req.files)[0]];

    // get file extension
    let extension = file.name.slice(file.name.lastIndexOf("."));

    // change filename to uniqude id to easy find that file later
    file.name = uuidv4() + extension;

    file.mv(`${__dirname}/files/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Server error"
            });
        }

        // get file duration and send it with response
        ffmpeg.ffprobe(`./files/${file.name}`, function(err, metadata) {
            // if there is an error return error message
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Server error"
                });
            }

            // return file name
            return res.json({
                name: file.name,
                duration: metadata.format.duration
            });
        });

        // console.log(file);
    });
});

app.post("/convert", (req, res) => {
    // req.setTimeout(5 * 60 * 1000);

    const { filename, duration } = req.body;
    console.log("Get request");
    // console.log(filename);

    // convert video to gif
    ffmpeg(`${__dirname}/files/${filename}`)
        .output(
            `${__dirname}/files/${filename.slice(0, filename.lastIndexOf(".")) +
                ".gif"}`
        )
        .outputOption(
            "-vf",
            "[0:v] fps=30,scale=w=1080:h=-1,split [a][b];[a] palettegen=stats_mode=single [p];[b][p] paletteuse=new=1"
        )
        .seekInput(duration[0])
        .duration(duration[1] - duration[0])
        .on("codecData", function(data) {
            console.log(
                "Input is " +
                    data.audio +
                    " audio " +
                    "with " +
                    data.video +
                    " video " +
                    " duration is " +
                    data.duration
            );
        })
        .on("progress", function(progress) {
            console.log("Processing: " + progress.percent + "% done");
            // res.write("Hi!");
        })
        .on("end", function() {
            res.json({
                filename: filename.slice(0, filename.lastIndexOf(".")) + ".gif"
            });
        })
        .run();
});

app.get("/download", (req, res) => {
    const { filename } = req.query;
    // console.log(req.query);
    res.download(`${__dirname}/files/${filename}`);
});

const server = app.listen(7000, () => {
    console.log(`Server up and running`);
});

// server.setTimeout(5 * 60 * 1000);
