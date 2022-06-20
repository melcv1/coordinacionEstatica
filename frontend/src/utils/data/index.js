export const poseInstructions = {
    a: [
        'Brazos caídos, pies juntos. Poner una rodilla en tierra sin mover los brazos ni el otro pie. Mantener el tronco vertical (sin sentarse sobre el talón). 20 segundos de descanso y cambio de pierna',
        '1 vez por cada pierna',
        'Fallas: Desplazar brazos, pies o rodillas. Tiempo menor a 10 segundos. Sentarse sobre el talón”)',
        'Durar al menos 10 segundos'
        ],
    Pose_2: [
        'Con los ojos abiertos, pies juntos, manos a la espalda; doblar el tronco a 90° y mantener esta posición',
        'Duración al menos de 10 segundos.',
        'Fallas: Desplazarse. Flexionar las piernas.Tiempo menor a 10 segundos'
    ],
    Pose_5: [
        'Con los ojos abiertos, mantenerse sobre la pierna derecha; rodilla izquierda flexionada al frente a 90°, muslo paralelo al derecho y ligeramente separado, brazos caídos. Después de 30 segundosde reposo. Mismo ejercicios con la otra pierna.',
        '1 vez por cada pierna',
        'Duración al menos 10 segundos por pierna',
        'Fallas: Bajar más de tres veces la pierna flexionada. Tocar el suelo con el pie, saltar,elevarse sobre la punta del pie. Balanceos'
        
    
    ],
    Pose_6: [
        'Con los ojos abiertos, mantenerse sobre la pierna derecha; rodilla izquierda flexionada atrás a 90°, muslo paralelo al derecho y ligeramente separado, brazos caídos. Después de 30 segundosde reposo. Mismo ejercicios con la otra pierna.',
        '1 vez por cada pierna',
        'Duración al menos 10 segundos por pierna',
        'Fallas: Bajar más de tres veces la pierna flexionada. Tocar el suelo con el pie, saltar,elevarse sobre la punta del pie. Balanceos'
        
    
    ]
    
}


export const tutorials = [
   
    'Empezará en 3, 2, 1'
]

export const fixCamera = [
    
    'Activar camara'
] 

export const POINTS = {
    NOSE : 0,
    LEFT_EYE : 1,
    RIGHT_EYE : 2,
    LEFT_EAR : 3,
    RIGHT_EAR : 4,
    LEFT_SHOULDER : 5,
    RIGHT_SHOULDER : 6,
    LEFT_ELBOW : 7,
    RIGHT_ELBOW : 8,
    LEFT_WRIST : 9,
    RIGHT_WRIST : 10,
    LEFT_HIP : 11,
    RIGHT_HIP : 12,
    LEFT_KNEE : 13,
    RIGHT_KNEE : 14,
    LEFT_ANKLE : 15,
    RIGHT_ANKLE : 16,
}

export const keypointConnections = {
    nose: ['left_ear', 'right_ear'],
    left_ear: ['left_shoulder'],
    right_ear: ['right_shoulder'],
    left_shoulder: ['right_shoulder', 'left_elbow', 'left_hip'],
    right_shoulder: ['right_elbow', 'right_hip'],
    left_elbow: ['left_wrist'],
    right_elbow: ['right_wrist'],
    left_hip: ['left_knee', 'right_hip'],
    right_hip: ['right_knee'],
    left_knee: ['left_ankle'],
    right_knee: ['right_ankle']
}