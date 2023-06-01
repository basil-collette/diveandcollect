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
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-vertdeau">
            <p></p>
        </div>
    );
};

export default TopNav;
