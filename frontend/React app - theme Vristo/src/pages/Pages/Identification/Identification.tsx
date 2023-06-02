import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import * as tf from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import '@tensorflow/tfjs-backend-webgl';
import exifr from 'exifr' 

const Identification = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Knowledge Base'));
    });
    const [active, setActive] = useState<Number>();
    const [dataset, setDataset] = useState<any>([]);
    const inputEl = useRef(null);
    console.log('dataset',dataset)

    const togglePara = (value: Number) => {
        setActive((oldValue) => {
            return oldValue === value ? 0 : value;
        });
    };

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
        const classifier = knnClassifier.create()
        // Check if dataset is not empty
        const model = await tf.load(
            {
                version: 2,
                alpha: 1.0
            }
        );
        if (dataset.length > 0) {
            dataset.map((data) => {
                console.log('data',data)
                const activation = model.infer(data.img, true);
                classifier.addExample(activation, data.label);
            }
        )}
        document.querySelector('span').innerHTML = '';
        const img = document.querySelector('img') as HTMLImageElement;
        console.log('img',img)
        let dateExif = await exifr.parse(img)
        if (dateExif) {
            document.querySelector('span').innerHTML += dateExif.DateTimeOriginal + '<br>';
            document.querySelector('span').innerHTML += dateExif.latitude  + '<br>';
            document.querySelector('span').innerHTML += dateExif.longitude + '<br>';
        }
        if (dataset.length > 0) {
            const activation = model.infer(img, true);
            const result = await classifier.predictClass(activation);
            console.log('result',result)
        }
        const predictions = await model.classify(img);
        predictions.map(async (prediction) => {
            if (prediction.probability < 0.2 ) {
                return;
            };
            const firstPrediction = prediction.className.split(',')[0];
            console.log('firstPrediction',firstPrediction)
            document.querySelector('span').innerHTML += firstPrediction + ' ' + prediction.probability + '<br>';
            const data = await fetchFormMarineSpecies(firstPrediction);
            document.querySelector('span').innerHTML += data[0] ? data[0].url : ''  + '<br>';
            });
    };

    const handleUploadImage = async (file) => {
        document.querySelector('img').src = URL.createObjectURL(file);
        return await prediction();
    };

    const handleOnTrain = async () => {
        const img = document.querySelector('img') as HTMLImageElement;
        const label = inputEl.current.value;
        setDataset([...dataset, {label,img}]);
        document.querySelector('img').src = '/public/assets/images/carousel1.jpeg';
    };

    return (
        <div className="container">
            <h1>Hello BASIL</h1>
            <form>
                <input
                    type="file"
                    onChange={(e) => handleUploadImage(e.target.files[0])}
                />
            </form>
            <img src="/public/assets/images/carousel1.jpeg" />
            <span></span>
            <button onClick={() => {
                handleOnTrain();
            }} id='train'>Cliquez pour entrainer</button>
            <input ref={inputEl} type="text" id="name" name="name" />
        </div>
    );
};

export default Identification;
