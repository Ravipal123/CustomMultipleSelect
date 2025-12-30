import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    sx: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 260,
      backgroundColor: 'green',
      color: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelectChip() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  // ✅ DELETE HANDLER
  const handleDelete = (chipToDelete) => {
    setPersonName((prev) =>
      prev.filter((name) => name !== chipToDelete)
    );
  };

  return (
    <FormControl sx={{ m: 2, width: 320 }}>
      <Select
        multiple
        displayEmpty
        value={personName}
        onChange={handleChange}
        input={<OutlinedInput />}
        MenuProps={MenuProps}
        sx={{
          backgroundColor: '#fbfbfb',

          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'green',
            borderWidth: '3px',
            borderRadius: '12px',
          },

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'darkgreen',
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'lime',
          },
        }}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return (
              <Box sx={{ color: '#9e9e9e', fontStyle: 'italic' }}>
                Select Names
              </Box>
            );
          }

          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() => handleDelete(value)}
                  deleteIcon={
                    <CancelIcon
                      onMouseDown={(e) => e.stopPropagation()}
                    />
                  }
                  sx={{
                    backgroundColor: 'green',
                    color: 'white',
                    fontWeight: 500,
                    borderRadius: '8px',

                    '& .MuiChip-deleteIcon': {
                      color: 'white',
                      cursor: 'pointer',
                      '&:hover': {
                        color: '#ffcccc',
                      },
                    },
                  }}
                />
              ))}
            </Box>
          );
        }}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, personName, theme)}
            sx={{
              '&:hover': {
                backgroundColor: 'darkgreen',
              },
              '&.Mui-selected': {
                backgroundColor: 'lime',
                color: 'black',
              },
              '&.Mui-selected:hover': {
                backgroundColor: 'limegreen',
              },
            }}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
