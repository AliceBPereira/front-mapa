import React, { useState } from "react";
import { api } from "../../lib/axios";
import {useForm} from "react-hook-form";

const CreateCafe = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = cafedata => {
        api.post('/cafes', cafedata)
         .then(response => {console.log(response.data.cafedata)})
         .catch(error => {console.log(error.response.data.cafedata)});
     };

  return (
    <div>
      <h1>My Input Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Nome do Café" {...register("talhao",{required: true})}/>
            <input type="text" placeholder="Cultivo" {...register("cultivar",{required: "Required"})}/>
            <input type="number" placeholder="area_ha" {...register("area_ha",{required: "Required"})}/>
            <input type="text" placeholder="espacament" {...register("espacament",{required: "Required"})}/>
            <input type="number" placeholder="estande" {...register("estande",{required: "Required"})}/>
            <input type="number" placeholder=" n_de_plantas" {...register(" n_de_plantas",{required: "Required"})}/>
            <input type="date" placeholder="ano_plantio" {...register("ano_plantio",{required: "Required"})}/>
            <input type="date" placeholder="Purchase date" {...register("cultivar",{required: "Required"})}/>
            
            <input type="submit" />
            </form>
      
    </div>
  );
};

export default CreateCafe;
