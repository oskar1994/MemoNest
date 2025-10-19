import React from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  type SelectChangeEvent,
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { Dayjs } from 'dayjs';
import 'dayjs/locale/pl';
import { DURATION_OPTIONS, type DurationOption } from './AddEventModal';

type DateFieldsProps = {
  isAllDay: boolean;
  setIsAllDay: (value: boolean) => void;
  startDate: Dayjs | null;
  setStartDate: (value: Dayjs | null) => void;
  duration: DurationOption;
  setDuration: (value: DurationOption) => void;
  customEndDate: Dayjs | null;
  setCustomEndDate: (value: Dayjs | null) => void;
  computedEndDate: Dayjs | null;
};

const DateFields: React.FC<DateFieldsProps> = React.memo(
  ({
    isAllDay,
    setIsAllDay,
    startDate,
    setStartDate,
    duration,
    setDuration,
    customEndDate,
    setCustomEndDate,
    computedEndDate,
  }) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 350 }}
        >
          <Stack direction="row" spacing={2}>
            <Box flex={2}>
              <DateTimePicker
                label="Data rozpoczęcia"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                disabled={isAllDay}
                format={isAllDay ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'}
              />
            </Box>
            <Box
              flex={1}
              display="flex"
              alignItems="center"
              sx={{ whiteSpace: 'nowrap' }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAllDay}
                    onChange={(e) => setIsAllDay(e.target.checked)}
                  />
                }
                label="Wydarzenie całodniowe"
              />
            </Box>
          </Stack>

          {!isAllDay && (
            <>
              <FormControl fullWidth>
                <InputLabel id="duration-label">Czas trwania</InputLabel>
                <Select
                  labelId="duration-label"
                  value={duration}
                  label="Czas trwania"
                  onChange={(event: SelectChangeEvent) =>
                    setDuration(event.target.value as DurationOption)
                  }
                >
                  {DURATION_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {duration === 'custom' && (
                <DateTimePicker
                  label="Data zakończenia"
                  value={customEndDate}
                  onChange={(newValue) => setCustomEndDate(newValue)}
                  minDateTime={startDate ?? undefined}
                  format="YYYY-MM-DD HH:mm"
                />
              )}

              {duration !== 'custom' && (
                <TextField
                  label="Obliczona data zakończenia"
                  value={
                    computedEndDate
                      ? computedEndDate.format('YYYY-MM-DD HH:mm')
                      : ''
                  }
                  InputProps={{ readOnly: true }}
                  disabled
                />
              )}
            </>
          )}
        </Box>
      </LocalizationProvider>
    );
  },
);

export default DateFields;
