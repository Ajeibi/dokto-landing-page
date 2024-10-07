"use client";

import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";
import { cn } from "@/lib/utils";
import { FileUp, X } from "lucide-react";
import Muted from "@/components/ui/typography/muted";
import Paragraph from "@/components/ui/typography/paragraph";
import Heading4 from "@/components/ui/typography/heading4";
import { Icons } from "./icons";


/* 
select file or files
proocess and edit files
upload files 
return link / links to uploaded files (images)
return data src url for preview usage


*/

interface Props {
  onFileUpload: (file: File[]) => void;
  //Optional props to add later and display progress bar when uploading
  // isLoading?: boolean;
  // percentage?: number;
  className?: string;
  setCurrentImage: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>

}

const FileUpload: React.FC<Props> = ({ onFileUpload, setCurrentImage, className}) => {
  const [files, setFiles] = React.useState<File[] | null>(null);

  

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      const reader = new FileReader()
      reader.onload = () => {
            const binaryStr = reader.result

            // console.log(binaryStr);
            setCurrentImage(binaryStr)
            
      }
      // reader.readAsArrayBuffer(acceptedFiles[0])
      reader.readAsDataURL(acceptedFiles[0])

      setFiles(acceptedFiles as File[]);
      onFileUpload(acceptedFiles as File[]);
    },
    [onFileUpload, setCurrentImage],
  );

  const onDelete = () => {
    setFiles(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={cn("shadow-file-shadow p-10 rounded-[12px] w-full lg:min-w-[350px] min-h-[112px] bg-secondary10 border border-secondary20 flex flex-col gap-4 items-center justify-center cursor-pointer", className)}>
      {/* {files ? (
        <UploadedFile files={files} onDelete={onDelete} />
      ) : ( */}
        <div
          {...getRootProps()}
          className="flex flex-col gap-4 items-center justify-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <Icons.upload />

          {isDragActive ? (
            <p className="">Drop the file here ...</p>
          ) : (
            <div className="flex flex-col justify-center items-center gap-1">
              <Heading4 className="font-normal text-secondary">
              Click to upload
                <span className="text-tertiary50 font-light">{""} or drag and drop</span>
              </Heading4>
              <Muted className="text-tertiary50 text-xs">
              SVG, PNG, JPG or GIF (max. 800x400px)
              </Muted>
            </div>
          )}
        </div>
       {/* )} */}
    </div>
  );
};

export default FileUpload;

interface UploadedFileProps {
  files:  File[] | null;
  onDelete?: () => void;
  view?: boolean;
  viewAction?: () => void;
}

// visualizer
export const UploadedFile = ({ files, onDelete, view, viewAction }: UploadedFileProps) => {
  if(view && !viewAction) throw new Error("View action is required");

  return (
    <div className="flex items-center gap-3 w-full border border-[#E8E8E8] rounded-[8px] py-3 pl-2 pr-4 bg-white">
      <FileUp />
      <Paragraph className="flex-1 text-sm font-medium">{files && files[0]?.name}</Paragraph>
      {
        view ? (
          <Paragraph className="text-sm font-medium" role="button" onClick={viewAction}>
          View
          </Paragraph>
        ) :   <X onClick={onDelete}/>

      }

    </div>
  );
};
