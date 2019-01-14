import { h } from 'preact';
import { Connect } from 'redux-zero/preact';

export default function(actions = {}): any {
    return (Child: any) => (props: any) => (
        <Connect mapToProps={(s: any) => ({ ...s })} actions={actions}>
            {(mappedProps: any) => <Child {...mappedProps} {...props} />}
        </Connect>
    );
}
