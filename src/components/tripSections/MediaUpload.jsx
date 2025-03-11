import React, { useState } from 'react'

export default function MediaUploadComponent() {
  const [files, setFiles] = useState([])

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles([...files, ...droppedFiles])
  }

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles([...files, ...selectedFiles])
  }

  const preventDefaults = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className=" bg-white md:w-[80%] my-10    ">
      <h2 className="text-xl font-bold mb-4">Media Upload :</h2>
      <div className="border p-6 md:p-20 w-full rounded-2xl">
        <div
          className="border-2 border-dashed border-gray-400 bg-blue-100 rounded-lg p-8 flex flex-col items-center justify-center w-full max-w-md mx-auto"
          onDrop={handleDrop}
          onDragOver={preventDefaults}
          onDragEnter={preventDefaults}
          onDragLeave={preventDefaults}
        >
          <p className="text-white text-lg">Upload Images / Videos</p>
          <p className="text-gray-500 text-sm mt-2">DRAG AND DROP</p>
          <p className="text-gray-500 text-sm">(images / videos)</p>
          <p className="text-gray-500 text-sm mt-4">UPLOAD FROM COMPUTER</p>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            id="file-upload"
            onChange={handleFileSelect}
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-gray-500 text-sm underline mt-2"
          >
            (images / videos)
          </label>
        </div>
        {files.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Uploaded Files:</h3>
            <ul>
              {files.map((file, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
