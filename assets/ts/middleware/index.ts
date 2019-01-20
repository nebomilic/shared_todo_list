import Store from 'redux-zero/interfaces/Store';
import { Channel } from 'phoenix';
import { bindActions } from 'redux-zero/utils';
import actions from '../actions';
import store from '../store';

const REPLY_OK: string = 'ok';
const REPLY_ERROR: string = 'error';
const REPLY_TIMEOUT: string = 'timeout';

const callAction = (): any => bindActions(actions, store);

export const createSocketMiddleware = (channel: Channel) => {
    //TODO: Make this waaaay more generic
    channel.on('added_todo', (msg: any) => {
        return callAction().todoWasAdded(msg);
    });
    channel.on('deleted_todo', (msg: any) => {
        return callAction().todoWasDeleted(msg);
    });
    channel.on('checked_todo', (msg: any) => {
        return callAction().todoWasChecked(msg);
    });
    channel.on('unchecked_todo', (msg: any) => {
        return callAction().todoWasUnchecked(msg);
    });
    return (_store: Store) => (next: any, args: any) => (action: any) => {
        // TODO: find better way to recognize socket actions
        if (action.name.includes('_')) {
            const actionReturn: SocketAction = action.apply(null, args);
            channel
                .push(actionReturn.messageName, actionReturn.payload, 10000)
                .receive(REPLY_OK, msg =>
                    actionReturn.nextActionName
                        ? callAction()[actionReturn.nextActionName](msg)
                        : console.log('created message', msg)
                )
                .receive(REPLY_ERROR, reasons =>
                    console.log('create failed', reasons)
                )
                .receive(REPLY_TIMEOUT, () =>
                    console.log('Networking issue for action', action.name)
                );
        } else {
            return next(action);
        }
    };
};

export interface SocketAction {
    payload: Object;
    messageName: string;
    nextActionName?: string;
}
