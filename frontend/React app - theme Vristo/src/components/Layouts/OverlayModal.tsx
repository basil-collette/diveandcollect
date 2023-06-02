import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { PropsWithChildren, useState, useEffect } from 'react';

const OverlayModal = (props: any) => {

    

    return (
        <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-70 p-16">
            <div className="relative text-xl w-full h-full flex flex-col bg-lagon rounded-xl bg-opacity-80 transition-all">
                
                <span className="absolute top-8 right-8 text-white cursor-pointer"
                    onClick={() => {props.hideModal()}}
                    >
                    X
                </span>

                {props.children}

            </div>
        </div>
    );
};

export default OverlayModal;
