import {
    useCallback
} from 'react';

const useKeyboard = ( keys, callback, deps = [] ) => {
    keys = keys.toLowerCase();
    const createKeySequence = useCallback( e => {
        let event = e.nativeEvent;
        let ctrl = event.ctrlKey ? 'ctrl' : null;
        let shift = event.shiftKey ? 'shift' : null;
        let alt = event.altKey ? 'alt' : null;
        let key = event.code.toLowerCase().replace( 'key', '' );
        return [ ctrl, shift, alt, key ].filter( i => i !== null ).join( '+' );
        // eslint-disable-next-line
    }, [ keys, ...deps ] );
    return useCallback( e => {
        e.preventDefault();
        let sequence = createKeySequence( e );
        if ( sequence !== keys ) return;
        callback( e );
        // eslint-disable-next-line
    }, deps );
};

export default useKeyboard;
