const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3NjY4NTdkZi00Mzg4LTQxN2EtOWMwYS1iYzJiM2EyM2I5MzQiLCJlbWFpbCI6IjE1MjY3Njk5MjU3QDE2My5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNDY5MjE1NjM4OGZhYWJhNDY1MDEiLCJzY29wZWRLZXlTZWNyZXQiOiI0OTQxYTA5OWFiY2EzZDUxNjAxZTUzZDFhMTdkYjZkODYyNDNmZjk3Y2ZlOTE4ZjdjMWYxZmRlM2JjODBiNWJiIiwiZXhwIjoxNzY2NDg3NjIyfQ.3Pz0BbapfNM42TVgmcNtmMxYG0mxHhg6NTWM3sXqlrc";

async function pinFileToIPFS() {
  try {
    const text = "Hello World!";
    const blob = new Blob([text], { type: "text/plain" });
    const file = new File([blob], "hello-world.txt");
    const data = new FormData();
    data.append("file", file);

    const request = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: data,
      }
    );
    const response = await request.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}


async function uploadPicture() {
  try {
    console.log("开始上传文件");
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    if (files.length == 0) {
      alert("请选择一个文件");
      return;
    }
    const file = files[0];
    const fileName = file.name;
    console.log("文件名:", fileName);

    const data = new FormData();
    data.append("file", file);

    const request = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
        body: data,
      }
    );
    const response = await request.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }


}

// await pinFileToIPFS();
