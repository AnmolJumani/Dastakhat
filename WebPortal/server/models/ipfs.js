import { create } from 'ipfs-http-client'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import  fs  from 'fs'

export const ipfsClient =async()=>{
    const  ipfs = await create('/ip4/127.0.0.1/tcp/5001');
    return ipfs;
} 

export const AddFile = async(fileName, content)=>{
    let ipfs = await ipfsClient();
    
    const fileAdded = await ipfs.add({path: fileName, content: content});
    console.log('file Added',fileAdded);
    const fileHash = fileAdded.cid;
    console.log(fileAdded);
    return fileHash;
}


//ascii for pdf, base64 for png, default same as string for docx
export const getfile = async (fileHash, filePath) => {
    let ipfs = await ipfsClient();
    const cntnt = await ipfs.cat(fileHash);
    let mainContent="";
    var s = fs.createWriteStream(filePath);
    for await(const chunk of cntnt){
        // console.info(chunk);
        mainContent=uint8ArrayToString(chunk, 'ascii');   //ascii for pdf, base64 for png, default same as string for docx
        s.write(mainContent, 'ascii');
        }
    s.end();
    // console.log(`The contents of the file was: ${mainContent.toString()}`);
    
    return mainContent;
};

