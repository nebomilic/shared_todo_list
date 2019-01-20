import Store from 'redux-zero/interfaces/Store';
import { Channel } from 'phoenix';
import { bindActions } from 'redux-zero/utils';
import actions from '../actions';
import store from '../store';

const REPLY_OK: string = 'ok';
const REPLY_ERROR: string = 'error';
const REPLY_TIMEOUT: string = 'timeout';

export const createSocketMiddleware = (channel: Channel) => {
    const boundActions = bindActions(actions, store);
    //TODO: Make this waaaay more generic
    channel.on('added_todo', (msg: any) => {
        return boundActions.todoWasAdded(msg);
    });
    channel.on('deleted_todo', (msg: any) => {
        return boundActions.todoWasDeleted(msg);
    });
    channel.on('checked_todo', (msg: any) => {
        return boundActions.todoWasChecked(msg);
    });
    channel.on('unchecked_todo', (msg: any) => {
        return boundActions.todoWasUnchecked(msg);
    });
    return (_store: Store) => (next: any, args: any) => (action: any) => {
        console.log('args', args);
        // TODO: prevent calling action again if it is called here
        const actionReturn: SocketActionReturnType = action.call(...args);
        // TODO: find better way to recognize socket actions
        if (action.name.includes('_')) {
            channel
                .push(actionReturn.messageName, actionReturn.payload, 10000)
                .receive(REPLY_OK, msg =>
                    actionReturn.nextActionName
                        ? boundActions[actionReturn.nextActionName](msg)
                        : console.log('created message', msg)
                )
                .receive(REPLY_ERROR, reasons =>
                    console.log('create failed', reasons)
                )
                .receive(REPLY_TIMEOUT, () =>
                    console.log('Networking issue for action', action.name)
                );
        }
        return next(action);
    };
};

export interface SocketActionReturnType {
    payload: Object;
    messageName: string;
    nextActionName?: string;
}
