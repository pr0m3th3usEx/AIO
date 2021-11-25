import { Text } from '@chakra-ui/layout';
import { WidgetParameter } from 'services/widget';

interface WidgetProps {
  id: string;
  serviceId: string;
  parameters: WidgetParameter[];
  refreshRate: number;
}

const SubredditWidget = ({ ...props }: WidgetProps) => {
  // setInterval(async () => {

  // }, 1000);

  return (
    <>
      <Text color="black">Subreddit</Text>
    </>
  );
};

export default SubredditWidget;
