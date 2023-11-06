import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import Iconify from "../../components/iconify";
import { Post } from "../../models/Post";

PostSearch.propTypes = {
  posts: PropTypes.array.isRequired,
};

interface PostSearchProps {
  posts: Post[];
}

export default function PostSearch({ posts }: PostSearchProps) {
  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      slotProps={{
        paper: {
          sx: {
            width: 320,
            [`& .${autocompleteClasses.option}`]: {
              typography: "body2",
            },
          },
        },
      }}
      options={posts}
      getOptionLabel={(post) => post.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search post..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, width: 20, height: 20, color: "text.disabled" }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
