import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import CopyIcon from '../icons/CopyIcon';

function Chat() {

    const wsRef = useRef<WebSocket>();
    // const inputRef = useRef();
    const [inputText, setInputText] = useState("");
    const { room } = useParams();

    const [messages, setMessages] = useState<String[]>([]);
    const [inputs, setInputs] = useState<String[]>([]);
    const borderStyle = "border border-gray-500 border-opacity-30";

    function sendMessage() {
        setInputs((x) => [...x, inputText])
        wsRef.current?.send(JSON.stringify({
            type: "chat",
            payload: {
                message: inputText
            }
        }))

        setInputText("");
    }

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        wsRef.current = ws;

        ws.onmessage = (event) => {
            console.log(event)
            setMessages(msg => [...msg, event.data])
        }

        ws.onopen = () => {
            ws.send(
                JSON.stringify({
                    "type": "join",
                    "payload": {
                        "roomId": room
                    }
                })
            )
        }

        return () => {
            ws.close();
        }

    }, [])


    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className={'h-[85vh] w-1/2 p-6 gap-4 rounded-lg flex flex-col justify-evenly absolute ' + borderStyle}>
                <div className='bg-gray-600/30 text-gray-400 p-4 rounded-lg flex gap-3'>
                    Room Code: {room}
                    <span
                        onClick={() => navigator.clipboard.writeText(room as unknown as string)}
                        className="text-xs text-gray-400/50 hover:text-gray-400">
                        <CopyIcon />
                    </span>
                </div>
                <div className={'h-[80vh] p-4 gap-2 rounded-lg relative block place-content-end pointer-events-auto overflow-y-scroll scroll-snap-y-container no-scrollbar ' + borderStyle}>
                    {messages.map((message) => (
                        // <div className={''} >
                        <div className={'flex p-2' + `${inputs.includes(message) ? ' justify-end' : ''}`}>
                            <span className={'px-6 py-4 max-w-xl rounded-full border border-white border-opacity-10' + `${inputs.includes(message) ? '' : ' bg-ivory text-black'}`}>
                                {message}
                            </span>
                        </div>
                        // </div>
                    ))}
                </div>

                <div className="gap-4 flex items-center">
                    <input
                        // ref={inputRef}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className={'flex-1 px-4 py-4 bg-transparent rounded-lg ' + borderStyle}
                        type="text"
                        placeholder='Type here...'
                    />
                    <button
                        onClick={sendMessage}
                        className='bg-white text-black py-4 px-6 border rounded-lg hover:bg-black hover:text-white hover:border-white'>
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat
