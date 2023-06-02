import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { useEffect } from 'react';
import { setPageTitle } from '../store/themeConfigSlice';

const Index = () => {
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Home'));
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;
    
    return (
        <div className="flex flex-col justify-center items-center h-full bg-cover bg-fishes bg-vertdeau">
            
            <div className="flex flex-col justify-center items-center gap-16 text-white text-center w-1/2">
                <h1 className="text-6xl">Lorem Ipsum is simply dummy text of the printing</h1>

                <p className="text-center text-xl">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>

                <Link to="/" className="text-2xl bg-fushia rounded-full px-12 py-4 hover:underline ltr:ml-1 rtl:mr-1">
                    Rejoignez nous
                </Link>
            </div>
            
        </div>
    );
};

export default Index;
