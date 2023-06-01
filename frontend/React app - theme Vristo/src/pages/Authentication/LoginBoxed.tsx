import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';

const LoginBoxed = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login Boxed'));
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;

    const submitForm = () => {
        navigate('/');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center ">
            <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
                <div className="flex justify-center">
                    <img className="w-40 ml-[5px] flex-none" src="/assets/images/logo.png" alt="logo" />
                </div>
                <h2 className="font-bold text-2xl mb-3">Connexion</h2>
                <form className="space-y-5" onSubmit={submitForm}>
                    <div>
                        <label htmlFor="nom">Nom</label>
                        <input id="nom" type="nom" className="form-input" placeholder="Entre votre nom" />
                    </div>
                    <div>
                        <label htmlFor="password">mot de passe </label>
                        <input id="password" type="password" className="form-input" placeholder="Entrez votre mot de passe" />
                    </div>
                    {/* <div>
                        <label className="cursor-pointer">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="text-white-dark">Subscribe to weekly newsletter</span>
                        </label>
                    </div> */}
                    <button type="submit" className="btn btn-primary w-full">
                        CONNEXION
                    </button>
                </form>

                <p className="text-center">
                    Vous n&apos;avez pas de compte ?
                    <Link to="/auth/boxed-signup" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                        S'inscrire
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginBoxed;
