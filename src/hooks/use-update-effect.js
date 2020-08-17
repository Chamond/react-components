import { useEffect, useRef } from 'react';

const useUpdateEffect = ( effect, dependencies = [] ) => {
    const isInitial = useRef( true );
    useEffect( () => {
        if ( isInitial.current ) {
            isInitial.current = false;
        } else {
            return effect();
        }
        // eslint-disable-next-line
    }, dependencies );
};

export default useUpdateEffect;
