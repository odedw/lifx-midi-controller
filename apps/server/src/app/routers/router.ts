import { SmartLightMessage, WsMessage } from '@odedw/shared';
import { smartLightRouter, SmartLightRouter } from './smartLightRouter';

export class Router {
  public async init() {
    await smartLightRouter.init();
  }

  public route(msg: WsMessage) {
    if (msg.target === SmartLightMessage.target) {
      smartLightRouter.route(msg as SmartLightMessage);
    }
  }
}

export const router = new Router();
