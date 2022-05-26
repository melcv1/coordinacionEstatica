/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     25/5/2022 11:45:59                           */
/*==============================================================*/


drop table if exists ESTUDIANTE;

drop table if exists ESTUDIANTE_PRUEBA;

drop table if exists PRUEBA;

/*==============================================================*/
/* Table: ESTUDIANTE                                            */
/*==============================================================*/
create table ESTUDIANTE
(
   ID_ESTUDIANTE        int not null auto_increment,
   NOMBRE               varchar(128),
   EDAD_ACTUAL          int,
   EDAD_MOTORA          int,
   COCIENTE_MOTOR       int,
   primary key (ID_ESTUDIANTE)
);

/*==============================================================*/
/* Table: ESTUDIANTE_PRUEBA                                     */
/*==============================================================*/
create table ESTUDIANTE_PRUEBA
(
   ID_E_P               char(10) not null,
   ID_PRUEBA            int not null,
   ID_ESTUDIANTE        int not null,
   TIEMPO_RECORD        int,
   INTENTOS             int,
   primary key (ID_E_P)
);

/*==============================================================*/
/* Table: PRUEBA                                                */
/*==============================================================*/
create table PRUEBA
(
   ID_PRUEBA            int not null auto_increment,
   NOMBRE               varchar(128),
   primary key (ID_PRUEBA)
);

alter table ESTUDIANTE_PRUEBA add constraint FK_RELATIONSHIP_1 foreign key (ID_ESTUDIANTE)
      references ESTUDIANTE (ID_ESTUDIANTE) on delete restrict on update restrict;

alter table ESTUDIANTE_PRUEBA add constraint FK_RELATIONSHIP_2 foreign key (ID_PRUEBA)
      references PRUEBA (ID_PRUEBA) on delete restrict on update restrict;

