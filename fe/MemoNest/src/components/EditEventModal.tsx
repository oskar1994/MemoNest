import { useEffect, useMemo, useState } from 'react';
import Modal from './common/Modal';
import { Box, Button, Stack, TextField } from '@mui/material';
import type { Event } from './types/Event';
import 'dayjs/locale/pl';
import dayjs, { Dayjs } from 'dayjs';
import DateFields from './DateFields';
import ColorPickerField from './ColorPickerField';
import type { DurationOption } from './AddEventModal';

type EditEventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eventData: Event | null;
  onUpdateEvent: (updatedEvent: Event) => void;
  onDeleteEvent?: (event: Event) => void;
};

const EditEventModal: React.FC<EditEventModalProps> = ({
  isOpen,
  onClose,
  eventData,
  onUpdateEvent,
  onDeleteEvent,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [isAllDay, setIsAllDay] = useState(false);
  const [duration, setDuration] = useState<DurationOption>('30');
  const [customEndDate, setCustomEndDate] = useState<Dayjs | null>(null);
  const [color, setColor] = useState('#2196f3');

  useEffect(() => {
    if (eventData) {
      setTitle(eventData.title || '');
      setDescription(eventData.description || '');
      setLocation(eventData.location || '');
      const parsedStart = dayjs(eventData.date);
      const parsedEnd = eventData.end ? dayjs(eventData.end) : null;

      setStartDate(parsedStart);
      setCustomEndDate(parsedEnd);
      setIsAllDay(!eventData.date.includes(':'));
      setDuration('custom');
      setColor(eventData.color || '#2196f3');
    }
  }, [eventData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startDate) return;

    const updatedEvent: Event = {
      ...eventData!,
      title,
      description,
      location,
      date: isAllDay
        ? startDate.format('YYYY-MM-DD')
        : startDate.format('YYYY-MM-DD HH:mm'),
      end: computedEndDate ? computedEndDate.format('YYYY-MM-DD HH:mm') : '',
      color,
    };

    onUpdateEvent(updatedEvent);
    onClose();
  };

  const computedEndDate = useMemo(() => {
    if (isAllDay) return null;
    if (duration === 'custom') return customEndDate;
    if (startDate && duration) {
      return startDate.add(Number(duration), 'minute');
    }
    return null;
  }, [isAllDay, duration, customEndDate, startDate]);

  return (
    <Modal isOpen={isOpen} title="Edytuj wydarzenie">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 2, minWidth: 300 }}
      >
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
            multiline
            rows={2}
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
            {onDeleteEvent && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  onDeleteEvent(eventData!);
                  onClose();
                }}
              >
                Usuń
              </Button>
            )}
            <Button variant="contained" type="submit">
              Zapisz zmiany
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Anuluj
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditEventModal;
