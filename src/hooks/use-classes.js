import {
    useCallback,
    useMemo
} from 'react';

const useClasses = ( description, dependencies = [] ) => {

    const deps = useMemo( () => {
        return JSON.stringify( description ) + JSON.stringify( dependencies );
    }, [ description, dependencies ] );

    const classList = useMemo( () => {
        const resultSet = [];
        for ( let key in description ) {
            if ( !Object.hasOwnProperty.call( description, key ) ) continue;
            if ( typeof description[ key ] !== 'function' && key !== 'null' && Boolean( description[ key ] ) ) {
                resultSet.push( key );
            } else if ( typeof description[ key ] === 'function' && key !== 'null' && description[ key ]() ) {
                resultSet.push( key );
            }
        }
        return resultSet;
        // eslint-disable-next-line
    }, [ deps ] );

    const all = useCallback( main => main + ' ' + classList.join( ' ' ), [ classList ] );

    const take = useCallback( ( main, list = [] ) => {
        if ( !Array.isArray( list ) ) {
            return ( main ? main + ' ' : '' ) + classList.find( list ) || '';
        }
        if ( !list.length ) return main || '';
        let resultClassSet = classList.filter( _class => list.includes( _class ) )
            .join( ' ' );
        return ( main ? main : '' ) + ( resultClassSet ? ' ' + resultClassSet : '' );
    }, [ classList ] );

    const except = useCallback( ( main, list = [] ) => {
        if ( !Array.isArray( list ) ) {
            return ( main ? main + ' ' : '' ) + classList.find( list ) || '';
        }
        if ( !list.length ) return ( main ? main + ' ' : '' ) + classList.join( ' ' );
        let resultClassSet = classList.filter( _class => !list.includes( _class ) )
            .join( ' ' );
        return ( main ? main : '' ) + ( resultClassSet ? ' ' + resultClassSet : '' );
    }, [ classList ] );

    const is = useCallback( className => classList.includes( className ), [ classList ] );

    return useMemo( () => ( {
        all,
        take,
        except,
        is
    } ), [ all, take, except, is ] );

};

export default useClasses;
