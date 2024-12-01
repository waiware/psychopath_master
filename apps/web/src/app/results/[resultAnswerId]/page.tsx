import { Stack } from '@mui/material';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getQuestion } from '~/actions/question';
import { PostList } from '~/components/models/post/PostList';
import { QuestionInformation } from '~/components/models/question/QuestionInformation';
import { generateMetadataObject } from '~/utils/generateMetadataObject';
import { PageSubNavigation } from './_components/PageSubNavigation';

type Props = { params: Promise<{ questionId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { questionId } = await params;
  const question = await getQuestion({ id: questionId });

  return generateMetadataObject({
    title: question?.title,
    url: `https://psychopath-master.wai-ware.com/${questionId}`,
    description: question?.body,
  });
}

export default async function Page({ params }: Props) {
  const { questionId } = await params;
  const question = await getQuestion({ id: questionId });
  if (!question) return notFound();

  return (
    <Stack height='calc(100vh - 56px)' sx={{ overflowY: 'scroll' }} maxWidth='500px' mx='auto'>
      <Stack px={1} flex={1}>
        <PageSubNavigation question={question} />
        <Stack rowGap={5} pb={3}>
          <QuestionInformation question={question} />
          <Stack rowGap={3}>
            <PostList question={question} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
