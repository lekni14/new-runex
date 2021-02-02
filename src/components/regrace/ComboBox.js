import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

export default function ComboBox(props) {
  const { control } = useForm({});
//   const [selectedFilmYear, tambo] = useState(initialState)
  return (
    <Controller
      name="combo-box-demo"
      control={control}
      defaultValue={props.tambons.find(t => t.id === props.tambon.id)}
      onChange={([val, obj]) => obj}
      as={
        <Autocomplete
          id="combo-box-demo"
          options={props.tambons}
          getOptionSelected={(obj, newval) => obj.district === newval.district}
          getOptionLabel={option => option.district}
          renderInput={params => (
            <TextField {...params} label="Combo box" variant="outlined" />
          )}
        />
      }
    />
  );
}