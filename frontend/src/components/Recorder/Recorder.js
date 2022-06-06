import { useState } from 'react'
import { RecordRTCPromisesHandler } from 'recordrtc'
import Button from '../Button/Button'

const Recorder = () => {
    //nav
    const [startPage, setStartPage] = useState(true)
    const [pausePage, setPausePage] = useState(true)
    const [endPage, setEndPage] = useState(true)
    //letiables
    const [recorder, setRecorder] = useState()
    const [blob, setBlob] = useState()
    const [stream, setStream] = useState()

    const startRecording = async () => {
        const mediaDevices = navigator.mediaDevices
        const stream = await mediaDevices.getDisplayMedia({ video: true, audio: true })
        const recorder = new RecordRTCPromisesHandler(stream, { 
        type: 'video',
        mimeType: 'video/webm',
        bitsPerSecond: 512 * 8 * 1024
        })
        try {
            await recorder.startRecording()
            setRecorder(recorder)
            setBlob(null)
            console.log('ok')
        } catch (error) {
            console.log(error)
            console.log('not ok')
            setStartPage(true)
        }
    }

    const pauseRecording = async () => {
        recorder.pauseRecording()
    }

    const resumeRecording = async () => {
        recorder.resumeRecording()
    }

    const stopRecording = async () => {
        if (recorder) {
        await recorder.stopRecording()
        const blob = await recorder.getBlob()

        const bloblUrl = URL.createObjectURL(blob)
        setStream(bloblUrl)

        setBlob(blob)
        setRecorder()
        }
    }

    const downloadVideo = () => {
        if (blob) {
        let fd = new FormData()
        fd.append('blob', blob, 'blob.webm')

        fetch('/storage/blob/create',
            {
                method: 'post',
                body: fd
            })
            .then(function(response) {
            console.log('done')
            return response
            })
            .catch(function(err){ 
            console.log(err)
            })
        }
    }

    const reset = () => {
        setStartPage(true)
        setPausePage(true)
        setEndPage(true)
        setStream()
        setBlob()
        setRecorder()
    }

    return (
        <div className='dFlexCol pageContainer'>
            <h1 className='heading'>Rec0rder</h1>
            {startPage ? 
            <div onClick={() => setStartPage(!startPage)}>
                <Button text="Start Recording" func={startRecording}/>
            </div>
            :
            endPage ?
            <div>
                <div onClick={() => setPausePage(!pausePage)}>
                    {pausePage ? <Button text="Pause" func={pauseRecording}/> : <Button text="Resume" func={resumeRecording}/>}
                </div>
                <div onClick={() => setEndPage(!endPage)}>
                    <Button text="End" func={stopRecording}/>
                </div>
            </div>
            :
            <div className='dFlexCol pageContainer'>
                <video className='videoPLayer' src={stream} autoPlay controls></video>
                <a className='noUnderline' href='https://airtable.com/app8reXfkJsjntaEV/tbljOZyysU5MpmhCu/viwzfTbtKFtDRtdiJ?blocks=hide' target="_blank" rel="noreferrer">
                    <Button text="Upload" func={downloadVideo}/>
                </a>
                <Button text="Record another video" func={reset}/>
            </div>
            }
        </div>
    )
}

export default Recorder