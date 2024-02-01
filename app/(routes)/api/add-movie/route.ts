import conn from "@/lib/db";
import { insertMovieQuery } from "@/lib/queries";

// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: "dnmtl9by2",
//   api_key: "727818594591289",
//   api_secret: "fbPVvoZDyCqgSkM0JxrkSYqcsSQ",
// });

export async function POST(request: Request) {
  const body = await request.formData();
  // const file = body.get("dropzone-file") as File;
  const image = body.get("image") as File;
  const description = body.get("description");
  const title = body.get("title");
  const releaseYear = body.get("releaseYear");
  console.log("add movie request body", image);

  // const bytearray = base64ToArrayBuffer(image as string);

  try {
    // console.log("base64", file);
    // const base64 = await getBase64(file)
    //   .then((data) => {
    //     console.log("fasdfasd", data);
    //   })
    //   .catch((e) => console.log("E  ", e));
    // console.log("base64", base64);
    // const result = await uploadImage(base64);
    // console.log("upload image result", result);

    const result = await conn!.query(insertMovieQuery, [
      title,
      description,
      Buffer.from(await image.arrayBuffer()),
      releaseYear,
    ]);

    return new Response(
      JSON.stringify({ message: "Successfully added movie" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: `Failed to add movie; Error:${error}` }),
      {
        status: 500,
      }
    );
  }
}

// async function uploadImage(file: string) {
//   console.log("upload image request body", file);
//   const result = await cloudinary.uploader.upload(
//     file,
//     { public_id: "olympic_flag" },
//     function (error, result) {
//       console.log(result);
//     }
//   );
//   return result;
// }

// const getBase64 = async (file: File) => {
//   const reader = file.stream().getReader();
//   const imageDataU8: number[] = [];
//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) {
//       break;
//     }
//     for (let i = 0; i < value.length; i++) {
//       imageDataU8.push(value[i]);
//     }
//   }
//   console.log("imageDataU8", file, imageDataU8);
//   return Buffer.from(imageDataU8).toString("base64");
// };

function base64ToArrayBuffer(base64: string) {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
