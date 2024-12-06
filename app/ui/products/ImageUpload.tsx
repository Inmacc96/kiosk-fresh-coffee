"use client";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

type ImageUploadProps = {
  image?: string;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ image }) => {
  const [imageUrl, setImageUrl] = useState(image ?? "");

  return (
    <CldUploadWidget
      uploadPreset="jddsmc9s"
      options={{ maxFiles: 1 }}
      onSuccess={(result, widget) => {
        if (result.event === "success") {
          widget.close();
          setImageUrl((result.info as CloudinaryUploadWidgetInfo).secure_url);
        }
      }}
    >
      {({ open }) => (
        <>
          <div className="space-y-2">
            <label className="text-slate-800">Imagen Producto</label>
            <div
              className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
              onClick={() => open()}
            >
              <TbPhotoPlus size={50} />
              <p className="text-lg font-semibold">Agregar Imagen</p>
              {imageUrl && (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    fill
                    style={{ objectFit: "contain" }}
                    src={imageUrl}
                    alt="Imagen del producto"
                  />
                </div>
              )}
            </div>
          </div>

          <input type="hidden" name="image" defaultValue={imageUrl} />
        </>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
