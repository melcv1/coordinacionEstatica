import React, { Fragment, useState, useEffect } from 'react'
import { Unity } from "react-unity-webgl";

function UnityComponent({ unityContext, classUnity }) {



    useEffect(() => {
        console.log(unityContext);
        unityContext.unityProvider.setIsLoaded(false);
    }, [])



    return (
        <>
            <Fragment>
                <Unity className={classUnity} unityProvider={unityContext.unityProvider}  />
            </Fragment>
        </>

    )

}

export default UnityComponent;