const functions = require("@google-cloud/functions-framework");

const cors = require("cors")({ origin: true });
const fetch = require("node-fetch-commonjs");

const whitelist = ["https://wenbei.github.io"];

functions.http("cors-proxy", (req, res) => {
  if (!whitelist.includes(req.get("origin"))) {
    res.status(403).send(`The origin was not whitelisted by the operator of this proxy.`);
  }

  cors(req, res, async () => {
    const url = req.url.slice(1);

    const options = {
      method: req.method,
    };

    if (req.method == "POST") {
      options.headers = {
        "Content-Type": req.get("Content-Type"),
      };
      options.body = JSON.stringify(req.body);
    }

    let response = await fetch(url, options).then((r) => r.json());

    res.status(200).send(response);
  });
});
