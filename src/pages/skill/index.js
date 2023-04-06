import React from "react";
import { useTable } from "react-table";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import {
  CREATE_SKILL,
  DELETE_SKILL,
  UPDATE_SKILL,
} from "../../GraphQL/Mutation";
import { getSkills } from "../../GraphQL/Query";
import Link from "next/link";
import Navbar from "@/component/navbar/navbar";
import classes from "./skill.module.scss"
function Skill(props) {
  const { loading, error, data ,refetch } = useQuery(getSkills);

  const [createSkill, { err }] = useMutation(CREATE_SKILL, {
    onCompleted: () => refetch(),
  });
  const [updateSkill, { errrr }] = useMutation(UPDATE_SKILL);
  const [deleteSkill, { errr }] = useMutation(DELETE_SKILL, {
    onCompleted: () => refetch(),
  });
  const [selectImage, setSelectedFile] = useState();
  const [isLoading, setisLoading] = useState(false);


  const [label, setLabel] = useState("");
  const [typesk, setTypesk] = useState("");

  const [img, setImg] = useState("");

  const [isToggled, setIsToggled] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);

  console.log(data);
  if (loading) return "Loading";

  const handleChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", selectImage);
    data.append("upload_preset", "ymp6ekgg");
    data.append("cloud_name", "doieuxngb");
    setisLoading(true);
   await fetch("https://api.cloudinary.com/v1_1/doieuxngb/image/upload", {
      method: "POST",
      body: data,
    })

      .then((res) => {
        return res.json();
      })
    //  .then((data) => setImg(data.secure_url))
      .then((data) => addPost(data.secure_url))
    //   .then((data) => addPost())
      .catch((err) => console.log(err));
      console.log( "img 1", img)  

  };


  const addPost = (url) => {
    setImg(url)        
    console.log( "img 2", img , url)  

    setIsToggled(false);
    createSkill({
      variables: {
        img: url,
        label: label,
        typesk: typesk,
      },
    });    


  };


  const removePost = (id) => {
    deleteSkill({
      variables: {
        id: id,
      },
    });
  };

  return (
    <>
     <Navbar/>
    <div class="container mt-4 P-5">
     {!isToggled ? (
        <button class="btn btn-primary" onClick={() => setIsToggled(true)}>
          {" "}
          ADD Skill{" "}
        </button>
      ) : (
        <></>
      )}

      {isToggled ? (
        <form
            method="POST"
            onSubmit={(e) => handleSubmit(e)}
        >
          <div  className={classes.kotak_login}>
          <div class="form-group">
            <label for="formGroupExampleInput">Image</label>
            <input
              type="file"
              class="form-control"
              id="formGroupExampleInput"
              placeholder="Libele"
              onChange={handleChange}
              accept=".jpg, .png, jpeg"
            />
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput2">Libelé </label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput2"
              placeholder="Description"
              onChange={(e) => setLabel(e.target.value)}
            />
            </div>
          
          <div class="form-group">
              
            <label htmlFor="label">Label:</label>
            <select
              id="label"
              class="form-select"
              // value={input.label}
              onChange={(e) => setTypesk(e.target.value)}
            >
              <option value="">-- Select a label --</option>
              <option value="tools">Tools</option>
              <option value="environment">Environment</option>
            </select>
          </div>
          
            <button class="btn btn-primary" type="submit" >
              Add Skill
            </button>
            </div>
        </form>
      ) : (
        <></>
      )} 
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th> Image</th>
              <th> label </th>
              <th> typesk </th>
              <th> Action </th>
            </tr>
          </thead>

          <tbody>
            {data.getSkills && data.getSkills.length > 0
              ? data.getSkills.map((data) => (
                  <tr scope="row" key={data.title}>
                    <td><img width="40px" src={data.img}/> </td>
                    <td> {data.typesk} </td>
                    <td>{data.label}</td>
                  
                    <td>
                      <button
                        class="btn btn-danger m-2"
                        onClick={() => removePost(data.id)}
                      >
                        {" "}
                        Delete it{" "}
                      </button>
                   
                    </td>
                  </tr>
                ))
              : "No data availible"}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default Skill;
