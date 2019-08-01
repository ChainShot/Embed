const express = require('express');
const app = express();

app.use(express.json({limit: '1mb'}));
app.use(cors({}));

const server = http.createServer(app);

app.use('/', express.static(path.join(__dirname, '../client/build')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

server.listen(PORT, () => console.log(`Server @ ${PORT}`))
