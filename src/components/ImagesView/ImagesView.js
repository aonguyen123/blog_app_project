import React from 'react';
import Img from 'react-image';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { PhotoProvider, PhotoConsumer } from 'react-photo-view';
import 'react-photo-view/dist/index.css';
import SliderImage from '../SliderImage';
import './styles.css';

export default function ImagesView({images}) {
    return (
        <PhotoProvider>
            <div className="images-content">
                <SliderImage>
                    {images.map((item, index) => (
                        <PhotoConsumer key={index} src={item.url}>
                            <Img
                                src={item.url}
                                alt=""
                                className="images-item"
                                loader={
                                    <Spin
                                        indicator={<LoadingOutlined spin />}
                                    />
                                }
                            />
                        </PhotoConsumer>
                    ))}
                </SliderImage>
            </div>
        </PhotoProvider>
    );
}
