export type PeopleSearchData = {
  adult: boolean;
  gender: number;
  id: number;
  known_for: Array<{
    id: number;
    media_type: string;
    name: string;
    original_name: string;
    poster_path: string | null;
  }>;
  known_for_department: string;
  media_type: "person";
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};
