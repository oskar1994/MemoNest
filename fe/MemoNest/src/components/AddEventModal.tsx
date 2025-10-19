import { useEffect, useMemo, useState } from 'react';
import Modal from './common/Modal';
import { Box, Button, Stack, TextField } from '@mui/material';
import type { Event } from './types/Event';
import 'dayjs/locale/pl';
import dayjs, { Dayjs } from 'dayjs';
import DateFields from './DateFields';
import ColorPickerField from './ColorPickerField';

export type DurationOption = '15' | '30' | '45' | '60' | '120' | 'custom';

export const DURATION_OPTIONS: { label: string; value: DurationOption }[] = [
  { label: '15 minut', value: '15' },
  { label: '30 minut', value: '30' },
  { label: '45 minut', value: '45' },
  { label: '1 godzina', value: '60' },
  { label: '2 godziny', value: '120' },
  { label: 'Niestandardowy', value: 'custom' },
];

type AddEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Event) => void;
  date: Date | null;
};

const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  onAddEvent,
  date,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [isAllDay, setIsAllDay] = useState(false);
  const [duration, setDuration] = useState<DurationOption>('30');
  const [customEndDate, setCustomEndDate] = useState<Dayjs | null>(null);

  const [color, setColor] = useState('#2196f3');

  useEffect(() => {
    date && setStartDate(dayjs(date));
  }, [date, isOpen]);

  useEffect(() => {
    console.log('AddEventModal re-render');
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAddEvent({
      title,
      description,
      location,
      date: isAllDay
        ? startDate!.format('YYYY-MM-DD')
        : startDate!.format('YYYY-MM-DD HH:mm'),
      end: computedEndDate ? computedEndDate.format('YYYY-MM-DD HH:mm') : '',
      color,
    });

    resetForm();
    onClose();
  };

  const onCloseButtonClicked = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setLocation('');
    setStartDate(dayjs());
    setIsAllDay(false);
    setDuration('30');
    setCustomEndDate(null);
    setColor('#2196f3');
  };

  const computedEndDate = useMemo<Dayjs | null>(() => {
    if (isAllDay) return null;
    if (duration === 'custom') return customEndDate;
    if (startDate && duration) {
      return startDate.add(Number(duration), 'minute');
    }
    return null;
  }, [isAllDay, duration, customEndDate, startDate]);

  return (
    <Modal isOpen={isOpen} title="Dodaj wydarzenie">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 2, minWidth: 300 }}
      >
        <Stack spacing={2}>
          <TextField
            label="Tytuł"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
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
          <DateFields
            isAllDay={isAllDay}
            setIsAllDay={setIsAllDay}
            startDate={startDate}
            setStartDate={setStartDate}
            duration={duration}
            setDuration={setDuration}
            customEndDate={customEndDate}
            setCustomEndDate={setCustomEndDate}
            computedEndDate={computedEndDate}
          />
          <ColorPickerField selectedColor={color} onChange={setColor} />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="contained" type="submit">
              Dodaj
            </Button>
            <Button variant="outlined" onClick={onCloseButtonClicked}>
              Anuluj
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddEventModal;
