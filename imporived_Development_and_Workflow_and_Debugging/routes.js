const fs = require("fs");
/* const server = http.createServer((req, res) => {
  //   console.log(req);
  //   process.exit();
  console.log(
    "url=>",
    req.url,
    "\nmethod=>",
    req.method,
    "\nheaders=>",
    req.headers
  );
});

server.listen(3000, () => {
  console.log("server started on port 3000");
}); */

/* const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  res.setHeader("Content-Type", "text/html");
  res.write(
    `<body>
    <div style="width:100vw; display:flex; justify-content:center; align-items:center; flex-direction: column">
        <h1 style="color:red; font-size:40px;">Hello Deepak Singh Jethi...</h1>
        <p style="color:green; font-size:20px;">This page is rendering from backend</p>
    </div>
</body>`
  );
  res.end();
});

server.listen(3000, () => {
  console.log("server started on port 3000");
}); */

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write(
      `<html>
      <head> <title>My First Page</title></head>
       <body>
          <div style="width:100vw; display:flex; justify-content:center; align-items:center; flex-direction: column">
             <form action = "/message" method = "POST">
             <input type ="text" name = "message"/>
             <button type = "submit">Send</button>
             </form>
          </div>
      </body>
    </html>`
    );
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      //   console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      //    console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      //   fs.writeFileSync("./message.txt", `${message}`);
      fs.writeFile("./message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        // res.writeHead(302,{"Location": "/"})
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write(
    `<body>
       <div style="width:100vw; display:flex; justify-content:center; align-items:center; flex-direction: column">
           <h1 style="color:red; font-size:40px;">Hello Deepak Singh Jethi...</h1>
           <p style="color:green; font-size:20px;">This page is rendering from backend</p>
       </div>
    </body>`
  );
  res.end();
};

//1. module.exports = requestHandler;

//2. module.exports.handler = requestHandler;
// module.exports.text = "some text";

// 3.exports.handler = requestHandler;
//exports.text = "some text";

module.exports = {
  handler: requestHandler,
  text: "some text",
};
