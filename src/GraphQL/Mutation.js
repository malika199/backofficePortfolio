import { gql } from "@apollo/client";
export const CREATE_EXPERIENCE = gql`
  mutation createExperience($title: String, $description: String, $datedebut: Date, $datefin: Date, $link:String) {
    createExperience(title: $title, description: $description , datedebut:$datedebut,datefin:$datefin, link:$link) {
      id
      title
      description
      datedebut
      datefin
      link

    }
  }
`;

export const DELETE_Experience = gql`
  mutation deleteExperience($id: ID!) {
    deleteExperience(id: $id)
  }
`;

export const UPDATE_Experience = gql`
  mutation updateExperience($id: ID!, $input: ExperienceInput!) {
    updateExperience(id: $id, input: $input) {
      id
      title
      datedebut
      datefin
      description
      link

    }
  }
`;

export const CREATE_SKILL = gql`
mutation createSkill($img: String, $label: String, $typesk: String) {
  createSkill(img: $img, label: $label, typesk: $typesk) {
    id
    img
    label
  }
}
`;


export const DELETE_SKILL = gql`
mutation deleteSkill($id: ID!) {
  deleteSkill(id: $id)
}
`;

export const UPDATE_SKILL = gql`
mutation UpdateSkill($id: ID!, $img: String, $label: String) {
  UpdateSkill(id: $id, img: $img, label: $label) {
    id
    img
    label
  }
}`