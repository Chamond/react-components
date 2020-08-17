import React, {
    useState,
    useMemo
} from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import data from './../lib/table/data';

import {
    Checkbox,
    Button,
    Radio,
    Select,
    Text,
    Password,
    Number,
    Date as DateInput,
    TextArea,
    Slider,
    Table,
    File
    // Table, TableButton, useTable
} from '@components';
import Tree from '@components/tree/tree';
import { useMergedState } from '@hooks/index';

const styles = `color: #9CCC65`;

const App = () => {

    console.log( '%capp renders', styles );

    // ---------------------------------------------------------------------------

    const [ agreed, setAgreed ] = useState( true );

    const checkboxComponent = (
        <Checkbox value={ agreed }
                  caption='Чекбокс'
                  onChange={ setAgreed }
        />
    );

    // ---------------------------------------------------------------------------


    const [ load, setLoad ] = useState( false );

    const radioGroup = [ '1-ый вариант', '2-й вариант', '3-й вариант' ];
    const [ radioIndex, setRadioIndex ] = useState( 0 );

    const buttonLookup = [
        'Чекбокс',
        {
            caption: 'Включить',
            onClick: () => {
                setAgreed( true )
            },
            icon: 'fas fa-check'
        },
        {
            caption: 'Отключить',
            onClick: () => {
                setAgreed( false );
            },
            icon: 'fas fa-times'
        },
        'Отчеты',
        {
            caption: 'Предпросмотр',
            onClick: () => console.log( 'Report.fr3' ),
            icon: 'fas fa-eye'
        }
    ];

    const selectData = [
        { id: 1, value: 'Maria' },
        { id: 2, value: 'Ababa' },
        { id: 3, value: 'Selen' },
        { id: 4, value: 'Mas' },
        { id: 5, value: 'Ethan' },
        { id: 6, value: 'Mask' }
    ];

    const tableData = data.data;
    const anotherTableData = useMemo( () => {
        return tableData.slice()
            .map( item => ( { ...item, id: item.id + 1 } ) );
    }, [] );
    const [ samplePage, setSamplePage ] = useState( 0 );
    const [ selection, setSelection ] = useState( [] );
    const fields = useMemo( () => {
        return [ {
            name: 'id',
            label: 'Идентификатор',
            sortable: false
        }, {
            name: 'name',
            label: 'Номер пробы',
            align: 'right'
        }, {
            name: 'short',
            label: 'Точка сбора',
            align: 'right'
        }, {
            name: 'expression',
            label: 'Дата создания',
            align: 'right'
        } ];
    }, [] );
    const actions = useMemo( () => {
        return [
            {
                className: 'rc-green rc-important',
                icon: 'fas fa-book',
                disabled: item => item.id === 3,
                onClick: () => {

                }
            },
            {
                className: 'rc-important',
                icon: 'fas fa-random',
                onClick: item => console.log( item )
            },
            {
                className: 'rc-indigo rc-important',
                icon: 'fas fa-times',
                disabled: item => item.id === 39,
                onClick: () => {

                }
            }
        ];
    }, [] );

    const [ sliderValue, setSliderValue ] = useState( 0 );

    const treeData = [
        { id: 0, label: 'ROLE_ADMIN' },
        { id: 1, label: 'ROLE_DOCUMENT_ADMIN' },
        { id: 2, label: 'ROLE_DOCUMENT', parent: 1 },
        { id: 22, label: 'ROLE_DOCUMENT_1', parent: 1 },
        { id: 3, label: 'DOCUMENT_WRITE', parent: 2 },
        { id: 4, label: 'DOCUMENT_READ', parent: 2 },
        { id: 5, label: 'ROLE_EQUIPMENT_ADMIN', status: 0 },
        { id: 6, label: 'ROLE_EQUIPMENT', parent: 5 },
        { id: 7, label: 'EQUIPMENT_WRITE', parent: 6 },
        { id: 8, label: 'EQUIPMENT_READ', parent: 6 }
    ];

    const [ selectedNodes, setSelectedNodes ] = useState( null );
    const [ checkedNodes, setCheckedNodes ] = useState( [] );
    const [ activeNodes, setActiveNodes ] = useState( [] );

    const [ password, setPassword ] = useState( '' );
    const [ passwordType, setPasswordType ] = useState( 'password' );
    const [ date, setDate ] = useMergedState( {
        date: new Date(),
        value: '',
        active: false
    } );

    const [ selected, setSelected ] = useState( null );

    const [ fileUpload, setFileUpload ] = useState( false );
    const [ tableSearch, setTableSearch ] = useState( '' );

    return (
        <div className='app'>
            <h1>@chamond/react-components</h1>
            <div className='aside'>
                <h3>Tree</h3>
                <div className='aside-line'>
                    <Tree data={ treeData }
                          selected={ selectedNodes }
                          active={ activeNodes }
                          checked={ checkedNodes }
                          onCheck={ setCheckedNodes }
                          onToggle={ setActiveNodes }
                          onSelect={ setSelectedNodes }
                          onDoubleClick={ console.log }
                    />
                </div>
            </div>
            <div className='aside'>
                <h3>Table</h3>
                <div className='aside-line'>
                    <Table data={ samplePage === 0 ? tableData : anotherTableData }
                           page={ samplePage }
                           total={ 35 }
                           title='Таблица'
                           search={ tableSearch }
                           fields={ fields }
                           multiSelect
                           selection={ selection }
                           actions={ actions }
                           onPageChange={ setSamplePage }
                           onSearch={ s => {
                               console.log( s );
                               setTableSearch( s );
                           } }
                           onSelect={ setSelection }
                    />
                </div>
            </div>
            <div className='aside'>
                <h3>Checkbox</h3>
                <div className='aside-line'>
                    { checkboxComponent }
                    <Checkbox disabled={ true }
                              caption='disabled checkbox'
                    />
                </div>
            </div>
            <div className='aside'>
                <h3>Button</h3>
                <div className='aside-line'>
                    <div className='hs'/>
                    <Button caption='lookup button'
                            icon='fas fa-lock'
                            loading={ load }
                            disabled={ load }
                            lookup={ buttonLookup }
                            className='rc-red rc-important'
                            onClick={ () => {
                                setAgreed( !agreed );
                                setLoad( true );
                            } }
                    />
                    <div className='vs'/>
                    <Button caption='unlock'
                            icon='fas fa-lock-open'
                            className='rc-red'
                            onClick={ () => {
                                setLoad( false );
                                setRadioIndex( 2 );
                            } }
                    />
                    <div className='vs'/>
                    <Button caption='disabled'
                            className='rc-green rc-important'
                            disabled
                    />
                    <div className='vs'/>
                    <Button className='rc-indigo rc-important'
                            disabled
                            loading
                    />
                </div>
            </div>
            <div className='aside'>
                <h3>File</h3>
                <div className='aside-line'>
                    <File className='rc-indigo rc-important'
                          multiple
                          icon='fas fa-upload'
                          title='upload report'
                          onLimitExcess={ size => {
                              console.log( 'Слишком большой объем:', size );
                          } }
                          disabled={ fileUpload }
                          loading={ fileUpload }
                          onUploadStart={ () => {
                              setFileUpload( true );
                          } }
                          onUploadEnd={ ( e, files ) => {
                              console.log( files );
                              setFileUpload( false );
                          } }
                    />
                </div>
            </div>
            <div className='aside'>
                <h3>Radio</h3>
                <div className='aside-line'>
                    <Radio caption='Варианты ответов'
                           data={ radioGroup }
                           index={ radioIndex }
                           onChange={ setRadioIndex }
                    />
                    <div className='vs'/>
                    <Radio caption='Варианты ответов'
                           data={ radioGroup }
                           index={ radioIndex }
                           disabled
                           onChange={ setRadioIndex }
                    />
                </div>
            </div>
            <div className='aside'>
                <h3>Select</h3>
                <div className='aside-line'>
                    <Select data={ selectData }
                            searchable
                            error='Неверный формат'
                            title='Select header'
                    />
                    <div className='vs'/>
                    <Select data={ [] }
                            // disabled
                            searchable
                            selected={ 1 }
                    />
                </div>
            </div>
            <div className='aside'>
                <h3>Text</h3>
                <div className='aside-line'>
                    <Text loading
                          className='ht-login-control'
                          title='Text header'
                          value={ selectData[ radioIndex ].value }
                          lookup={ [ 'Подсказка 1', 'Подсказка 2' ] }
                    />
                    <div className='vs'/>
                    <Text disabled/>
                    <div className='vs'/>
                    <Text caption='Имя пользователя'
                          lookup={ [ 'Chamond', 'Admin' ] }
                    />
                </div>
            </div>
            <div className='aside'>
                <h3>Password</h3>
                <div className='aside-line'>
                    <Password title='Пароль'
                              value={ password }
                              type={ passwordType }
                              onTypeChange={ setPasswordType }
                              onChange={ setPassword }
                    />
                    <div className='vs'/>
                    <Password value='password'
                              disabled
                    />
                </div>
            </div>
            <div className='aside'>
                <h3>Number</h3>
                <div className='aside-line'>
                    <Number type='integer'
                            caption='Вес, мегатонн'
                            step={ 1.3 }
                            value={ 833 }
                            max={ 10 }
                    />
                    <div className='vs'/>
                    <Number type='integer'
                            caption='Крокодилы, шт.'
                            loading
                            step={ 10 }
                            warning='Число ненадежно'
                    />
                </div>
            </div>
            <div className='aside'>
                <h3>Date</h3>
                <div className='aside-line'>
                    <DateInput format='YYYY.MM.DD HH:mm'
                               title='Дата и время'
                               date={ date.date }
                               value={ date.value }
                               active={ date.active }
                               onChange={ ( value, date ) => setDate( { value, date } ) }
                               onToggle={ active => setDate( { active } ) }
                    />
                    <div className='vs'/>
                    <DateInput format='HH:mm'
                               caption='Время начала'
                               error='Неверный формат'
                               disabled
                    />
                </div>
            </div>
            <div className='aside'>
                <h3>TextArea</h3>
                <div className='aside-line'>
                    <TextArea placeholder='Type text'
                              value="Hello, I'm Dmitry"
                              caption='О вас'
                              length={ 10 }
                              rows={ 10 }
                    />
                </div>
            </div>
            <div className='aside'>
                <h3>Slider</h3>
                <div className='aside-line'>
                    <Slider max={ 10 }
                            value={ sliderValue }
                            onChange={ setSliderValue }
                    />
                    <div className='vs'/>
                    <Slider max={ 10 }
                            caption='Слайдер'
                            label={ false }
                            dots
                    />
                </div>
            </div>
            <br/>
        </div>
    );
};

export default App;
