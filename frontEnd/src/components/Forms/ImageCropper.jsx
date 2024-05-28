// ImageCropper.jsx
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { getCroppedImg } from "./CropeImage";

const ImageCropper = ({ onImageCropped }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            onImageCropped(croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [imageSrc, croppedAreaPixels, onImageCropped]);

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageDataUrl = await readFile(file);
            setImageSrc(imageDataUrl);
        }
    };

    const readFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => resolve(reader.result), false);
            reader.readAsDataURL(file);
        });
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={onFileChange} />
            {imageSrc && (
                <div>
                    <div className="crop-container">
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={4 / 3}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                    <Button onClick={showCroppedImage}>Recortar Imagen</Button>
                </div>
            )}
        </div>
    );
};

export default ImageCropper;
