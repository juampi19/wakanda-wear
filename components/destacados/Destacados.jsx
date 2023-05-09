import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';
import styles from './SlideShowProducto.module.css';


export const Destacados = ({ imagenes }) => {
  return (
    <Slide
      easing="ease"
      duration={7000}
      indicators
    >

      {
        imagenes.map(imagen => {
          const url = `/destacados/${imagen}`

          return (
            <div className={styles['each-slide']} key={imagen}>
              <div style={{
                backgroundImage: `url(${url})`,
                backgroundSize: 'cover'
              }}>

              </div>
            </div>
          )
        })
      }

    </Slide>
  )
}
