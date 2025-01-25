import { useRef, useState } from "react"
import { random } from "../utils/random"
import ChatIcon from "../icons/ChatIcon";
import { useNavigate } from "react-router-dom";
import CopyIcon from "../icons/CopyIcon";


export default function Home() {

    const [code, setCode] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    function generateCode() {
        setCode(() => random())
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-5 border border-gray-500 h-1/2 w-2/5 rounded-xl">
                <div className="flex gap-2 items-center p-4 text-white">
                    <ChatIcon />
                    <h2 className="text-2xl font-bold tracking-wide">
                        REAL-TIME CHAT
                    </h2>
                </div>
                <div className="flex gap-5">
                    <input
                        ref={inputRef}
                        className="p-4 bg-transparent border border-gray-500"
                        type="text" placeholder="Enter Room Code" />
                    <button
                        onClick={() => navigate(`/chat/${inputRef.current?.value}`)}
                        className="bg-white text-black py-4 px-6 border hover:bg-black hover:text-white hover:border-white"
                    >
                        Join
                    </button>
                </div>
                <div className="flex flex-col gap-5">
                    <button
                        onClick={generateCode}
                        className="bg-white text-black py-4 px-6 border hover:bg-black hover:text-white hover:border-white">
                        Create Room Code
                    </button>
                    {code &&
                        <div className="flex gap-3 bg-gray-800/50 px-4 py-8 text-white justify-center text-xl">
                            {code}
                            <span
                                onClick={() => navigator.clipboard.writeText(code)}
                                className="text-gray-400/50 hover:text-gray-400">
                                <CopyIcon />
                            </span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
