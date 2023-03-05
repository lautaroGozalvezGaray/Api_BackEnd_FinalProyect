const {Router} = require("express");
const {fork} = require("child_process");

const router = Router();

router.get('/', (_req, res) => {
    const processInfo = {
        args: process.argv,
        platform: process.platform,
        version: process.version,
        title: process.title,
        execPath: process.execPath,
        processId: process.pid,
        rss: process.memoryUsage().rss,
    };
    
    res.status(200).json(processInfo);
})

module.exports=router;