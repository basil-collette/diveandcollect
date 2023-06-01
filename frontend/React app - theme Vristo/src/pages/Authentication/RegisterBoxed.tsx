import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useEffect } from 'react';

const RegisterBoxed = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Register Boxed'));
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;

    const submitForm = () => {
        navigate('/');
    };

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen bg-cover bg-center ">
                <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
                    <div className="flex justify-center">
                        <img className="w-40 ml-[5px] flex-none" src="/assets/images/logo.png" alt="logo" />
                    </div>
                    <h2 className="font-bold text-2xl mb-3">Inscription</h2>
                    <form className="space-y-5" onSubmit={submitForm}>
                        <div>
                            <label htmlFor="name">Nom</label>
                            <input id="name" type="text" className="form-input" placeholder="Entrez votre nom" />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" className="form-input" placeholder="Enter Password" />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            S'inscrire
                        </button>
                    </form>

                    <p className="text-center">
                        Vous avez déjà un compte ?
                        <Link to="/auth/boxed-signin" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterBoxed;
