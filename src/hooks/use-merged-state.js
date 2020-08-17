import {
    useState
} from 'react';

const useMergedState = initial => {

    const [ state, setState ] = useState( initial );

    const setter = props => {
        setState( old => ( {
            ...old,
            ...props
        } ) );
    };

    return [
        state,
        setter
    ];

};

export default useMergedState;
