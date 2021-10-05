import React, { Fragment, useEffect, useState } from 'react'
import BannerAnim, { Element } from 'rc-banner-anim';
import clienteAxios from '../../../Config/axios';
import './banner.scss';
import 'rc-banner-anim/assets/index.css';

const BgElement = Element.BgElement;

export default function BannerPromocional() {
    
    const [videos, setVideos] = useState([]);

    const traerDatos = async () => {
        await clienteAxios
        .get(`/bannerAdmin/banner-company`)
        .then((res) => {
            setVideos(res.data.bannersComapny)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
        traerDatos();
    }, []);

    return (
        <Fragment>
            <BannerAnim autoPlay  prefixCls="banner-user" delay={200}>
                {
                    videos?.map((video, index)=>{
                        return(
                            <Element key={index} prefixCls="banner-user-elem" >
                                <BgElement
                                    key="bg"
                                    className="bg banner-elemento"
                                    alt="img-oferta"
                                    style={{
                                        backgroundImage: `url(${video.imgBannerAdminUrl})`,
                                    }}
                                >
                                </BgElement>
                            </Element>
                        )
                    })
                }
                
            </BannerAnim>
        </Fragment>
    )
}
