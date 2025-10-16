import { useEffect, useState } from 'react';
import Modal from './common/Modal';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import type { Event } from './types/Event';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { pl } from 'date-fns/locale';

type AddEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Event) => void;
  eventToAddDateStr?: string;
  eventToAddTime: Date | null;
};

const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  onAddEvent,
  eventToAddDateStr,
  eventToAddTime,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<string | undefined>(eventToAddDateStr);
  const [selectedTime, setSelectedTime] = useState<Date | null>(eventToAddTime);

  useEffect(() => {
    setDate(eventToAddDateStr);
    setSelectedTime(eventToAddTime);
  }, [eventToAddDateStr, eventToAddTime, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && date) {
      onAddEvent({ title, description, date, time: selectedTime });
      setTitle('');
      setDescription('');
      setDate('');
      setSelectedTime(null);
      onClose();
    }
  };

  const handleTimeChange = (newValue: Date | null) => {
    setSelectedTime(newValue);
  };

  const onCloseButtonClicked = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setSelectedTime(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} title="Dodaj wydarzenie">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 2, minWidth: 300 }}
      >
        <Typography>
          <Stack spacing={2}>
            <TextField
              label="Tytuł"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Opis"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Data"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={pl}
            >
              <TimePicker
                label="Godzina"
                value={selectedTime}
                onChange={handleTimeChange}
                ampm={false} // 24-hour format
              />
            </LocalizationProvider>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="contained" type="submit">
                Dodaj
              </Button>
              <Button variant="outlined" onClick={onCloseButtonClicked}>
                Anuluj
              </Button>
            </Stack>
          </Stack>
        </Typography>
      </Box>
    </Modal>
  );
};

export default AddEventModal;
