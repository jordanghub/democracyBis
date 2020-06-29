import io from 'socket.io-client';
import { WEBSOCKET_GATEWAY } from 'appConstant/apiEndpoint';

let socket: SocketIOClient.Socket | null = null;
if (typeof window !== 'undefined') {
  socket = io.connect(WEBSOCKET_GATEWAY);
}

export default socket;
