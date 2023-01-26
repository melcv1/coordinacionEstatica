import Hab1 from '../utils/images/Pose1expli-crop.mp4';
import Hab2 from '../utils/images/Pose1.mp4';
import EntrenaEtapa1 from '../utils/images/Pose2expli.mp4';
import EvaluaEtapa1 from '../utils/images/Pose2.mp4';
import EntrenaEtapa2 from '../utils/images/Pose4expli.mp4';
import EvaluaEtapa2 from '../utils/images/Pose4.mp4';
import EntrenaEtapa3 from '../utils/images/Pose5expli.mp4';
import EvaluaEtapa3 from '../utils/images/Pose5.mp4';

export const TEST_STEPS = [
    {type:'training', shortName:'Hab1',name:'Habituacion1', media: Hab1, isEvaluated:false},
    {type:'exercise', shortName:'Hab2',name:'Habituacion', media: Hab2, isEvaluated:false, idPrueba:2},
    {type:'training', shortName:'EntrenaEtapa1',name:'Entrenamiento Etapa 1', media: EntrenaEtapa1, isEvaluated:false},
    {type:'exercise', shortName:'EvaluaEtapa1',name:'Evalua Etapa 1', media: EvaluaEtapa1, isEvaluated:true, idPrueba:3},
    {type:'training', shortName:'EntrenaEtapa2',name:'Entrenamiento Etapa 2', media: EntrenaEtapa2, isEvaluated:false},
    {type:'exercise', shortName:'EvaluaEtapa2',name:'Evalua Etapa 2', media: EvaluaEtapa2, isEvaluated:true, idPrueba:4},
    {type:'training', shortName:'EntrenaEtapa3',name:'Entrenamiento Etapa 3', media: EntrenaEtapa3, isEvaluated:false},
    {type:'exercise', shortName:'EvaluaEtapa3',name:'Evalua Etapa 3', media: EvaluaEtapa3, isEvaluated:true, idPrueba:5},
];

