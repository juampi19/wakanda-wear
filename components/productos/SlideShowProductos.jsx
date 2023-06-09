import { Slide } from "react-slideshow-image"
import styles from './SlideShowProducto.module.css';
import 'react-slideshow-image/dist/styles.css'


export const SlideShowProductos = ({imagenes}) => {
  return (
    <Slide
      easing="ease"
      duration={7000}
      indicators
    >
      {
        imagenes.map( imagen => {
          

          return (
            <div className={ styles['each-slide'] } key={imagen}>
              <div style={{
                backgroundImage: `url(${ imagen })`,
                backgroundSize: 'cover'
              }}>

              </div>
            </div>
          )
        } )
      }
    </Slide>
  )
}
