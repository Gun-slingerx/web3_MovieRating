const GATEWAY = "aqua-peaceful-lamprey-51.mypinata.cloud";
const CID = "Qmf1rtki74jvYmGeqaaV51hzeiaa6DyWc98fzDiuPatzyy";

async function fetchFileFromIPFS() {
    const url = `https://${GATEWAY}/ipfs/${CID}`;
    try {
        const request = await fetch(url);
        const response = await request.text();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

async function downloadFile() {
    const url = `https://${GATEWAY}/ipfs/${CID}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // 设置下载文件的名称
        a.download = 'downloaded-file.pdf'; // 替换为你期望的文件名

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

// await fetchFileFromIPFS();
// Hello World!
