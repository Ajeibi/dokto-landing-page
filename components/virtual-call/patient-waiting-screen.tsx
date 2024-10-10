import React from 'react'
import Call from './video-call-screen';

interface PatientWaitingScreenProps {
    token: string | null;
    channelName: string | null;
}

const PatientWaitingScreen: React.FC<PatientWaitingScreenProps> = ({ channelName, token }) => {
    return (
        <div>
            <Call appId={process.env.NEXT_PUBLIC_AGORA_APP_ID!} channelName={channelName!} />
        </div>
    )
}

export default PatientWaitingScreen
