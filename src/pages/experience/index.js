import React from "react";
import { useTable } from "react-table";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import {
  CREATE_EXPERIENCE,
  DELETE_Experience,
  UPDATE_Experience,
} from "../../GraphQL/Mutation";

import classes from "./experience.module.scss"
import { getExperiences } from "../../GraphQL/Query";
import Link from "next/link";
import Navbar from "@/component/navbar/navbar";

function index(props) {
  const { loading, error, data, refetch } = useQuery(getExperiences);

 

  const [createExperience, { err }] = useMutation(CREATE_EXPERIENCE, {
    onCompleted: () => refetch(),
  });

  const [deleteExperience, { errr }] = useMutation(DELETE_Experience, {
    onCompleted: () => refetch(),
  });
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [datedebut, setDatedebut] = useState(null);
  const [datefin, setDatefin] = useState(null);
  const [link, setLink] = useState(null);

  const [isToggled, setIsToggled] = useState(false);

  console.log(data);
  if (loading) return "Loading";
  const addPost = () => {
    setIsToggled(false);

    createExperience({
      variables: {
        title: title,
        description: description,
        datedebut: datedebut,
        datefin: datefin,
        link:link,

      },
    });
  };



  const removePost = (id) => {
    deleteExperience({
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
          ADD Expérience{" "}
        </button>
      ) : (
        <></>
      )}

      {isToggled ? (
        <div  className={classes.kotak_login}>
        <form>
          <div class="form-group">
            <label for="formGroupExampleInput">Title</label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label> link: </label>
            <input
              type="text"
              class="form-control"
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput2">Description </label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput2"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            
            <label for="formGroupExampleInput3">Date debut </label>

             <input
              type="date"
              class="form-control"
              id="formGroupExampleInput3"
              placeholder="Date debut"
              onChange={(e) => setDatedebut(e.target.value)}
            />
            <label for="formGroupExampleInput4">Date fin </label>
             <input
              type="date"
              class="form-control"
              id="formGroupExampleInput4"
              placeholder="Date fin"
              onChange={(e) => setDatefin(e.target.value)}
            />
            <button class="btn btn-primary mt-2" onClick={() => addPost()}>
              Add Experience
            </button>
          </div>
        </form>
        </div>
      ) : (
        <></>
      )}
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th> Title</th>
              <th> Description </th>
              <th> Action </th>
            </tr>
          </thead>

          <tbody>
            {data.getExperiences && data.getExperiences.length > 0
              ? data.getExperiences.map((data) => (
                  <tr scope="row" key={data.title}>
                    <td>{data.title}</td>

                    <td>{data.description}</td>

                    <td>
                      <button
                        class="btn btn-danger m-2"
                        onClick={() => removePost(data.id)}
                      >
                        {" "}
                        Delete it{" "}
                      </button>
                      <Link href={`/experience/${data.id}/edit`} class="btn btn-secondary">
                       Edit it
                      </Link>
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

export default index;
