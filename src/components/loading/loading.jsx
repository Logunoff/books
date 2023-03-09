import Lottie from 'lottie-react';

import loading from './loading.json';

import './loading.css';

export const Loading = () => (
    <div className='loading' data-test-id='loader'>
        <Lottie animationData={loading} loop={true} />
    </div>
);
