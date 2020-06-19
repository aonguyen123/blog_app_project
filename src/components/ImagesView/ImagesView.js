import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PhotoProvider, PhotoConsumer } from 'react-photo-view';
import 'react-photo-view/dist/index.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import SliderImage from '../SliderImage';
import './styles.css';

export default function ImagesView({ images }) {
    return (
        <PhotoProvider>
            <div className="images-content">
                <SliderImage>
                    {images.map((item, index) => (
                        <PhotoConsumer key={index} src={item.url}>
                            <div style={{cursor: 'pointer'}}>
                                <LazyLoadImage
                                    alt=''
                                    height={200}
                                    src={item.url}
                                    width={200}
                                    effect='blur'
                                />
                            </div>
                        </PhotoConsumer>
                    ))}
                </SliderImage>
            </div>
        </PhotoProvider>
    );
}
