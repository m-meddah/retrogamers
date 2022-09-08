import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useRouter } from 'next/router'


export default function SelectMainHome({ consoles }) {

  const router = useRouter()

  return (
    <Autocomplete
        id="search-console"
        options={consoles?.map((option) => option.name)}
        onChange={(event, value) => {
          const resultat = consoles.find( console => console.name === value);
          router.push(`console/${resultat.id}`)
        } }
        sx={{ width: '100%', padding:'1rem', backgroundColor: '#ffffff' }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Rechercher une console"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
  );
}
