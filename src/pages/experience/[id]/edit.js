import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { UPDATE_Experience } from "../../../GraphQL/Mutation";
import { getExperiencesById } from "../../../GraphQL/Query";
import classes from "../experience.module.scss";
const edit = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data ,refetch} = useQuery(getExperiencesById, {
    variables: { id },
  });

  // if (error) return <p>Error :</p>;
  console.log("data", data);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [datedebut, setDatedebut] = useState("");
  const [datefin, setDatefin] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    if (data && data.getExperience) {
      setTitle(data.getExperience.title);
      setDescription(data.getExperience.description);
      setDatedebut(data.getExperience.datedebut);
      setDatefin(data.getExperience.datefin);
      setLink(data.getExperience.link);

    }
  }, [data]);
  const [updateExperience] = useMutation(UPDATE_Experience, {
    onCompleted: () => refetch(),
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    updateExperience({
      variables: {
        id: id,
        input: {
          title,
          datedebut,
          datefin,
          description,
          link
        },
      },
    })
      .then((res) => {
        router.push("/experience");

        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div className={classes.kotak_login}>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label> title: </label>
          <input
            type="text"
            class="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label> link: </label>
          <input
            type="text"
            class="form-control"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label>description:</label>
          <input
            type="text"
            class="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <label>
          date debut:  </label>
          <input
            type="date"
            class="form-control"
            value={datedebut}
            onChange={(e) => setDatedebut(e.target.value)}
          />
      
        <div class="form-group">
          <label> date fin: </label>

          <input
            type="date"
            class="form-control"
            value={datefin}
            onChange={(e) => setDatefin(e.target.value)}
          />
        </div>

        <button class="btn btn-primary mt-2" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default edit;
