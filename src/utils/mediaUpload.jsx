import { createClient } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";


const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

export default function MediaUpload(file) {
    const promise = new Promise(
        (resolve, reject)=>{
            if (file == null) {
                reject("No file uploaded");
            }
            const timeStamp = new Date().getTime();
            const newFileName = timeStamp + file.name;

            supabase.storage.from("images").upload(newFileName, file, {
                cacheControl: "3600",
                upsert: false
            }).then(
                ()=>{
                    toast.success("File uploaded successfully");

                    const url = supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl;
                    // console.log(url);
                    resolve(url);
                }
            ).catch(
                (error)=>{
                    console.log(error);
                    reject("File upload failed");
                }
            );
        }
    )

    return promise;
}