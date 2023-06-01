import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { useEffect } from 'react';

const TopNav = () => {
    
    const dispatch = useDispatch();
    useEffect(() => {
        //
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;
    
    return (
        <nav className="flex justify-center items-center bg-white px-16">
            <img className="w-36 ml-[5px] flex-none" src="/assets/images/logo.png" alt="logo" />

            <div className="w-full text-outremer font-bold text-xl flex flex-row justify-around items-center">
                <Link to="/" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                    Notre mission
                </Link>

                <Link to="/" className="text-primary hover:underline ltr:ml-1 rtl:mr-1">
                    Fish Id
                </Link>

                <Link to="/" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                    Carte des Espèces
                </Link>

                <Link to="/" className="text-primary hover:underline ltr:ml-1 rtl:mr-1">
                    Social
                </Link>

                <Link to="/" className="text-primary hover:underline ltr:ml-1 rtl:mr-1">
                    a propos
                </Link>

                <Link to="/" className="text-lagon font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                    Connexion
                </Link>

                <Link to="/" className="text-white bg-lagon rounded-full px-6 py-2 hover:underline ltr:ml-1 rtl:mr-1">
                    Abonnez-vous
                </Link>
            </div>
        </nav>
    );
};

export default TopNav;
