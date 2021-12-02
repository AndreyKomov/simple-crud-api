const parseJson = (req, res) => {
  res.send = (data) => {
    res.writeHead(res.statusCode, {
      "Content-type": "application/json",
    });
    res.end(JSON.stringify(data));
  };
};

module.exports = parseJson;
