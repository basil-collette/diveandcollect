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
        <nav className="flex justify-center items-center bg-white gap-12 px-40">
            
            <Link to="/" className="">
                <img className="w-36 ml-[5px] flex-none" src="/assets/images/logo.png" alt="logo" />
            </Link>

            <div className="text-outremer font-bold text-xl flex flex-row gap-12 items-center">
                <Link to="/" className="font-bold hover:underline ltr:ml-1 rtl:mr-1">
                    Notre mission
                </Link>

                <Link to="/" className="hover:underline ltr:ml-1 rtl:mr-1">
                    Fish Id
                </Link>

                <Link to="/mapcomponent" className="font-bold hover:underline ltr:ml-1 rtl:mr-1">
                    Carte des Espèces
                </Link>

                <Link to="/apps/identification" className="hover:underline ltr:ml-1 rtl:mr-1">
                    Identification
                </Link>

                <Link to="/" className="hover:underline ltr:ml-1 rtl:mr-1">
                    À propos
                </Link>

                <Link to="/" className="text-lagon font-bold hover:underline ltr:ml-1 rtl:mr-1">
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
