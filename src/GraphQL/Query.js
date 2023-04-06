import { gql } from "@apollo/client";

export const getExperiences = gql`
  query {
    getExperiences {
      id
      title
      description
      datedebut
      datefin
    }
  }
`;
export const getExperiencesById = gql`

query getExperience($id: ID) {
  getExperience(id: $id) {
    id
    title
    description
    datedebut
    datefin
    link

  }

}
`;
export const getSkills = gql`
  query {
    getSkills {
      id
      img
      label
      typesk
    }
  }
`;
