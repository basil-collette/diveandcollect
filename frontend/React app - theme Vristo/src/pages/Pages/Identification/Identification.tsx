import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { setPageTitle } from '../../../store/themeConfigSlice';
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

    const prediction = () => {
        tf.load().then((model) => {
            // do something with the model
            const img = document.querySelector('img') as HTMLImageElement;
            console.log(img);
            model.classify(img).then((predictions) => {
                document.querySelector('span').innerHTML = predictions[0].className + ' ' + predictions[0].probability.toFixed(2);
            });
        });
    };


    const handleUploadImage = (file) => {
        document.querySelector('img').src = URL.createObjectURL(file);
        prediction();
    };




    return (
        <div className="container">
            <h1>Hello BASIL</h1>
            <form>
            <input
          type="file"
        //   value={selectedFile}
          onChange={(e) => handleUploadImage(e.target.files[0])}
        />            </form>
            <img src='/public/assets/images/carousel1.jpeg'/>
            <span></span>
        </div>
    );
};

export default Identification;
