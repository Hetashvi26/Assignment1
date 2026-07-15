const fs = require("fs");
const archiver = require("archiver");

const output = fs.createWriteStream("data.zip");
const archive = archiver("zip");

archive.pipe(output);

archive.directory("data/", false);

archive.finalize();

output.on("close", () => {
    console.log("ZIP file created successfully.");
});