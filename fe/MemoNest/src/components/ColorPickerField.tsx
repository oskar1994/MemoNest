import { Box, Typography } from '@mui/material';

type ColorPickerFieldProps = {
  selectedColor: string;
  onChange: (color: string) => void;
};

const PRESET_COLORS = [
  '#4caf50', // zielony
  '#2196f3', // niebieski
  '#ffeb3b', // żółty
  '#f44336', // czerwony
  '#9c27b0', // fioletowy
  '#ff9800', // pomarańczowy
];

const ColorPickerField: React.FC<ColorPickerFieldProps> = ({
  selectedColor,
  onChange,
}) => {
  return (
    <Box>
      <Typography variant="body2" gutterBottom>
        Kolor wydarzenia
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {PRESET_COLORS.map((color) => (
          <Box
            key={color}
            onClick={() => onChange(color)}
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              backgroundColor: color,
              border:
                selectedColor === color
                  ? '2px solid black'
                  : '2px solid transparent',
              cursor: 'pointer',
              transition: 'border 0.2s',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ColorPickerField;
