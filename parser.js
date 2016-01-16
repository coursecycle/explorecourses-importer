const fs = require("fs");
const request = require("request");
const xmlStream = require("xml-stream");

// NOTE: The default sqlite3 database that is used in Rails
// will curl into a little ball and cry softly to itself if
// it is hit with this script. Be sure to use a database
// engine that properly supports transactions/concurrency
// like PostgreSQL before running this script.

// NOTE 2: For some reason, request makes a distinction
// between 127.0.0.1 and localhost. If utilizing against
// 127.0.0.1, be sure to bind Rails to 127.0.0.1 like so:
// > rails s -b 127.0.0.1

// Change as desired
const COURSECYCLE_API_SERVER = "<SERVER_HERE>";
const FILE_PATH = "<DATA_FILE_HERE>";

// Read file as a stream
const stream = fs.createReadStream(__dirname + FILE_PATH);
const xml = new xmlStream(stream);

// Figure out which elements to retain
xml.preserve("course", true);
xml.on("endElement: course", (course) => {
  buildRequest({
    course: {
      title: course.title.$text,
      description: course.description.$text,
      subject: course.subject.$text,
      code: course.code.$text
    }
  });
});

// Generate a POST request
function buildRequest(form) {
  const coursesUrl = COURSECYCLE_API_SERVER + "/courses";
  request.post({
    headers: {
      "Content-Type": "application/json"
    },
    url: coursesUrl,
    form: form
  }, (err, httpResponse, body) => {
    process.stdout.write(".");
 });
}
