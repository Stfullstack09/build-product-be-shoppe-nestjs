"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = exports.uploadImageNotVerify = exports.uploadImage = exports.editFileName = exports.imageFileFilterNotCheck = exports.imageFileFilter = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const path_1 = require("path");
const fs = require("fs");
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
        return callback(new common_1.BadRequestException(), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const imageFileFilterNotCheck = (req, file, callback) => {
    if (!file || !file.originalname) {
        callback(null, false);
        return;
    }
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/)) {
        return callback(new common_1.BadRequestException(), false);
    }
    callback(null, true);
};
exports.imageFileFilterNotCheck = imageFileFilterNotCheck;
const editFileName = (req, file, callback) => {
    if (!file || !file.originalname) {
        return;
    }
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
exports.editFileName = editFileName;
const uploadImage = (destination) => ({
    storage: (0, multer_1.diskStorage)({
        destination: destination,
        filename: exports.editFileName,
    }),
    fileFilter: exports.imageFileFilter,
});
exports.uploadImage = uploadImage;
const uploadImageNotVerify = (destination) => ({
    storage: (0, multer_1.diskStorage)({
        destination: destination,
        filename: exports.editFileName,
    }),
    fileFilter: exports.imageFileFilterNotCheck,
});
exports.uploadImageNotVerify = uploadImageNotVerify;
const removeFile = (fullFilePath) => {
    try {
        fs.unlinkSync(fullFilePath);
    }
    catch (err) {
        console.error(err);
    }
};
exports.removeFile = removeFile;
//# sourceMappingURL=file-upload.utils.js.map