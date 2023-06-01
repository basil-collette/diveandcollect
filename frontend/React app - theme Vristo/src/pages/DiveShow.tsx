import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageTitle } from '../store/themeConfigSlice';

const Preview = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Invoice Preview'));
    });
    const exportTable = () => {
        window.print();
    };

    // const items = [
    //     {
    //         id: 1,
    //         title: 'Calendar App Customization',
    //         quantity: 1,
    //         price: '120',
    //         amount: '120',
    //     },
    //     {
    //         id: 2,
    //         title: 'Chat App Customization',
    //         quantity: 1,
    //         price: '230',
    //         amount: '230',
    //     },
    //     {
    //         id: 3,
    //         title: 'Laravel Integration',
    //         quantity: 1,
    //         price: '405',
    //         amount: '405',
    //     },
    //     {
    //         id: 4,
    //         title: 'Backend UI Design',
    //         quantity: 1,
    //         price: '2500',
    //         amount: '2500',
    //     },
    // ];

    const columns = [
        {
            key: 'id',
            label: 'S.NO',
        },
        {
            key: 'title',
            label: 'ITEMS',
        },
        {
            key: 'quantity',
            label: 'QTY',
        },
        {
            key: 'price',
            label: 'PRICE',
            class: 'ltr:text-right rtl:text-left',
        },
        {
            key: 'amount',
            label: 'AMOUNT',
            class: 'ltr:text-right rtl:text-left',
        },
    ];

    return <div></div>;
};

export default Preview;
