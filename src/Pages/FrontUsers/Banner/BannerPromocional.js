import React, { Fragment, useEffect, useState } from "react";
import BannerAnim, { Element } from "rc-banner-anim";
import clienteAxios from "../../../Config/axios";
import "./banner.scss";
import "rc-banner-anim/assets/index.css";

const BgElement = Element.BgElement;

export default function BannerPromocional() {
  const [videos, setVideos] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const traerDatos = async () => {
    await clienteAxios
      .get(`/bannerAdmin/banner-company`)
      .then((res) => {
        setVideos(res.data.bannersComapny);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    traerDatos();
  }, []);

  if(loaded && videos.length === 0) return null

  return (
    <Fragment>
      <BannerAnim autoPlay prefixCls="banner-user" delay={200}>
        {videos.map((video, index) => {
          return (
            <Element
              key={index}
              prefixCls="banner-user-elem"
              className="banner-user-elem"
              style={{
                backgroundImage: `url(${video.imgBannerAdminUrl})`,
              }}
            >
              <BgElement
                key="bg"
                className="bg banner-elemento"
                
                /* style={{
                  backgroundImage: `url(${video.imgBannerAdminUrl})`,
                }} */
              >
                <img alt="img-oferta" src={video.imgBannerAdminUrl} className="img-banner" />
              </BgElement>
            </Element>
          );
        })}
      </BannerAnim>
    </Fragment>
  );
}
