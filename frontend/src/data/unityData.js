import t1 from '../utils/images/Pose1expli-crop.mp4';
import e1 from '../utils/images/Pose1.mp4';
import t2 from '../utils/images/Pose2expli.mp4';
import e2 from '../utils/images/Pose2.mp4';
import t3 from '../utils/images/Pose4expli.mp4';
import e3 from '../utils/images/Pose4.mp4';
import t4 from '../utils/images/Pose5expli.mp4';
import e4 from '../utils/images/Pose5.mp4';

export const UNITY_LOADERS={
    Habituacion:{
        loaderUrl:"/Pose1expli/Build/Pose1expli.loader.js",
        dataUrl:"/Pose1expli/Build/Pose1expli.data",
        frameworkUrl:"/Pose1expli/Build/Pose1expli.framework.js",
        codeUrl:"/Pose1expli/Build/Pose1expli.wasm",
    },
    Entrenamiento1:{
        loaderUrl:"/Pose2/Build/Pose2.loader.js",
        dataUrl:"/Pose2/Build/Pose2.data",
        frameworkUrl:"/Pose2/Build/Pose2.framework.js",
        codeUrl: "/Pose2/Build/Pose2.wasm",
    },
    Entrenamiento2:{
        loaderUrl: "/Pose4/Build/Pose4.loader.js",
        dataUrl: "/Pose4/Build/Pose4.data",
        frameworkUrl:"/Pose4/Build/Pose4.framework.js",
        codeUrl:"/Pose4/Build/Pose4.wasm",
    },
    Evaluacion:{
        loaderUrl:"/Pose5/Build/Pose5.loader.js",
        dataUrl:"/Pose5/Build/Pose5.data",
        frameworkUrl:"/Pose5/Build/Pose5.framework.js",
        codeUrl:"/Pose5/Build/Pose5.wasm",
    }
}

export const UNITY_LOADERS_EXERCISES={
    Habituacion:{
        loaderUrl:"/Pose1/Pose1/Build.loader.js",
        dataUrl:"/Pose1/Pose1/Build.data",
        frameworkUrl:"/Pose1/Pose1/Build.framework.js",
        codeUrl:"/Pose1/Pose1/Build.wasm",
    },
    Entrenamiento1:{
        loaderUrl:"/Pose2ej/Build/Pose2ej.loader.js",
        dataUrl:"/Pose2ej/Build/Pose2ej.data",
        frameworkUrl:"/Pose2ej/Build/Pose2ej.framework.js",
        codeUrl: "/Pose2ej/Build/Pose2ej.wasm",
    },
    Entrenamiento2:{
        loaderUrl: "/Pose4ej/Build/Pose4ej.loader.js",
        dataUrl: "/Pose4ej/Build/Pose4ej.data",
        frameworkUrl:"/Pose4ej/Build/Pose4ej.framework.js",
        codeUrl:"/Pose4ej/Build/Pose4ej.wasm",
    },
    Evaluacion:{
        loaderUrl:"/Pose5ej/Build/Pose5ej.loader.js",
        dataUrl:"/Pose5ej/Build/Pose5ej.data",
        frameworkUrl:"/Pose5ej/Build/Pose5ej.framework.js",
        codeUrl:"/Pose5ej/Build/Pose5ej.wasm",
    }
}

export const U_LOADERS_TRAINING={
    Habituacion:t1,
    Entrenamiento1:t2,
    Entrenamiento2:t3,
    Evaluacion:t4,
}

export const U_LOADERS_EJ={
    Habituacion:e1,
    Entrenamiento1:e2,
    Entrenamiento2:e3,
    Evaluacion:e4,
}

export const LOADERS ={
    HabituacionT:t1,
    HabituacionE:e1,
    Entrenamiento1T:t2,
    Entrenamiento1E:e2,
    Entrenamiento2T:t3,
    Entrenamiento2E:e3,
    EvaluacionT:t4,
    EvaluacionE:e4,
}
 export const STEPS = [
    'HabituacionT',
    'HabituacionE',
    'Entrenamiento1T',
    'Entrenamiento1E',
    'Entrenamiento2T',
    'Entrenamiento2E',
    'EvaluacionT',
    'EvaluacionE',
];

