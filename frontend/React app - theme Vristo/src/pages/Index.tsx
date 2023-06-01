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
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-vertdeau">
            <h1>HOME</h1>
        </div>
    );
};

export default Index;
