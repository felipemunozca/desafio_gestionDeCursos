PGDMP       2                    z            cursos    13.6    13.6     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    41371    cursos    DATABASE     b   CREATE DATABASE cursos WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE cursos;
                felipe    false            ?            1259    41439    cursos    TABLE     ?   CREATE TABLE public.cursos (
    id integer NOT NULL,
    nombre character varying(50),
    nivel integer,
    fecha date,
    duracion integer
);
    DROP TABLE public.cursos;
       public         heap    postgres    false            ?            1259    41437    cursos_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.cursos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.cursos_id_seq;
       public          postgres    false    201            ?           0    0    cursos_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.cursos_id_seq OWNED BY public.cursos.id;
          public          postgres    false    200            "           2604    41442 	   cursos id    DEFAULT     f   ALTER TABLE ONLY public.cursos ALTER COLUMN id SET DEFAULT nextval('public.cursos_id_seq'::regclass);
 8   ALTER TABLE public.cursos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    200    201    201            ?          0    41439    cursos 
   TABLE DATA           D   COPY public.cursos (id, nombre, nivel, fecha, duracion) FROM stdin;
    public          postgres    false    201   U
       ?           0    0    cursos_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.cursos_id_seq', 2, true);
          public          postgres    false    200            $           2606    41444    cursos cursos_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.cursos
    ADD CONSTRAINT cursos_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.cursos DROP CONSTRAINT cursos_pkey;
       public            postgres    false    201            ?      \.


     