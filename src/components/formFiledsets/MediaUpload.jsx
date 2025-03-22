import React, { useState, useRef, useCallback } from 'react'
import { Trash2 } from 'lucide-react'

export default function MediaUploadComponent() {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileUpload = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles)
    }
  }, [])

  const handleFileChange = (e) => {
    e.preventDefault()
    const selectedFiles = Array.from(e.target.files)
    if (selectedFiles.length > 0) {
      handleFileUpload(selectedFiles)
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    fileInputRef.current.click()
  }

  const handleRemoveFile = (e, index) => {
    e.preventDefault()
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col align-center bg-white justify-center p-4 w-full md:p-8 mt-2">
      <h2 className="text-[2rem] text-black font-[400] mb-6">Upload Media :</h2>

      <div className="flex border-2 border-black justify-center p-2 rounded-[24px] w-full md:p-8 my-2">
        <div
          className={`drop-zone ${
            isDragging ? 'dragging' : ''
          } bg-[#DAE9CC] w-full`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: `6px dashed ${isDragging ? '#2196F3' : '#A4ADBE'}`,
            padding: '2rem',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: isDragging ? '#f0f8ff' : '#CFDAF0',
            transition: 'all 0.3s ease',
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e)}
            style={{ display: 'none' }}
            accept="image/*,video/*"
            multiple
          />

          {files.length > 0 ? (
            <div>
              <p className="text-[20px] text-black mb-4">Uploaded Files</p>
              <ul className="mt-2">
                {files.map((file, index) => (
                  <>
                    <li
                      key={index}
                      className="flex bg-gray-200 justify-between p-2 rounded-lg shadow-md items-center mb-2"
                    >
                      <div className="flex justify-start items-center">
                        <p className="text-[#102728] mr-4">{file.name}</p>
                        <span>|</span>
                        <p className="text-gray-600 text-sm capitalize mx-4">
                          {file.type.split('/')[0]}
                        </p>
                        <span>|</span>
                        <p className="text-gray-600 text-sm ml-4">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <button
                        className="text-red-600 hover:cursor-pointer hover:text-red-800 transition"
                        onClick={(e) => handleRemoveFile(e, index)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  </>
                ))}
              </ul>
              <button
                onClick={(e) => handleClick(e)}
                className="text-blue-600 cursor-pointer mt-4 underline"
              >
                Add More
              </button>
            </div>
          ) : (
            <div onClick={(e) => handleClick(e)}>
              <h3 className="text-[20px] text-white font-bold mb-2">
                Upload Images / Videos
              </h3>
              <p className="text-[#A4ADBE] text-[16px]"> DRAG AND DROP </p>
              <p className="text-[#A4ADBE] text-[14px] my-2">or</p>
              <p className="text-[#A4ADBE] text-[16px]">UPLOAD FROM COMPUTER</p>
              <p className="text-[#A4ADBE] text-[14px]">(images/videos)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
