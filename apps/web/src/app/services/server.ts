import { log, WsMessage } from '@odedw/shared';

class Server {
  private socket: WebSocket;

  constructor() {}

  public init(): Promise<void> {
    return this.connect();
  }

  private connect(): Promise<void> {
    this.socket = new WebSocket('ws://127.0.0.1:2424');
    return new Promise((resolve, reject) => {
      this.socket.onopen = (event) => {
        log.info('Connected to server');
        resolve();
      };
      this.socket.onerror = (event) => {
        log.error(event);
      };

      this.socket.onmessage = (ev) => {
        log.info('Recieved server message: ', ev.data);
      };
    });
  }

  public send(message: WsMessage) {
    this.socket.send(JSON.stringify(message));
  }
}

export const server = new Server();
