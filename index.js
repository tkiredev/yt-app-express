const ytdl = require("ytdl-core"),
ytsr = require("ytsr"),
ytpl = require("ytpl"),
miniget = require("miniget"),
express = require('express'),
path = require('path');

app = express();

app.use('/static', express.static('static'))

app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/watch/?', (req, res) => {
 res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/results/?', (req, res) => {
 res.sendFile(path.join(__dirname, '/index.html'));
})

const limit = process.env.LIMIT || 50;
// Video Streaming
app.get("/s/:id", async (req, res) => {
  if (!req.params.id) return res.redirect("/");
  try {
    let info = await ytdl.getInfo(req.params.id);

    info.formats = info.formats.filter(
      (format) => format.hasVideo && format.hasAudio
    );
    

    var squal;
    if (info.formats.length > 1) {
      let qual = info.formats.filter((i)=> i.qualityLabel == "720p")
      squal = qual[0].url;
    } else squal = info.formats[0].url;
   

    if (!info.formats.length) {
      return res.status(500)
    }

    let headers = {
      "user-agent": process.env.USER_AGENT ||
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
    };

    // If user is seeking a video
    if (req.headers.range) {
      headers.range = req.headers.range;
    }

    res.setHeader("content-type", "video/mp4");

    let stream = miniget(squal, {
      headers,
    })
      .on("response", (resp) => {
        if (resp.headers["accept-ranges"])
          res.setHeader("accept-ranges", resp.headers["accept-ranges"]);
        if (resp.headers["content-length"])
          res.setHeader("content-length", resp.headers["content-length"]);
        if (resp.headers["content-type"])
          res.setHeader("content-type", resp.headers["content-type"]);
        if (resp.headers["content-range"])
          res.setHeader("content-range", resp.headers["content-range"]);
        if (resp.headers["connection"])
          res.setHeader("connection", resp.headers["connection"]);
        if (resp.headers["cache-control"])
          res.setHeader("cache-control", resp.headers["cache-control"]);
        stream.pipe(res.status(resp.statusCode));
      })
      .on("error", (err) => {
        res.status(500).send(err.toString());
      });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/s", async (req, res) => {
  let query = req.query.q;
  let page = Number(req.query.p || 1);
  if (!query) return res.redirect("/");
  try {
    res.send(await ytsr(query,{limit,pages:page}));
  } catch (error) {
    res.status(500).send(error.toString())
  }
});

app.get("/w/:id", async (req, res) => {
  if (!req.params.id) return res.redirect("/");
  try {
    let info = await ytdl.getInfo(req.params.id);
    if (
      !info.formats.filter((format) => format.hasVideo && format.hasAudio)
        .length
    ) {}

    res.send(info);
  } catch (error) {
    res.status(500).send(error.toString())
  }
});

app.get("/i*", (req, res) => {
  let stream = miniget(`https://i.ytimg.com/${req.url.slice(3)}`)
  stream.on("error", (err) => {
    res.status(500).send({"code":err.toString()});
  });
  stream.pipe(res);
});

app.get("/ytc/*", (req, res) => {

  let stream = miniget(`https://yt3.ggpht.com/${req.url.slice(5)}`);
  stream.on("error", (err) => {
    res.status(500).send(err.toString());
  });
  stream.pipe(res);
  
});

app.get("/yt3/*", (req,res)=>{
  let stream = miniget(`https://yt3.googleusercontent.com/${req.url.slice(5)}`);
  stream.on("error", (err) => {
    res.status(500).send(err.toString());
  });
  stream.pipe(res);
});


app.listen(3000);