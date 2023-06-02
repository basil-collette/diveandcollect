import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import * as tf from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-webgl';

const Identification = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Knowledge Base'));
    });
    const [active, setActive] = useState<Number>();
    const togglePara = (value: Number) => {
        setActive((oldValue) => {
            return oldValue === value ? 0 : value;
        });
    };

    const prediction = async (img2: any) => {
        const model = await tf.load();
        
        const img = document.querySelector('img') as HTMLImageElement;

        const predictions = await model.classify(img);
        
        console.log(predictions[0].className + ' ' + predictions[0].probability.toFixed(2));
    };

    const showModal = () => {

    }

    return (
        <div className="w-full h-full bg-blue-grey flex flex-col justify-around items-center p-40 text-outremer">
            <h1 className="text-5xl font-extrabold">Découvrez l'espèce que vous cherchez</h1>

            <p className="text-lg text-center">Lorem ipsum dolor sit amet, consetetur sadipsing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</p>
            
            <label className="relative text-white font-bold text-2xl rounded-full px-12 py-4 bg-outremer">
                Selectionner votre fichier

                <input type="file"
                    className="absolute opacity-0 w-full h-full left-0 top-0 cursor-pointer"
                    onChange={(e) => prediction(e.target.files[0]) }
                />
            </label>

            <span className="-mt-16 text-lg">ou déposer l'image ici</span>
        </div>

        //<OverlayModal>
            //{{}}
        //</OverlayModal>
    );
};

export default Identification;
