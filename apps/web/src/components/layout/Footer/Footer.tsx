'use client';

import { Box, Link, Stack, Typography } from '@mui/material';
import type { FC } from 'react';

export const Footer: FC = () => {
  return (
    <Stack
      sx={{
        pt: 5,
        pb: 2,
        width: '100%',
        background: '#fff',
        borderBottom: props => `1px solid ${props.palette.divider}`,
        alignItems: 'center',
      }}
      rowGap={1}
    >
      <Box display='flex' columnGap={3}>
        <Typography variant='body2' textAlign='center'>
          <Link href='/'>プライバシーポリシー</Link>
        </Typography>
        <Typography variant='body2' textAlign='center'>
          <Link href='/'>お問い合わせ</Link>
        </Typography>
      </Box>
      <Typography variant='caption' textAlign='center'>
        © サイコパスマスター All Rights Reserved.
      </Typography>
    </Stack>
  );
};