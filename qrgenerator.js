const QRCode = require('qrcode');
const Excel = require('xlsx');

const ws = Excel.readFile("Sampledata.xlsx").Sheets["Sheet1"];
var data = Excel.utils.sheet_to_json(ws);

var qrdata ;
qrdata = data;

module.exports =  qrdata ;
const myFunc = async () => {
    return new Promise((res, rej) => {
        data.map(ele => {
            QRCode.toFile(
                ele.Description + ".png",
                JSON.stringify(ele.Itemnumber),
                () => {
                    res(true);
                }
            )
        })

    });
}


(async () => {
    await myFunc()
})()


