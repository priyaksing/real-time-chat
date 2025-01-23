import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 })

interface Users {
    socket: WebSocket;
    roomId: string;
}

// todo: implement using maps
let allSockets: Users[] = []


wss.on("connection", (socket) => {

    /**
     * msg : "{ type: join|chat,
     *          payload: {
     *                  roomId: "1234" |
     *                  username: "priya"
     *                  message: "hi there" 
     *                  }
     *          }"
     */
    socket.on("message", (msg) => {
        const parsedMsg = JSON.parse(msg as unknown as string);

        if (parsedMsg.type === 'join') {
            allSockets.push({
                socket,
                roomId: parsedMsg.payload.roomId
            })
        }

        if (parsedMsg.type === 'chat') {
            //@ts-ignore
            const roomId = allSockets.find((s) => s.socket == socket).roomId;
            // const roomId = allSockets[index].roomId;

            allSockets.filter((s) => s.roomId === roomId).forEach((s) => {
                s.socket.send(parsedMsg.payload.message)
            })
        }
    })
})