"use client";

import {useEffect, useRef, useState} from 'react';
import {cn, getSubjectColor} from "@/lib/utils";
import {vapi} from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

const CompanionComponent = ({ companionId, userName, userImage, subject, name, topic, style, voice}: CompanionComponentProps) => {

    const [ callStatus, setCallStatus ] = useState<CallStatus>(CallStatus.INACTIVE)
    const [ isSpeaking, setIsSpeaking ] = useState<boolean>(false)
    const [ isMuted , setIsMuted ] = useState<boolean>(false);

    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if(lottieRef) {
            if(isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    },[isSpeaking, lottieRef])

    useEffect(() => {
       const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

       const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

       const onMessage = () => {}

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.log(error, "Error")

        vapi.on("call-start", onCallStart)
        vapi.on("call-end", onCallEnd)
        vapi.on("message", onMessage)
        vapi.on("speech-start", onSpeechStart)
        vapi.on("speech-end", onSpeechEnd)
        vapi.on("error", onError)

        return () => {
            vapi.off("call-start", onCallStart)
            vapi.off("call-end", onCallEnd)
            vapi.off("message", onMessage)
            vapi.off("speech-start", onSpeechStart)
            vapi.off("speech-end", onSpeechEnd)
            vapi.off("error", onError)
        }



    },[])

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted);
    }

    const handleDisconnect = () => {}
    const handleCall = () => {}

    return (
        <section className="flex flex-col h-[70vh]">
            <section className="flex gap-8 max-sm:flex-col">
                <div className="companion-section">
                    <div className="companion-avatar" style={{ backgroundColor: getSubjectColor(subject)}}>
                        <div className={
                            cn("absolute transition-opacity duration-1000",
                            callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? "opacity-100" : "opacity-0",
                                callStatus === CallStatus.CONNECTING && "opacity-100 animate-pulse"
                            )}>
                            <Image
                            src={`/icons/${subject}.svg`}
                            alt={subject}
                            width={150}
                            height={150}
                            className="max-sm:w-fit"
                            />
                        </div>

                        <div className={cn("absolute transition-opacity duration-1000",
                            callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0",
                            )}>
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoPlay={false}
                                className="companion-lottie"
                            />
                        </div>
                    </div>
                    <p className="text-2xl font-bold">{name}</p>
                </div>

                <div className="user-section">
                    <div className="user-avatar">
                        <Image
                        src={userImage}
                        alt={userName}
                        width={130}
                        height={130}
                        className='rounded-lg'
                        />
                        <p className="text-2xl font-bold">{userName}</p>
                    </div>
                    <button className="btn-mic" onClick={toggleMicrophone}>
                        <Image
                        src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
                        alt="mic"
                        width={36}
                        height={36}
                        />
                        <p className="max-sm:hidden">
                            {isMuted ? "Turn on microphone" : "Turn off microphone"}
                        </p>
                    </button>
                    <button className={cn("rounded-lg py-2 w-full transition-colors cursor-pointer text-white",
                        callStatus === CallStatus.ACTIVE ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90",
                        callStatus === CallStatus.CONNECTING && "cursor-not-allowed animate-pulse"
                        )} onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}>
                        {callStatus === CallStatus.ACTIVE ? "End Call" : callStatus == CallStatus.CONNECTING ? "Connecting..." : "Start Call"}
                    </button>
                </div>
            </section>

        {/* Transcript*/}
            <section className="transcript">
                <div className="transcript-message no-scrollbar">
                    Transcripted messages will appear here as the conversation progresses.
                </div>
                <div className="transcript-fade" />
            </section>
        </section>
    )
}
export default CompanionComponent
