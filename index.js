// const fs = require('fs');
// const path = require('path');
//
// const sortFolder = (read, gender, write) => {
//   fs.readdir(path.join(__dirname, read), (err, files) => {
//     if (err) return console.log(err);
//
//     files.forEach((file) => {
//       const redFolderPath = path.join(__dirname, read, file)
//       fs.readFile(redFolderPath, (err, data) => {
//         if (err) return console.log(err);
//
//         const user = JSON.parse(data.toString());
//
//         if(user.gender === gender) {
//           fs.rename(redFolderPath, path.join(__dirname, write, file), (err) => {
//             if (err) return console.log(err);
//           });
//         }
//       });
//     });
//   });
// }
//
// sortFolder('girls', 'male', 'boys');
// sortFolder('boys', 'female', 'girls');

const fs = require('fs/promises');
const path = require('path');

const sortFolder = async (read, gender, write) => {
  try {
    const files = await fs.readdir(path.join(__dirname, read));

    for (const file of files) {
      const redFolderPath = path.join(__dirname, read, file);
      const data = await fs.readFile(redFolderPath);
      const user = JSON.parse(data.toString());

      if (user.gender === gender) {
        await fs.rename(redFolderPath, path.join(__dirname, write, file));
      }
    }
  }catch (e) {
    console.error(e);
  }
}

sortFolder('girls', 'male', 'boys');
sortFolder('boys', 'female', 'girls');
