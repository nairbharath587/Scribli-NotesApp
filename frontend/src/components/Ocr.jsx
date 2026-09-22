import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import {createWorker} from 'tesseract.js'

const Ocr = () => {

    const [file, setFile] =useState();
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState("");   

    const onFileChange = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    };
    const processImage = () => {
        (async () => {
            const worker = await createWorker('eng', 1, {logger: (m) =>{
                if (m.status === "recognizing text"){
                    setProgress(m.progress);
                }

            }
        });
            const ret = await worker.recognize(file );
            const extractedText = ret.data.text.slice(0,300);
            setResult(extractedText);//try catch        
            await worker.terminate();
        })();

    };
    const navigate = useNavigate();

    const saveToNotes = () => {
        navigate("/create",{
            state: {content: result}
        });
    };

  return (
    <div className="relative w-full max-w-2xl min-h-[500px] rounded-2xl bg-base-100 p-6">
    {result == "" && (<div  className="flex flex-col gap-6" >
                        <input type = "file" className='' onChange={onFileChange}/>
                        <div><button type='button' onClick={processImage} className='btn btn-ghost'>
                                 Submit
                            </button>
                        </div>
                        <div className="flex flex-col items-center gap-2 pt-4">
                            <progress value={progress} max = {1}/>
                        </div>
                    </div>)}
    {result !== "" && (
        <>
            <div className="   mt-8 w-full min-h-[250px] rounded-xl
                                border border-base-content/20 p-6">
                    <p className='text-base-content/70 line-clamp-3'>
                    Result: {result}
                    </p>
            </div>
            <div className='flex flex-col items-center gap-2 pt-4'>
                <button type='button' className="btn absolute bottom-6 left-1/2 -translate-x-1/2" 
                onClick = {saveToNotes}>
                    Save to Notes
                </button>
            </div>
        </>
        )}
    </div>
  )
}

export default Ocr