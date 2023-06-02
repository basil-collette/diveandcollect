import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import * as tf from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-webgl';
import OverlayModal from '../../components/Layouts/OverlayModal';

const Identification = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Identification'));
    });

    const uploadedImgRef = useRef(null)

    const [state, setState] = useState<{showModal:boolean, uploadedImg: File | null, prediction: any}>({
        showModal: false,
        uploadedImg: null,
        prediction: null
    });

    useEffect(() => {
        if(uploadedImgRef.current) {
            prediction();
        }
    }, [state.showModal]);

    const prediction = async () => {
        const img = uploadedImgRef.current as unknown as HTMLImageElement;
        
        img.src = URL.createObjectURL(state.uploadedImg!);

        const model = await tf.load();

        const predictions = await model.classify(img);
        //console.log(predictions[0].probability.toFixed(2));

        setState((prevState) => {return({
            ...prevState,
            prediction: predictions[0]
        });});
    };

    return (
        <div className="w-full h-full bg-blue-grey flex flex-col justify-around items-center p-40 text-outremer">
            <h1 className="text-5xl font-extrabold">Découvrez l'espèce que vous cherchez</h1>

            <p className="text-lg text-center">Lorem ipsum dolor sit amet, consetetur sadipsing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</p>
            
            <label className="relative text-white font-bold text-2xl rounded-full px-12 py-4 bg-outremer cursor-pointer">
                Selectionner votre fichier

                <input type="file" multiple={false}
                    className="absolute opacity-0 w-full h-full left-0 top-0 cursor-pointer"
                    onChange={(e) => {
                        setState((prevState) => { return ({
                            ...prevState,
                            showModal: true,
                            uploadedImg: e.target.files![0]
                        });});
                    }}
                />
            </label>

            <span className="-mt-16 text-lg">ou déposer l'image ici</span>
        
            { state.showModal &&
                <OverlayModal hideModal={() => {
                    setState((prevState) => { return ({
                        ...prevState,
                        showModal: true
                    });});}}
                    >
                    
                    <div className="h-full w-full flex flex-col justify-between items-center relative">
                        <div className="w-full h-1/2 flex flex-row justify-center">
                            <img ref={uploadedImgRef} id="uploadedImg" src="" className="h-full object-contain rounded-xl" />
                            
                            <div className="h-full flex flex-col justify-center items-center gap-8 p-8">
                                { state.prediction == null
                                    ?   <>
                                            <p className="text-white">Identification...</p>
                                            <img className="w-16 h-16" src="../../../public/assets/images/spinner.gif" alt="loading spinner" />
                                        </>
                                    :   <>
                                            <p className="text-white">Identification réussie !</p>
                                            <p className="uppercase font-bold text-4xl">{state.prediction.className}</p>
                                        </>
                                }
                            </div>
                        </div>

                        <div className="h-1/2 w-full flex flex-col justify-between items-center relative">
                            <p className="w-full h-full flex flex">test</p>

                            <div className="w-full flex flex-row justify-end items-center gap-16 text-white">
                                <Link to="/" className="rounded-full px-6 py-2 bg-fushia hover:underline ltr:ml-1 rtl:mr-1">
                                    Envoyer
                                </Link>
                                <Link to="/" className="text-fushia font-bold hover:underline ltr:ml-1 rtl:mr-1">
                                    Télécharger
                                </Link>
                            </div>
                        </div>             
                    </div>

                </OverlayModal>
            }
            
        </div>
    );
};

export default Identification;
