import { Button, Stack } from '@mui/material';

import { useTranslation } from 'react-i18next';

export default function SettingsPage() {
  const { i18n } = useTranslation();

  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={() => i18n.changeLanguage('en')}>English</Button>

      <Button onClick={() => i18n.changeLanguage('uk')}>Українська</Button>
    </Stack>
  );
}
