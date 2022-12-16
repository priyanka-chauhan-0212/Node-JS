// csv-file and xlse-file code 

exports.uploadFile = async (req, res) => {
    console.log("File:", req.file);
    const pathFile = "./uploads/" + req.file.filename;

    const pathExt = path.extname(pathFile);
    console.log("File Extension : ", pathExt);

    if (pathExt === ".csv") {
        try {
            csv()
                .fromFile(req.file.path)
                .then((jsonObj) => {
                    // console.log("Fileeee:", jsonObj);

                    var arrayToInsert = [];
                    for (var i = 0; i < jsonObj.length; i++) {
                        var oneRow = {
                            FirstName: jsonObj[i]["FirstName"],
                            LastName: jsonObj[i]["LastName"],
                            Email: jsonObj[i]["Email"],
                            MobileNo: jsonObj[i]["MobileNo"],
                            Password: jsonObj[i]["Password"],
                        };
                        arrayToInsert.push(oneRow);
                    }

                    const data = CSVFile.insertMany(arrayToInsert, (err, result) => {
                        if (err) {
                            return res.status(200).json({
                                success: 0,
                                error: 1,
                                message: "Error..",
                                UserData: [],
                            });
                        }
                        if (result) {
                            return res.status(200).json({
                                success: 1,
                                error: 0,
                                message: "CSV File Uploaded Successfully..",
                                UserData: result,
                            });
                        }
                    });
                });
        } catch {
            return res.status(400).send("Something went wrong. Try again");
        }
    } else if (pathExt === ".xlsx") {
        try {
            const excelData = await excelToJson({
                sourceFile: pathFile,
                header: {
                    rows: 1,
                },
                columnToKey: {
                    A: "FirstName",
                    B: "LastName",
                    C: "age",
                    D: "Email",
                    E: "MobileNo",
                    F: "Password",
                },
            });
            // console.log("ExcelData:", excelData);

            XLSXFile.insertMany(excelData.Worksheet, (err, data) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        error: 1,
                        message: "Error..",
                        UserData: [],
                    });
                } else {
                    return res.status(200).json({
                        success: 1,
                        error: 0,
                        message: "XLSX File Uploaded Successfully..",
                        UserData: data,
                    });
                }
            });
        } catch {
            return res
                .status(400)
                .json({ message: "Something went wrong. Try again" });
        }
    } else {
        return res
            .status(400)
            .json({ message: pathExt + " File extension not Valid.." });
    }
};
