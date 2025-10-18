import { useEffect, useState } from 'react';
import Modal from './common/Modal';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import type { Event } from './types/Event';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { pl } from 'date-fns/locale';
import { format } from 'date-fns';

type AddEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Event) => void;
  eventToAddDateTime: Date | null;
};

const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  onAddEvent,
  eventToAddDateTime,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<string | undefined>(undefined);
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    eventToAddDateTime && setDate(format(eventToAddDateTime, 'yyyy-MM-dd'));
    if (!eventToAddDateTime?.toString()?.includes('00:00:00')) {
      setTime(eventToAddDateTime);
    } else {
      setTime(null);
    }
  }, [eventToAddDateTime, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && date) {
      onAddEvent({
        title,
        description,
        location,
        date: getDate(),
        end: '2025-10-17 22:00',
      });
      setTitle('');
      setDescription('');
      setLocation('');
      setDate('');
      setTime(null);
      onClose();
    }
  };

  const getDate = (): string => {
    if (time) return format(time, 'yyyy-MM-dd HH:mm');
    if (date) return format(date, 'yyyy-MM-dd');
    return '';
  };

  const handleTimeChange = (newValue: Date | null) => {
    setTime(newValue);
  };

  const onCloseButtonClicked = () => {
    setTitle('');
    setDescription('');
    setLocation('');
    setDate('');
    setTime(null);
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
              fullWidth
            />
            <TextField
              label="Miejsce"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
                value={time}
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
