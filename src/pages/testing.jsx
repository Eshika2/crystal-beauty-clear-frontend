import { useState } from "react";
import toast from "react-hot-toast";
import MediaUpload from "../utils/mediaUpload";


export default function Testing() {
    const [file, setFile] = useState(null);

    function handleUpload() {
        MediaUpload(file).then(
            (url)=>{
                console.log(url);
                toast.success("File uploaded successfully");
            }
        ).catch(
            (error)=>{
                console.log(error);
                toast.error("File upload failed");
            }
        );
    }

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-linear-to-r from-white to-purple-500">
            <input type="file" onChange={
                (e)=>{
                    // console.log(e.target.files[0]);
                    setFile(e.target.files[0]);
                }
            } />
            <button 
                className="bg-pink-500 text-white px-4 py-2 rounded-lg mt-4"
                onClick={handleUpload}
            >
                Upload
            </button>
        </div>
    );
}