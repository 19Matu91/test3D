import ModelCupula from './Models/ModelCupula'
import ModelAlgarrobico from './Models/ModelAlgarrobico'
// import ModelBunielUrbanizacion from './Models/ModelBunielUrbanizacion'
import ModelBunielIsla1 from './Models/ModelBunielIsla1'
import ModelBunielIsla2 from './Models/ModelBunielIsla2'
import ModelBunielIsla3 from './Models/ModelBunielIsla3'

export function Model(props) {

  const get = (material) => {
    material.envMapIntensity = props.envMapIntensity;
    return material
  }

  return (
    <>
      {props.select === 0 ? <ModelCupula /> :
        props.select === 1 ? <ModelAlgarrobico /> :
          // props.select === 2 ? <ModelBunielUrbanizacion /> :
            props.select === 3 ? <ModelBunielIsla1 /> :
              props.select === 4 ? <ModelBunielIsla2 /> :
                <ModelBunielIsla3 />}
    </>
  );
}
