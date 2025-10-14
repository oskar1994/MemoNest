import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import drawerStyles from '../styles';
import { useNavigate, useLocation } from 'react-router-dom';

export default function LeftHandSidePane() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <Drawer variant="permanent" anchor="left" sx={drawerStyles}>
        <List>
          <ListItem>
            <ListItemButton
              selected={location.pathname === '/calendar'}
              onClick={() => navigate('/calendar')}
            >
              <ListItemText primary="Kalendarz" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              selected={location.pathname === '/settings'}
              onClick={() => navigate('/settings')}
            >
              <ListItemText primary="Ustawienia" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
