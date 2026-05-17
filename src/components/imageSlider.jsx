import { useState } from "react";

export default function ImageSlider(props) {

    const images = props.images

    const [activeImage, setActiveImage] = useState(images[0]);

    return (
        <div className="w-full h-full flex items-center justify-center">
            
            <div className="w-[70%] aspect-square bg-green-900 relative">

                <img src={activeImage} className="w-full h-full object-cover" />

                <div className="w-full h-[100px] absolute bottom-0 left-0 flex justify-center items-center backdrop-blur-3xl">
                    {
                        images.map(
                            (image, index) => {
                                return (
                                    <img key={index} src={image} className="h-full aspect-square mx-[5px] cursor-pointer" onClick={
                                        ()=>{
                                            setActiveImage(image)
                                        }
                                    }/>
                                )
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )
}