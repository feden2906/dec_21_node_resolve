const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const uuid = require('uuid').v4;

const { configs } = require('../configs');

const BucketConfig = new S3({
  region: configs.AWS_S3_REGION,
  secretAccessKey: configs.AWS_S3_SECRET_KEY,
  accessKeyId: configs.AWS_S3_ACCESS_KEY,
});

const uploadFile = async (file, itemType, itemId) => {
  const Key = _buildFilePath(file.name, itemType, itemId);

  return BucketConfig
      .upload({
        Bucket: configs.AWS_S3_BUCKET,
        Key,
        ACL: "public-read",
        Body: file.data
      })
      .promise();
}

module.exports = {
  uploadFile,
}

function _buildFilePath(fileName = '', itemType, itemId) {
  const ext = path.extname(fileName); // .jpg

  return `${itemType}/${itemId}/${uuid()}${ext}`;
}
