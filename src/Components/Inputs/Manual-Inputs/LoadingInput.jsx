import React from 'react'

export default function LoadingInput() {

    return <React.Fragment>

        <div className="flex flex-row gap-1">

            <div className="w-1.5 h-1.5 rounded-full bg-[var(--blue-color)] animate-bounce"></div>

            <div className="w-1.5 h-1.5 rounded-full bg-[var(--blue-color)] animate-bounce [animation-delay:-.3s]"></div>

            <div className="w-1.5 h-1.5 rounded-full bg-[var(--blue-color)] animate-bounce [animation-delay:-.5s]"></div>

        </div>

    </React.Fragment>

}
