import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import * as tf from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-backend-webgl';
import OverlayModal from '../../components/Layouts/OverlayModal';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import exifr from 'exifr' 


const Identification = () => {
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Identification'));
    });

    const uploadedImgRef = useRef(null);

    const [state, setState] = useState<{ showModal: boolean; uploadedImg: File | null; prediction: any, exif: [], url: string | null }>({
        showModal: false,
        uploadedImg: null,
        prediction: null,
        exif: [],
        url: null
    });

    useEffect(() => {
        if (uploadedImgRef.current) {
            prediction();
        }
    }, [state.showModal]);

    const fetchFormMarineSpecies = async (species) => {
        let fetchData = await fetch('https://www.marinespecies.org/rest/AphiaRecordsByVernacular/'+ species +'?like=true&offset=1')
        if (fetchData.status === 200) {
            const data = await fetchData.json();
            console.log('fetch',data)
            return data;
        }
        // Si on trouve pas la data, on réitére avec le nom sans espace
        else {
            fetchData = await fetch('https://www.marinespecies.org/rest/AphiaRecordsByVernacular/'+ species.replace(/\s/g, '') +'?like=true&offset=1')
            if (fetchData.status === 200) {
                const data = await fetchData.json();
                console.log('fetch',data)
                return data;
            }
        }
        return [];
    };


    const prediction = async () => {
        const img = uploadedImgRef.current as unknown as HTMLImageElement;

        img.src = URL.createObjectURL(state.uploadedImg!);

        const model = await tf.load({
            version: 2,
            alpha: 1.0,
        });

        const predictions = await model.classify(img);
        console.log('predictions',predictions)
        let exifData = await exifr.parse(img);
        console.log('exifData',exifData)
        const firstPrediction = predictions[0].className.split(',')[0];
        const data = await fetchFormMarineSpecies(firstPrediction);
        if (exifData) {
            setState((prevState) => {
                return {
                    ...prevState,
                    exif: exifData,
                    prediction: predictions[0],
                    url: data[0].url
                };
            });
        }
        setState((prevState) => {
            return {
                ...prevState,
                prediction: predictions[0],
                url: data[0].url
            };
        });
    };

    console.log('state',state)

    return (
        <div className="w-full h-full bg-blue-grey flex flex-col justify-around items-center p-40 text-outremer">
            <h1 className="text-5xl font-extrabold">Découvrez l'espèce que vous cherchez</h1>

            <p className="text-lg text-center">Lorem ipsum dolor sit amet, consetetur sadipsing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</p>

            <label className="relative text-white font-bold text-2xl rounded-full px-12 py-4 bg-outremer cursor-pointer">
                Selectionner votre fichier
                <input
                    type="file"
                    multiple={false}
                    className="absolute opacity-0 w-full h-full left-0 top-0 cursor-pointer"
                    onChange={(e) => {
                        setState((prevState) => {
                            return {
                                ...prevState,
                                showModal: true,
                                uploadedImg: e.target.files![0],
                            };
                        });
                    }}
                />
            </label>

            <span className="-mt-16 text-lg">ou déposer l'image ici</span>

            {state.showModal && (
                <OverlayModal
                    hideModal={() => {
                        setState((prevState) => {
                            return {
                                showModal: false,
                                uploadedImg: null,
                                prediction: null,
                                exif: []
                            };
                        });
                    }}
                >
                    <div className="h-full w-full flex flex-col justify-between items-center relative">
                        <div className="w-full h-1/2 flex flex-row justify-center">
                            <img ref={uploadedImgRef} id="uploadedImg" src="" className="h-full object-contain rounded-xl" />

                            <div className="h-full flex flex-col justify-center items-center gap-8 p-8">
                                {state.prediction == null ? (
                                    <>
                                        <p className="text-white">Identification...</p>
                                        <img className="w-16 h-16" src="../../../public/assets/images/spinner.gif" alt="loading spinner" />
                                    </>
                                ) : (
                                    <>
                                        <p className="text-white">Identification réussie !</p>
                                        <p className="uppercase font-bold text-4xl">{state.prediction.className}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="h-1/2 w-full flex flex-col justify-between items-center relative">
                            <p className="w-full h-full flex flex">Latitude : {state.exif['latitude'] ? state.exif['latitude'] : 'Pas de données EXIF'}</p>
                            <p className="w-full h-full flex flex">Longitude : {state.exif['longitude'] ? state.exif['longitude'] : 'Pas de données EXIF'}</p>
                            <p className="w-full h-full flex flex">Lien vers MarineSpecies :  <a> {state.url ? state.url : 'Pas de données'}</a></p>
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
            )}
        </div>
    );
};

export default Identification;
