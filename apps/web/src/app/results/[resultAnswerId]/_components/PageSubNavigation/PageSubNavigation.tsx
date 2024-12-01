'use client';

import { MilitaryTech as MilitaryTechIcon } from '@mui/icons-material';
import ShareIcon from '@mui/icons-material/Share';
import { Box, Link } from '@mui/material';
import type { Question } from '@repo/types';
import type { FC } from 'react';
import urlJoin from 'url-join';
import { BackLink } from '~/components/uiParts/BackLink';

type Props = {
  question: Question;
};

export const PageSubNavigation: FC<Props> = ({ question }) => {
  return (
    <Box py={1} display='flex' alignItems='center' justifyContent='space-between'>
      <BackLink href={'/'} />
      <Box display='flex' alignItems='center' columnGap={1}>
        <Link
          sx={{ height: 20, width: 20, textDecoration: 'none', ':hover': { opacity: 0.7 } }}
          href={`/${question.id}/ranking`}
        >
          <MilitaryTechIcon sx={{ height: 20, width: 20, color: props => props.palette.text.secondary }} />
        </Link>
        <Box
          sx={{
            height: 20,
            width: 20,
            color: props => props.palette.info.main,
            cursor: 'pointer',
            '&:hover': { opacity: 0.7 },
          }}
          onClick={
            () =>
              navigator
                ?.share({ title: `${question?.title}`, url: urlJoin(window.location.origin, window.location.pathname) })
                .catch(() => void 0) // NOTE: シェアをキャンセルとするとエラーが投げられるため握りつぶす
          }
        >
          <ShareIcon sx={{ height: 20, width: 20, color: props => props.palette.text.secondary }} />
        </Box>
      </Box>
    </Box>
  );
};
