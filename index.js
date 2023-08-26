const express = require("express");
const multer = require('multer')
const app = express();
const PORT = 8060;
const fs = require("fs");
const cors = require("cors");
app.use(express.json());
app.use(cors());
const uuid = require('uuid')

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'images');
    },
    filename: (_, file, cb) => {
        cb(null, file = uuid.v4() + `.${file.mimetype.slice(6)}`);
    }
})

const upload = multer({ storage })

app.use('/images', express.static('images'))
app.get('/case/:id', async (req, res) => {
    try {
        const id = req.params.id
        fs.readFile(`./data${id}.json`, 'utf8', (err, data) => {
            if (err) console.log(err)
            res.status(200).json(JSON.parse(data))
        })

    } catch (err) {
        res.status(500).json(err)
    }
})




app.listen(PORT, () => {
    console.log(`server started on PORT: ${PORT}`);
});
